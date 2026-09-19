import React, { useState } from 'react';
import { Orbit, Sun, Sparkles } from 'lucide-react';
import OrbitSimulator from './OrbitSimulator';
import BlackbodySim from './BlackbodySim';

export const SimulationsView = () => {
  const [activeSim, setActiveSim] = useState('orbit'); // 'orbit' or 'blackbody'

  return (
    <div className="simulations-view-section">
      {/* Header Banner */}
      <div className="sims-hero-banner">
        <div className="hero-content-wrapper">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>Laboratorium Visual Kosmis</span>
          </div>
          <h1 className="hero-title">
            Simulasi Interaktif Fenomena Astrofisika
          </h1>
          <p className="hero-subtitle">
            Eksperimen langsung dengan model mekanika benda langit dan termodinamika bintang. Amati secara visual bagaimana rumus fisika menggerakkan alam semesta.
          </p>
        </div>
      </div>

      {/* Simulator Switcher Tabs */}
      <div className="sim-switcher-tabs">
        <button
          className={`sim-tab-btn ${activeSim === 'orbit' ? 'sim-tab-active' : ''}`}
          onClick={() => setActiveSim('orbit')}
        >
          <Orbit size={18} />
          <span>Simulasi Orbit Kepler (Mekanika Benda Langit)</span>
        </button>
        <button
          className={`sim-tab-btn ${activeSim === 'blackbody' ? 'sim-tab-active' : ''}`}
          onClick={() => setActiveSim('blackbody')}
        >
          <Sun size={18} />
          <span>Radiasi Benda Hitam & Warna Bintang</span>
        </button>
      </div>

      {/* Active Simulator Component */}
      <div className="sim-active-container">
        {activeSim === 'orbit' ? <OrbitSimulator /> : <BlackbodySim />}
      </div>
    </div>
  );
};

export default SimulationsView;
