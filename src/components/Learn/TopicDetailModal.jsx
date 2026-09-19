import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Sparkles, 
  Calculator, 
  CheckCircle2, 
  XCircle, 
  Award, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import LatexRenderer from '../Common/LatexRenderer';

export const TopicDetailModal = ({ topic, gradeTitle, onClose, onOpenInSolver }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  if (!topic) return null;

  const handleSelectOption = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    if (index === topic.quiz.correctIndex) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // confetti fallback safe
      }
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container topic-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Tutup materi">
          <X size={20} />
        </button>

        {/* Header */}
        <div className="topic-modal-header">
          <span className="badge badge-purple">{gradeTitle}</span>
          <h2 className="topic-modal-title">{topic.title}</h2>
          <p className="topic-modal-summary">{topic.summary}</p>
        </div>

        <div className="topic-modal-body">
          {/* Section 1: Konsep Fisika SMA */}
          <div className="topic-section-card glass-card">
            <div className="section-title-row">
              <BookOpen size={20} className="accent-icon-cyan" />
              <h3>Konsep Fisika Dasar SMA</h3>
            </div>
            <p className="section-text">{topic.physicsConcept}</p>
          </div>

          {/* Section 2: Jembatan Astrofisika */}
          <div className="topic-section-card glass-card astro-bridge-card">
            <div className="section-title-row">
              <Sparkles size={20} className="accent-icon-gold" />
              <h3>Aplikasi Fundamental dalam Astrofisika</h3>
            </div>
            <p className="section-text">{topic.astroBridge}</p>
          </div>

          {/* Section 3: Rumus Utama & Solver Direct Link */}
          <div className="topic-section-card glass-card">
            <div className="section-title-row">
              <Calculator size={20} className="accent-icon-purple" />
              <h3>Rumus Kunci & Laboratorium Perhitungan</h3>
            </div>
            <p className="section-subtitle">
              Klik tombol di samping rumus untuk langsung mengujinya dengan kalkulator interaktif:
            </p>

            <div className="formulas-stack">
              {topic.keyFormulas.map((f, idx) => (
                <div key={idx} className="formula-interactive-item">
                  <div className="formula-info">
                    <span className="formula-name">{f.name}</span>
                    <LatexRenderer math={f.latex} block className="formula-latex-display" />
                    <span className="formula-meaning">{f.meaning}</span>
                  </div>
                  <button
                    className="btn btn-primary btn-sm open-solver-btn"
                    onClick={() => {
                      onClose();
                      onOpenInSolver(f.presetId);
                    }}
                    title="Uji rumus ini di Kalkulator Formula"
                  >
                    <Calculator size={15} />
                    <span>Hitung di Solver</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Skenario Kosmis Nyata */}
          {topic.realScenario && (
            <div className="topic-section-card glass-card scenario-card">
              <h4 className="scenario-title">🔭 Kasus Astrofisika Nyata: {topic.realScenario.title}</h4>
              <p className="scenario-desc">{topic.realScenario.description}</p>
            </div>
          )}

          {/* Section 5: Mini Kuis Pemahaman */}
          {topic.quiz && (
            <div className="topic-section-card glass-card quiz-card">
              <div className="section-title-row">
                <HelpCircle size={20} className="accent-icon-cyan" />
                <h3>Uji Pemahaman Cepat</h3>
              </div>
              <p className="quiz-question">{topic.quiz.question}</p>

              <div className="quiz-options-list">
                {topic.quiz.options.map((option, idx) => {
                  let optionClass = 'quiz-option-btn';
                  if (showResult) {
                    if (idx === topic.quiz.correctIndex) {
                      optionClass += ' correct-option';
                    } else if (idx === selectedAnswer) {
                      optionClass += ' wrong-option';
                    } else {
                      optionClass += ' dimmed-option';
                    }
                  } else if (selectedAnswer === idx) {
                    optionClass += ' selected-option';
                  }

                  return (
                    <button
                      key={idx}
                      className={optionClass}
                      onClick={() => handleSelectOption(idx)}
                      disabled={showResult}
                    >
                      <span className="option-index">{String.fromCharCode(65 + idx)}</span>
                      <span className="option-text">{option}</span>
                      {showResult && idx === topic.quiz.correctIndex && (
                        <CheckCircle2 size={18} className="option-feedback-icon correct-icon" />
                      )}
                      {showResult && idx === selectedAnswer && idx !== topic.quiz.correctIndex && (
                        <XCircle size={18} className="option-feedback-icon wrong-icon" />
                      )}
                    </button>
                  );
                })}
              </div>

              {showResult && (
                <div className="quiz-explanation-box">
                  <div className="explanation-header">
                    <Award size={18} />
                    <strong>
                      {selectedAnswer === topic.quiz.correctIndex
                        ? 'Tepat Sekali! Jawaban Benar.'
                        : 'Belum Tepat, Pelajari Pembahasannya:'}
                    </strong>
                  </div>
                  <p>{topic.quiz.explanation}</p>
                  <button className="btn btn-secondary btn-sm" onClick={handleResetQuiz}>
                    Coba Lagi
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="modal-actions-bar">
          <button className="btn btn-primary" onClick={onClose}>
            Selesai Membaca Modul
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicDetailModal;
