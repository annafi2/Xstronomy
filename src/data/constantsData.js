// Pustaka Konstanta Fisika dan Astrofisika
export const CONSTANTS = [
  {
    key: 'G',
    name: 'Konstanta Gravitasi Newton',
    symbol: 'G',
    value: 6.6743e-11,
    unit: 'm³/(kg·s²) atau N·m²/kg²',
    latex: 'G = 6.6743 \\times 10^{-11} \\text{ N}\\cdot\\text{m}^2/\\text{kg}^2',
    category: 'Universal',
    description: 'Menentukan kekuatan interaksi gravitasi antar massa di alam semesta.'
  },
  {
    key: 'c',
    name: 'Kecepatan Cahaya dalam Ruang Hampa',
    symbol: 'c',
    value: 2.99792458e8,
    unit: 'm/s',
    latex: 'c = 2.998 \\times 10^{8} \\text{ m/s}',
    category: 'Universal',
    description: 'Kecepatan maksimum perambatan energi, materi, dan informasi kosmis.'
  },
  {
    key: 'h',
    name: 'Konstanta Planck',
    symbol: 'h',
    value: 6.62607015e-34,
    unit: 'J·s',
    latex: 'h = 6.626 \\times 10^{-34} \\text{ J}\\cdot\\text{s}',
    category: 'Universal',
    description: 'Kuantum aksi mendasar dalam mekanika kuantum dan energi foton E = hf.'
  },
  {
    key: 'hbar',
    name: 'Konstanta Planck Tereduksi',
    symbol: 'ℏ',
    value: 1.054571817e-34,
    unit: 'J·s',
    latex: '\\hbar = 1.055 \\times 10^{-34} \\text{ J}\\cdot\\text{s}',
    category: 'Universal',
    description: 'Bentuk h/(2pi), sering digunakan dalam fisika kuantum dan kosmologi.'
  },
  {
    key: 'sigma',
    name: 'Konstanta Stefan-Boltzmann',
    symbol: 'σ',
    value: 5.670374419e-8,
    unit: 'W/(m²·K⁴)',
    latex: '\\sigma = 5.670 \\times 10^{-8} \\text{ W}/(\\text{m}^2\\cdot\\text{K}^4)',
    category: 'Termodinamika/Astro',
    description: 'Menghubungkan fluks pancaran radiasi benda hitam dengan temperatur absolut F = σT^4.'
  },
  {
    key: 'kB',
    name: 'Konstanta Boltzmann',
    symbol: 'k_B',
    value: 1.380649e-23,
    unit: 'J/K',
    latex: 'k_B = 1.381 \\times 10^{-23} \\text{ J/K}',
    category: 'Termodinamika',
    description: 'Menghubungkan energi termal kinetik partikel gas bintang dengan temperatur.'
  },
  {
    key: 'b_wien',
    name: 'Konstanta Pergeseran Wien',
    symbol: 'b',
    value: 2.897771955e-3,
    unit: 'm·K',
    latex: 'b = 2.898 \\times 10^{-3} \\text{ m}\\cdot\\text{K}',
    category: 'Astrofisika',
    description: 'Menentukan panjang gelombang puncak radiasi benda hitam bintang λ_max T = b.'
  },
  {
    key: 'M_sun',
    name: 'Massa Matahari (M☉)',
    symbol: 'M_☉',
    value: 1.98847e30,
    unit: 'kg',
    latex: 'M_\\odot = 1.989 \\times 10^{30} \\text{ kg}',
    category: 'Tata Surya',
    description: 'Satuan standar astronomi untuk mengukur massa bintang dan galaksi.'
  },
  {
    key: 'R_sun',
    name: 'Radius Matahari (R☉)',
    symbol: 'R_☉',
    value: 6.957e8,
    unit: 'm',
    latex: 'R_\\odot = 6.957 \\times 10^{8} \\text{ m}',
    category: 'Tata Surya',
    description: 'Ukuran jari-jari rata-rata fotosfer matahari (~109 kali radius bumi).'
  },
  {
    key: 'L_sun',
    name: 'Luminositas Matahari (L☉)',
    symbol: 'L_☉',
    value: 3.828e26,
    unit: 'W',
    latex: 'L_\\odot = 3.828 \\times 10^{26} \\text{ W}',
    category: 'Tata Surya',
    description: 'Total daya radiasi energi yang dipancarkan oleh Matahari ke segala arah.'
  },
  {
    key: 'M_earth',
    name: 'Massa Bumi (M⊕)',
    symbol: 'M_⊕',
    value: 5.9722e24,
    unit: 'kg',
    latex: 'M_\\oplus = 5.972 \\times 10^{24} \\text{ kg}',
    category: 'Planeter',
    description: 'Massa planet Bumi, digunakan untuk membandingkan eksoplanet kebumian.'
  },
  {
    key: 'R_earth',
    name: 'Radius Bumi (R⊕)',
    symbol: 'R_⊕',
    value: 6.371e6,
    unit: 'm',
    latex: 'R_\\oplus = 6.371 \\times 10^{6} \\text{ m}',
    category: 'Planeter',
    description: 'Radius volumetrik rata-rata Bumi.'
  },
  {
    key: 'AU',
    name: 'Satuan Astronomi (Astronomical Unit)',
    symbol: 'AU',
    value: 1.495978707e11,
    unit: 'm',
    latex: '1 \\text{ AU} = 1.496 \\times 10^{11} \\text{ m}',
    category: 'Jarak Kosmis',
    description: 'Jarak rata-rata antara pusat Bumi dan pusat Matahari.'
  },
  {
    key: 'ly',
    name: 'Tahun Cahaya (Light-Year)',
    symbol: 'ly',
    value: 9.460730472e15,
    unit: 'm',
    latex: '1 \\text{ ly} = 9.461 \\times 10^{15} \\text{ m}',
    category: 'Jarak Kosmis',
    description: 'Jarak yang ditempuh seberkas cahaya dalam ruang hampa selama 1 tahun Julian.'
  },
  {
    key: 'pc',
    name: 'Parsec (Parallax Second)',
    symbol: 'pc',
    value: 3.085677581e16,
    unit: 'm',
    latex: '1 \\text{ pc} = 3.086 \\times 10^{16} \\text{ m} \\approx 3.26 \\text{ ly}',
    category: 'Jarak Kosmis',
    description: 'Jarak di mana radius orbit Bumi (1 AU) membentuk sudut paralaks 1 detik busur.'
  },
  {
    key: 'g_earth',
    name: 'Percepatan Gravitasi Permukaan Bumi',
    symbol: 'g',
    value: 9.80665,
    unit: 'm/s²',
    latex: 'g = 9.81 \\text{ m/s}^2',
    category: 'Fisika Dasar',
    description: 'Percepatan jatuh bebas rata-rata di permukaan laut bumi.'
  }
];

export const CONSTANT_MAP = CONSTANTS.reduce((acc, curr) => {
  acc[curr.key] = curr.value;
  return acc;
}, {});
