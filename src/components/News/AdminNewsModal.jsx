import React, { useState, useEffect } from 'react';
import { X, Save, Image as ImageIcon, Sparkles } from 'lucide-react';
import { NEWS_CATEGORIES } from '../../data/newsData';

const PRESET_COVERS = [
  { label: 'Eksoplanet & Nebula', url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Lubang Hitam & Galaksi', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Badai Suar Matahari', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Eksplorasi Bulan & Kawah', url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Deep Space Kosmis', url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80' }
];

export const AdminNewsModal = ({ initialArticle, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(NEWS_CATEGORIES[1]);
  const [author, setAuthor] = useState('Admin Xstronomy');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState(PRESET_COVERS[0].url);
  const [readTime, setReadTime] = useState('4 menit baca');
  const [tagsStr, setTagsStr] = useState('');
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    if (initialArticle) {
      setTitle(initialArticle.title || '');
      setCategory(initialArticle.category || NEWS_CATEGORIES[1]);
      setAuthor(initialArticle.author || 'Admin Xstronomy');
      setSummary(initialArticle.summary || '');
      setContent(initialArticle.content || '');
      setCoverImage(initialArticle.coverImage || PRESET_COVERS[0].url);
      setReadTime(initialArticle.readTime || '4 menit baca');
      setTagsStr(initialArticle.tags ? initialArticle.tags.join(', ') : '');
      setFeatured(!!initialArticle.featured);
    }
  }, [initialArticle]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim() || !content.trim()) {
      alert('Harap isi Judul, Ringkasan, dan Isi Artikel.');
      return;
    }

    const tags = tagsStr
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const articleData = {
      title,
      category,
      author,
      summary,
      content,
      coverImage,
      readTime,
      tags,
      featured
    };

    onSave(articleData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container admin-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-bar">
          <div className="modal-header-title">
            <Sparkles size={20} className="header-glow-icon" />
            <h3>{initialArticle ? 'Edit Artikel Berita' : 'Tambah Artikel Berita Baru'}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Tutup form">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-news-form">
          <div className="form-group">
            <label className="form-label">Judul Artikel Astronomi / Astrofisika</label>
            <input
              type="text"
              className="input-field"
              placeholder="Contoh: Teleskop Luar Angkasa Deteksi Sinyal..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label">Kategori Berita</label>
              <select
                className="input-field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
                placeholder="Admin Xstronomy"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
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
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
              />
            </div>

            <div className="form-group flex-1">
              <label className="form-label">Tag / Topik (Pisahkan dengan koma)</label>
              <input
                type="text"
                className="input-field"
                placeholder="JWST, Lubang Hitam, Kosmologi"
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">URL Gambar Cover</label>
            <div className="image-input-group">
              <input
                type="url"
                className="input-field"
                placeholder="https://images.unsplash.com/..."
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
              />
            </div>
            <div className="preset-images-picker">
              <span className="picker-label">Pilih Gambar Cepat:</span>
              <div className="picker-badges">
                {PRESET_COVERS.map((preset, idx) => (
                  <button
                    type="button"
                    key={idx}
                    className="preset-img-btn"
                    onClick={() => setCoverImage(preset.url)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Ringkasan Berita Singkat (Lead / Teaser)</label>
            <textarea
              className="input-field textarea-field"
              rows={2}
              placeholder="Deskripsi singkat yang tampil pada kartu berita..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Isi Berita Lengkap (Gunakan 2 baris baru untuk pemisah paragraf)</label>
            <textarea
              className="input-field textarea-field"
              rows={7}
              placeholder="Tuliskan berita lengkap di sini..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="form-checkbox-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              <span>Jadikan Artikel Utama (Featured Hero)</span>
            </label>
          </div>

          <div className="modal-footer-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={16} />
              <span>Simpan & Publikasikan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminNewsModal;
