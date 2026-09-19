import React, { useState, useMemo } from 'react';
import { X, Search, Plus, Sparkles } from 'lucide-react';
import { CONSTANTS } from '../../data/constantsData';
import LatexRenderer from '../Common/LatexRenderer';

export const ConstantsModal = ({ onClose, onInsertConstant }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Universal', 'Termodinamika', 'Tata Surya', 'Planeter', 'Jarak Kosmis'];

  const filteredConstants = useMemo(() => {
    return CONSTANTS.filter((c) => {
      const matchCat = selectedCategory === 'Semua' || c.category.includes(selectedCategory);
      const query = searchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        c.name.toLowerCase().includes(query) ||
        c.key.toLowerCase().includes(query) ||
        c.unit.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container constants-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-bar">
          <div className="modal-header-title">
            <Sparkles size={20} className="header-glow-icon" />
            <h3>Pustaka Konstanta Fisika & Astronomi</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Tutup pustaka">
            <X size={18} />
          </button>
        </div>

        {/* Filter & Search */}
        <div className="constants-controls-bar">
          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Cari konstanta: G, c, Stefan-Boltzmann, Massa Matahari..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="category-scroll-container">
            {categories.map((cat) => (
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

        {/* Constants List */}
        <div className="constants-table-wrapper">
          <div className="constants-grid">
            {filteredConstants.map((item) => (
              <div key={item.key} className="constant-card glass-card">
                <div className="constant-card-header">
                  <span className="constant-symbol">{item.symbol}</span>
                  <span className="badge badge-cyan">{item.key}</span>
                </div>
                <h4 className="constant-name">{item.name}</h4>
                <div className="constant-latex-box">
                  <LatexRenderer math={item.latex} />
                </div>
                <div className="constant-unit-tag">Satuan: {item.unit}</div>
                <p className="constant-desc">{item.description}</p>
                <button
                  className="btn btn-primary btn-sm insert-const-btn"
                  onClick={() => {
                    onInsertConstant(item.key);
                    onClose();
                  }}
                  title={`Masukkan simbol "${item.key}" ke dalam rumus`}
                >
                  <Plus size={14} />
                  <span>Masukkan ke Rumus ({item.key})</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-actions-bar">
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConstantsModal;
