import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  X, 
  Plus, 
  Trash2, 
  Check, 
  HelpCircle, 
  Eye, 
  Save, 
  SlidersHorizontal,
  GraduationCap
} from 'lucide-react';
import LatexRenderer from '../Common/LatexRenderer';
import EquationBuilder from '../FormulaSolver/EquationBuilder';

export const QuizManagerModal = ({ 
  isOpen, 
  onClose, 
  onSaveQuestion, 
  initialData = null 
}) => {
  const [grade, setGrade] = useState(initialData?.grade || 12);
  const [topic, setTopic] = useState(initialData?.topic || 'Listrik Statis & Medan Magnet');
  const [difficulty, setDifficulty] = useState(initialData?.difficulty || 'Sedang');
  const [question, setQuestion] = useState(initialData?.question || '');
  const [formulaHint, setFormulaHint] = useState(initialData?.formulaHint || '');
  const [explanation, setExplanation] = useState(initialData?.explanation || '');
  const [options, setOptions] = useState(
    initialData?.options || [
      { text: '', latex: '', isCorrect: true },
      { text: '', latex: '', isCorrect: false },
      { text: '', latex: '', isCorrect: false },
      { text: '', latex: '', isCorrect: false }
    ]
  );

  // Menyimpan referensi field yang sedang aktif untuk disisipkan formula dari ribbon
  const [focusedField, setFocusedField] = useState('question'); // 'question' | 'explanation' | 'hint' | option index (0..4)
  const questionInputRef = useRef(null);

  if (!isOpen) return null;

  const handleInsertStructure = (token) => {
    if (focusedField === 'question') {
      setQuestion((prev) => prev + ' ' + token);
    } else if (focusedField === 'explanation') {
      setExplanation((prev) => prev + ' ' + token);
    } else if (focusedField === 'hint') {
      setFormulaHint((prev) => prev + ' ' + token);
    } else if (typeof focusedField === 'number') {
      setOptions((prev) => {
        const next = [...prev];
        next[focusedField].latex = (next[focusedField].latex || '') + ' ' + token;
        next[focusedField].text = next[focusedField].latex;
        return next;
      });
    }
  };

  const handleOptionChange = (index, field, value) => {
    setOptions((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      if (field === 'latex' && !next[index].text) {
        next[index].text = value;
      }
      return next;
    });
  };

  const handleSetCorrectOption = (index) => {
    setOptions((prev) =>
      prev.map((opt, i) => ({
        ...opt,
        isCorrect: i === index
      }))
    );
  };

  const handleAddOption = () => {
    if (options.length >= 5) return;
    setOptions((prev) => [...prev, { text: '', latex: '', isCorrect: false }]);
  };

  const handleRemoveOption = (index) => {
    if (options.length <= 2) return;
    setOptions((prev) => {
      const next = prev.filter((_, i) => i !== index);
      if (!next.some((o) => o.isCorrect)) {
        next[0].isCorrect = true;
      }
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) {
      alert('Pertanyaan kuis wajib diisi!');
      return;
    }

    const validOptions = options.map((opt) => ({
      text: opt.text || opt.latex || 'Pilihan',
      latex: opt.latex || opt.text,
      isCorrect: !!opt.isCorrect
    }));

    if (validOptions.length < 2) {
      alert('Minimal 2 opsi pilihan ganda!');
      return;
    }

    const payload = {
      id: initialData?.id,
      grade: parseInt(grade, 10),
      topic,
      difficulty,
      question,
      formulaHint: formulaHint.trim() || null,
      explanation: explanation.trim() || 'Pembahasan solusi konsep fisika.',
      options: validOptions
    };

    onSaveQuestion(payload);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container quiz-editor-modal glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-bar">
          <div className="modal-header-title">
            <GraduationCap size={22} className="accent-icon-cyan" />
            <h3>{initialData?.id ? 'Edit Soal Kuis Fisika' : 'Tambah Soal Kuis Fisika Baru'}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="quiz-editor-form">
          {/* Metadata Row */}
          <div className="form-grid-3">
            <div className="input-group">
              <label className="input-label">Tingkat Kelas:</label>
              <select
                className="input-field"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                <option value={10}>Kelas 10 (Fundamental)</option>
                <option value={11}>Kelas 11 (Mekanika & Gelombang)</option>
                <option value={12}>Kelas 12 (Elektro, Kuantum, Inti)</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Topik Materi:</label>
              <input
                type="text"
                className="input-field"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Contoh: Relativitas Khusus, RLC, Gaya Lorentz"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Tingkat Kesulitan:</label>
              <select
                className="input-field"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="Mudah">Mudah</option>
                <option value="Sedang">Sedang</option>
                <option value="Tantangan">Tantangan (Olimpiade/Astro)</option>
              </select>
            </div>
          </div>

          {/* Equation Builder Ribbon for Admin */}
          <div className="admin-ribbon-embed-box">
            <div className="ribbon-embed-label">
              <Sparkles size={14} className="accent-icon-gold" />
              <span>Sisipkan Formula, Pecahan, Akar, atau Konstanta Fisika ke Field Aktif:</span>
            </div>
            <EquationBuilder onInsertStructure={handleInsertStructure} />
          </div>

          {/* Question Text */}
          <div className="input-group">
            <div className="field-label-row">
              <label className="input-label">Teks Pertanyaan (Mendukung KaTeX: $rumus$):</label>
              <button
                type="button"
                className={`field-focus-indicator ${focusedField === 'question' ? 'focus-active' : ''}`}
                onClick={() => setFocusedField('question')}
              >
                Target Ribbon
              </button>
            </div>
            <textarea
              ref={questionInputRef}
              rows={3}
              className="input-field textarea-field"
              value={question}
              onFocus={() => setFocusedField('question')}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ketik soal fisika. Gunakan tanda $...$ untuk menyisipkan rumus KaTeX, contoh: Dua buah muatan $q_1 = 4\,\mu\text{C}$..."
              required
            />
          </div>

          {/* Live Preview of Question */}
          {question.trim() && (
            <div className="admin-live-preview-box">
              <span className="preview-tag">Pratinjau Tampilan Pertanyaan (KaTeX):</span>
              <div className="latex-preview-content">
                <LatexRenderer math={question} />
              </div>
            </div>
          )}

          {/* Formula Hint */}
          <div className="input-group">
            <div className="field-label-row">
              <label className="input-label">Petunjuk Rumus Singkat (Opsional):</label>
              <button
                type="button"
                className={`field-focus-indicator ${focusedField === 'hint' ? 'focus-active' : ''}`}
                onClick={() => setFocusedField('hint')}
              >
                Target Ribbon
              </button>
            </div>
            <input
              type="text"
              className="input-field"
              value={formulaHint}
              onFocus={() => setFocusedField('hint')}
              onChange={(e) => setFormulaHint(e.target.value)}
              placeholder="Contoh: F = K \frac{q_1 q_2}{r^2}"
            />
          </div>

          {/* Multiple Choice Options */}
          <div className="options-management-card">
            <div className="options-mgmt-header">
              <label className="input-label">Opsi Pilihan Ganda (Pilih radio untuk kunci jawaban benar):</label>
              {options.length < 5 && (
                <button
                  type="button"
                  className="btn btn-secondary btn-xs"
                  onClick={handleAddOption}
                >
                  <Plus size={14} />
                  <span>Tambah Opsi</span>
                </button>
              )}
            </div>

            <div className="options-input-grid">
              {options.map((opt, idx) => (
                <div key={idx} className={`option-edit-row ${opt.isCorrect ? 'opt-row-correct' : ''}`}>
                  <label className="correct-radio-label" title="Tandai sebagai jawaban benar">
                    <input
                      type="radio"
                      name="correct-option"
                      checked={opt.isCorrect}
                      onChange={() => handleSetCorrectOption(idx)}
                    />
                    <span className="opt-letter-badge">{String.fromCharCode(65 + idx)}</span>
                  </label>

                  <input
                    type="text"
                    className="input-field opt-text-input"
                    value={opt.latex || opt.text}
                    onFocus={() => setFocusedField(idx)}
                    onChange={(e) => handleOptionChange(idx, 'latex', e.target.value)}
                    placeholder={`Opsi ${String.fromCharCode(65 + idx)} (Teks atau rumus KaTeX)...`}
                    required
                  />

                  {opt.latex && (
                    <div className="opt-mini-preview">
                      <LatexRenderer math={opt.latex} />
                    </div>
                  )}

                  {options.length > 2 && (
                    <button
                      type="button"
                      className="btn-icon-danger opt-delete-btn"
                      onClick={() => handleRemoveOption(idx)}
                      title="Hapus opsi ini"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Explanation & Solution Breakdown */}
          <div className="input-group">
            <div className="field-label-row">
              <label className="input-label">Langkah Solusi & Pembahasan Lengkap (KaTeX):</label>
              <button
                type="button"
                className={`field-focus-indicator ${focusedField === 'explanation' ? 'focus-active' : ''}`}
                onClick={() => setFocusedField('explanation')}
              >
                Target Ribbon
              </button>
            </div>
            <textarea
              rows={3}
              className="input-field textarea-field"
              value={explanation}
              onFocus={() => setFocusedField('explanation')}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Contoh: $$F = 9 \times 10^9 \times \frac{4 \times 10^{-6} \times 9 \times 10^{-6}}{0{,}09} = 3{,}6\,\text{N}.$$"
            />
          </div>

          {/* Explanation Live Preview */}
          {explanation.trim() && (
            <div className="admin-live-preview-box">
              <span className="preview-tag">Pratinjau Pembahasan:</span>
              <div className="latex-preview-content">
                <LatexRenderer math={explanation} />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="modal-actions-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={16} />
              <span>Simpan Soal ke Database Cloud</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizManagerModal;
