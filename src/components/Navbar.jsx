import React, { useState } from 'react';
import { 
  Telescope, 
  Sparkles, 
  BookOpen, 
  Calculator, 
  Orbit, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';

export const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  isAdmin, 
  onLogoutAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'news', label: 'Berita Kosmis', icon: Telescope },
    { id: 'learn', label: 'Belajar Fisika (10-12)', icon: BookOpen },
    { id: 'solver', label: 'Kalkulator Formula', icon: Calculator },
    { id: 'sims', label: 'Simulasi Orbit & Bintang', icon: Orbit },
    { id: 'admin', label: 'Portal Admin', icon: ShieldCheck }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
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
              className={`btn btn-secondary btn-sm admin-login-btn ${activeTab === 'admin' ? 'active-admin-btn' : ''}`}
              onClick={() => handleNavClick('admin')}
              title="Buka Portal Admin Khusus"
            >
              <ShieldCheck size={16} />
              <span>Portal Admin</span>
            </button>
          )}

          {/* Mobile hamburger button */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`mobile-nav-item ${isActive ? 'mobile-nav-active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Navbar;
