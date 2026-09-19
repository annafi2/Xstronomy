import React from 'react';
import { History, Trash2, ArrowUpRight } from 'lucide-react';
import LatexRenderer from '../Common/LatexRenderer';

export const CalculationHistory = ({ history, onLoadCalculation, onClearHistory }) => {
  if (!history || history.length === 0) {
    return (
      <div className="history-empty-box glass-card">
        <History size={24} className="accent-icon-cyan" />
        <p>Belum ada riwayat kalkulasi tersimpan.</p>
      </div>
    );
  }

  return (
    <div className="history-section glass-card">
      <div className="history-header">
        <div className="history-title">
          <History size={18} className="accent-icon-cyan" />
          <h4>Riwayat Perhitungan Fisika</h4>
        </div>
        <button className="btn btn-secondary btn-sm clear-history-btn" onClick={onClearHistory}>
          <Trash2 size={14} />
          <span>Hapus Riwayat</span>
        </button>
      </div>

      <div className="history-list">
        {history.map((item) => (
          <div key={item.id} className="history-item">
            <div className="history-item-top">
              <span className="history-title-text">{item.title || item.expression}</span>
              <span className="history-time">{item.timestamp}</span>
            </div>

            <div className="history-formula">
              <code>{item.expression}</code>
            </div>

            <div className="history-result-row">
              <span className="history-result-val">
                = <strong>{item.formattedResult}</strong> {item.outputUnit || ''}
              </span>
              <button
                className="btn btn-secondary btn-sm load-calc-btn"
                onClick={() => onLoadCalculation(item)}
                title="Muat kembali formula dan nilai variabel ini"
              >
                <span>Muat</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalculationHistory;
