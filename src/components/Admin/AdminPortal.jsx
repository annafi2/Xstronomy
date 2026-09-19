import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  PlusCircle, 
  Edit, 
  Trash2, 
  RotateCcw, 
  Search, 
  FileText, 
  Layers, 
  Calendar, 
  Sparkles, 
  Lock, 
  LogOut, 
  Check, 
  X, 
  Eye, 
  ArrowLeft,
  Key,
  ShieldAlert
} from 'lucide-react';
import { NEWS_CATEGORIES } from '../../data/newsData';

const PRESET_COVERS = [
  { label: 'Eksoplanet & Nebula', url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Lubang Hitam & Galaksi', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Badai Suar Matahari', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Eksplorasi Bulan & Kawah', url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Deep Space Kosmis', url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80' }
];

export const AdminPortal = ({ 
  news, 
  isAdmin, 
  onLogin, 
  onLogout, 
  onSaveArticle, 
  onDeleteArticle, 
  onResetNews,
  onViewArticleInReader
}) => {
  // Login Gate State
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');

  // Portal View State: 'list' | 'editor'
  const [portalMode, setPortalMode] = useState('list');
  const [editingArticleId, setEditingArticleId] = useState(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: NEWS_CATEGORIES[1],
    author: 'Admin Xstronomy',
    summary: '',
    content: '',
    coverImage: PRESET_COVERS[0].url,
    readTime: '4 menit baca',
    tagsStr: '',
    featured: false
  });

  // Handle Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (passcode.trim() === 'admin123' || passcode.trim() === 'xstronomy2026') {
      onLogin();
      setLoginError('');
      setPasscode('');
    } else {
      setLoginError('Kata sandi admin salah. Gunakan kode demo bawaan: admin123');
    }
  };

  // Buka Editor untuk Buat Baru
  const handleStartCreate = () => {
    setEditingArticleId(null);
    setFormData({
      title: '',
      category: NEWS_CATEGORIES[1],
      author: 'Admin Xstronomy',
      summary: '',
      content: '',
      coverImage: PRESET_COVERS[0].url,
      readTime: '4 menit baca',
      tagsStr: '',
      featured: false
    });
    setPortalMode('editor');
  };

  // Buka Editor untuk Edit Artikel Tertentu
  const handleStartEdit = (article) => {
    setEditingArticleId(article.id);
    setFormData({
      title: article.title || '',
      category: article.category || NEWS_CATEGORIES[1],
      author: article.author || 'Admin Xstronomy',
      summary: article.summary || '',
      content: article.content || '',
      coverImage: article.coverImage || PRESET_COVERS[0].url,
      readTime: article.readTime || '4 menit baca',
      tagsStr: article.tags ? article.tags.join(', ') : '',
      featured: !!article.featured
    });
    setPortalMode('editor');
  };

  // Submit Form Artikel
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.summary.trim() || !formData.content.trim()) {
      alert('Harap isi Judul, Ringkasan, dan Konten Artikel.');
      return;
    }

    const tags = formData.tagsStr
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const articlePayload = {
      ...formData,
      tags
    };

    onSaveArticle(editingArticleId ? { ...articlePayload, id: editingArticleId } : articlePayload);
    setPortalMode('list');
    setEditingArticleId(null);
  };

  // Filter artikel di tabel admin
  const filteredArticles = useMemo(() => {
    return news.filter((item) => {
      const matchCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.author.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      return matchCategory && matchSearch;
    });
  }, [news, selectedCategory, searchQuery]);

  // Statistik Dashboard
  const stats = useMemo(() => {
    const total = news.length;
    const categoriesCount = new Set(news.map((n) => n.category)).size;
    const featuredCount = news.filter((n) => n.featured).length;
    return { total, categoriesCount, featuredCount };
  }, [news]);

  // Jika belum login, tampilkan Portal Gate Login Khusus
  if (!isAdmin) {
    return (
      <div className="admin-portal-gate-wrapper">
        <div className="admin-gate-card glass-card">
          <div className="gate-header">
            <div className="gate-icon-box">
              <ShieldCheck size={32} className="accent-icon-cyan" />
            </div>
            <h2>Portal Administrator Xstronomy</h2>
            <p>
              Halaman khusus untuk kurasi artikel sains astronomi, publikasi warta astrofisika terbaru, dan manajemen konten portal.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="gate-form">
            <div className="form-group">
              <label className="form-label">
                <Key size={15} /> Kata Sandi Akses Portal:
              </label>
              <input
                type="password"
                className="input-field gate-input"
                placeholder="Masukkan kata sandi..."
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setLoginError('');
                }}
                autoFocus
                required
              />
              <span className="gate-hint">
                Kunci Demo Administrator: <code>admin123</code>
              </span>
            </div>

            {loginError && (
              <div className="login-error-alert">
                <ShieldAlert size={16} />
                <span>{loginError}</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary gate-submit-btn">
              <Lock size={16} />
              <span>Masuk ke Portal Admin</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Jika sudah login, tampilkan antarmuka Portal Admin Lengkap
  return (
    <div className="admin-portal-container">
      {/* Header Bar Portal */}
      <div className="admin-portal-header-bar glass-card">
        <div className="portal-brand-left">
          <div className="portal-badge-shield">
            <ShieldCheck size={20} color="#10b981" />
            <span>Portal Administrator</span>
          </div>
          <span className="portal-status-dot">● Sesi Aktif</span>
        </div>

        <div className="portal-actions-right">
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => {
              if (window.confirm('Pulihkan seluruh berita ke dataset default awal?')) {
                onResetNews();
              }
            }}
            title="Kembalikan artikel ke sampel bawaan"
          >
            <RotateCcw size={15} />
            <span>Reset Berita Bawaan</span>
          </button>
          <button className="btn btn-secondary btn-sm logout-portal-btn" onClick={onLogout}>
            <LogOut size={15} />
            <span>Keluar Portal</span>
          </button>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="portal-stats-grid">
        <div className="portal-stat-card glass-card">
          <div className="stat-icon-wrapper cyan-glow">
            <FileText size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Artikel Terpublikasi</span>
            <span className="stat-number">{stats.total}</span>
          </div>
        </div>

        <div className="portal-stat-card glass-card">
          <div className="stat-icon-wrapper purple-glow">
            <Layers size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Kategori Topik Aktif</span>
            <span className="stat-number">{stats.categoriesCount}</span>
          </div>
        </div>

        <div className="portal-stat-card glass-card">
          <div className="stat-icon-wrapper gold-glow">
            <Sparkles size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Artikel Pilihan Utama</span>
            <span className="stat-number">{stats.featuredCount}</span>
          </div>
        </div>
      </div>

      {/* Main Content: List or Editor */}
      {portalMode === 'list' ? (
        <div className="portal-table-section glass-card">
          <div className="table-top-controls">
            <div className="controls-left">
              <div className="search-input-wrapper portal-search">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Cari artikel berdasarkan judul, kategori, atau penulis..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <select
                className="input-field select-category-dropdown"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="Semua">Semua Kategori</option>
                {NEWS_CATEGORIES.filter((c) => c !== 'Semua Kategori').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btn-primary" onClick={handleStartCreate}>
              <PlusCircle size={18} />
              <span>Tulis Berita Baru</span>
            </button>
          </div>

          {/* Table */}
          <div className="portal-table-wrapper">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Cover</th>
                  <th>Judul & Ringkasan</th>
                  <th>Kategori</th>
                  <th>Penulis & Tanggal</th>
                  <th>Aksi Manajemen</th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="table-empty-td">
                      Tidak ada artikel yang sesuai kriteria pencarian.
                    </td>
                  </tr>
                ) : (
                  filteredArticles.map((article) => (
                    <tr key={article.id} className="portal-table-row">
                      <td className="td-cover">
                        <img 
                          src={article.coverImage || PRESET_COVERS[0].url} 
                          alt={article.title} 
                          className="table-thumb-img" 
                        />
                      </td>
                      <td className="td-info">
                        <div className="article-table-title">
                          {article.featured && <span className="badge badge-gold badge-mini">Featured</span>}
                          <strong>{article.title}</strong>
                        </div>
                        <p className="article-table-summary">{article.summary}</p>
                      </td>
                      <td className="td-cat">
                        <span className="badge badge-cyan">{article.category}</span>
                      </td>
                      <td className="td-meta">
                        <div className="meta-line">
                          <span>{article.author || 'Admin'}</span>
                        </div>
                        <div className="meta-line muted-date">
                          <Calendar size={12} />
                          <span>{article.date}</span>
                        </div>
                      </td>
                      <td className="td-actions">
                        <div className="table-action-btns">
                          <button
                            className="action-icon-btn view-action"
                            onClick={() => onViewArticleInReader(article)}
                            title="Pratinjau Artikel"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            className="action-icon-btn edit-action"
                            onClick={() => handleStartEdit(article)}
                            title="Edit Artikel"
                          >
                            <Edit size={15} />
                          </button>
                          <button
                            className="action-icon-btn delete-action"
                            onClick={() => {
                              if (window.confirm(`Hapus artikel "${article.title}"?`)) {
                                onDeleteArticle(article.id);
                              }
                            }}
                            title="Hapus Artikel"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Portal Integrated Article Editor */
        <div className="portal-editor-section glass-card">
          <div className="editor-nav-bar">
            <button className="btn btn-secondary btn-sm" onClick={() => setPortalMode('list')}>
              <ArrowLeft size={16} />
              <span>Kembali ke Daftar Artikel</span>
            </button>
            <h3 className="editor-mode-heading">
              {editingArticleId ? 'Edit Artikel Berita' : 'Tulis Artikel Berita Astronomi Baru'}
            </h3>
          </div>

          <form onSubmit={handleFormSubmit} className="portal-editor-form">
            <div className="editor-columns-grid">
              {/* Left Column: Form Fields */}
              <div className="editor-left-col">
                <div className="form-group">
                  <label className="form-label">Judul Artikel Astronomi / Astrofisika</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Contoh: Teleskop Luar Angkasa Deteksi Sinyal Eksoplanet..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label className="form-label">Kategori Berita</label>
                    <select
                      className="input-field"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {NEWS_CATEGORIES.filter((c) => c !== 'Semua Kategori').map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group flex-1">
                    <label className="form-label">Penulis / Kontributor</label>
                    <input
                      type="text"
                      className="input-field"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label className="form-label">Estimasi Waktu Baca</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="4 menit baca"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    />
                  </div>

                  <div className="form-group flex-1">
                    <label className="form-label">Tag / Topik (Pisahkan koma)</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="JWST, Lubang Hitam, Kosmologi"
                      value={formData.tagsStr}
                      onChange={(e) => setFormData({ ...formData, tagsStr: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">URL Gambar Cover Sampul</label>
                  <input
                    type="url"
                    className="input-field"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  />
                  <div className="preset-images-picker">
                    <span className="picker-label">Pilih Gambar Cepat:</span>
                    <div className="picker-badges">
                      {PRESET_COVERS.map((preset, idx) => (
                        <button
                          type="button"
                          key={idx}
                          className="preset-img-btn"
                          onClick={() => setFormData({ ...formData, coverImage: preset.url })}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Ringkasan Berita Singkat (Lead Teaser)</label>
                  <textarea
                    className="input-field textarea-field"
                    rows={2}
                    placeholder="Ringkasan pendek yang muncul di feed kartu berita..."
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Isi Berita Lengkap (Gunakan baris ganda untuk paragraf baru)</label>
                  <textarea
                    className="input-field textarea-field"
                    rows={8}
                    placeholder="Tuliskan isi artikel lengkap di sini..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                  />
                </div>

                <div className="form-checkbox-row">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    <span>Jadikan Artikel Pilihan Utama (Featured Hero)</span>
                  </label>
                </div>

                <div className="editor-buttons-bottom">
                  <button type="button" className="btn btn-secondary" onClick={() => setPortalMode('list')}>
                    Batal
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <Check size={16} />
                    <span>{editingArticleId ? 'Simpan Perubahan' : 'Publikasikan Berita'}</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Live Card Preview */}
              <div className="editor-right-col">
                <span className="preview-heading">Pratinjau Tampilan Kartu Berita:</span>
                <div className="article-card glass-card preview-card-box">
                  <div className="article-card-image-box">
                    <img 
                      src={formData.coverImage || PRESET_COVERS[0].url} 
                      alt="Preview" 
                      className="article-card-img" 
                    />
                    <span className="card-category-badge">{formData.category}</span>
                  </div>
                  <div className="article-card-content">
                    <div className="card-meta">
                      <span><Calendar size={13} /> {new Date().toISOString().split('T')[0]}</span>
                      <span>{formData.readTime || '4 mnt'}</span>
                    </div>
                    <h3 className="article-card-title">{formData.title || 'Judul Artikel Anda...'}</h3>
                    <p className="article-card-desc">
                      {formData.summary || 'Ringkasan artikel Anda akan tampil di sini...'}
                    </p>
                    <div className="article-card-footer">
                      <span className="author-text">{formData.author}</span>
                      <span className="read-more-link">Pratinjau</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;
