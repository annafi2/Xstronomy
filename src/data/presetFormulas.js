// Preset Formula Fisika Kelas 10-12 dan Astrofisika

export const PRESET_FORMULAS = [
  // --- KELAS 10 ---
  {
    id: 'gravitasi-newton',
    grade: '10',
    category: 'Mekanika & Gravitasi',
    title: 'Hukum Gravitasi Universal Newton',
    expression: 'G * m1 * m2 / (r^2)',
    latex: 'F = \\frac{G \\cdot m_1 \\cdot m_2}{r^2}',
    description: 'Menghitung gaya tarik menarik gravitasi antara dua benda bermassa m1 dan m2 pada jarak r.',
    astronomyApplication: 'Digunakan untuk menghitung gaya tarik antara Matahari dan planet, atau interaksi antara galaksi yang saling bertabrakan.',
    variables: [
      { key: 'm1', label: 'Massa Benda 1 (m₁)', default: 1.989e30, unit: 'kg', note: 'Contoh: Massa Matahari (1.989e30 kg)' },
      { key: 'm2', label: 'Massa Benda 2 (m₂)', default: 5.972e24, unit: 'kg', note: 'Contoh: Massa Bumi (5.972e24 kg)' },
      { key: 'r', label: 'Jarak Antar Pusat Massa (r)', default: 1.496e11, unit: 'm', note: 'Contoh: 1 AU (1.496e11 m)' }
    ],
    outputUnit: 'N (Newton)',
    outputName: 'Gaya Gravitasi (F)',
    plotVariable: 'r',
    plotRange: [1e10, 3e11]
  },
  {
    id: 'kecepatan-lepas',
    grade: '10',
    category: 'Mekanika & Gravitasi',
    title: 'Kecepatan Lepas (Escape Velocity)',
    expression: 'sqrt(2 * G * M / R)',
    latex: 'v_{esc} = \\sqrt{\\frac{2 \\cdot G \\cdot M}{R}}',
    description: 'Kelajuan minimum yang dibutuhkan suatu objek untuk melepaskan diri dari tarikan medan gravitasi benda langit.',
    astronomyApplication: 'Menentukan mengapa Bulan tidak memiliki atmosfer (kecepatan termal molekul gas melebihi kecepatan lepas Bulan ~2.38 km/s). Jika v_esc = c, objek tersebut menjadi Black Hole.',
    variables: [
      { key: 'M', label: 'Massa Objek Induk (M)', default: 5.972e24, unit: 'kg', note: 'Bumi: 5.972e24 kg | Mars: 6.417e23 kg' },
      { key: 'R', label: 'Jari-jari Permukaan (R)', default: 6.371e6, unit: 'm', note: 'Radius Bumi: 6.371e6 m | Mars: 3.39e6 m' }
    ],
    outputUnit: 'm/s (atau km/s dibagi 1000)',
    outputName: 'Kecepatan Lepas (v_esc)',
    plotVariable: 'R',
    plotRange: [1e6, 1e7]
  },
  {
    id: 'kecepatan-orbit',
    grade: '10',
    category: 'Mekanika & Gravitasi',
    title: 'Kecepatan Orbit Sirkular Satelit / Planet',
    expression: 'sqrt(G * M / r)',
    latex: 'v_{orb} = \\sqrt{\\frac{G \\cdot M}{r}}',
    description: 'Kelajuan linier stabil benda langit yang mengitari pusat massa dalam lintasan lingkaran beradius r.',
    astronomyApplication: 'Digunakan oleh NASA/ESA untuk menempatkan teleskop luar angkasa seperti ISS di LEO (Low Earth Orbit) dan menentukan kurva rotasi galaksi.',
    variables: [
      { key: 'M', label: 'Massa Bintang/Planet Pusat (M)', default: 5.972e24, unit: 'kg', note: 'Massa Bumi (5.972e24 kg)' },
      { key: 'r', label: 'Jarak dari Pusat Massa (r)', default: 6.771e6, unit: 'm', note: 'Radius Bumi + Ketinggian ISS (6.771e6 m)' }
    ],
    outputUnit: 'm/s',
    outputName: 'Kecepatan Orbit (v_orb)',
    plotVariable: 'r',
    plotRange: [6.4e6, 4e7]
  },
  {
    id: 'kepler-periode',
    grade: '10',
    category: 'Mekanika & Gravitasi',
    title: 'Hukum III Kepler (Periode Orbit)',
    expression: '2 * pi * sqrt((a^3) / (G * M))',
    latex: 'T = 2\\pi \\sqrt{\\frac{a^3}{G \\cdot M}}',
    description: 'Hubungan antara kuadrat periode revolusi planet dengan pangkat tiga sumbu semi-mayor lintasannya.',
    astronomyApplication: 'Memungkinkan astronom memperkirakan massa lubang hitam supermasif di pusat galaksi (Sgr A*) berdasarkan orbit bintang-bintang S-stars di sekitarnya.',
    variables: [
      { key: 'M', label: 'Massa Objek Pusat (M)', default: 1.989e30, unit: 'kg', note: 'Massa Matahari: 1.989e30 kg' },
      { key: 'a', label: 'Sumbu Semi-Mayor Orbit (a)', default: 1.496e11, unit: 'm', note: '1 AU (Jarak Bumi-Matahari: 1.496e11 m)' }
    ],
    outputUnit: 'detik (s)',
    outputName: 'Periode Orbit (T)',
    plotVariable: 'a',
    plotRange: [5e10, 8e11]
  },
  {
    id: 'energi-potensial-gravitasi',
    grade: '10',
    category: 'Energi & Momentum',
    title: 'Energi Potensial Gravitasi Kosmis',
    expression: '-G * M * m / r',
    latex: 'E_p = -\\frac{G \\cdot M \\cdot m}{r}',
    description: 'Energi potensial gravitasi dua benda bermassa, dengan titik acuan nol di tak hingga.',
    astronomyApplication: 'Menjelaskan energi ikatan gravitasi bintang dan gugus galaksi. Ketika awan nebula runtuh, perubahan energi potensial ini memicu fusi nuklir.',
    variables: [
      { key: 'M', label: 'Massa Pusat (M)', default: 1.989e30, unit: 'kg' },
      { key: 'm', label: 'Massa Satelit/Planet (m)', default: 5.972e24, unit: 'kg' },
      { key: 'r', label: 'Jarak (r)', default: 1.496e11, unit: 'm' }
    ],
    outputUnit: 'Joule (J)',
    outputName: 'Energi Potensial Gravitasi (Ep)',
    plotVariable: 'r',
    plotRange: [1e11, 1e12]
  },

  // --- KELAS 11 ---
  {
    id: 'doppler-redshift',
    grade: '11',
    category: 'Gelombang & Bunyi/Cahaya',
    title: 'Efek Doppler Optik & Pergeseran Merah (Redshift z)',
    expression: 'v / c',
    latex: 'z = \\frac{\\Delta \\lambda}{\\lambda_0} = \\frac{v}{c}',
    description: 'Pergeseran fraksional panjang gelombang cahaya akibat kecepatan relatif sumber terhadap pengamat (non-relativistik).',
    astronomyApplication: 'Menjadi bukti utama Hukum Hubble dan ekspansi alam semesta: galaksi yang lebih jauh memiliki redshift lebih besar.',
    variables: [
      { key: 'v', label: 'Kecepatan Menjauh Galaksi (v)', default: 15000000, unit: 'm/s', note: 'Contoh: 15.000 km/s (5% kelajuan cahaya)' }
    ],
    outputUnit: 'tanpa dimensi (z)',
    outputName: 'Nilai Redshift (z)',
    plotVariable: 'v',
    plotRange: [1e6, 2e8]
  },
  {
    id: 'resolusi-teleskop',
    grade: '11',
    category: 'Gelombang Cahaya & Optika',
    title: 'Limit Resolusi Difraksi Teleskop (Kriteria Rayleigh)',
    expression: '1.22 * lambda / D',
    latex: '\\theta = 1.22 \\cdot \\frac{\\lambda}{D}',
    description: 'Sudut minimum yang dapat dipisahkan oleh teleskop berapertur diameter D pada panjang gelombang lambda.',
    astronomyApplication: 'Alasan utama mengapa Teleskop James Webb membutuhkan cermin primer selebar 6.5 meter untuk mengamati galaksi terjauh dengan resolusi tajam.',
    variables: [
      { key: 'lambda', label: 'Panjang Gelombang Cahaya (λ)', default: 5.5e-7, unit: 'm', note: 'Cahaya tampak hijau: 550 nm (5.5e-7 m)' },
      { key: 'D', label: 'Diameter Bukaan/Apertur Cermin (D)', default: 6.5, unit: 'm', note: 'JWST: 6.5 m | Hubble: 2.4 m' }
    ],
    outputUnit: 'radian (rad)',
    outputName: 'Resolusi Sudut (θ)',
    plotVariable: 'D',
    plotRange: [0.1, 10]
  },
  {
    id: 'momentum-sudut-bintang',
    grade: '11',
    category: 'Dinamika Rotasi',
    title: 'Kekekalan Momentum Sudut Runtuhan Bintang (Pulsar)',
    expression: 'omega1 * (R1^2) / (R2^2)',
    latex: '\\omega_2 = \\omega_1 \\cdot \\left(\\frac{R_1}{R_2}\\right)^2',
    description: 'Kecepatan sudut rotasi akhir ketika radius bintang menyusut drastis saat supernova.',
    astronomyApplication: 'Menjelaskan mengapa bintang netron/pulsar dapat berputar hingga ratusan kali per detik (contoh: Crab Pulsar berputar 30 kali per detik).',
    variables: [
      { key: 'omega1', label: 'Kecepatan Sudut Awal (ω₁)', default: 2.9e-6, unit: 'rad/s', note: 'Matahari: ~1 putaran per 25 hari (~2.9e-6 rad/s)' },
      { key: 'R1', label: 'Jari-jari Bintang Awal (R₁)', default: 7e8, unit: 'm', note: 'Radius bintang masif (~700.000 km)' },
      { key: 'R2', label: 'Jari-jari Bintang Netron (R₂)', default: 1.2e4, unit: 'm', note: 'Radius bintang neutron (~12 km)' }
    ],
    outputUnit: 'rad/s',
    outputName: 'Kecepatan Sudut Akhir (ω₂)',
    plotVariable: 'R2',
    plotRange: [1e4, 1e5]
  },
  {
    id: 'keseimbangan-hidrostatis',
    grade: '11',
    category: 'Fluida & Termodinamika',
    title: 'Estimasi Tekanan Pusat Bintang (Keseimbangan Hidrostatis)',
    expression: '(G * (M^2)) / (R^4)',
    latex: 'P_c \\sim \\frac{G \\cdot M^2}{R^4}',
    description: 'Besaran skala tekanan yang diperlukan di inti bintang untuk menahan keruntuhan gravitasi dirinya sendiri.',
    astronomyApplication: 'Tekanan ekstrem di inti bintang (~10^16 Pa di Matahari) memungkinkan suhu mencapai belasan juta Kelvin, memicu fusi termonuklir.',
    variables: [
      { key: 'M', label: 'Massa Bintang (M)', default: 1.989e30, unit: 'kg' },
      { key: 'R', label: 'Jari-jari Bintang (R)', default: 6.957e8, unit: 'm' }
    ],
    outputUnit: 'Pa (Pascal / N/m²)',
    outputName: 'Estimasi Tekanan Inti (Pc)',
    plotVariable: 'R',
    plotRange: [1e8, 1e9]
  },

  // --- KELAS 12 ---
  {
    id: 'stefan-boltzmann',
    grade: '12',
    category: 'Fisika Kuantum & Radiasi',
    title: 'Luminositas Bintang (Hukum Stefan-Boltzmann)',
    expression: '4 * pi * (R^2) * sigma * (T^4)',
    latex: 'L = 4\\pi R^2 \\sigma T^4',
    description: 'Total daya radiasi energi elektromagnetik yang dipancarkan sebuah bintang sebagai benda hitam sempurna.',
    astronomyApplication: 'Kunci penentuan posisi bintang pada Diagram Hertzsprung-Russell (H-R Diagram), membedakan bintang katai, deret utama, dan maharaksasa.',
    variables: [
      { key: 'R', label: 'Jari-jari Bintang (R)', default: 6.957e8, unit: 'm', note: 'Radius Matahari: 6.957e8 m' },
      { key: 'T', label: 'Temperatur Efektif Permukaan (T)', default: 5778, unit: 'K', note: 'Suhu Fotosfer Matahari: 5778 K' }
    ],
    outputUnit: 'Watt (W)',
    outputName: 'Luminositas Total (L)',
    plotVariable: 'T',
    plotRange: [2500, 30000]
  },
  {
    id: 'hukum-wien',
    grade: '12',
    category: 'Fisika Kuantum & Radiasi',
    title: 'Hukum Pergeseran Wien (Warna & Suhu Bintang)',
    expression: 'b_wien / T',
    latex: '\\lambda_{\\max} = \\frac{b}{T}',
    description: 'Panjang gelombang di mana emisi radiasi benda hitam mencapai intensitas puncak.',
    astronomyApplication: 'Menjelaskan mengapa bintang panas berwarna biru (Rigel ~12.000 K), sedangkan bintang dingin berwarna merah (Betelgeuse ~3.500 K).',
    variables: [
      { key: 'T', label: 'Temperatur Bintang (T)', default: 5778, unit: 'K', note: 'Suhu Matahari: 5778 K' }
    ],
    outputUnit: 'meter (m) atau nm',
    outputName: 'Panjang Gelombang Puncak (λ_max)',
    plotVariable: 'T',
    plotRange: [2000, 40000]
  },
  {
    id: 'kesetaraan-massa-energi',
    grade: '12',
    category: 'Relativitas Khusus',
    title: 'Kesetaraan Massa-Energi Einstein (Fusi Nuklir Bintang)',
    expression: 'delta_m * (c^2)',
    latex: 'E = \\Delta m \\cdot c^2',
    description: 'Energi luar biasa yang dibebaskan ketika terjadi defek massa (selisih massa) pada reaksi fusi nuklir.',
    astronomyApplication: 'Sumber daya sejati bintang: 4 proton bergabung menjadi 1 inti Helium-4 dengan kehilangan 0.7% massa yang dikonversi langsung menjadi cahaya dan panas.',
    variables: [
      { key: 'delta_m', label: 'Defek Massa (Δm)', default: 0.004, unit: 'kg', note: 'Contoh: 4 gram bahan yang terkonversi' }
    ],
    outputUnit: 'Joule (J)',
    outputName: 'Energi Yang Dihasilkan (E)',
    plotVariable: 'delta_m',
    plotRange: [0.001, 0.05]
  },
  {
    id: 'faktor-lorentz',
    grade: '12',
    category: 'Relativitas Khusus',
    title: 'Faktor Lorentz (Relativitas Khusus)',
    expression: '1 / sqrt(1 - ((v / c)^2))',
    latex: '\\gamma = \\frac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}}',
    description: 'Faktor pengali relativistik untuk dilatasi waktu, kontraksi panjang, dan massa relativistik pada kecepatan mendekati cahaya.',
    astronomyApplication: 'Penting untuk memahami jet plasma relativistik dari lubang hitam aktif (Blazar/Quasar) yang bergerak pada 99% kelajuan cahaya.',
    variables: [
      { key: 'v', label: 'Kecepatan Partikel (v)', default: 2.6e8, unit: 'm/s', note: 'Misal: 2.6e8 m/s (~0.87 c)' }
    ],
    outputUnit: 'tanpa dimensi (γ >= 1)',
    outputName: 'Faktor Lorentz (γ)',
    plotVariable: 'v',
    plotRange: [1e7, 2.99e8]
  },
  {
    id: 'radius-schwarzschild',
    grade: '12',
    category: 'Astrofisika Lanjutan & Relativitas',
    title: 'Radius Schwarzschild (Horison Peristiwa Lubang Hitam)',
    expression: '2 * G * M / (c^2)',
    latex: 'R_s = \\frac{2 \\cdot G \\cdot M}{c^2}',
    description: 'Radius batas di mana kecepatan lepas suatu objek bermassa sama dengan kelajuan cahaya (horison peristiwa).',
    astronomyApplication: 'Jika Matahari dirapatkan menjadi black hole, radiusnya hanya ~3 km. Lubang hitam Sgr A* di pusat Bima Sakti (4 juta M_sun) beradius ~12 juta km.',
    variables: [
      { key: 'M', label: 'Massa Lubang Hitam (M)', default: 1.989e30, unit: 'kg', note: '1 Massa Matahari: 1.989e30 kg' }
    ],
    outputUnit: 'meter (m)',
    outputName: 'Radius Schwarzschild (Rs)',
    plotVariable: 'M',
    plotRange: [1e30, 2e31]
  },
  {
    id: 'energi-foton',
    grade: '12',
    category: 'Fisika Kuantum & Radiasi',
    title: 'Energi Kuantum Foton Planck-Einstein',
    expression: 'h * c / lambda',
    latex: 'E = h \\cdot f = \\frac{h \\cdot c}{\\lambda}',
    description: 'Energi diskrit kuantum dari sebuah foton cahaya berdasarkan panjang gelombangnya.',
    astronomyApplication: 'Menjelaskan mengapa teleskop sinar gamma dan sinar X mendeteksi proses paling berenergi tinggi di alam semesta (supernova, jet lubang hitam).',
    variables: [
      { key: 'lambda', label: 'Panjang Gelombang (λ)', default: 5e-7, unit: 'm', note: 'Cahaya tampak: 5e-7 m | Sinar-X: ~1e-10 m' }
    ],
    outputUnit: 'Joule (J)',
    outputName: 'Energi Foton (E)',
    plotVariable: 'lambda',
    plotRange: [1e-10, 1e-6]
  }
];
