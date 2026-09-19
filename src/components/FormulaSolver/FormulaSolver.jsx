import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Calculator, 
  Sparkles, 
  BookOpen, 
  Sliders, 
  Play, 
  RotateCcw, 
  Layers, 
  Check, 
  AlertCircle,
  HelpCircle,
  Save,
  Activity,
  Binary,
  Compass
} from 'lucide-react';
import { PRESET_FORMULAS } from '../../data/presetFormulas';
import { CONSTANT_MAP } from '../../data/constantsData';
import { 
  extractVariables, 
  evaluateFormula, 
  formatScientific, 
  formatScientificLatex,
  convertToLatexMath 
} from '../../utils/mathHelpers';
import { getCalcHistory, addCalcHistory, clearCalcHistory } from '../../utils/storage';
import LatexRenderer from '../Common/LatexRenderer';
import ConstantsModal from './ConstantsModal';
import GraphPlotter from './GraphPlotter';
import CalculationHistory from './CalculationHistory';
import EquationBuilder from './EquationBuilder';

export const FormulaSolver = ({ targetPresetId }) => {
  // Preset terpilih
  const [selectedPreset, setSelectedPreset] = useState(PRESET_FORMULAS[0]);
  const [selectedGradeFilter, setSelectedGradeFilter] = useState('Semua');

  // Input formula pengguna
  const [expression, setExpression] = useState(PRESET_FORMULAS[0].expression);
  const [customTitle, setCustomTitle] = useState(PRESET_FORMULAS[0].title);
  const [outputUnit, setOutputUnit] = useState(PRESET_FORMULAS[0].outputUnit || '');
  const [outputName, setOutputName] = useState(PRESET_FORMULAS[0].outputName || 'Hasil Perhitungan');

  // Variabel & nilai input
  const [variableValues, setVariableValues] = useState({});
  const [calculationResult, setCalculationResult] = useState(null);
  const [calcError, setCalcError] = useState(null);

  // Modal & Tabs
  const [showConstantsModal, setShowConstantsModal] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('calculator'); // 'calculator', 'graph', 'history'
  const [historyList, setHistoryList] = useState([]);
  const [activeKeypadTab, setActiveKeypadTab] = useState('operators'); // 'operators', 'greek_astro', 'constants'

  const inputRef = useRef(null);

  // Muat riwayat awal
  useEffect(() => {
    setHistoryList(getCalcHistory());
  }, []);

  // Tangani targetPresetId jika dipassing dari Modul Belajar
  useEffect(() => {
    if (targetPresetId) {
      const match = PRESET_FORMULAS.find((p) => p.id === targetPresetId);
      if (match) {
        loadPreset(match);
      }
    }
  }, [targetPresetId]);

  // Ekstraksi variabel secara otomatis dari ekspresi
  const extractedVariables = useMemo(() => {
    return extractVariables(expression);
  }, [expression]);

  // Muat preset terpilih
  const loadPreset = (preset) => {
    setSelectedPreset(preset);
    setExpression(preset.expression);
    setCustomTitle(preset.title);
    setOutputUnit(preset.outputUnit || '');
    setOutputName(preset.outputName || 'Hasil (Y)');

    // Inisialisasi nilai variabel dari preset
    const initVals = {};
    if (preset.variables) {
      preset.variables.forEach((v) => {
        initVals[v.key] = v.default;
      });
    }
    setVariableValues(initVals);
  };

  // Pastikan semua variabel memiliki nilai default jika pengguna mengetik variabel baru
  useEffect(() => {
    setVariableValues((prev) => {
      const updated = { ...prev };
      extractedVariables.forEach((v) => {
        if (updated[v] === undefined) {
          // Cari apakah ada di preset aktif
          const presetVar = selectedPreset?.variables?.find((pv) => pv.key === v);
          updated[v] = presetVar ? presetVar.default : 10;
        }
      });
      return updated;
    });
  }, [extractedVariables, selectedPreset]);

  // Lakukan evaluasi secara dinamis saat formula atau variabel berubah
  useEffect(() => {
    if (!expression || !expression.trim()) {
      setCalculationResult(null);
      setCalcError('Masukkan formula fisika');
      return;
    }

    const res = evaluateFormula(expression, variableValues);
    if (res.success) {
      setCalculationResult(res);
      setCalcError(null);
    } else {
      setCalculationResult(null);
      setCalcError(res.error);
    }
  }, [expression, variableValues]);

  // Handle perubahan nilai variabel
  const handleVarChange = (varName, val) => {
    setVariableValues((prev) => ({
      ...prev,
      [varName]: parseFloat(val) || 0
    }));
  };

  // Simpan ke riwayat
  const handleSaveToHistory = () => {
    if (calculationResult && calculationResult.success) {
      const item = {
        title: customTitle,
        expression: expression,
        variables: variableValues,
        result: calculationResult.result,
        formattedResult: calculationResult.formatted,
        outputUnit: outputUnit
      };
      const updated = addCalcHistory(item);
      setHistoryList(updated);
      alert('Perhitungan berhasil disimpan ke riwayat!');
    }
  };

  // Muat kembali perhitungan dari riwayat
  const handleLoadFromHistory = (item) => {
    setExpression(item.expression);
    setCustomTitle(item.title || 'Formula Kustom');
    setVariableValues(item.variables || {});
    setOutputUnit(item.outputUnit || '');
    setActiveSubTab('calculator');
  };

  // Masukkan teks / simbol matematika ke posisi cursor
  const handleInsertToken = (token) => {
    const input = inputRef.current;
    if (!input) {
      setExpression((prev) => prev + token);
      return;
    }

    const start = input.selectionStart || expression.length;
    const end = input.selectionEnd || expression.length;
    const nextExpr = expression.slice(0, start) + token + expression.slice(end);
    setExpression(nextExpr);

    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + token.length, start + token.length);
    }, 50);
  };

  // Filter preset
  const filteredPresets = useMemo(() => {
    if (selectedGradeFilter === 'Semua') return PRESET_FORMULAS;
    return PRESET_FORMULAS.filter((p) => p.grade === selectedGradeFilter);
  }, [selectedGradeFilter]);

  // LaTeX Preview Dinamis (selalu tampak seperti formula matematika elegan)
  const dynamicLatexPreview = useMemo(() => {
    if (selectedPreset && selectedPreset.expression === expression && selectedPreset.latex) {
      return selectedPreset.latex;
    }
    return convertToLatexMath(expression);
  }, [expression, selectedPreset]);

  // Bangun string substitusi langkah-langkah perhitungan
  const substitutionPreview = useMemo(() => {
    if (!expression) return '';
    let subst = expression;

    // Ganti konstanta fisika dengan nilainya
    Object.keys(CONSTANT_MAP).forEach((key) => {
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      subst = subst.replace(regex, formatScientific(CONSTANT_MAP[key], 2));
    });

    // Ganti variabel dengan nilainya
    Object.keys(variableValues).forEach((v) => {
      const regex = new RegExp(`\\b${v}\\b`, 'g');
      subst = subst.replace(regex, formatScientific(variableValues[v], 2));
    });

    return subst;
  }, [expression, variableValues]);

  return (
    <div className="solver-section">
      {/* Header Banner */}
      <div className="solver-hero-banner">
        <div className="hero-content-wrapper">
          <div className="hero-badge">
            <Calculator size={14} />
            <span>Laboratorium Formula Cerdas</span>
          </div>
          <h1 className="hero-title">
            Kalkulator Fisika & Simbol Matematika Interaktif
          </h1>
          <p className="hero-subtitle">
            Ketik formula dengan notasi matematika otentik (akar √x, pangkat x², kali ×, bagi ÷, dan simbol kosmis π, λ, θ, M☉), atur variabel real-time, serta amati grafiknya.
          </p>
        </div>
      </div>

      {/* Preset Formula Bar */}
      <div className="preset-selector-bar glass-card">
        <div className="preset-header-row">
          <div className="preset-title-group">
            <Layers size={18} className="accent-icon-cyan" />
            <span className="preset-label">Pustaka Rumus Cepat:</span>
          </div>
          <div className="grade-pill-filters">
            {['Semua', '10', '11', '12'].map((g) => (
              <button
                key={g}
                className={`grade-pill ${selectedGradeFilter === g ? 'grade-pill-active' : ''}`}
                onClick={() => setSelectedGradeFilter(g)}
              >
                {g === 'Semua' ? 'Semua Kelas' : `Kelas ${g}`}
              </button>
            ))}
          </div>
        </div>

        <div className="preset-buttons-scroll">
          {filteredPresets.map((preset) => (
            <button
              key={preset.id}
              className={`preset-chip-btn ${selectedPreset?.id === preset.id ? 'preset-chip-active' : ''}`}
              onClick={() => loadPreset(preset)}
            >
              <span className="chip-grade">K{preset.grade}</span>
              <span className="chip-title">{preset.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Solver Grid */}
      <div className="solver-grid">
        {/* Left Column: Input, Math Keypad & Variables */}
        <div className="solver-col-main">
          {/* Formula Editor Card */}
          <div className="formula-editor-card glass-card">
            <div className="editor-top-row">
              <input
                type="text"
                className="formula-title-input"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="Judul Formula / Permasalahan..."
              />
              <button
                className="btn btn-secondary btn-sm constants-lib-btn"
                onClick={() => setShowConstantsModal(true)}
              >
                <Sparkles size={15} />
                <span>Pustaka Konstanta Kosmik</span>
              </button>
            </div>

            {/* LaTeX Rendered Preview: Tampilan Matematika Otentik */}
            <div className="latex-preview-box math-display-hero">
              <div className="preview-tag-row">
                <span className="preview-tag">Bentuk Formula Matematis:</span>
                <span className="math-status-badge">KaTeX Real-Time</span>
              </div>
              <div className="latex-display-center">
                {dynamicLatexPreview ? (
                  <LatexRenderer math={dynamicLatexPreview} block />
                ) : (
                  <span className="latex-placeholder">Ketik atau klik tombol simbol di bawah...</span>
                )}
              </div>
            </div>

            {/* Equation Builder Ribbon: Struktur Pecahan, Akar, Pangkat ala MS Word */}
            <EquationBuilder onInsertStructure={handleInsertToken} />

            {/* Expression Input Field with Math Styling */}
            <div className="expression-input-box">
              <label className="input-label">Pengetikan Notasi Formula:</label>
              <div className="math-input-wrapper">
                <input
                  ref={inputRef}
                  type="text"
                  className="input-field formula-math-input"
                  value={expression}
                  onChange={(e) => setExpression(e.target.value)}
                  placeholder="Contoh: √(2 × G × M / R) atau G × m1 × m2 / r²"
                />
                <button 
                  className="math-input-clear-btn" 
                  onClick={() => setExpression('')}
                  title="Kosongkan formula"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Categorized Authentic Mathematical Keypad */}
            <div className="math-keypad-container">
              <div className="keypad-category-tabs">
                <button
                  className={`keypad-tab-btn ${activeKeypadTab === 'operators' ? 'keypad-tab-active' : ''}`}
                  onClick={() => setActiveKeypadTab('operators')}
                >
                  Operasi & Pangkat
                </button>
                <button
                  className={`keypad-tab-btn ${activeKeypadTab === 'greek_astro' ? 'keypad-tab-active' : ''}`}
                  onClick={() => setActiveKeypadTab('greek_astro')}
                >
                  Simbol Yunani & Kosmis
                </button>
                <button
                  className={`keypad-tab-btn ${activeKeypadTab === 'constants' ? 'keypad-tab-active' : ''}`}
                  onClick={() => setActiveKeypadTab('constants')}
                >
                  Konstanta Fisika
                </button>
              </div>

              <div className="keypad-grid-body">
                {activeKeypadTab === 'operators' && (
                  <div className="keypad-keys-row">
                    <button className="math-key-btn" onClick={() => handleInsertToken(' + ')} title="Penjumlahan">+</button>
                    <button className="math-key-btn" onClick={() => handleInsertToken(' - ')} title="Pengurangan">−</button>
                    <button className="math-key-btn math-key-accent" onClick={() => handleInsertToken(' × ')} title="Perkalian">×</button>
                    <button className="math-key-btn math-key-accent" onClick={() => handleInsertToken(' / ')} title="Pembagian">÷</button>
                    <button className="math-key-btn math-key-special" onClick={() => handleInsertToken('√(')} title="Akar Kuadrat">√x</button>
                    <button className="math-key-btn math-key-special" onClick={() => handleInsertToken('²')} title="Pangkat Dua">x²</button>
                    <button className="math-key-btn math-key-special" onClick={() => handleInsertToken('³')} title="Pangkat Tiga">x³</button>
                    <button className="math-key-btn math-key-special" onClick={() => handleInsertToken('^')} title="Pangkat y">xʸ</button>
                    <button className="math-key-btn" onClick={() => handleInsertToken('(')}>(</button>
                    <button className="math-key-btn" onClick={() => handleInsertToken(')')}>)</button>
                    <button className="math-key-btn math-key-fn" onClick={() => handleInsertToken('sin(')}>sin</button>
                    <button className="math-key-btn math-key-fn" onClick={() => handleInsertToken('cos(')}>cos</button>
                  </div>
                )}

                {activeKeypadTab === 'greek_astro' && (
                  <div className="keypad-keys-row">
                    <button className="math-key-btn math-key-greek" onClick={() => handleInsertToken('π')} title="Pi">π</button>
                    <button className="math-key-btn math-key-greek" onClick={() => handleInsertToken('λ')} title="Panjang Gelombang">λ</button>
                    <button className="math-key-btn math-key-greek" onClick={() => handleInsertToken('θ')} title="Sudut Resolusi">θ</button>
                    <button className="math-key-btn math-key-greek" onClick={() => handleInsertToken('ω')} title="Kecepatan Sudut">ω</button>
                    <button className="math-key-btn math-key-greek" onClick={() => handleInsertToken('γ')} title="Faktor Lorentz">γ</button>
                    <button className="math-key-btn math-key-greek" onClick={() => handleInsertToken('σ')} title="Stefan-Boltzmann">σ</button>
                    <button className="math-key-btn math-key-greek" onClick={() => handleInsertToken('Δm')} title="Defek Massa">Δm</button>
                    <button className="math-key-btn math-key-astro" onClick={() => handleInsertToken('M☉')} title="Massa Matahari">M☉</button>
                    <button className="math-key-btn math-key-astro" onClick={() => handleInsertToken('R☉')} title="Radius Matahari">R☉</button>
                    <button className="math-key-btn math-key-astro" onClick={() => handleInsertToken('M⊕')} title="Massa Bumi">M⊕</button>
                    <button className="math-key-btn math-key-astro" onClick={() => handleInsertToken('R⊕')} title="Radius Bumi">R⊕</button>
                  </div>
                )}

                {activeKeypadTab === 'constants' && (
                  <div className="keypad-keys-row">
                    <button className="math-key-btn math-key-const" onClick={() => handleInsertToken('G')} title="Konstanta Gravitasi">G</button>
                    <button className="math-key-btn math-key-const" onClick={() => handleInsertToken('c')} title="Kecepatan Cahaya">c</button>
                    <button className="math-key-btn math-key-const" onClick={() => handleInsertToken('h')} title="Konstanta Planck">h</button>
                    <button className="math-key-btn math-key-const" onClick={() => handleInsertToken('kB')} title="Konstanta Boltzmann">k_B</button>
                    <button className="math-key-btn math-key-const" onClick={() => handleInsertToken('b_wien')} title="Konstanta Wien">b</button>
                    <button className="math-key-btn math-key-const" onClick={() => handleInsertToken('AU')} title="Satuan Astronomi">AU</button>
                    <button className="math-key-btn math-key-const" onClick={() => handleInsertToken('ly')} title="Tahun Cahaya">ly</button>
                    <button className="math-key-btn math-key-const" onClick={() => handleInsertToken('pc')} title="Parsec">pc</button>
                  </div>
                )}
              </div>
            </div>

            {selectedPreset?.astronomyApplication && (
              <div className="preset-astro-note">
                <Sparkles size={16} className="accent-icon-gold" />
                <p><strong>Aplikasi Astrofisika:</strong> {selectedPreset.astronomyApplication}</p>
              </div>
            )}
          </div>

          {/* Dynamic Variables Card */}
          <div className="variables-card glass-card">
            <div className="card-header-clean">
              <div className="title-with-icon">
                <Sliders size={18} className="accent-icon-cyan" />
                <h3>Variabel Nilai Masukan ({extractedVariables.length})</h3>
              </div>
              <span className="variables-hint">Sesuaikan nilai variabel untuk kalkulasi interaktif</span>
            </div>

            {extractedVariables.length === 0 ? (
              <div className="no-vars-msg">
                <Check size={18} color="#10b981" />
                <p>Formula ini menggunakan konstanta fisika murni tanpa variabel bebas.</p>
              </div>
            ) : (
              <div className="variables-list">
                {extractedVariables.map((vKey) => {
                  const presetVarInfo = selectedPreset?.variables?.find((pv) => pv.key === vKey);
                  const currentVal = variableValues[vKey] !== undefined ? variableValues[vKey] : 10;
                  const varLatex = convertToLatexMath(vKey);

                  return (
                    <div key={vKey} className="variable-row-item">
                      <div className="var-header">
                        <span className="var-badge">
                          <LatexRenderer math={varLatex || vKey} />
                        </span>
                        <span className="var-label-name">
                          {presetVarInfo?.label || `Variabel ${vKey}`}
                        </span>
                        {presetVarInfo?.unit && (
                          <span className="var-unit-tag">[{presetVarInfo.unit}]</span>
                        )}
                      </div>

                      {presetVarInfo?.note && (
                        <div className="var-note-text">{presetVarInfo.note}</div>
                      )}

                      <div className="var-controls">
                        <input
                          type="number"
                          className="input-field var-number-input"
                          value={currentVal}
                          onChange={(e) => handleVarChange(vKey, e.target.value)}
                        />
                        <input
                          type="range"
                          className="var-slider"
                          min={currentVal > 0 ? currentVal * 0.1 : 0}
                          max={currentVal > 0 ? currentVal * 2 : 100}
                          step={currentVal > 0 ? currentVal * 0.05 : 1}
                          value={currentVal}
                          onChange={(e) => handleVarChange(vKey, e.target.value)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Output & Tabs (Result, Graph, History) */}
        <div className="solver-col-results">
          {/* Sub-tabs Navigation */}
          <div className="subtabs-bar glass-card">
            <button
              className={`subtab-btn ${activeSubTab === 'calculator' ? 'subtab-active' : ''}`}
              onClick={() => setActiveSubTab('calculator')}
            >
              <Calculator size={16} />
              <span>Hasil Perhitungan</span>
            </button>
            <button
              className={`subtab-btn ${activeSubTab === 'graph' ? 'subtab-active' : ''}`}
              onClick={() => setActiveSubTab('graph')}
            >
              <Activity size={16} />
              <span>Grafik Respon</span>
            </button>
            <button
              className={`subtab-btn ${activeSubTab === 'history' ? 'subtab-active' : ''}`}
              onClick={() => setActiveSubTab('history')}
            >
              <Layers size={16} />
              <span>Riwayat ({historyList.length})</span>
            </button>
          </div>

          {activeSubTab === 'calculator' && (
            <div className="results-wrapper">
              {/* Main Result Card */}
              <div className="result-display-card glass-card">
                <span className="result-target-name">{outputName || 'Hasil Kalkulasi'}</span>

                {calcError ? (
                  <div className="calc-error-box">
                    <AlertCircle size={22} />
                    <span>{calcError}</span>
                  </div>
                ) : calculationResult ? (
                  <div className="result-value-box">
                    <div className="main-number-glow">
                      {calculationResult.formatted}
                    </div>
                    {outputUnit && <span className="result-unit-label">{outputUnit}</span>}

                    <div className="result-alt-values">
                      <div className="alt-item">
                        <span className="alt-label">Nilai Presisi Lengkap:</span>
                        <code className="alt-value">{calculationResult.result}</code>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="result-card-actions">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleSaveToHistory}
                    disabled={!calculationResult}
                  >
                    <Save size={15} />
                    <span>Simpan ke Riwayat</span>
                  </button>
                </div>
              </div>

              {/* Step-by-Step Substitution Breakdown */}
              <div className="breakdown-card glass-card">
                <h4 className="breakdown-title">
                  <Sparkles size={16} className="accent-icon-cyan" />
                  Langkah Substitusi Nilai:
                </h4>
                <div className="breakdown-content">
                  <div className="breakdown-step">
                    <span className="step-num">1. Formula Asli:</span>
                    <LatexRenderer math={dynamicLatexPreview} />
                  </div>
                  <div className="breakdown-step">
                    <span className="step-num">2. Substitusi Angka:</span>
                    <code className="step-subst">{substitutionPreview}</code>
                  </div>
                  <div className="breakdown-step">
                    <span className="step-num">3. Hasil Terkalkulasi:</span>
                    <strong className="step-final">
                      {calculationResult?.formatted || '...'} {outputUnit}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'graph' && (
            <GraphPlotter
              expression={expression}
              variables={extractedVariables}
              variableValues={variableValues}
              defaultPlotVar={selectedPreset?.plotVariable}
              outputName={outputName}
              outputUnit={outputUnit}
            />
          )}

          {activeSubTab === 'history' && (
            <CalculationHistory
              history={historyList}
              onLoadCalculation={handleLoadFromHistory}
              onClearHistory={() => setHistoryList(clearCalcHistory())}
            />
          )}
        </div>
      </div>

      {/* Constants Modal */}
      {showConstantsModal && (
        <ConstantsModal
          onClose={() => setShowConstantsModal(false)}
          onInsertConstant={(constKey) => handleInsertToken(constKey)}
        />
      )}
    </div>
  );
};

export default FormulaSolver;
