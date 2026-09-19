import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Tag
} from 'lucide-react';
import { NEWS_CATEGORIES } from '../../data/newsData';

export const NewsFeed = ({
  news,
  onSelectArticle
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter artikel berdasarkan pencarian dan kategori
  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchCategory =
        selectedCategory === 'Semua Kategori' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(query))) ||
        (item.author && item.author.toLowerCase().includes(query));
      return matchCategory && matchSearch;
    });
  }, [news, selectedCategory, searchQuery]);

  // Featured article (paling atas atau ditandai featured)
  const featuredArticle = useMemo(() => {
    return news.find((n) => n.featured) || news[0];
  }, [news]);

  const regularArticles = useMemo(() => {
    return filteredNews.filter((n) => n.id !== featuredArticle?.id || selectedCategory !== 'Semua Kategori' || searchQuery);
  }, [filteredNews, featuredArticle, selectedCategory, searchQuery]);

  return (
    <div className="news-feed-section">
      {/* Hero Welcome Banner */}
      <div className="news-hero-banner">
        <div className="hero-content-wrapper">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>Kabar Langit & Jagat Raya</span>
          </div>
          <h1 className="hero-title">
            Warta Astronomi, Astrofisika & Kosmologi
          </h1>
          <p className="hero-subtitle">
            Pembaruan berkala tentang observasi teleskop luar angkasa, riak gelombang gravitasi, penjelajahan planet ekstrasurya, dan misteri alam semesta.
          </p>
        </div>
      </div>

      {/* Featured Big Article (if on all categories and no search) */}
      {selectedCategory === 'Semua Kategori' && !searchQuery && featuredArticle && (
        <div className="featured-hero-card glass-card" onClick={() => onSelectArticle(featuredArticle)}>
          <div className="featured-image-wrapper">
            <img 
              src={featuredArticle.coverImage || 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80'} 
              alt={featuredArticle.title}
              className="featured-cover-img"
            />
            <div className="featured-overlay-gradient"></div>
            <div className="featured-badge-pos">
              <span className="badge badge-gold">Artikel Pilihan Utama</span>
              <span className="badge badge-cyan">{featuredArticle.category}</span>
            </div>
          </div>
          <div className="featured-info">
            <div className="card-meta">
              <span><Calendar size={14} /> {featuredArticle.date}</span>
              <span><Clock size={14} /> {featuredArticle.readTime || '4 mnt'}</span>
            </div>
            <h2 className="featured-title">{featuredArticle.title}</h2>
            <p className="featured-summary">{featuredArticle.summary}</p>
            <div className="featured-footer">
              <div className="featured-tags">
                {featuredArticle.tags?.slice(0, 3).map((t, idx) => (
                  <span key={idx} className="tag-pill">#{t}</span>
                ))}
              </div>
              <button className="btn btn-primary btn-sm read-btn">
                <span>Baca Selengkapnya</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter Controls */}
      <div className="feed-controls-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Cari berita bintang, JWST, lubang hitam, eksoplanet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>

        <div className="category-scroll-container">
          {NEWS_CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-pill-btn ${selectedCategory === cat ? 'category-pill-active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="articles-grid">
        {filteredNews.length === 0 ? (
          <div className="empty-state glass-card">
            <Sparkles size={40} className="empty-icon" />
            <h3>Tidak Ada Artikel yang Cocok</h3>
            <p>Cobalah mengganti kata kunci pencarian atau memilih kategori lain.</p>
          </div>
        ) : (
          (selectedCategory === 'Semua Kategori' && !searchQuery ? regularArticles : filteredNews).map((article) => (
            <article 
              key={article.id} 
              className="article-card glass-card"
              onClick={() => onSelectArticle(article)}
            >
              <div className="article-card-image-box">
                <img 
                  src={article.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'} 
                  alt={article.title}
                  className="article-card-img"
                  loading="lazy"
                />
                <span className="card-category-badge">{article.category}</span>
              </div>

              <div className="article-card-content">
                <div className="card-meta">
                  <span><Calendar size={13} /> {article.date}</span>
                  <span><Clock size={13} /> {article.readTime || '4 mnt'}</span>
                </div>

                <h3 className="article-card-title">{article.title}</h3>
                <p className="article-card-desc">{article.summary}</p>

                <div className="article-card-footer">
                  <span className="author-text">{article.author || 'Admin Xstronomy'}</span>
                  <span className="read-more-link">
                    Baca <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsFeed;
