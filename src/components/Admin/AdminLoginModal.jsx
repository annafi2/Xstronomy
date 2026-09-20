import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck, Lock, Sparkles, Key } from 'lucide-react';

export const AdminLoginModal = ({ onClose, onLoginSuccess }) => {
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Default demo passcode
    if (passcode.trim() === 'admin123' || passcode.trim() === 'xstronomy2026') {
      onLoginSuccess();
      onClose();
    } else {
      setErrorMsg('Kata sandi admin salah. Gunakan kode bawaan: admin123');
    }
  };

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container login-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-bar">
          <div className="modal-header-title">
            <ShieldCheck size={22} className="accent-icon-cyan" />
            <h3>Masuk ke Mode Admin Berita</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Tutup form login">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <p className="login-desc">
            Sebagai Administrator, Anda dapat menulis warta astronomi baru, mengedit artikel yang sudah ada, serta menghapus berita.
          </p>

          <div className="form-group">
            <label className="form-label">
              <Key size={15} /> Masukkan Kata Sandi Admin:
            </label>
            <input
              type="password"
              className="input-field"
              placeholder="Ketik kata sandi..."
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setErrorMsg('');
              }}
              autoFocus
              required
            />
            <span className="form-hint">
              Kunci Default Demo: <code>admin123</code>
            </span>
          </div>

          {errorMsg && (
            <div className="login-error-alert">
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="modal-footer-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              <Lock size={16} />
              <span>Verifikasi & Masuk</span>
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AdminLoginModal;
