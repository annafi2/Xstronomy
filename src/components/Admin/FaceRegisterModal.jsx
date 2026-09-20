import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Camera, 
  Sparkles, 
  Key, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Scan,
  RefreshCw,
  User,
  ArrowRight
} from 'lucide-react';
import { 
  extractFacialEmbedding, 
  saveBiometrics, 
  captureFaceThumbnail 
} from '../../utils/faceBiometrics';

export const FaceRegisterModal = ({ 
  isOpen, 
  onClose, 
  onRegisteredSuccess 
}) => {
  const [step, setStep] = useState(1); // 1: Password Auth, 2: Camera Capture, 3: Success
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState('');

  // Camera & Capture state
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameRef = useRef(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [captureProgress, setCaptureProgress] = useState(0); // 0 - 100%
  const [sampleCount, setSampleCount] = useState(0);
  const [capturedThumb, setCapturedThumb] = useState(null);
  const [guideText, setGuideText] = useState('Posisikan wajah Anda tepat di dalam lingkaran...');
  const samplesRef = useRef([]);

  // Verifikasi kata sandi admin sebelum pendaftaran wajah
  const handleVerifyPassword = (e) => {
    e.preventDefault();
    if (passcode.trim() === 'admin123' || passcode.trim() === 'xstronomy2026') {
      setPassError('');
      setStep(2);
    } else {
      setPassError('Kata sandi admin salah. Gunakan kunci bawaan: admin123');
    }
  };

  // Memulai kamera untuk proses pendaftaran
  const startCamera = useCallback(async () => {
    setCameraError('');
    setCaptureProgress(0);
    setSampleCount(0);
    samplesRef.current = [];
    setGuideText('Menyiapkan sensor optik kosmis...');

    try {
      const constraints = {
        video: {
          facingMode: 'user',
          width: { ideal: 480 },
          height: { ideal: 480 },
          frameRate: { ideal: 24 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setCameraActive(true);
          setGuideText('Tatap lurus ke kamera dan tahan posisi wajah Anda...');
        };
      }
    } catch (err) {
      console.error('Kamera register error:', err);
      setCameraError('Gagal mengakses kamera. Pastikan izin kamera aktif pada peramban Anda.');
      setCameraActive(false);
    }
  }, []);

  // Hentikan kamera
  const stopCamera = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  // Jalankan kamera saat masuk ke step 2
  useEffect(() => {
    if (step === 2) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [step, startCamera, stopCamera]);

  // Loop pengambilan sampel multi-frame (4 sampel over 2 detik)
  useEffect(() => {
    if (step !== 2 || !cameraActive) return;

    let lastSampleTime = 0;
    const sampleIntervalMs = 450; // Jeda antar sampel
    const requiredSamples = 4;

    const captureLoop = (timestamp) => {
      if (timestamp - lastSampleTime >= sampleIntervalMs) {
        lastSampleTime = timestamp;

        if (videoRef.current && videoRef.current.readyState >= 2) {
          const result = extractFacialEmbedding(videoRef.current);

          if (result.detected) {
            samplesRef.current.push(result.descriptor);
            const currentSamples = samplesRef.current.length;
            setSampleCount(currentSamples);
            const progress = Math.min(100, Math.round((currentSamples / requiredSamples) * 100));
            setCaptureProgress(progress);

            if (currentSamples === 1) {
              setGuideText('Sampel pertama terekam. Tahan sebentar...');
              // Buat thumbnail wajah
              const thumb = captureFaceThumbnail(videoRef.current);
              if (thumb) setCapturedThumb(thumb);
            } else if (currentSamples === 2) {
              setGuideText('Menganalisis kontur dan biometrik wajah (50%)...');
            } else if (currentSamples === 3) {
              setGuideText('Hampir selesai, memproses vektor fitur (75%)...');
            } else if (currentSamples >= requiredSamples) {
              setGuideText('Perekaman selesai! Menyimpan profil biometrik...');
              
              // Rata-ratakan seluruh sampel untuk mendapatkan deskriptor biometrik yang sangat stabil
              const avgDescriptor = new Array(128).fill(0);
              const total = samplesRef.current.length;
              for (let s = 0; s < total; s++) {
                for (let i = 0; i < 128; i++) {
                  avgDescriptor[i] += samplesRef.current[s][i];
                }
              }
              for (let i = 0; i < 128; i++) {
                avgDescriptor[i] = Number((avgDescriptor[i] / total).toFixed(6));
              }

              // Simpan ke storage lokal
              const thumb = capturedThumb || captureFaceThumbnail(videoRef.current);
              saveBiometrics(avgDescriptor, thumb);

              stopCamera();
              setTimeout(() => {
                setStep(3);
              }, 400);
              return;
            }
          } else {
            setGuideText(result.reason || 'Posisikan wajah di dalam lingkaran kosmis');
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(captureLoop);
    };

    animFrameRef.current = requestAnimationFrame(captureLoop);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [step, cameraActive, capturedThumb, stopCamera]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container face-register-modal glass-card" onClick={(e) => e.stopPropagation()}>
        {/* Header Modal */}
        <div className="modal-header-bar">
          <div className="modal-header-title">
            <Scan size={20} className="accent-icon-cyan" />
            <h3>Pendaftaran Biometrik Wajah AI</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Tutup form pendaftaran">
            <X size={18} />
          </button>
        </div>

        {/* STEP 1: Konfirmasi Kata Sandi Admin */}
        {step === 1 && (
          <form onSubmit={handleVerifyPassword} className="face-register-step-form">
            <div className="register-intro-box">
              <div className="intro-icon-circle">
                <ShieldCheck size={28} className="text-cyan" />
              </div>
              <p className="intro-text">
                Untuk keamanan portal, silakan masukkan kata sandi administrator sebelum mendaftarkan wajah Anda ke sistem biometrik AI.
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Key size={15} /> Masukkan Kata Sandi Admin:
              </label>
              <input
                type="password"
                className="input-field"
                placeholder="Ketik kata sandi admin..."
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setPassError('');
                }}
                autoFocus
                required
              />
              <span className="gate-hint">
                Kunci bawaan administrator: <code>admin123</code>
              </span>
            </div>

            {passError && (
              <div className="login-error-alert">
                <AlertCircle size={16} />
                <span>{passError}</span>
              </div>
            )}

            <div className="modal-actions-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                <span>Lanjut ke Sensor Wajah</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Perekaman Wajah Interaktif */}
        {step === 2 && (
          <div className="face-capture-step-body">
            <div className="cosmic-scanner-viewport register-viewport">
              {cameraActive && (
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  autoPlay
                  className="scanner-video-feed mirror-video"
                />
              )}

              {/* Overlay Panduan Lingkaran */}
              <div className="scanner-hud-overlay">
                <div className="hud-scan-circle circle-registering">
                  <div className="hud-radar-sweep"></div>
                  <div className="target-bracket corner-top-left"></div>
                  <div className="target-bracket corner-top-right"></div>
                  <div className="target-bracket corner-bottom-left"></div>
                  <div className="target-bracket corner-bottom-right"></div>
                </div>
              </div>

              {cameraError && (
                <div className="scanner-error-overlay">
                  <AlertCircle size={32} className="text-rose" />
                  <p className="scanner-error-text">{cameraError}</p>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={startCamera}>
                    <RefreshCw size={14} />
                    <span>Coba Lagi</span>
                  </button>
                </div>
              )}
            </div>

            {/* Progress & Panduan */}
            <div className="register-progress-container">
              <div className="progress-labels-row">
                <span className="guide-status-text">{guideText}</span>
                <span className="progress-number-tag">{captureProgress}%</span>
              </div>
              <div className="progress-track-bar">
                <div className="progress-fill-bar" style={{ width: `${captureProgress}%` }} />
              </div>
            </div>

            <div className="modal-actions-footer">
              <button 
                type="button" 
                className="btn btn-secondary btn-sm" 
                onClick={() => {
                  stopCamera();
                  setStep(1);
                }}
              >
                Kembali
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Berhasil Terdaftar */}
        {step === 3 && (
          <div className="face-register-success-body">
            <div className="success-thumb-wrapper">
              {capturedThumb ? (
                <img src={capturedThumb} alt="Wajah Terdaftar" className="registered-face-thumb" />
              ) : (
                <div className="thumb-placeholder-box">
                  <User size={36} className="text-cyan" />
                </div>
              )}
              <div className="thumb-check-badge">
                <CheckCircle2 size={24} color="#10b981" />
              </div>
            </div>

            <h3 className="success-title">Biometrik Wajah AI Berhasil Disimpan!</h3>
            <p className="success-desc">
              Data vektor fitur wajah Anda kini telah aman tersimpan di sistem. Anda dapat masuk ke Portal Administrator secara instan menggunakan sensor biometrik wajah atau kata sandi.
            </p>

            <button 
              type="button" 
              className="btn btn-primary full-width"
              onClick={() => {
                if (onRegisteredSuccess) onRegisteredSuccess();
                onClose();
              }}
            >
              <CheckCircle2 size={16} />
              <span>Selesai & Coba Masuk</span>
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default FaceRegisterModal;
