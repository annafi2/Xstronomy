import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  HelpCircle, 
  Calculator, 
  Award, 
  Flame, 
  BookOpen,
  Filter,
  Volume2,
  VolumeX,
  Timer,
  Lightbulb,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import LatexRenderer from '../Common/LatexRenderer';
import { INITIAL_QUIZ_DATA } from '../../data/quizData';

export const QuizView = ({ 
  questions = [],
  quizList = [], 
  onOpenInSolver, 
  onOpenSolver,
  onExploreTopic 
}) => {
  const solverHandler = onOpenInSolver || onOpenSolver;

  // Pastikan selalu ada soal (jika props belum selesai fetch dari DB, fallback ke INITIAL_QUIZ_DATA)
  const availableQuestions = useMemo(() => {
    if (questions && questions.length > 0) return questions;
    if (quizList && quizList.length > 0) return quizList;
    return INITIAL_QUIZ_DATA;
  }, [questions, quizList]);

  const [selectedGrade, setSelectedGrade] = useState('Semua');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Semua');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Challenge Mode: Timer per soal (30 detik)
  const [isTimerMode, setIsTimerMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef(null);

  // Web Audio Synthesizer untuk Efek Suara Kosmik Interaktif
  const playCosmicTone = (frequency, type = 'sine', duration = 0.2, delay = 0) => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);
      gain.gain.setValueAtTime(0.1, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    } catch (e) {
      // AudioContext mungkin diblok jika belum ada user gesture
    }
  };

  const playCorrectChime = () => {
    playCosmicTone(523.25, 'sine', 0.15, 0);       // C5
    playCosmicTone(659.25, 'sine', 0.15, 0.07);    // E5
    playCosmicTone(783.99, 'sine', 0.25, 0.14);    // G5
    playCosmicTone(1046.50, 'sine', 0.35, 0.21);   // C6
  };

  const playWrongTone = () => {
    playCosmicTone(260, 'triangle', 0.18, 0);
    playCosmicTone(210, 'triangle', 0.25, 0.1);
  };

  // Filter daftar soal berdasarkan jenjang kelas dan kesulitan
  const filteredQuestions = useMemo(() => {
    return availableQuestions.filter((q) => {
      const matchGrade = selectedGrade === 'Semua' || q.grade.toString() === selectedGrade.toString();
      const matchDiff = selectedDifficulty === 'Semua' || q.difficulty === selectedDifficulty;
      return matchGrade && matchDiff;
    });
  }, [availableQuestions, selectedGrade, selectedDifficulty]);

  // Reset indeks saat ganti filter
  useEffect(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    setTimeLeft(30);
  }, [selectedGrade, selectedDifficulty]);

  // Countdown timer untuk Tantangan Cepat
  useEffect(() => {
    if (!isTimerMode || isAnswerSubmitted) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setTimeLeft(30);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAutoSubmitTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isTimerMode, isAnswerSubmitted]);

  const handleAutoSubmitTimeOut = () => {
    setIsAnswerSubmitted(true);
    setAnsweredCount((prev) => prev + 1);
    setStreak(0);
    playWrongTone();
  };

  const currentQ = filteredQuestions[currentIndex] || null;

  const handleSelectOption = (idx) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    playCosmicTone(440, 'sine', 0.06);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted || !currentQ) return;
    setIsAnswerSubmitted(true);
    setAnsweredCount((prev) => prev + 1);

    const isCorrect = currentQ.options[selectedOption]?.isCorrect;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      playCorrectChime();

      // Trigger micro confetti on correct
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    } else {
      setStreak(0);
      playWrongTone();
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setShowHint(false);
      setTimeLeft(30);
    } else {
      // Selesai semua soal dalam filter ini
      setShowCelebration(true);
      playCorrectChime();
      try {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    setScore(0);
    setAnsweredCount(0);
    setStreak(0);
    setTimeLeft(30);
    setShowCelebration(false);
  };

  const accuracy = answeredCount > 0 ? Math.round((score / answeredCount) * 100) : 0;

  return (
    <div className="quiz-view-section">
      {/* Header Banner */}
      <div className="quiz-hero-banner">
        <div className="hero-content-wrapper">
          <div className="hero-badge">
            <GraduationCap size={15} />
            <span>Kuis & Latihan Fisika Terstandar</span>
          </div>
          <h1 className="hero-title">
            Uji Pemahaman Fisika Fundamental & Astrofisika
          </h1>
          <p className="hero-subtitle">
            Latih intuisi matematika dan sains Anda dengan kumpulan soal terstruktur kelas 10, 11, dan 12. Dilengkapi formula KaTeX, verifikasi instan, dan panduan solusi langkah demi langkah.
          </p>
        </div>
      </div>

      {/* Grade Selector & Score Stats Bar */}
      <div className="quiz-toolbar-card glass-card">
        <div className="quiz-filters-row">
          <div className="quiz-filters-group">
            <span className="filter-label">
              <Filter size={14} />
              Jenjang:
            </span>
            <div className="grade-pill-filters">
              {['Semua', '10', '11', '12'].map((g) => (
                <button
                  key={g}
                  className={`grade-pill ${selectedGrade === g ? 'grade-pill-active' : ''}`}
                  onClick={() => setSelectedGrade(g)}
                >
                  {g === 'Semua' ? 'Semua Kelas' : `Kelas ${g}`}
                </button>
              ))}
            </div>
          </div>

          <div className="quiz-filters-group">
            <span className="filter-label">Kesulitan:</span>
            <div className="grade-pill-filters">
              {['Semua', 'Mudah', 'Sedang', 'Tantangan'].map((d) => (
                <button
                  key={d}
                  className={`grade-pill ${selectedDifficulty === d ? 'grade-pill-active' : ''}`}
                  onClick={() => setSelectedDifficulty(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Score Telemetry & Interactive Mode Toggles */}
        <div className="quiz-telemetry-row">
          <button
            className={`telemetry-pill interactive-toggle-pill ${isTimerMode ? 'timer-active-pill' : ''}`}
            onClick={() => setIsTimerMode(!isTimerMode)}
            title="Aktifkan mode tantangan waktu 30 detik per soal"
          >
            <Timer size={14} className={isTimerMode ? 'text-rose animate-spin-slow' : 'text-muted'} />
            <span className="telemetry-tag">Mode Waktu:</span>
            <span className="telemetry-num">{isTimerMode ? `${timeLeft}s` : 'Santai'}</span>
          </button>

          <button
            className="telemetry-pill interactive-toggle-pill"
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? 'Nyalakan Efek Suara' : 'Bisukan Efek Suara'}
          >
            {isMuted ? <VolumeX size={14} className="text-muted" /> : <Volume2 size={14} className="text-cyan" />}
            <span className="telemetry-num">{isMuted ? 'Bisu' : 'Audio On'}</span>
          </button>

          <div className="telemetry-pill">
            <span className="telemetry-tag">Skor:</span>
            <span className="telemetry-num text-cyan">{score} / {answeredCount}</span>
          </div>

          <div className="telemetry-pill">
            <span className="telemetry-tag">Akurasi:</span>
            <span className="telemetry-num text-purple">{accuracy}%</span>
          </div>

          <div className="telemetry-pill">
            <Flame size={14} className={streak > 0 ? 'text-gold animate-bounce' : 'text-muted'} />
            <span className="telemetry-tag">Streak:</span>
            <span className="telemetry-num text-gold">{streak}</span>
          </div>
        </div>
      </div>

      {/* Streak Combo Banner if on streak */}
      {streak >= 2 && (
        <div className="streak-fire-banner glass-card animate-pulse">
          <Zap size={18} className="text-gold" />
          <span>
            {streak >= 5 ? '🌟 HYPERDRIVE FOCUS: ' : streak >= 3 ? '⚡ SUPERNOVA STREAK: ' : '🔥 COMBO KOSMIS: '}
            <strong>{streak} Jawaban Benar Berturut-turut!</strong>
          </span>
        </div>
      )}

      {/* Question Main Arena */}
      {filteredQuestions.length === 0 ? (
        <div className="empty-quiz-card glass-card">
          <HelpCircle size={48} className="text-muted" />
          <h3>Belum Ada Soal untuk Kriteria Ini</h3>
          <p>Coba pilih jenjang kelas lain atau tambahkan soal baru di Portal Admin.</p>
          <button className="btn btn-secondary btn-sm" onClick={() => { setSelectedGrade('Semua'); setSelectedDifficulty('Semua'); }}>
            Kembali ke Semua Soal
          </button>
        </div>
      ) : currentQ ? (
        <div className="quiz-card glass-card">
          {/* Timer Countdown Bar if in Timer Mode */}
          {isTimerMode && !isAnswerSubmitted && (
            <div className="quiz-timer-track">
              <div 
                className={`quiz-timer-bar ${timeLeft <= 10 ? 'timer-danger' : ''}`}
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              />
            </div>
          )}

          {/* Question Header */}
          <div className="quiz-card-header">
            <div className="q-tags">
              <span className="badge badge-cyan">Kelas {currentQ.grade}</span>
              <span className="badge badge-purple">{currentQ.topic}</span>
              <span className={`badge ${currentQ.difficulty === 'Mudah' ? 'badge-emerald' : currentQ.difficulty === 'Tantangan' ? 'badge-rose' : 'badge-gold'}`}>
                {currentQ.difficulty || 'Sedang'}
              </span>
            </div>
            <span className="q-counter">
              Soal {currentIndex + 1} dari {filteredQuestions.length}
            </span>
          </div>

          {/* Question Content */}
          <div className="quiz-question-body">
            <div className="q-text-latex">
              <LatexRenderer math={currentQ.question} />
            </div>

            {/* Interactive Formula Hint Toggle */}
            {currentQ.formulaHint && (
              <div className="hint-interactive-wrapper">
                <button
                  type="button"
                  className="hint-toggle-btn"
                  onClick={() => setShowHint(!showHint)}
                >
                  <Lightbulb size={14} className={showHint ? 'text-gold' : 'text-cyan'} />
                  <span>{showHint ? 'Sembunyikan Petunjuk' : 'Buka Petunjuk Rumus'}</span>
                </button>
                {showHint && (
                  <div className="formula-hint-box animate-fade-in">
                    <span className="hint-label">💡 Petunjuk Rumus:</span>
                    <LatexRenderer math={currentQ.formulaHint} />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Options Grid */}
          <div className="quiz-options-list">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let optionClass = 'quiz-option-btn';

              if (isSelected) optionClass += ' opt-selected';
              if (isAnswerSubmitted) {
                if (opt.isCorrect) optionClass += ' opt-correct';
                else if (isSelected && !opt.isCorrect) optionClass += ' opt-wrong';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  className={optionClass}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                >
                  <span className="opt-letter">{String.fromCharCode(65 + idx)}</span>
                  <div className="opt-content">
                    {opt.latex ? (
                      <LatexRenderer math={opt.latex} />
                    ) : (
                      <span>{opt.text}</span>
                    )}
                  </div>
                  {isAnswerSubmitted && opt.isCorrect && (
                    <CheckCircle2 size={18} className="opt-feedback-icon text-emerald" />
                  )}
                  {isAnswerSubmitted && isSelected && !opt.isCorrect && (
                    <XCircle size={18} className="opt-feedback-icon text-rose" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Button Bar */}
          <div className="quiz-action-bar">
            {!isAnswerSubmitted ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
              >
                <span>Periksa Jawaban</span>
                <Sparkles size={16} />
              </button>
            ) : (
              <div className="submitted-actions-row">
                <button
                  type="button"
                  className="btn btn-primary next-q-btn"
                  onClick={handleNextQuestion}
                >
                  <span>{currentIndex + 1 < filteredQuestions.length ? 'Lanjut ke Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
                  <ArrowRight size={16} />
                </button>

                {solverHandler && (
                  <button
                    type="button"
                    className="btn btn-secondary solve-link-btn"
                    onClick={() => solverHandler(null)}
                    title="Uji coba nilai variabel rumus ini di kalkulator formula"
                  >
                    <Calculator size={15} />
                    <span>Buka di Kalkulator Formula</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Explanation Section (Revealed upon submit) */}
          {isAnswerSubmitted && currentQ.explanation && (
            <div className="quiz-explanation-card animate-fade-in">
              <div className="expl-header">
                <Sparkles size={16} className="accent-icon-cyan" />
                <h4>Langkah Solusi & Pembahasan Konsep:</h4>
              </div>
              <div className="expl-content">
                <LatexRenderer math={currentQ.explanation} />
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* Quiz Celebration Modal */}
      {showCelebration && (
        <div className="modal-overlay" onClick={() => setShowCelebration(false)}>
          <div className="modal-container celebration-modal glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="celebration-badge-glow">
              <Award size={48} className="text-gold" />
            </div>
            <h2>Selamat! Anda Telah Menyelesaikan Sesi Kuis</h2>
            <p className="celebration-subtitle">
              Tingkat penguasaan konsep fisika Anda:
            </p>

            <div className="celebration-stats-grid">
              <div className="c-stat-box">
                <span className="c-num text-cyan">{score} / {filteredQuestions.length}</span>
                <span className="c-label">Jawaban Benar</span>
              </div>
              <div className="c-stat-box">
                <span className="c-num text-purple">{accuracy}%</span>
                <span className="c-label">Akurasi</span>
              </div>
              <div className="c-stat-box">
                <span className="c-num text-gold">{maxStreak}</span>
                <span className="c-label">Max Streak</span>
              </div>
            </div>

            <div className="celebration-evaluation">
              {accuracy >= 80 ? (
                <div className="eval-badge eval-master">
                  🌟 <strong>Pakar Fisika Kosmis</strong>: Pemahaman Anda terhadap formula dan konsep sangat luar biasa!
                </div>
              ) : accuracy >= 50 ? (
                <div className="eval-badge eval-explorer">
                  🚀 <strong>Penjelajah Astrofisika</strong>: Fondasi konsep Anda sudah baik, terus asah perhitungan formula!
                </div>
              ) : (
                <div className="eval-badge eval-cadet">
                  🔭 <strong>Kadet Antariksa</strong>: Pelajari kembali materi modul dan gunakan kalkulator formula untuk latihan lebih mendalam.
                </div>
              )}
            </div>

            <div className="celebration-modal-actions">
              <button className="btn btn-primary" onClick={handleRestartQuiz}>
                <RotateCcw size={16} />
                <span>Ulangi Sesi Kuis</span>
              </button>
              <button className="btn btn-secondary" onClick={() => setShowCelebration(false)}>
                <span>Tutup Dialog</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizView;
