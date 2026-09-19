import React from 'react';
import { Telescope, Sparkles, Heart, Atom, Globe, Compass } from 'lucide-react';

export const Footer = ({ onSelectTab }) => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-top-glow"></div>
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <Telescope size={22} className="footer-icon" />
              <span>Xstronomy</span>
            </div>
            <p className="footer-desc">
              Portal berita sains astronomi, astrofisika modern, serta laboratorium fisika SMA kelas 10-12 interaktif untuk generasi penjelajah kosmos.
            </p>
            <div className="quote-box">
              <Sparkles size={16} className="quote-sparkle" />
              <em>
                &ldquo;Somewhere, something incredible is waiting to be known.&rdquo;
              </em>
              <span className="quote-author">— Carl Sagan</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="footer-col">
            <h4 className="footer-heading">Eksplorasi Portal</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => onSelectTab('news')}>Berita Astronomi & Astrofisika</button>
              </li>
              <li>
                <button onClick={() => onSelectTab('learn')}>Materi Fisika Fundamental (Kelas 10-12)</button>
              </li>
              <li>
                <button onClick={() => onSelectTab('solver')}>Laboratorium Kalkulator Formula</button>
              </li>
              <li>
                <button onClick={() => onSelectTab('sims')}>Simulasi Orbit & Spektrum Bintang</button>
              </li>
            </ul>
          </div>

          {/* Fundamental Topics */}
          <div className="footer-col">
            <h4 className="footer-heading">Pilar Pembelajaran</h4>
            <ul className="footer-links">
              <li><span>Mekanika Klasik & Gravitasi Newton (Kelas 10)</span></li>
              <li><span>Keseimbangan Hidrostatis & Doppler (Kelas 11)</span></li>
              <li><span>Radiasi Stefan-Boltzmann & Relativitas (Kelas 12)</span></li>
              <li><span>Horison Peristiwa Lubang Hitam & Kosmologi</span></li>
            </ul>
          </div>

          {/* Constants Preview */}
          <div className="footer-col">
            <h4 className="footer-heading">Konstanta Utama</h4>
            <div className="constants-mini-badges">
              <div className="mini-const" title="Konstanta Gravitasi">
                <code>G = 6.674 × 10⁻¹¹</code>
              </div>
              <div className="mini-const" title="Kecepatan Cahaya">
                <code>c = 2.998 × 10⁸ m/s</code>
              </div>
              <div className="mini-const" title="Stefan-Boltzmann">
                <code>σ = 5.670 × 10⁻⁸</code>
              </div>
              <div className="mini-const" title="Massa Matahari">
                <code>M_☉ = 1.989 × 10³⁰ kg</code>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Xstronomy. Dibuat untuk pembelajaran astronomi & sains fisika interaktif.</p>
          <div className="footer-badge-tech">
            <Atom size={14} />
            <span>Interactive Physics Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
