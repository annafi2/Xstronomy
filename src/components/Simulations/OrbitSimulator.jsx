import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Orbit, Info, Sparkles } from 'lucide-react';
import { formatScientific } from '../../utils/mathHelpers';

export const OrbitSimulator = () => {
  const canvasRef = useRef(null);

  // Parameter orbit
  const [semiMajorAxis, setSemiMajorAxis] = useState(1.5); // Satuan AU (scale factor)
  const [eccentricity, setEccentricity] = useState(0.5); // 0 (lingkaran) - 0.85 (elips lonjong)
  const [starMass, setStarMass] = useState(1.0); // Satuan Massa Matahari M_sun
  const [simSpeed, setSimSpeed] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Telemetri waktu nyata
  const [currentDistance, setCurrentDistance] = useState(1.5);
  const [currentVelocity, setCurrentVelocity] = useState(25.0);
  const [orbitalPeriod, setOrbitalPeriod] = useState(1.84); // Tahun

  // Posisi orbital sudut anomali sejati
  const trueAnomalyRef = useRef(0);

  // Hitung periode orbit Kepler: T = sqrt(a^3 / M) dalam tahun
  useEffect(() => {
    const T = Math.sqrt(Math.pow(semiMajorAxis, 3) / starMass);
    setOrbitalPeriod(T);
  }, [semiMajorAxis, starMass]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const width = (canvas.width = canvas.parentElement.clientWidth || 550);
    const height = (canvas.height = 360);

    const centerX = width / 2;
    const centerY = height / 2;
    const scale = Math.min(width, height) / 4.5; // pixel per AU

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Sumbu semi-minor: b = a * sqrt(1 - e^2)
      const a = semiMajorAxis;
      const e = eccentricity;
      const b = a * Math.sqrt(Math.max(0, 1 - e * e));

      // Jarak fokus dari pusat elips: c_dist = a * e
      const c_dist = a * e;

      // Posisi bintang berada di titik fokus F1 (0, 0 relative ke bintang)
      // Bintang di posisi (centerX, centerY)
      const starX = centerX;
      const starY = centerY;

      // Pusat elips bergeser ke kiri sebesar c_dist
      const ellipseCenterX = starX - c_dist * scale;
      const ellipseCenterY = starY;

      // Gambar grid latar belakang
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Gambar garis lintasan elips
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.ellipse(ellipseCenterX, ellipseCenterY, a * scale, b * scale, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Titik Perihelion & Aphelion
      const perihelionX = ellipseCenterX + a * scale;
      const aphelionX = ellipseCenterX - a * scale;

      ctx.fillStyle = '#64748b';
      ctx.font = '10px JetBrains Mono';
      ctx.fillText('Perihelion (Dekat)', perihelionX + 8, ellipseCenterY + 4);
      ctx.fillText('Aphelion (Jauh)', aphelionX - 95, ellipseCenterY + 4);

      // Gambar Bintang Pusat (Matahari)
      const starRadius = 14 * Math.pow(starMass, 0.33);

      // Glow Matahari
      const sunGrad = ctx.createRadialGradient(starX, starY, 2, starX, starY, starRadius * 2.5);
      sunGrad.addColorStop(0, 'rgba(251, 191, 36, 1)');
      sunGrad.addColorStop(0.4, 'rgba(245, 158, 11, 0.6)');
      sunGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(starX, starY, starRadius * 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(starX, starY, starRadius, 0, Math.PI * 2);
      ctx.fill();

      // Hitung posisi planet berdasarkan anomali sejati theta
      const theta = trueAnomalyRef.current;

      // Rumus radius koordinat polar elips dari fokus: r = a(1 - e^2) / (1 + e*cos(theta))
      const r = (a * (1 - e * e)) / (1 + e * Math.cos(theta));
      const planetX = starX + r * scale * Math.cos(theta);
      const planetY = starY + r * scale * Math.sin(theta);

      // Garis jari-jari vektor (radius vector) dari bintang ke planet
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(starX, starY);
      ctx.lineTo(planetX, planetY);
      ctx.stroke();

      // Gambar Planet
      ctx.save();
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(planetX, planetY, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Hitung kecepatan vis-viva: v = sqrt(GM * (2/r - 1/a))
      // Standar kecepatan Bumi di 1 AU ~ 29.8 km/s
      const vNormalized = 29.8 * Math.sqrt(starMass * Math.max(0, 2 / r - 1 / a));

      // Update state telemetri secara periodik
      setCurrentDistance(r);
      setCurrentVelocity(vNormalized);

      // Pembaruan anomali sejati sesuai Hukum II Kepler (dtheta/dt = h / r^2)
      if (isPlaying) {
        // Kecepatan sudut berbanding terbalik dengan r^2
        const dTheta = (0.012 * simSpeed * Math.sqrt(starMass * a * (1 - e * e))) / (r * r);
        trueAnomalyRef.current = (trueAnomalyRef.current + dTheta) % (Math.PI * 2);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [semiMajorAxis, eccentricity, starMass, simSpeed, isPlaying]);

  return (
    <div className="orbit-sim-component glass-card">
      <div className="sim-header">
        <div className="sim-title-group">
          <Orbit size={20} className="accent-icon-cyan" />
          <h3>Simulasi Orbit Kepler 2D Interaktif</h3>
        </div>
        <div className="sim-controls-top">
          <button
            className={`btn btn-sm ${isPlaying ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlaying ? 'Jeda' : 'Jalankan'}</span>
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              trueAnomalyRef.current = 0;
            }}
          >
            <RotateCcw size={14} />
            <span>Reset Posisi</span>
          </button>
        </div>
      </div>

      <div className="canvas-orbit-container">
        <canvas ref={canvasRef} className="orbit-canvas" />
      </div>

      {/* Telemetry live stats */}
      <div className="telemetry-stats-row">
        <div className="telemetry-card">
          <span className="telemetry-label">Jarak Saat Ini (r):</span>
          <span className="telemetry-value">
            {currentDistance.toFixed(2)} <span className="telemetry-unit">AU</span>
          </span>
        </div>
        <div className="telemetry-card">
          <span className="telemetry-label">Kecepatan Orbital (v):</span>
          <span className="telemetry-value">
            {currentVelocity.toFixed(1)} <span className="telemetry-unit">km/s</span>
          </span>
        </div>
        <div className="telemetry-card">
          <span className="telemetry-label">Periode Orbit (T):</span>
          <span className="telemetry-value">
            {orbitalPeriod.toFixed(2)} <span className="telemetry-unit">Tahun</span>
          </span>
        </div>
      </div>

      {/* Controls Sliders */}
      <div className="sim-sliders-grid">
        <div className="sim-slider-group">
          <div className="slider-label-row">
            <span>Sumbu Semi-Mayor (a):</span>
            <span className="slider-val-badge">{semiMajorAxis.toFixed(2)} AU</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.05"
            value={semiMajorAxis}
            onChange={(e) => setSemiMajorAxis(parseFloat(e.target.value))}
            className="sim-slider"
          />
        </div>

        <div className="sim-slider-group">
          <div className="slider-label-row">
            <span>Eksentrisitas Orbit (e):</span>
            <span className="slider-val-badge">{eccentricity.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.0"
            max="0.85"
            step="0.02"
            value={eccentricity}
            onChange={(e) => setEccentricity(parseFloat(e.target.value))}
            className="sim-slider"
          />
        </div>

        <div className="sim-slider-group">
          <div className="slider-label-row">
            <span>Massa Bintang Pusat (M):</span>
            <span className="slider-val-badge">{starMass.toFixed(2)} M☉</span>
          </div>
          <input
            type="range"
            min="0.4"
            max="3.0"
            step="0.1"
            value={starMass}
            onChange={(e) => setStarMass(parseFloat(e.target.value))}
            className="sim-slider"
          />
        </div>

        <div className="sim-slider-group">
          <div className="slider-label-row">
            <span>Kecepatan Simulasi:</span>
            <span className="slider-val-badge">{simSpeed.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="3.0"
            step="0.2"
            value={simSpeed}
            onChange={(e) => setSimSpeed(parseFloat(e.target.value))}
            className="sim-slider"
          />
        </div>
      </div>

      <div className="sim-insight-note">
        <Sparkles size={16} className="accent-icon-gold" />
        <p>
          <strong>Prinsip Fisika (Hukum II Kepler):</strong> Perhatikan bagaimana planet bergerak sangat cepat ketika mendekati titik Perihelion (terdekat dari bintang) dan melambat drastis di titik Aphelion (terjauh), sesuai hukum kekekalan momentum sudut L = m · r · v_tegak lurus.
        </p>
      </div>
    </div>
  );
};

export default OrbitSimulator;
