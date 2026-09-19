import React, { useEffect, useRef, useState } from 'react';
import { evaluateFormula, formatScientific } from '../../utils/mathHelpers';
import { Activity, Sliders, RefreshCw } from 'lucide-react';

export const GraphPlotter = ({ 
  expression, 
  variables, 
  variableValues, 
  defaultPlotVar, 
  outputName, 
  outputUnit 
}) => {
  const canvasRef = useRef(null);
  const [plotVariable, setPlotVariable] = useState(defaultPlotVar || variables[0] || '');
  const [minX, setMinX] = useState(1);
  const [maxX, setMaxX] = useState(100);
  const [hoverPoint, setHoverPoint] = useState(null);

  useEffect(() => {
    if (variables.length > 0 && (!plotVariable || !variables.includes(plotVariable))) {
      setPlotVariable(variables[0]);
    }
  }, [variables, plotVariable]);

  // Update rentang default berdasarkan nilai variabel saat ini
  useEffect(() => {
    if (plotVariable && variableValues[plotVariable]) {
      const val = parseFloat(variableValues[plotVariable]);
      if (!isNaN(val) && val > 0) {
        setMinX(val * 0.2);
        setMaxX(val * 2.5);
      }
    }
  }, [plotVariable]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !plotVariable || !expression) return;
    const ctx = canvas.getContext('2d');

    const width = (canvas.width = canvas.parentElement.clientWidth || 550);
    const height = (canvas.height = 300);

    const padding = { top: 30, right: 35, bottom: 45, left: 70 };
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;

    // Bersihkan canvas
    ctx.clearRect(0, 0, width, height);

    // Hitung titik data
    const SAMPLE_COUNT = 80;
    const points = [];
    const step = (maxX - minX) / (SAMPLE_COUNT - 1);

    let minY = Infinity;
    let maxY = -Infinity;

    for (let i = 0; i < SAMPLE_COUNT; i++) {
      const xVal = minX + i * step;
      const testScope = { ...variableValues, [plotVariable]: xVal };
      const evalRes = evaluateFormula(expression, testScope);

      if (evalRes.success && isFinite(evalRes.result) && !isNaN(evalRes.result)) {
        points.push({ x: xVal, y: evalRes.result });
        if (evalRes.result < minY) minY = evalRes.result;
        if (evalRes.result > maxY) maxY = evalRes.result;
      }
    }

    if (points.length < 2 || !isFinite(minY) || !isFinite(maxY)) {
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('Rentang nilai atau ekspresi tidak dapat diplot grafik.', width / 2, height / 2);
      return;
    }

    // Tambah margin pada Y
    if (minY === maxY) {
      minY *= 0.9;
      maxY *= 1.1;
    } else {
      const yMargin = (maxY - minY) * 0.1;
      minY -= yMargin;
      maxY += yMargin;
    }

    // Koordinat converter
    const getXCoord = (val) => padding.left + ((val - minX) / (maxX - minX)) * plotWidth;
    const getYCoord = (val) => padding.top + plotHeight - ((val - minY) / (maxY - minY)) * plotHeight;

    // Gambar grid garis
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
    ctx.lineWidth = 1;

    // Horizontal grid lines
    const Y_GRID_TICKS = 5;
    for (let i = 0; i <= Y_GRID_TICKS; i++) {
      const y = padding.top + (plotHeight / Y_GRID_TICKS) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      const yVal = maxY - ((maxY - minY) / Y_GRID_TICKS) * i;
      ctx.fillStyle = '#64748b';
      ctx.font = '10px JetBrains Mono';
      ctx.textAlign = 'right';
      ctx.fillText(formatScientific(yVal, 2), padding.left - 8, y + 3);
    }

    // Vertical grid lines
    const X_GRID_TICKS = 5;
    for (let i = 0; i <= X_GRID_TICKS; i++) {
      const x = padding.left + (plotWidth / X_GRID_TICKS) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, height - padding.bottom);
      ctx.stroke();

      const xVal = minX + ((maxX - minX) / X_GRID_TICKS) * i;
      ctx.fillStyle = '#64748b';
      ctx.font = '10px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.fillText(formatScientific(xVal, 2), x, height - padding.bottom + 16);
    }

    // Gambar kurva plot dengan glow cyan
    ctx.save();
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 10;
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    points.forEach((pt, idx) => {
      const px = getXCoord(pt.x);
      const py = getYCoord(pt.y);
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
    ctx.restore();

    // Gambar gradien di bawah kurva
    ctx.lineTo(getXCoord(points[points.length - 1].x), padding.top + plotHeight);
    ctx.lineTo(getXCoord(points[0].x), padding.top + plotHeight);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, padding.top, 0, padding.top + plotHeight);
    grad.addColorStop(0, 'rgba(56, 189, 248, 0.2)');
    grad.addColorStop(1, 'rgba(56, 189, 248, 0.0)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Sumbu X & Y Label
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px Outfit';
    ctx.textAlign = 'center';
    ctx.fillText(`Variabel Sumbu X: ${plotVariable}`, width / 2, height - 8);

    ctx.save();
    ctx.translate(16, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText(`${outputName || 'Hasil (Y)'} [${outputUnit || ''}]`, 0, 0);
    ctx.restore();

  }, [expression, plotVariable, minX, maxX, variableValues, outputName, outputUnit]);

  return (
    <div className="graph-plotter-wrapper glass-card">
      <div className="plotter-header">
        <div className="plotter-title">
          <Activity size={18} className="accent-icon-cyan" />
          <h4>Grafik Respon Dinamis Formula</h4>
        </div>

        {variables.length > 0 && (
          <div className="plotter-var-selector">
            <span className="selector-label">Variasi Sumbu X:</span>
            <select
              className="input-field select-var-sm"
              value={plotVariable}
              onChange={(e) => setPlotVariable(e.target.value)}
            >
              {variables.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="canvas-plotter-container">
        <canvas ref={canvasRef} className="plotter-canvas" />
      </div>

      <div className="plotter-range-controls">
        <div className="range-input-group">
          <label>Min {plotVariable}:</label>
          <input
            type="number"
            className="input-field input-sm"
            value={minX}
            onChange={(e) => setMinX(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="range-input-group">
          <label>Max {plotVariable}:</label>
          <input
            type="number"
            className="input-field input-sm"
            value={maxX}
            onChange={(e) => setMaxX(parseFloat(e.target.value) || 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default GraphPlotter;
