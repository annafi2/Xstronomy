// Mesin Analisis Dimensi & Inferensi Satuan Otomatis untuk Xstronomy

// Peta dimensi dasar SI: [Massa (M), Panjang (L), Waktu (T), Arus (I), Suhu (Theta)]
// Format tuple: [M, L, T, I, Theta]
const BASE_DIMENSIONS = {
  // Besaran Pokok & Pengganti Simbol Umum
  m: [1, 0, 0, 0, 0],       // Massa (kg)
  m1: [1, 0, 0, 0, 0],
  m2: [1, 0, 0, 0, 0],
  M: [1, 0, 0, 0, 0],
  m0: [1, 0, 0, 0, 0],
  me: [1, 0, 0, 0, 0],
  m_e: [1, 0, 0, 0, 0],
  mp: [1, 0, 0, 0, 0],
  m_p: [1, 0, 0, 0, 0],
  mn: [1, 0, 0, 0, 0],
  m_n: [1, 0, 0, 0, 0],
  s: [0, 1, 0, 0, 0],       // Jarak / Perpindahan (m)
  r: [0, 1, 0, 0, 0],       // Jari-jari / Jarak (m)
  R: [0, 1, 0, 0, 0],       // Radius (m)
  a: [0, 1, 0, 0, 0],       // Sumbu semi-mayor atau jarak
  l: [0, 1, 0, 0, 0],       // Panjang (m)
  L: [0, 1, 0, 0, 0],       // Panjang kawat (m)
  d: [0, 1, 0, 0, 0],       // Jarak (m)
  h_dist: [0, 1, 0, 0, 0],  // Ketinggian
  lambda: [0, 1, 0, 0, 0],  // Panjang gelombang (m)
  t: [0, 0, 1, 0, 0],       // Waktu (s)
  delta_t: [0, 0, 1, 0, 0], // Selang waktu (s)
  Thalf: [0, 0, 1, 0, 0],   // Waktu paruh (s)
  T_period: [0, 0, 1, 0, 0],// Periode (s)
  I: [0, 0, 0, 1, 0],       // Kuat arus (A)
  I1: [0, 0, 0, 1, 0],
  I2: [0, 0, 0, 1, 0],
  It: [0, 0, 0, 1, 0],
  I0: [0, 0, 0, 1, 0],
  T_kelvin: [0, 0, 0, 0, 1],// Suhu mutlak (K)

  // Besaran Turunan Standar
  v: [0, 1, -1, 0, 0],      // Kecepatan (m/s)
  c: [0, 1, -1, 0, 0],      // Kecepatan cahaya (m/s)
  acc: [0, 1, -2, 0, 0],    // Percepatan (m/s²)
  g: [0, 1, -2, 0, 0],      // Gravitasi (m/s²)
  g_earth: [0, 1, -2, 0, 0],
  f: [0, 0, -1, 0, 0],      // Frekuensi (1/s = Hz)
  omega: [0, 0, -1, 0, 0],  // Kecepatan sudut (rad/s = 1/s)
  q: [0, 0, 1, 1, 0],       // Muatan (C = A·s)
  q1: [0, 0, 1, 1, 0],
  q2: [0, 0, 1, 1, 0],
  Q: [0, 0, 1, 1, 0],
  e: [0, 0, 1, 1, 0],
  e_charge: [0, 0, 1, 1, 0],
  F: [1, 1, -2, 0, 0],      // Gaya (N = kg·m/s²)
  E: [1, 2, -2, 0, 0],      // Energi (J = kg·m²/s²)
  W: [1, 2, -2, 0, 0],      // Usaha (J)
  P: [1, 2, -3, 0, 0],      // Daya (W = kg·m²/s³)
  V: [1, 2, -3, -1, 0],     // Beda Potensial (Volt)
  B: [1, 0, -2, -1, 0],     // Medan Magnet (Tesla = kg/(A·s²))
  Phi: [1, 2, -2, -1, 0],   // Fluks Magnet (Weber = T·m²)
  R_res: [1, 2, -3, -2, 0], // Hambatan (Ohm = V/A)
  XL: [1, 2, -3, -2, 0],
  XC: [1, 2, -3, -2, 0],
  Z: [1, 2, -3, -2, 0],

  // Konstanta Fisika
  G: [-1, 3, -2, 0, 0],     // N·m²/kg² = m³/(kg·s²)
  h: [1, 2, -1, 0, 0],      // J·s = kg·m²/s
  hbar: [1, 2, -1, 0, 0],
  K_coulomb: [1, 3, -4, -2, 0], // N·m²/C²
  mu0: [1, 1, -2, -2, 0],   // T·m/A = kg·m/(A²·s²)
  sigma: [1, 0, -3, 0, -4]  // W/(m²·K⁴)
};

// Peta pengenalan nama satuan SI dari dimensi [M, L, T, I, Theta]
const KNOWN_UNITS_CATALOG = [
  {
    key: 'joule_sekon',
    name: 'Aksi Kuantum / Momentum Sudut',
    unit: 'J·s (Joule·sekon)',
    latex: '\\text{J}\\cdot\\text{s}',
    dim: [1, 2, -1, 0, 0]
  },
  {
    key: 'joule',
    name: 'Energi / Usaha / Kalor',
    unit: 'J (Joule)',
    latex: '\\text{Joule (J)}',
    dim: [1, 2, -2, 0, 0]
  },
  {
    key: 'newton',
    name: 'Gaya',
    unit: 'N (Newton)',
    latex: '\\text{Newton (N)}',
    dim: [1, 1, -2, 0, 0]
  },
  {
    key: 'watt',
    name: 'Daya / Laju Energi',
    unit: 'W (Watt)',
    latex: '\\text{Watt (W)}',
    dim: [1, 2, -3, 0, 0]
  },
  {
    key: 'volt',
    name: 'Tegangan / Beda Potensial / GGL',
    unit: 'V (Volt)',
    latex: '\\text{Volt (V)}',
    dim: [1, 2, -3, -1, 0]
  },
  {
    key: 'ohm',
    name: 'Hambatan / Reaktansi / Impedansi',
    unit: 'Ω (Ohm)',
    latex: '\\Omega\\text{ (Ohm)}',
    dim: [1, 2, -3, -2, 0]
  },
  {
    key: 'tesla',
    name: 'Kuat Medan Magnet (Induksi Magnetik)',
    unit: 'T (Tesla)',
    latex: '\\text{Tesla (T)}',
    dim: [1, 0, -2, -1, 0]
  },
  {
    key: 'weber',
    name: 'Fluks Magnetik',
    unit: 'Wb (Weber)',
    latex: '\\text{Weber (Wb)}',
    dim: [1, 2, -2, -1, 0]
  },
  {
    key: 'farad',
    name: 'Kapasitansi Listrik',
    unit: 'F (Farad)',
    latex: '\\text{Farad (F)}',
    dim: [-1, -2, 4, 2, 0]
  },
  {
    key: 'henry',
    name: 'Induktansi Diri',
    unit: 'H (Henry)',
    latex: '\\text{Henry (H)}',
    dim: [1, 2, -2, -2, 0]
  },
  {
    key: 'coulomb',
    name: 'Muatan Listrik',
    unit: 'C (Coulomb)',
    latex: '\\text{Coulomb (C)}',
    dim: [0, 0, 1, 1, 0]
  },
  {
    key: 'ampere',
    name: 'Kuat Arus Listrik',
    unit: 'A (Ampere)',
    latex: '\\text{Ampere (A)}',
    dim: [0, 0, 0, 1, 0]
  },
  {
    key: 'velocity',
    name: 'Kecepatan / Kelajuan',
    unit: 'm/s (Meter per sekon)',
    latex: '\\text{m/s}',
    dim: [0, 1, -1, 0, 0]
  },
  {
    key: 'acceleration',
    name: 'Percepatan',
    unit: 'm/s² (Meter per sekon kuadrat)',
    latex: '\\text{m/s}^2',
    dim: [0, 1, -2, 0, 0]
  },
  {
    key: 'momentum',
    name: 'Momentum Linier',
    unit: 'kg·m/s',
    latex: '\\text{kg}\\cdot\\text{m/s}',
    dim: [1, 1, -1, 0, 0]
  },
  {
    key: 'frequency',
    name: 'Frekuensi / Laju Peluruhan',
    unit: 'Hz (Hertz) / Bq (Becquerel)',
    latex: '\\text{Hz / Bq}',
    dim: [0, 0, -1, 0, 0]
  },
  {
    key: 'length',
    name: 'Panjang / Jarak / Panjang Gelombang',
    unit: 'm (Meter)',
    latex: '\\text{Meter (m)}',
    dim: [0, 1, 0, 0, 0]
  },
  {
    key: 'area',
    name: 'Luas Penampang / Bidang',
    unit: 'm²',
    latex: '\\text{m}^2',
    dim: [0, 2, 0, 0, 0]
  },
  {
    key: 'mass',
    name: 'Massa',
    unit: 'kg (Kilogram)',
    latex: '\\text{kg}',
    dim: [1, 0, 0, 0, 0]
  },
  {
    key: 'time',
    name: 'Waktu / Periode',
    unit: 's (Sekon)',
    latex: '\\text{sekon (s)}',
    dim: [0, 0, 1, 0, 0]
  },
  {
    key: 'intensity',
    name: 'Intensitas Radiasi',
    unit: 'W/m²',
    latex: '\\text{W/m}^2',
    dim: [1, 0, -3, 0, 0]
  }
];

/**
 * Penganalisis Pola Cepat (Regex & String Matching) untuk rumus umum
 */
const PATTERN_DETECTORS = [
  // Aksi kuantum
  {
    pattern: /\bh\b|\bhbar\b/i,
    test: (expr) => /^\s*h\s*$/i.test(expr) || /^\s*hbar\s*$/i.test(expr),
    unit: 'J·s (Joule·sekon)',
    name: 'Konstanta Kuantum Aksi'
  },
  // Gaya Coulomb
  {
    pattern: /K.*q.*\/.*r\^?2/i,
    unit: 'N (Newton)',
    name: 'Gaya Coulomb'
  },
  // Gaya Gravitasi
  {
    pattern: /G.*m.*\/.*r\^?2/i,
    unit: 'N (Newton)',
    name: 'Gaya Gravitasi'
  },
  // Gaya Lorentz
  {
    pattern: /B.*I.*L/i,
    unit: 'N (Newton)',
    name: 'Gaya Lorentz'
  },
  // Gaya umum m * a
  {
    pattern: /\bm\s*\*\s*a\b|\bm\s*\*\s*g\b/i,
    unit: 'N (Newton)',
    name: 'Gaya'
  },
  // Energi Foton E = h*f atau h*c/lambda
  {
    pattern: /h\s*\*\s*f|h\s*\*\s*c\s*\/\s*lambda/i,
    unit: 'J (Joule)',
    name: 'Energi Foton'
  },
  // Energi Kinetik 0.5 * m * v^2
  {
    pattern: /m\s*\*\s*v\^?2/i,
    unit: 'J (Joule)',
    name: 'Energi Kinetik'
  },
  // Energi Potensial m * g * h
  {
    pattern: /m\s*\*\s*g\s*\*\s*h/i,
    unit: 'J (Joule)',
    name: 'Energi Potensial'
  },
  // Usaha F * s
  {
    pattern: /F\s*\*\s*s/i,
    unit: 'J (Joule)',
    name: 'Usaha / Kerja'
  },
  // Energi Magnetik Induktor 0.5 * L * I^2
  {
    pattern: /L\s*\*\s*I\^?2/i,
    unit: 'J (Joule)',
    name: 'Energi Induktor'
  },
  // Efek Fotolistrik Ek = hf - W0
  {
    pattern: /-\s*W0|\bW0\b/i,
    unit: 'J (Joule)',
    name: 'Energi Kinetik Fotoelektron'
  },
  // Kecepatan Lepas / Orbit
  {
    pattern: /sqrt\(.*G.*M.*\/.*R/i,
    unit: 'm/s (Meter per sekon)',
    name: 'Kecepatan Orbit / Lepas'
  },
  // Kecepatan s / t
  {
    pattern: /\bs\s*\/\s*t\b|\bd\s*\/\s*t\b/i,
    unit: 'm/s (Meter per sekon)',
    name: 'Kecepatan Linier'
  },
  // Daya P = V * I atau I^2 * R atau V^2 / R
  {
    pattern: /V\s*\*\s*I|I\^?2\s*\*\s*R|V\^?2\s*\/\s*R/i,
    unit: 'W (Watt)',
    name: 'Daya Listrik'
  },
  // Daya Radiasi Stefan-Boltzmann
  {
    pattern: /sigma.*T\^?4/i,
    unit: 'W (Watt)',
    name: 'Daya Radiasi Benda Hitam'
  },
  // Kuat Arus I = V / R atau Q / t
  {
    pattern: /V\s*\/\s*R|Q\s*\/\s*t/i,
    unit: 'A (Ampere)',
    name: 'Kuat Arus Listrik'
  },
  // Tegangan V = I * R
  {
    pattern: /\bI\s*\*\s*R\b/i,
    unit: 'V (Volt)',
    name: 'Tegangan Listrik'
  },
  // GGL Faraday
  {
    pattern: /delta_Phi.*\/.*delta_t|N\s*\*.*Phi/i,
    unit: 'V (Volt)',
    name: 'GGL Induksi'
  },
  // GGL Kawat Gerak B*l*v
  {
    pattern: /B\s*\*\s*l\s*\*\s*v/i,
    unit: 'V (Volt)',
    name: 'GGL Kawat Bergerak'
  },
  // Medan Magnet B = mu0 * I / ...
  {
    pattern: /mu0.*I/i,
    unit: 'T (Tesla)',
    name: 'Induksi Magnetik'
  },
  // Fluks Magnetik B * A
  {
    pattern: /\bB\s*\*\s*A\b/i,
    unit: 'Wb (Weber)',
    name: 'Fluks Magnetik'
  },
  // Hambatan R = rho * l / A
  {
    pattern: /rho\s*\*\s*l\s*\/\s*A/i,
    unit: 'Ω (Ohm)',
    name: 'Hambatan Kawat'
  },
  // Impedansi RLC
  {
    pattern: /sqrt\(.*R\^?2.*XL/i,
    unit: 'Ω (Ohm)',
    name: 'Impedansi RLC'
  },
  // Reaktansi Induktif 2 * pi * f * L
  {
    pattern: /f\s*\*\s*L|omega\s*\*\s*L/i,
    unit: 'Ω (Ohm)',
    name: 'Reaktansi Induktif'
  },
  // Reaktansi Kapasitif 1 / (2 * pi * f * C)
  {
    pattern: /1\s*\/\s*\(?.*f\s*\*\s*C|1\s*\/\s*\(?.*omega\s*\*\s*C/i,
    unit: 'Ω (Ohm)',
    name: 'Reaktansi Kapasitif'
  },
  // Induktansi Diri L = N * Phi / I
  {
    pattern: /N\s*\*\s*Phi\s*\/\s*I/i,
    unit: 'H (Henry)',
    name: 'Induktansi Diri'
  },
  // Frekuensi De Broglie / Panjang gelombang
  {
    pattern: /h\s*\/\s*\(?m\s*\*\s*v\)?|h\s*\/\s*p/i,
    unit: 'm (Meter)',
    name: 'Panjang Gelombang De Broglie'
  },
  // Hukum Wien b / T
  {
    pattern: /b_wien\s*\/\s*T|b\s*\/\s*T/i,
    unit: 'm (Meter)',
    name: 'Panjang Gelombang Puncak'
  },
  // Hamburan Compton
  {
    pattern: /1\s*-\s*cos/i,
    unit: 'm (Meter)',
    name: 'Pergeseran Compton'
  },
  // Energi Ikat Inti delta_m * 931.5
  {
    pattern: /931\.5/i,
    unit: 'MeV (Mega Elektronvolt)',
    name: 'Energi Ikat Inti'
  },
  // Waktu Paruh Peluruhan
  {
    pattern: /0\.5\s*\^\s*\(?t\s*\/\s*Thalf/i,
    unit: 'jumlah / gram (massa tersisa)',
    name: 'Peluruhan Inti'
  },
  // Faktor Lorentz
  {
    pattern: /1\s*\/\s*sqrt\(\s*1\s*-\s*\(?.*v.*\/.*c/i,
    unit: 'tanpa satuan (faktor pengali γ)',
    name: 'Faktor Relativistik Lorentz'
  },
  // Dilatasi Waktu
  {
    pattern: /delta_t0\s*\/\s*sqrt|t0\s*\/\s*sqrt/i,
    unit: 'sekon / tahun (satuan waktu)',
    name: 'Waktu Relativistik'
  },
  // Kontraksi Panjang
  {
    pattern: /L0\s*\*\s*sqrt|l0\s*\*\s*sqrt/i,
    unit: 'm (Meter)',
    name: 'Panjang Relativistik'
  }
];

/**
 * Deteksi Satuan Output Otomatis dari Formula Fisika yang diinput
 * @param {string} rawExpression - Formula string yang diketik (misal: "m * a" atau "h * f")
 * @param {string} [presetHint] - Petunjuk opsional dari preset
 * @returns {{ unit: string, name: string, confidence: number, explanation: string }}
 */
export const detectOutputUnit = (rawExpression, presetHint = '') => {
  if (!rawExpression || !rawExpression.trim()) {
    return {
      unit: presetHint || 'Satuan Bebas / Kustom',
      name: 'Formula Belum Diinput',
      confidence: 0,
      explanation: 'Ketik formula matematika atau fisika untuk mendeteksi satuan otomatis.'
    };
  }

  const expr = rawExpression.trim();

  // 1. Cek Pola Heuristik Spesifik Terlebih Dahulu (Akurasi Tertinggi)
  for (const detector of PATTERN_DETECTORS) {
    if (detector.test ? detector.test(expr) : detector.pattern.test(expr)) {
      return {
        unit: detector.unit,
        name: detector.name,
        confidence: 0.95,
        explanation: `Terdeteksi pola rumus fisika standar untuk besaran ${detector.name}.`
      };
    }
  }

  // 2. Analisis Dimensi Simbolik Sederhana
  try {
    const tokens = expr.match(/[a-zA-Z_][a-zA-Z0-9_]*/g) || [];
    const recognized = tokens.filter((t) => t in BASE_DIMENSIONS);

    if (recognized.length > 0) {
      // Periksa apakah hanya terdiri dari 1 variabel / konstanta tunggal
      if (tokens.length === 1 && BASE_DIMENSIONS[tokens[0]]) {
        const dim = BASE_DIMENSIONS[tokens[0]];
        const match = KNOWN_UNITS_CATALOG.find((u) => 
          u.dim.every((val, idx) => val === dim[idx])
        );
        if (match) {
          return {
            unit: match.unit,
            name: match.name,
            confidence: 0.9,
            explanation: `Variabel '${tokens[0]}' berdimensi ${match.name}.`
          };
        }
      }

      // Periksa perkalian sederhana dua besaran pokok
      if (tokens.length === 2 && expr.includes('*')) {
        const d1 = BASE_DIMENSIONS[tokens[0]];
        const d2 = BASE_DIMENSIONS[tokens[1]];
        if (d1 && d2) {
          const combined = d1.map((val, idx) => val + d2[idx]);
          const match = KNOWN_UNITS_CATALOG.find((u) =>
            u.dim.every((val, idx) => val === combined[idx])
          );
          if (match) {
            return {
              unit: match.unit,
              name: match.name,
              confidence: 0.88,
              explanation: `Hasil perkalian [${tokens[0]}] × [${tokens[1]}] menghasilkan dimensi ${match.name}.`
            };
          }
        }
      }

      // Periksa pembagian sederhana dua besaran pokok
      if (tokens.length === 2 && expr.includes('/')) {
        const d1 = BASE_DIMENSIONS[tokens[0]];
        const d2 = BASE_DIMENSIONS[tokens[1]];
        if (d1 && d2) {
          const combined = d1.map((val, idx) => val - d2[idx]);
          const match = KNOWN_UNITS_CATALOG.find((u) =>
            u.dim.every((val, idx) => val === combined[idx])
          );
          if (match) {
            return {
              unit: match.unit,
              name: match.name,
              confidence: 0.88,
              explanation: `Hasil rasio [${tokens[0]}] / [${tokens[1]}] menghasilkan dimensi ${match.name}.`
            };
          }
        }
      }
    }
  } catch (err) {
    console.warn('Gagal analisis dimensi otomatis:', err);
  }

  // Fallback ke petunjuk preset atau satuan umum
  return {
    unit: presetHint || 'Satuan Kustom (SI Terhitung)',
    name: 'Kalkulasi Matematis',
    confidence: 0.5,
    explanation: 'Satuan disesuaikan dengan nilai dan dimensi variabel yang Anda masukkan.'
  };
};
