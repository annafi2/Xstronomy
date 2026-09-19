import React from 'react';
import { X, Calendar, Clock, User, Tag, Share2, Sparkles, BookOpen } from 'lucide-react';

export const ArticleDetailModal = ({ article, onClose, onExplorePhysics }) => {
  if (!article) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${article.title} - ${window.location.href}`);
      alert('Tautan artikel berhasil disalin ke clipboard!');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container article-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Tutup artikel">
          <X size={20} />
        </button>

        {/* Hero image */}
        <div className="article-modal-hero">
          <img 
            src={article.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80'} 
            alt={article.title}
            className="article-hero-img"
          />
          <div className="article-hero-overlay">
            <span className="badge badge-cyan">{article.category}</span>
          </div>
        </div>

        {/* Modal content body */}
        <div className="article-modal-body">
          <div className="article-meta-row">
            <div className="article-meta-item">
              <Calendar size={15} />
              <span>{article.date}</span>
            </div>
            <div className="article-meta-item">
              <Clock size={15} />
              <span>{article.readTime || '4 menit baca'}</span>
            </div>
            <div className="article-meta-item">
              <User size={15} />
              <span>{article.author || 'Admin Xstronomy'}</span>
            </div>
          </div>

          <h2 className="article-modal-title">{article.title}</h2>

          <div className="article-lead-summary">
            {article.summary}
          </div>

          <div className="article-divider" />

          {/* Paragraphs */}
          <div className="article-body-text">
            {article.content.split('\n\n').map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="article-tags-group">
              <span className="tags-label"><Tag size={15} /> Topik Terkait:</span>
              <div className="tags-list">
                {article.tags.map((tag, idx) => (
                  <span key={idx} className="tag-chip">#{tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* Astrophysics connection callout */}
          <div className="article-astro-callout">
            <div className="callout-header">
              <Sparkles size={18} className="callout-icon" />
              <h4>Korelasi dengan Fisika SMA</h4>
            </div>
            <p>
              Penemuan dalam artikel ini bersandar pada hukum fisika dasar (gravitasi universal, spektrum radiasi elektromagnetik, dan spektroskopi). 
              Pelajari konsep matematisnya langsung di Modul Belajar Fisika atau hitung dengan Kalkulator Formula kami!
            </p>
            <button className="btn btn-primary btn-sm" onClick={() => { onClose(); onExplorePhysics(); }}>
              <BookOpen size={16} />
              <span>Buka Modul Fisika Terkait</span>
            </button>
          </div>

          {/* Modal footer actions */}
          <div className="modal-actions-bar">
            <button className="btn btn-secondary btn-sm" onClick={handleShare}>
              <Share2 size={16} />
              <span>Bagikan Berita</span>
            </button>
            <button className="btn btn-primary btn-sm" onClick={onClose}>
              Selesai Membaca
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailModal;
