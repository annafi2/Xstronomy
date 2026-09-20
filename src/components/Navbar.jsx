import React, { useState, useEffect } from 'react';
import { 
  Telescope, 
  Sparkles, 
  BookOpen, 
  Calculator, 
  Orbit, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X,
  Compass,
  GraduationCap,
  ChevronDown
} from 'lucide-react';

export const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  isAdmin, 
  onLogoutAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dockVisible, setDockVisible] = useState(true);
  const [dockMinimized, setDockMinimized] = useState(false);

  const navItems = [
    { id: 'news', label: 'Berita Kosmis', shortLabel: 'Berita', icon: Telescope },
    { id: 'learn', label: 'Belajar Fisika', shortLabel: 'Belajar', icon: BookOpen },
    { id: 'quiz', label: 'Kuis & Soal', shortLabel: 'Kuis', icon: GraduationCap },
    { id: 'solver', label: 'Kalkulator Formula', shortLabel: 'Kalkulator', icon: Calculator },
    { id: 'sims', label: 'Simulasi Orbit', shortLabel: 'Simulasi', icon: Orbit },
    { id: 'admin', label: 'Portal Admin', shortLabel: 'Admin', icon: ShieldCheck }
  ];

  // Tutup mobile drawer saat window di-resize ke ukuran desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 860 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Auto-hide floating dock saat user scroll ke bawah atau sedang mengetik di input
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          // Tampilkan kembali jika scroll ke atas atau di puncak halaman
          if (currentScrollY < 40 || currentScrollY < lastScrollY - 10) {
            setDockVisible(true);
          } else if (currentScrollY > lastScrollY + 10 && currentScrollY > 70) {
            // Sembunyikan jika scroll ke bawah menjauh agar tidak menutupi kartu/rumus
            setDockVisible(false);
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleFocusIn = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target?.tagName)) {
        setDockVisible(false);
      }
    };

    const handleFocusOut = () => {
      setDockVisible(true);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="navbar-wrapper">
        <div className="navbar-container">
          {/* Brand Logo */}
          <div className="navbar-brand" onClick={() => handleNavClick('news')}>
            <div className="logo-icon-wrapper">
              <Telescope className="logo-icon" size={24} />
              <span className="logo-pulsar-dot"></span>
            </div>
            <div className="brand-text">
              <span className="brand-name">Xstronomy</span>
              <span className="brand-tagline">Astronomy Portal & Physics Lab</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isAdminTab = item.id === 'admin';
              return (
                <button
                  key={item.id}
                  className={`nav-link-btn ${isActive ? 'nav-link-active' : ''} ${isAdminTab ? 'nav-admin-link' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {isAdminTab && isAdmin && <span className="nav-admin-dot" />}
                  {isActive && <span className="active-pill" />}
                </button>
              );
            })}
          </nav>

          {/* Admin Quick Status in Navbar */}
          <div className="nav-actions">
            {isAdmin ? (
              <div className="admin-status-group">
                <button 
                  className="btn btn-sm portal-quick-btn"
                  onClick={() => handleNavClick('admin')}
                  title="Buka Portal Admin"
                >
                  <ShieldCheck size={16} color="#10b981" />
                  <span className="hide-mobile">Admin Aktif</span>
                </button>
                <button 
                  className="btn-icon-danger" 
                  onClick={onLogoutAdmin}
                  title="Keluar dari Akun Admin"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <button 
                className={`btn btn-secondary btn-sm admin-login-btn hide-mobile ${activeTab === 'admin' ? 'active-admin-btn' : ''}`}
                onClick={() => handleNavClick('admin')}
                title="Buka Portal Admin Khusus"
              >
                <ShieldCheck size={16} />
                <span>Portal Admin</span>
              </button>
            )}

            {/* Mobile Animated Hamburger Button */}
            <button 
              className={`mobile-menu-toggle ${mobileMenuOpen ? 'toggle-active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Buka menu navigasi ponsel"
            >
              <span className="hamburger-bar bar-1"></span>
              <span className="hamburger-bar bar-2"></span>
              <span className="hamburger-bar bar-3"></span>
            </button>
          </div>
        </div>

        {/* Mobile Backdrop Overlay */}
        {mobileMenuOpen && (
          <div 
            className="mobile-backdrop-overlay" 
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Animated Menu Drawer */}
        <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'drawer-open' : ''}`}>
          <div className="drawer-header">
            <span className="drawer-title">Eksplorasi Kosmis</span>
            <span className="badge badge-cyan">Menu Utama</span>
          </div>

          <div className="drawer-items-list">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                  className={`mobile-nav-item ${isActive ? 'mobile-nav-active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <div className="item-icon-box">
                    <Icon size={20} />
                  </div>
                  <span className="item-label-text">{item.label}</span>
                  {isActive && <span className="active-dot-indicator">●</span>}
                </button>
              );
            })}
          </div>

          {isAdmin && (
            <div className="drawer-footer-admin">
              <div className="drawer-admin-info">
                <ShieldCheck size={16} color="#10b981" />
                <span>Administrator Sedang Masuk</span>
              </div>
              <button className="btn btn-secondary btn-sm full-width" onClick={onLogoutAdmin}>
                <LogOut size={15} />
                <span>Keluar dari Admin</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Floating Cosmic Dock for Small DPI / Mobile Phones */}
      <nav className={`mobile-floating-dock ${!dockVisible ? 'dock-hidden' : ''} ${dockMinimized ? 'dock-minimized' : ''}`}>
        {dockMinimized ? (
          <button 
            className="dock-mini-fab"
            onClick={() => setDockMinimized(false)}
            title="Buka Navigasi Cepat"
            aria-label="Buka Navigasi Cepat"
          >
            <Compass size={18} className="accent-icon-cyan" />
            <span className="dock-mini-label">Menu</span>
          </button>
        ) : (
          <div className="dock-glass-container">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  className={`dock-btn ${isActive ? 'dock-btn-active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  title={item.label}
                >
                  <div className="dock-icon-wrapper">
                    <Icon size={19} />
                    {isActive && <span className="dock-active-glow" />}
                  </div>
                  <span className="dock-label">{item.shortLabel}</span>
                </button>
              );
            })}
            <button 
              className="dock-minimize-btn" 
              onClick={() => setDockMinimized(true)}
              title="Sembunyikan dock navigasi"
              aria-label="Sembunyikan dock navigasi"
            >
              <ChevronDown size={14} />
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
