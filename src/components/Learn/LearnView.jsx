import React, { useState } from 'react';
import { 
  BookOpen, 
  Orbit, 
  Rocket, 
  RotateCw, 
  Flame, 
  Eye, 
  Sun, 
  Zap, 
  Compass, 
  ArrowRight, 
  Calculator,
  Sparkles 
} from 'lucide-react';
import { CURRICULUM_DATA } from '../../data/physicsCurriculum';
import LatexRenderer from '../Common/LatexRenderer';

// Pemetaan ikon dinamis
const ICON_MAP = {
  Orbit: Orbit,
  Rocket: Rocket,
  RotateCw: RotateCw,
  Flame: Flame,
  Eye: Eye,
  Sun: Sun,
  Zap: Zap,
  Compass: Compass
};

export const LearnView = ({ onSelectTopic, onOpenInSolver }) => {
  const [activeGrade, setActiveGrade] = useState('10');

  const currentGradeData = CURRICULUM_DATA.find((g) => g.grade === activeGrade) || CURRICULUM_DATA[0];

  return (
    <div className="learn-section">
      {/* Header Banner */}
      <div className="learn-hero-banner">
        <div className="hero-content-wrapper">
          <div className="hero-badge">
            <BookOpen size={14} />
            <span>Akademi Fisika & Astrofisika SMA</span>
          </div>
          <h1 className="hero-title">
            Fisika Fundamental untuk Memahami Alam Semesta
          </h1>
          <p className="hero-subtitle">
            Kurikulum Fisika Kelas 10, 11, dan 12 yang dihubungkan langsung dengan fenomena astronomi riil: dari orbit gravitasi hingga lubang hitam relativistik.
          </p>
        </div>
      </div>

      {/* Grade Selector Navigation */}
      <div className="grade-tabs-container">
        {CURRICULUM_DATA.map((item) => {
          const isActive = activeGrade === item.grade;
          return (
            <button
              key={item.grade}
              className={`grade-tab-btn ${isActive ? 'grade-tab-active' : ''}`}
              onClick={() => setActiveGrade(item.grade)}
            >
              <span className="grade-number">Kelas {item.grade}</span>
              <span className="grade-tagline">
                {item.grade === '10' && 'Mekanika & Gravitasi'}
                {item.grade === '11' && 'Rotasi, Fluida & Gelombang'}
                {item.grade === '12' && 'Kuantum, Benda Hitam & Relativitas'}
              </span>
              {isActive && <div className="tab-indicator-bar" />}
            </button>
          );
        })}
      </div>

      {/* Grade Overview Info Card */}
      <div className="grade-overview-card glass-card">
        <div className="overview-header">
          <Sparkles size={20} className="accent-icon-cyan" />
          <h3>{currentGradeData.gradeTitle}</h3>
        </div>
        <p className="overview-desc">{currentGradeData.description}</p>
      </div>

      {/* Topics Grid */}
      <div className="topics-grid">
        {currentGradeData.topics.map((topic) => {
          const IconComponent = ICON_MAP[topic.icon] || Orbit;

          return (
            <div 
              key={topic.id} 
              className="topic-card glass-card"
              onClick={() => onSelectTopic(topic, currentGradeData.gradeTitle)}
            >
              <div className="topic-card-header">
                <div className="topic-icon-box">
                  <IconComponent size={24} />
                </div>
                <span className="badge badge-purple">Kelas {activeGrade}</span>
              </div>

              <h3 className="topic-card-title">{topic.title}</h3>
              <p className="topic-card-summary">{topic.summary}</p>

              {/* Preview 1st formula */}
              {topic.keyFormulas && topic.keyFormulas[0] && (
                <div className="topic-formula-preview">
                  <span className="formula-preview-label">{topic.keyFormulas[0].name}:</span>
                  <LatexRenderer math={topic.keyFormulas[0].latex} block />
                </div>
              )}

              <div className="topic-card-footer">
                <button 
                  className="btn btn-secondary btn-sm full-width"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTopic(topic, currentGradeData.gradeTitle);
                  }}
                >
                  <span>Pelajari Materi & Kuis</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearnView;
