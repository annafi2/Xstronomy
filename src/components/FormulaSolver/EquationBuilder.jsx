import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  Sparkles, 
  HelpCircle, 
  Check, 
  X, 
  Plus, 
  Maximize2,
  Minimize2,
  ChevronDown
} from 'lucide-react';
import LatexRenderer from '../Common/LatexRenderer';

export const EquationBuilder = ({ onInsertStructure, onSetFormula }) => {
  const [activeCategory, setActiveCategory] = useState(null); // 'fraction', 'radical', 'script', 'bracket', 'function'
  const [showVisualModal, setShowVisualModal] = useState(false);

  // State untuk perancang visual interaktif (Dialog Struktur Pecahan & Akar)
  const [fractionNum, setFractionNum] = useState('G * M * m');
  const [fractionDen, setFractionDen] = useState('r^2');
  const [radicalContent, setRadicalContent] = useState('2 * G * M / R');
  const [powerBase, setPowerBase] = useState('T');
  const [powerExp, setPowerExp] = useState('4');

  // Struktur-struktur siap pakai ala Microsoft Word Equation
  const STRUCTURE_CATEGORIES = [
    {
      id: 'fraction',
      name: 'Pecahan',
      symbolLatex: '\\frac{\\square}{\\square}',
      templates: [
        {
          label: 'Pecahan Bertingkat',
          latex: '\\frac{A}{B}',
          insertText: '((A) / (B))',
          desc: 'Menempatkan pembilang di atas penyebut'
        },
        {
          label: 'Hukum Gravitasi Newton',
          latex: '\\frac{G \\cdot m_1 \\cdot m_2}{r^2}',
          insertText: '(G * m1 * m2) / (r^2)',
          desc: 'Pecahan gaya kuadrat terbalik'
        },
        {
          label: 'Redshift Doppler',
          latex: '\\frac{v}{c}',
          insertText: '(v) / (c)',
          desc: 'Perbandingan kecepatan dengan cahaya'
        }
      ]
    },
    {
      id: 'radical',
      name: 'Radikal / Akar',
      symbolLatex: '\\sqrt{\\square}',
      templates: [
        {
          label: 'Akar Kuadrat Standar',
          latex: '\\sqrt{x}',
          insertText: 'sqrt(x)',
          desc: 'Menghitung akar pangkat dua'
        },
        {
          label: 'Kecepatan Lepas (Escape Velocity)',
          latex: '\\sqrt{\\frac{2 \\cdot G \\cdot M}{R}}',
          insertText: 'sqrt(2 * G * M / R)',
          desc: 'Kecepatan minimum keluar dari orbit'
        },
        {
          label: 'Kecepatan Orbit Melingkar',
          latex: '\\sqrt{\\frac{G \\cdot M}{r}}',
          insertText: 'sqrt(G * M / r)',
          desc: 'Kelajuan linear satelit stabil'
        },
        {
          label: 'Akar Pangkat Tiga (Cbrt)',
          latex: '\\sqrt[3]{x}',
          insertText: 'cbrt(x)',
          desc: 'Akar kubik'
        }
      ]
    },
    {
      id: 'script',
      name: 'Pangkat / Indeks',
      symbolLatex: '\\square^\\square',
      templates: [
        {
          label: 'Pangkat Dua (Kuadrat)',
          latex: 'x^2',
          insertText: 'x^2',
          desc: 'Pangkat dua'
        },
        {
          label: 'Pangkat Empat (Stefan-Boltzmann)',
          latex: 'T^4',
          insertText: 'T^4',
          desc: 'Radiasi daya suhu mutlak'
        },
        {
          label: 'Pangkat Tiga (Kepler III)',
          latex: 'a^3',
          insertText: 'a^3',
          desc: 'Sumbu semi-mayor kubik'
        },
        {
          label: 'Pangkat Variabel Bebas',
          latex: 'x^y',
          insertText: '(x)^(y)',
          desc: 'Pangkat sembarang'
        }
      ]
    },
    {
      id: 'bracket',
      name: 'Tanda Kurung',
      symbolLatex: '(\\square)',
      templates: [
        {
          label: 'Kurung Lengkung Biasa',
          latex: '(x + y)',
          insertText: '(x + y)',
          desc: 'Mengelompokkan prioritas operasi'
        },
        {
          label: 'Perkalian Kelompok Berkurung',
          latex: '(m_1 + m_2) \\cdot v',
          insertText: '(m1 + m2) * v',
          desc: 'Pengelompokan massa momentum'
        }
      ]
    },
    {
      id: 'function',
      name: 'Fungsi & Trig',
      symbolLatex: '\\sin(\\square)',
      templates: [
        {
          label: 'Sinus Sudut',
          latex: '\\sin(\\theta)',
          insertText: 'sin(theta)',
          desc: 'Fungsi trigonometri sinus'
        },
        {
          label: 'Kosinus Sudut',
          latex: '\\cos(\\theta)',
          insertText: 'cos(theta)',
          desc: 'Fungsi trigonometri kosinus'
        },
        {
          label: 'Logaritma Natural (ln)',
          latex: '\\ln(x)',
          insertText: 'ln(x)',
          desc: 'Logaritma berbasis e'
        }
      ]
    }
  ];

  const handleApplyFraction = () => {
    if (fractionNum.trim() && fractionDen.trim()) {
      onInsertStructure(`(${fractionNum.trim()}) / (${fractionDen.trim()})`);
      setShowVisualModal(false);
    }
  };

  const handleApplyRadical = () => {
    if (radicalContent.trim()) {
      onInsertStructure(`sqrt(${radicalContent.trim()})`);
      setShowVisualModal(false);
    }
  };

  const handleApplyPower = () => {
    if (powerBase.trim() && powerExp.trim()) {
      onInsertStructure(`(${powerBase.trim()})^(${powerExp.trim()})`);
      setShowVisualModal(false);
    }
  };

  return (
    <div className="equation-builder-wrapper">
      {/* Pita Ribbon Struktur Rumus (Equation Tools Ribbon) */}
      <div className="equation-ribbon-bar">
        <div className="ribbon-title-tag">
          <Sparkles size={14} className="accent-icon-cyan" />
          <span>Struktur Rumus (Insert Equation):</span>
        </div>

        <div className="ribbon-categories-scroll">
          {STRUCTURE_CATEGORIES.map((cat) => {
            const isOpen = activeCategory === cat.id;
            return (
              <div key={cat.id} className="ribbon-dropdown-container">
                <button
                  type="button"
                  className={`ribbon-structure-btn ${isOpen ? 'ribbon-btn-active' : ''}`}
                  onClick={() => setActiveCategory(isOpen ? null : cat.id)}
                >
                  <div className="structure-icon-box">
                    <LatexRenderer math={cat.symbolLatex} />
                  </div>
                  <span className="structure-name">{cat.name}</span>
                  <ChevronDown size={12} className={`chevron-indicator ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu Template */}
                {isOpen && (
                  <div className="ribbon-dropdown-menu glass-card">
                    <div className="dropdown-header">
                      <span>Pilih Format {cat.name}:</span>
                      <button className="dropdown-close-x" onClick={() => setActiveCategory(null)}>✕</button>
                    </div>
                    <div className="dropdown-template-grid">
                      {cat.templates.map((tpl, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className="template-tile-btn"
                          onClick={() => {
                            onInsertStructure(tpl.insertText);
                            setActiveCategory(null);
                          }}
                          title={tpl.desc}
                        >
                          <div className="template-latex-preview">
                            <LatexRenderer math={tpl.latex} />
                          </div>
                          <span className="template-label">{tpl.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Tombol Bantuan Visual Dialog Builder */}
          <button
            type="button"
            className="ribbon-structure-btn ribbon-visual-dialog-btn"
            onClick={() => setShowVisualModal(true)}
            title="Buka Dialog Perancang Struktur Visual"
          >
            <Maximize2 size={14} />
            <span>Dialog Struktur Visual</span>
          </button>
        </div>
      </div>

      {/* Modal Dialog Perancang Struktur Interaktif */}
      {showVisualModal && createPortal(
        <div className="modal-overlay" onClick={() => setShowVisualModal(false)}>
          <div className="modal-container eq-builder-modal glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div className="modal-header-title">
                <Sparkles size={20} className="accent-icon-cyan" />
                <h3>Perancang Struktur Rumus Visual</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setShowVisualModal(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="eq-builder-modal-body">
              <p className="eq-builder-intro">
                Isi kotak-kotak struktur di bawah ini seperti pada fitur <strong>Equation di Word</strong>. Sistem akan merangkainya langsung menjadi rumus fisika siap hitung.
              </p>

              {/* Modul 1: Struktur Pecahan A / B */}
              <div className="visual-structure-card glass-card">
                <div className="struct-header">
                  <h4>1. Struktur Pecahan Bertingkat</h4>
                  <span className="badge badge-cyan">\frac&#123;atas&#125;&#123;bawah&#125;</span>
                </div>
                <div className="fraction-visual-editor">
                  <div className="fraction-box-container">
                    <div className="fraction-num-row">
                      <label className="struct-box-label">Pembilang (Atas):</label>
                      <input
                        type="text"
                        className="input-field struct-input"
                        placeholder="Contoh: G * m1 * m2"
                        value={fractionNum}
                        onChange={(e) => setFractionNum(e.target.value)}
                      />
                    </div>
                    <div className="fraction-divider-bar"></div>
                    <div className="fraction-den-row">
                      <label className="struct-box-label">Penyebut (Bawah):</label>
                      <input
                        type="text"
                        className="input-field struct-input"
                        placeholder="Contoh: r^2"
                        value={fractionDen}
                        onChange={(e) => setFractionDen(e.target.value)}
                      />
                    </div>
                  </div>
                  <button type="button" className="btn btn-primary btn-sm struct-apply-btn" onClick={handleApplyFraction}>
                    <Plus size={15} />
                    <span>Sisipkan Pecahan</span>
                  </button>
                </div>
              </div>

              {/* Modul 2: Struktur Akar Kuadrat √(X) */}
              <div className="visual-structure-card glass-card">
                <div className="struct-header">
                  <h4>2. Struktur Akar Kuadrat</h4>
                  <span className="badge badge-purple">\sqrt&#123;isi&#125;</span>
                </div>
                <div className="radical-visual-editor">
                  <div className="radical-box-container">
                    <span className="radical-surd-symbol">√</span>
                    <div className="radical-content-box">
                      <label className="struct-box-label">Di dalam tanda akar:</label>
                      <input
                        type="text"
                        className="input-field struct-input"
                        placeholder="Contoh: 2 * G * M / R"
                        value={radicalContent}
                        onChange={(e) => setRadicalContent(e.target.value)}
                      />
                    </div>
                  </div>
                  <button type="button" className="btn btn-primary btn-sm struct-apply-btn" onClick={handleApplyRadical}>
                    <Plus size={15} />
                    <span>Sisipkan Akar</span>
                  </button>
                </div>
              </div>

              {/* Modul 3: Struktur Pangkat A^B */}
              <div className="visual-structure-card glass-card">
                <div className="struct-header">
                  <h4>3. Struktur Pangkat / Eksponen</h4>
                  <span className="badge badge-gold">basis^pangkat</span>
                </div>
                <div className="power-visual-editor">
                  <div className="power-inputs-group">
                    <div className="power-base-col">
                      <label className="struct-box-label">Basis (Bawah):</label>
                      <input
                        type="text"
                        className="input-field struct-input"
                        placeholder="T"
                        value={powerBase}
                        onChange={(e) => setPowerBase(e.target.value)}
                      />
                    </div>
                    <div className="power-exp-col">
                      <label className="struct-box-label">Pangkat (Atas):</label>
                      <input
                        type="text"
                        className="input-field struct-input"
                        placeholder="4"
                        value={powerExp}
                        onChange={(e) => setPowerExp(e.target.value)}
                      />
                    </div>
                  </div>
                  <button type="button" className="btn btn-primary btn-sm struct-apply-btn" onClick={handleApplyPower}>
                    <Plus size={15} />
                    <span>Sisipkan Pangkat</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-actions-bar">
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowVisualModal(false)}>
                Selesai
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default EquationBuilder;
