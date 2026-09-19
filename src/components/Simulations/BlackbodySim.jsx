import React, { useState, useEffect, useRef } from 'react';
import { Sun, Sparkles, Flame, Activity } from 'lucide-react';
import { CONSTANTS } from '../../data/constantsData';
import { formatScientific } from '../../utils/mathHelpers';

// Fungsi konversi temperatur Kelvin ke estimasi warna RGB bintang
const kelvinToRGB = (temp) => {
  const temperature = temp / 100;
  let red, green, blue;

  // Red
  if (temperature <= 66) {
    red = 255;
  } else {
    red = temperature - 60;
    red = 329.698727446 * Math.pow(red, -0.1332047592);
    if (red < 0) red = 0;
    if (red > 255) red = 255;
  }

  // Green
  if (temperature <= 66) {
    green = temperature;
    green = 99.4708025861 * Math.log(green) - 161.1195681661;
    if (green < 0) green = 0;
    if (green > 255) green = 255;
  } else {
    green = temperature - 60;
    green = 288.1221695283 * Math.pow(green, -0.0755148492);
    if (green < 0) green = 0;
    if (green > 255) green = 255;
  }

  // Blue
  if (temperature >= 66) {
    blue = 255;
  } else if (temperature <= 19) {
    blue = 0;
  } else {
    blue = temperature - 10;
    blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
    if (blue < 0) blue = 0;
    if (blue > 255) blue = 255;
  }

  return `rgb(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)})`;
};

export const BlackbodySim = () => {
  const [temperature, setTemperature] = useState(5778); // Temperatur Matahari bawaan
  const canvasRef = useRef(null);

  // Konstanta Wien: b = 2.898e-3 m.K = 2.898e6 nm.K
  const peakWavelengthNm = 2.89777e6 / temperature;

  // Fluks Stefan-Boltzmann F/F_sun = (T / 5778)^4
  const relativeFlux = Math.pow(temperature / 5778, 4);

  const starColor = kelvinToRGB(temperature);

  // Preset bintang riil
  const STAR_PRESETS = [
    { name: 'Betelgeuse (Maharaksasa Merah)', temp: 3500 },
    { name: 'Matahari (Katai Kuning G2V)', temp: 5778 },
    { name: 'Sirius A (Bintang Putih A1V)', temp: 9940 },
    { name: 'Rigel (Maharaksasa Biru B8Ia)', temp: 12100 },
    { name: 'Bintang Katai Biru Ekstrem', temp: 30000 }
  ];

  // Gambar Kurva Distribusi Planck pada Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = (canvas.width = canvas.parentElement.clientWidth || 550);
    const height = (canvas.height = 260);

    const padding = { top: 25, right: 25, bottom: 40, left: 60 };
    const plotW = width - padding.left - padding.right;
    const plotH = height - padding.top - padding.bottom;

    ctx.clearRect(0, 0, width, height);

    // Rentang panjang gelombang: 100 nm (UV) hingga 2000 nm (Inframerah)
    const minLambda = 100;
    const maxLambda = 2000;

    // Hitung intensitas Planck B(lambda, T) = (2*h*c^2 / lambda^5) / (exp(hc / (lambda*k*T)) - 1)
    // Gunakan fungsi yang dinormalisasi untuk visualisasi grafis
    const planckIntensity = (lambdaNm, T) => {
      const lam = lambdaNm * 1e-9;
      const x = 0.0143877 / (lam * T); // hc / (lambda * k * T)
      if (x > 700) return 0;
      return (1 / Math.pow(lam, 5)) / (Math.exp(x) - 1);
    };

    const SAMPLE_COUNT = 150;
    const step = (maxLambda - minLambda) / SAMPLE_COUNT;
    const points = [];
    let maxIntensity = 0;

    for (let i = 0; i <= SAMPLE_COUNT; i++) {
      const l = minLambda + i * step;
      const intens = planckIntensity(l, temperature);
      points.push({ lambda: l, val: intens });
      if (intens > maxIntensity) maxIntensity = intens;
    }

    if (maxIntensity === 0) maxIntensity = 1;

    const getX = (l) => padding.left + ((l - minLambda) / (maxLambda - minLambda)) * plotW;
    const getY = (v) => padding.top + plotH - (v / maxIntensity) * plotH;

    // Gambar zona spektrum cahaya tampak (380 nm - 750 nm)
    const visX1 = getX(380);
    const visX2 = getX(750);

    const visGrad = ctx.createLinearGradient(visX1, 0, visX2, 0);
    visGrad.addColorStop(0, 'rgba(147, 51, 234, 0.18)'); // Ungu
    visGrad.addColorStop(0.2, 'rgba(59, 130, 246, 0.18)'); // Biru
    visGrad.addColorStop(0.5, 'rgba(34, 197, 94, 0.18)'); // Hijau
    visGrad.addColorStop(0.8, 'rgba(234, 179, 8, 0.18)'); // Kuning
    visGrad.addColorStop(1, 'rgba(239, 68, 68, 0.18)'); // Merah

    ctx.fillStyle = visGrad;
    ctx.fillRect(visX1, padding.top, visX2 - visX1, plotH);

    ctx.fillStyle = '#64748b';
    ctx.font = '10px Outfit';
    ctx.textAlign = 'center';
    ctx.fillText('Spektrum Tampak (380-750 nm)', (visX1 + visX2) / 2, padding.top + 14);

    // Garis sumbu X & Y
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top + plotH);
    ctx.lineTo(width - padding.right, padding.top + plotH);
    ctx.stroke();

    // Sumbu X ticks
    [200, 500, 800, 1200, 1600, 2000].forEach((tick) => {
      const tx = getX(tick);
      ctx.fillStyle = '#64748b';
      ctx.font = '10px JetBrains Mono';
      ctx.fillText(`${tick} nm`, tx, height - padding.bottom + 16);
    });

    // Gambar kurva Planck
    ctx.save();
    ctx.strokeStyle = starColor;
    ctx.shadowColor = starColor;
    ctx.shadowBlur = 10;
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    points.forEach((p, idx) => {
      const px = getX(p.lambda);
      const py = getY(p.val);
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
    ctx.restore();

    // Garis penanda puncak Wien
    if (peakWavelengthNm >= minLambda && peakWavelengthNm <= maxLambda) {
      const peakX = getX(peakWavelengthNm);
      ctx.save();
      ctx.strokeStyle = '#fbbf24';
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(peakX, padding.top);
      ctx.lineTo(peakX, padding.top + plotH);
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = '#fbbf24';
      ctx.font = '11px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.fillText(`λ_max = ${peakWavelengthNm.toFixed(0)} nm`, peakX, padding.top - 6);
    }
  }, [temperature, starColor, peakWavelengthNm]);

  return (
    <div className="blackbody-sim-component glass-card">
      <div className="sim-header">
        <div className="sim-title-group">
          <Sun size={20} className="accent-icon-gold" />
          <h3>Radiasi Benda Hitam & Spektrum Warna Bintang</h3>
        </div>
      </div>

      <div className="blackbody-showcase-grid">
        {/* Visual Bintang 3D / Sphere */}
        <div className="star-visual-box">
          <div
            className="star-sphere"
            style={{
              backgroundColor: starColor,
              boxShadow: `0 0 45px ${starColor}, inset -15px -15px 35px rgba(0,0,0,0.6)`
            }}
          />
          <div className="star-telemetry">
            <span className="star-temp-badge">{temperature.toLocaleString()} K</span>
            <span className="star-type-text">
              {temperature < 3700 && 'Tipe M (Dingin / Merah)'}
              {temperature >= 3700 && temperature < 5200 && 'Tipe K (Jingga)'}
              {temperature >= 5200 && temperature < 6000 && 'Tipe G (Kuning seperti Matahari)'}
              {temperature >= 6000 && temperature < 7500 && 'Tipe F (Putih Kekuningan)'}
              {temperature >= 7500 && temperature < 10000 && 'Tipe A (Putih Murni)'}
              {temperature >= 10000 && temperature < 30000 && 'Tipe B (Biru Keputihan)'}
              {temperature >= 30000 && 'Tipe O (Mahapanas / Biru Tua)'}
            </span>
          </div>
        </div>

        {/* Kurva Spektrum Canvas */}
        <div className="blackbody-canvas-box">
          <div className="canvas-title-row">
            <Activity size={16} className="accent-icon-cyan" />
            <span>Kurva Spektrum Planck & Garis Puncak Wien</span>
          </div>
          <canvas ref={canvasRef} className="blackbody-canvas" />
        </div>
      </div>

      {/* Numerical Stats */}
      <div className="telemetry-stats-row">
        <div className="telemetry-card">
          <span className="telemetry-label">Puncak Panjang Gelombang (λ_max):</span>
          <span className="telemetry-value">
            {peakWavelengthNm.toFixed(1)} <span className="telemetry-unit">nm</span>
          </span>
        </div>
        <div className="telemetry-card">
          <span className="telemetry-label">Fluks Radiasi Relatif (F/F☉):</span>
          <span className="telemetry-value">
            {relativeFlux.toFixed(2)}x <span className="telemetry-unit">Matahari</span>
          </span>
        </div>
        <div className="telemetry-card">
          <span className="telemetry-label">Wilayah Spektrum Puncak:</span>
          <span className="telemetry-value text-accent">
            {peakWavelengthNm < 380 && 'Ultraviolet (UV)'}
            {peakWavelengthNm >= 380 && peakWavelengthNm <= 450 && 'Cahaya Biru/Ungu'}
            {peakWavelengthNm > 450 && peakWavelengthNm <= 570 && 'Cahaya Hijau/Kuning'}
            {peakWavelengthNm > 570 && peakWavelengthNm <= 750 && 'Cahaya Merah/Jingga'}
            {peakWavelengthNm > 750 && 'Inframerah (IR)'}
          </span>
        </div>
      </div>

      {/* Temperature Slider */}
      <div className="temperature-slider-container">
        <div className="slider-label-row">
          <span>Geser Temperatur Fotosfer Bintang:</span>
          <span className="slider-val-badge">{temperature.toLocaleString()} Kelvin</span>
        </div>
        <input
          type="range"
          min="2000"
          max="35000"
          step="250"
          value={temperature}
          onChange={(e) => setTemperature(parseInt(e.target.value, 10))}
          className="sim-slider temp-slider"
        />
      </div>

      {/* Preset Stars Quick Pick */}
      <div className="star-presets-bar">
        <span className="presets-label">Pilih Contoh Bintang Nyata:</span>
        <div className="presets-chips">
          {STAR_PRESETS.map((p, idx) => (
            <button
              key={idx}
              className={`preset-star-chip ${temperature === p.temp ? 'star-chip-active' : ''}`}
              onClick={() => setTemperature(p.temp)}
            >
              {p.name} ({p.temp.toLocaleString()} K)
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlackbodySim;
