import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Camera, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  RefreshCw, 
  CheckCircle2, 
  X, 
  Scan, 
  UserCheck, 
  Key,
  SwitchCamera
} from 'lucide-react';
import { extractFacialEmbedding, compareBiometrics } from '../../utils/faceBiometrics';

export const FaceAuthScanner = ({ 
  storedBiometrics, 
  onVerified, 
  onSwitchToPassword,
  onOpenRegisterModal 
}) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameRef = useRef(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [facingMode, setFacingMode] = useState('user'); // 'user' (depan) atau 'environment' (belakang)
  const [scanStatus, setScanStatus] = useState('Mengaktifkan sensor kamera...');
  const [confidence, setConfidence] = useState(0);
  const [isMatching, setIsMatching] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [consecutiveMatches, setConsecutiveMatches] = useState(0);

  // Inisialisasi Kamera Perangkat (Dioptimalkan untuk smartphone)
  const startCamera = useCallback(async () => {
    setCameraError('');
    setScanStatus('Memulai sensor kamera kosmis...');

    // Hentikan stream lama jika ada
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    try {
      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 480, max: 720 },
          height: { ideal: 480, max: 720 },
          frameRate: { ideal: 24, max: 30 }
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
          setScanStatus('Arahkan wajah Anda ke dalam lingkaran pemindai...');
        };
      }
    } catch (err) {
      console.error('Kamera error:', err);
      let msg = 'Tidak dapat mengakses kamera perangkat.';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        msg = 'Izin kamera ditolak. Silakan izinkan akses kamera di peramban Anda atau gunakan kata sandi.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        msg = 'Kamera tidak ditemukan pada perangkat ini.';
      }
      setCameraError(msg);
      setCameraActive(false);
    }
  }, [facingMode]);

  // Cleanup stream kamera saat unmount
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

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  // Loop Analisis Biometrik Wajah AI (Throttled 130ms agar HP tidak panas/lagging)
  useEffect(() => {
    if (!cameraActive || isSuccess || !storedBiometrics) return;

    let lastAnalysisTime = 0;
    const intervalMs = 130; // ~7.5 FPS analisis AI (sangat ringan untuk ponsel)
    let matchCounter = 0;

    const runAnalysisLoop = (timestamp) => {
      if (timestamp - lastAnalysisTime >= intervalMs) {
        lastAnalysisTime = timestamp;

        if (videoRef.current && videoRef.current.readyState >= 2) {
          const result = extractFacialEmbedding(videoRef.current);

          if (!result.detected) {
            setScanStatus(result.reason || 'Posisikan wajah di dalam lingkaran kosmis');
            setConfidence((prev) => Math.max(0, prev - 8));
            matchCounter = 0;
            setIsMatching(false);
          } else {
            // Bandingkan dengan data biometrik yang tersimpan
            const matchResult = compareBiometrics(
              storedBiometrics.descriptor, 
              result.descriptor
            );

            setConfidence(matchResult.confidence);

            if (matchResult.isMatch) {
              matchCounter++;
              setScanStatus(`Wajah Terverifikasi (${matchResult.confidence}% Cocok)!`);
              setIsMatching(true);

              // Perlu 2 frame kecocokan berurutan untuk menghindari false-positive sesaat
              if (matchCounter >= 2) {
                setIsSuccess(true);
                stopCamera();

                // Panggil callback berhasil setelah animasi konfirmasi
                setTimeout(() => {
                  onVerified();
                }, 650);
                return;
              }
            } else {
              matchCounter = 0;
              setIsMatching(false);
              if (matchResult.confidence > 50) {
                setScanStatus(`Mencocokkan Biometrik AI (${matchResult.confidence}%)...`);
              } else {
                setScanStatus('Wajah terdeteksi, verifikasi kecocokan...');
              }
            }
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(runAnalysisLoop);
    };

    animFrameRef.current = requestAnimationFrame(runAnalysisLoop);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [cameraActive, isSuccess, storedBiometrics, onVerified, stopCamera]);

  // Ganti kamera depan / belakang
  const toggleCameraFacing = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  return (
    <div className="face-scanner-container">
      {/* Viewport Kamera dengan HUD Kosmis */}
      <div className={`cosmic-scanner-viewport ${isSuccess ? 'scan-success-glow' : isMatching ? 'scan-matching-glow' : ''}`}>
        {cameraActive && (
          <video
            ref={videoRef}
            playsInline
            muted
            autoPlay
            className={`scanner-video-feed ${facingMode === 'user' ? 'mirror-video' : ''}`}
          />
        )}

        {/* Overlay Bingkai Lingkaran Kosmis & Radar AI */}
        <div className="scanner-hud-overlay">
          <div className={`hud-scan-circle ${isSuccess ? 'circle-success' : isMatching ? 'circle-matching' : ''}`}>
            {/* Animasi Radar Sweep */}
            {cameraActive && !isSuccess && <div className="hud-radar-sweep"></div>}

            {/* Target Brackets Wajah */}
            <div className="target-bracket corner-top-left"></div>
            <div className="target-bracket corner-top-right"></div>
            <div className="target-bracket corner-bottom-left"></div>
            <div className="target-bracket corner-bottom-right"></div>

            {/* Indikator Sukses */}
            {isSuccess && (
              <div className="hud-success-badge animate-scale-up">
                <CheckCircle2 size={56} className="text-emerald" />
              </div>
            )}
          </div>
        </div>

        {/* Tombol Balik Kamera (Ponsel) */}
        {cameraActive && !isSuccess && (
          <button 
            type="button" 
            className="btn-camera-flip"
            onClick={toggleCameraFacing}
            title="Ganti Kamera Depan / Belakang"
            aria-label="Ganti Kamera"
          >
            <SwitchCamera size={18} />
          </button>
        )}

        {/* Error Kamera */}
        {cameraError && (
          <div className="scanner-error-overlay">
            <AlertCircle size={36} className="text-rose" />
            <p className="scanner-error-text">{cameraError}</p>
            <button type="button" className="btn btn-secondary btn-sm" onClick={startCamera}>
              <RefreshCw size={14} />
              <span>Coba Lagi</span>
            </button>
          </div>
        )}
      </div>

      {/* Bar Indikator Status & Confidence */}
      <div className="scanner-feedback-bar">
        <div className="status-row">
          <div className="status-indicator-dot">
            <span className={`pulsing-dot ${isSuccess ? 'dot-success' : isMatching ? 'dot-matching' : 'dot-scanning'}`} />
            <span className="status-text">{scanStatus}</span>
          </div>
          {confidence > 0 && (
            <span className={`confidence-tag ${confidence >= 80 ? 'text-emerald' : confidence >= 50 ? 'text-cyan' : 'text-muted'}`}>
              {confidence}% Cocok
            </span>
          )}
        </div>

        {/* Meter Akurasi Bar */}
        <div className="accuracy-meter-track">
          <div 
            className={`accuracy-meter-fill ${confidence >= 80 ? 'fill-success' : confidence >= 50 ? 'fill-matching' : ''}`}
            style={{ width: `${Math.min(100, confidence)}%` }}
          />
        </div>
      </div>

      {/* Opsi Navigasi / Fallback */}
      <div className="scanner-footer-actions">
        <button 
          type="button" 
          className="btn btn-secondary btn-sm full-width"
          onClick={() => {
            stopCamera();
            onSwitchToPassword();
          }}
        >
          <Key size={15} />
          <span>Gunakan Kata Sandi Manual</span>
        </button>

        {onOpenRegisterModal && (
          <button 
            type="button" 
            className="btn-text-link"
            onClick={() => {
              stopCamera();
              onOpenRegisterModal();
            }}
          >
            <UserCheck size={14} />
            <span>Pindai Ulang / Daftarkan Wajah Baru</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default FaceAuthScanner;
