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
  },

  // --- KELAS 12: LISTRIK STATIS & SEARAH (DARI MODUL BAB I) ---
  {
    id: 'hukum-coulomb',
    grade: '12',
    category: 'Elektrostatika & Listrik Searah',
    title: 'Hukum Coulomb (Gaya Elektrostatik)',
    expression: 'K_coulomb * q1 * q2 / (r^2)',
    latex: 'F = K \\frac{q_1 \\cdot q_2}{r^2}',
    description: 'Menghitung besar gaya tarik-menarik atau tolak-menolak elektrostatis antara dua muatan listrik titik q1 dan q2.',
    astronomyApplication: 'Sangat penting dalam astrofisika plasma antariksa dan struktur materi bintang netron, di mana gaya elektrostatik menahan gravitasi.',
    variables: [
      { key: 'q1', label: 'Muatan 1 (q₁)', default: 4e-6, unit: 'C', note: 'Misal: 4 μC' },
      { key: 'q2', label: 'Muatan 2 (q₂)', default: 9e-6, unit: 'C', note: 'Misal: 9 μC' },
      { key: 'r', label: 'Jarak Pemisah (r)', default: 0.3, unit: 'm', note: 'Jarak dalam meter (0.3 m)' }
    ],
    outputUnit: 'N (Newton)',
    outputName: 'Gaya Coulomb (F)',
    plotVariable: 'r',
    plotRange: [0.05, 1.0]
  },
  {
    id: 'hukum-ohm',
    grade: '12',
    category: 'Elektrostatika & Listrik Searah',
    title: 'Hukum Ohm (Tegangan & Kuat Arus)',
    expression: 'I * R',
    latex: 'V = I \\cdot R',
    description: 'Hubungan fundamental antara beda potensial listrik (V), kuat arus (I), dan hambatan (R).',
    astronomyApplication: 'Digunakan dalam perancangan sirkuit detektor sensor teleskop CCD ruang angkasa.',
    variables: [
      { key: 'I', label: 'Kuat Arus (I)', default: 2.5, unit: 'A' },
      { key: 'R', label: 'Hambatan Listrik (R)', default: 48, unit: 'Ω' }
    ],
    outputUnit: 'V (Volt)',
    outputName: 'Tegangan Listrik (V)'
  },
  {
    id: 'hambatan-kawat-jenis',
    grade: '12',
    category: 'Elektrostatika & Listrik Searah',
    title: 'Hambatan Kawat Penghantar (Resistivitas)',
    expression: 'rho * l / A',
    latex: 'R = \\rho \\frac{l}{A}',
    description: 'Menghitung hambatan listrik kawat berdasarkan hambatan jenis (rho), panjang (l), dan luas penampang (A).',
    astronomyApplication: 'Menghitung resistansi kabel superkonduktor transmisi instrumen radio teleskop ALMA.',
    variables: [
      { key: 'rho', label: 'Hambatan Jenis (ρ)', default: 1.7e-8, unit: 'Ω·m', note: 'Tembaga: 1.7e-8 Ω·m' },
      { key: 'l', label: 'Panjang Kawat (l)', default: 50, unit: 'm' },
      { key: 'A', label: 'Luas Penampang (A)', default: 2.5e-6, unit: 'm²', note: 'Misal: 2.5 mm² = 2.5e-6 m²' }
    ],
    outputUnit: 'Ω (Ohm)',
    outputName: 'Hambatan Kawat (R)'
  },
  {
    id: 'hambatan-pengaruh-suhu',
    grade: '12',
    category: 'Elektrostatika & Listrik Searah',
    title: 'Pengaruh Suhu terhadap Hambatan',
    expression: 'R0 * (1 + (alpha * delta_T))',
    latex: 'R = R_0 (1 + \\alpha \\cdot \\Delta T)',
    description: 'Perubahan hambatan listrik suatu bahan penghantar akibat fluktuasi perubahan temperatur suhu delta_T.',
    astronomyApplication: 'Digunakan pada termometer bolometer kriogenik teleskop James Webb yang bekerja pada suhu -233°C.',
    variables: [
      { key: 'R0', label: 'Hambatan Awal (R₀)', default: 100, unit: 'Ω' },
      { key: 'alpha', label: 'Koefisien Suhu (α)', default: 0.0039, unit: '/°C', note: 'Tembaga: 0.0039 /°C' },
      { key: 'delta_T', label: 'Perubahan Suhu (ΔT)', default: 50, unit: '°C' }
    ],
    outputUnit: 'Ω (Ohm)',
    outputName: 'Hambatan Akhir (R)'
  },
  {
    id: 'hambatan-shunt-amperemeter',
    grade: '12',
    category: 'Elektrostatika & Listrik Searah',
    title: 'Pengukuran Hambatan Shunt Amperemeter',
    expression: 'R_A / ((It / I0) - 1)',
    latex: 'R_{sh} = \\frac{R_A}{n - 1} \\quad \\text{dengan } n = \\frac{I_t}{I_0}',
    description: 'Menghitung nilai hambatan cabang (shunt) untuk memperbesar batas ukur amperemeter dari I0 menjadi It.',
    astronomyApplication: 'Digunakan dalam sistem telemetri wahana antariksa untuk memonitor lonjakan arus baterai panel surya.',
    variables: [
      { key: 'R_A', label: 'Hambatan Amperemeter (R_A)', default: 18, unit: 'Ω' },
      { key: 'It', label: 'Batas Ukur Baru (I_t)', default: 0.1, unit: 'A', note: '100 mA = 0.1 A' },
      { key: 'I0', label: 'Batas Ukur Awal (I₀)', default: 0.01, unit: 'A', note: '10 mA = 0.01 A' }
    ],
    outputUnit: 'Ω (Ohm)',
    outputName: 'Hambatan Shunt (R_sh)'
  },
  {
    id: 'daya-listrik-joule',
    grade: '12',
    category: 'Elektrostatika & Listrik Searah',
    title: 'Disipasi Daya Listrik (Hukum Joule)',
    expression: '(I^2) * R',
    latex: 'P = I^2 \\cdot R = V \\cdot I = \\frac{V^2}{R}',
    description: 'Energi listrik yang diubah menjadi daya termal per satuan waktu pada hambatan R.',
    astronomyApplication: 'Menghitung pemanasan subsistem probe penjelajah Europa Clipper di lingkungan bersuhu beku ekstrem.',
    variables: [
      { key: 'I', label: 'Arus Listrik (I)', default: 4, unit: 'A' },
      { key: 'R', label: 'Hambatan (R)', default: 25, unit: 'Ω' }
    ],
    outputUnit: 'W (Watt)',
    outputName: 'Daya Listrik (P)'
  },

  // --- KELAS 12: MEDAN MAGNET & GAYA LORENTZ ---
  {
    id: 'medan-magnet-kawat-lurus',
    grade: '12',
    category: 'Medan Magnet & Elektromagnetik',
    title: 'Induksi Magnet Kawat Lurus Panjang',
    expression: 'mu0 * I / (2 * pi * a)',
    latex: 'B = \\frac{\\mu_0 \\cdot I}{2\\pi a}',
    description: 'Medan magnetik B di sekitar kawat lurus panjang yang dialiri arus listrik I pada jarak tegak lurus a.',
    astronomyApplication: 'Model pendekatan untuk medan magnet di sekitar aliran jet plasma astrofisika kosmis.',
    variables: [
      { key: 'I', label: 'Kuat Arus (I)', default: 10, unit: 'A' },
      { key: 'a', label: 'Jarak ke Kawat (a)', default: 0.05, unit: 'm', note: 'Misal: 5 cm = 0.05 m' }
    ],
    outputUnit: 'T (Tesla)',
    outputName: 'Induksi Magnetik (B)'
  },
  {
    id: 'medan-magnet-kawat-lingkar',
    grade: '12',
    category: 'Medan Magnet & Elektromagnetik',
    title: 'Induksi Magnet Pusat Kawat Melingkar',
    expression: 'mu0 * I * N / (2 * a)',
    latex: 'B = \\frac{\\mu_0 \\cdot I \\cdot N}{2a}',
    description: 'Induksi magnetik di pusat lingkaran kawat berjari-jari a dengan N lilitan dan kuat arus I.',
    astronomyApplication: 'Prinsip kerja kumparan Helmholtz untuk menguji kompas magnetik satelit sebelum diluncurkan.',
    variables: [
      { key: 'I', label: 'Arus Listrik (I)', default: 5, unit: 'A' },
      { key: 'N', label: 'Jumlah Lilitan (N)', default: 50, unit: 'lilitan' },
      { key: 'a', label: 'Jari-jari Lingkaran (a)', default: 0.1, unit: 'm', note: '10 cm = 0.1 m' }
    ],
    outputUnit: 'T (Tesla)',
    outputName: 'Induksi Magnetik (B)'
  },
  {
    id: 'medan-magnet-solenoida',
    grade: '12',
    category: 'Medan Magnet & Elektromagnetik',
    title: 'Medan Magnet Pusat Solenoida',
    expression: 'mu0 * I * N / L',
    latex: 'B_{pusat} = \\frac{\\mu_0 \\cdot I \\cdot N}{L}',
    description: 'Kuat medan magnet homogen di dalam kumparan silinder panjang (solenoida) berpanjang L.',
    astronomyApplication: 'Digunakan dalam spektrometer partikel di stasiun antariksa ISS untuk membelokkan sinar kosmis.',
    variables: [
      { key: 'I', label: 'Arus Listrik (I)', default: 4, unit: 'A' },
      { key: 'N', label: 'Jumlah Lilitan (N)', default: 800, unit: 'lilitan' },
      { key: 'L', label: 'Panjang Solenoida (L)', default: 0.4, unit: 'm', note: '40 cm = 0.4 m' }
    ],
    outputUnit: 'T (Tesla)',
    outputName: 'Medan Magnet Pusat (B)'
  },
  {
    id: 'gaya-lorentz-kawat',
    grade: '12',
    category: 'Medan Magnet & Elektromagnetik',
    title: 'Gaya Lorentz pada Kawat Berarus',
    expression: 'B * I * L * sin(theta * pi / 180)',
    latex: 'F = B \\cdot I \\cdot L \\cdot \\sin\\theta',
    description: 'Gaya magnetik yang dialami kawat berarus I sepanjang L yang berada dalam medan magnet B membentuk sudut theta.',
    astronomyApplication: 'Prinsip kerja motor roket plasma magnetoplasma VASIMR untuk penjelajahan antarplanet.',
    variables: [
      { key: 'B', label: 'Kuat Medan Magnet (B)', default: 0.5, unit: 'T' },
      { key: 'I', label: 'Kuat Arus (I)', default: 8, unit: 'A' },
      { key: 'L', label: 'Panjang Kawat (L)', default: 0.25, unit: 'm' },
      { key: 'theta', label: 'Sudut Terhadap Medan (θ)', default: 90, unit: 'derajat' }
    ],
    outputUnit: 'N (Newton)',
    outputName: 'Gaya Lorentz (F)'
  },
  {
    id: 'jari-jari-siklotron-lorentz',
    grade: '12',
    category: 'Medan Magnet & Elektromagnetik',
    title: 'Jari-jari Lintasan Partikel Bermuatan (Siklotron)',
    expression: 'm * v / (B * q)',
    latex: 'r = \\frac{m \\cdot v}{B \\cdot q}',
    description: 'Jari-jari kelengkungan orbit sirkular partikel bermuatan q bermassa m yang ditembakkan tegak lurus ke medan magnet B.',
    astronomyApplication: 'Menjelaskan mengapa partikel angin matahari terperangkap dalam Sabuk Radiasi Van Allen di sekitar Bumi.',
    variables: [
      { key: 'm', label: 'Massa Partikel (m)', default: 1.67e-27, unit: 'kg', note: 'Proton: 1.67e-27 kg' },
      { key: 'v', label: 'Kecepatan Partikel (v)', default: 2e6, unit: 'm/s' },
      { key: 'B', label: 'Medan Magnet (B)', default: 0.2, unit: 'T' },
      { key: 'q', label: 'Muatan Partikel (q)', default: 1.6e-19, unit: 'C', note: 'e = 1.6e-19 C' }
    ],
    outputUnit: 'm (meter)',
    outputName: 'Jari-jari Lintasan (r)'
  },
  {
    id: 'gaya-dua-kawat-sejajar',
    grade: '12',
    category: 'Medan Magnet & Elektromagnetik',
    title: 'Gaya Magnetik Antara Dua Kawat Sejajar',
    expression: 'mu0 * I1 * I2 / (2 * pi * a)',
    latex: '\\frac{F}{L} = \\frac{\\mu_0 \\cdot I_1 \\cdot I_2}{2\\pi a}',
    description: 'Gaya per satuan panjang antara dua kawat penghantar sejajar yang terpisah sejauh a (tarik-menarik jika searah).',
    astronomyApplication: 'Definisi resmi ampere internasional dan interaksi kabel transmisi satelit orbit geostasioner.',
    variables: [
      { key: 'I1', label: 'Arus Kawat 1 (I₁)', default: 6, unit: 'A' },
      { key: 'I2', label: 'Arus Kawat 2 (I₂)', default: 10, unit: 'A' },
      { key: 'a', label: 'Jarak Antar Kawat (a)', default: 0.04, unit: 'm', note: '4 cm = 0.04 m' }
    ],
    outputUnit: 'N/m (Newton per meter)',
    outputName: 'Gaya per Satuan Panjang (F/L)'
  },

  // --- KELAS 12: INDUKSI ELEKTROMAGNETIK & RLC ---
  {
    id: 'fluks-magnetik-bidang',
    grade: '12',
    category: 'Induksi Elektromagnetik',
    title: 'Fluks Magnetik Melalui Bidang',
    expression: 'B * A * cos(theta * pi / 180)',
    latex: '\\Phi = B \\cdot A \\cdot \\cos\\theta',
    description: 'Jumlah garis medan magnet B yang menembus luasan bidang A yang membentuk sudut theta terhadap garis normal.',
    astronomyApplication: 'Menghitung variasi fluks magnetik bintik matahari (sunspot) yang memicu lontaran massa korona (CME).',
    variables: [
      { key: 'B', label: 'Kerapatan Medan Magnet (B)', default: 0.4, unit: 'T' },
      { key: 'A', label: 'Luas Bidang (A)', default: 0.02, unit: 'm²' },
      { key: 'theta', label: 'Sudut Terhadap Normal (θ)', default: 0, unit: 'derajat' }
    ],
    outputUnit: 'Wb (Weber)',
    outputName: 'Fluks Magnetik (Φ)'
  },
  {
    id: 'hukum-faraday-ggl',
    grade: '12',
    category: 'Induksi Elektromagnetik',
    title: 'Hukum Induksi Faraday (GGL Induksi)',
    expression: 'abs(N * delta_Phi / delta_t)',
    latex: '\\varepsilon = -N \\frac{\\Delta\\Phi}{\\Delta t}',
    description: 'Besar gaya gerak listrik induksi yang timbul akibat laju perubahan fluks magnetik pada kumparan N lilitan.',
    astronomyApplication: 'Arus induksi geomagnetik di kerak Bumi akibat badai matahari kuat yang dapat memicu pemadaman listrik.',
    variables: [
      { key: 'N', label: 'Jumlah Lilitan (N)', default: 200, unit: 'lilitan' },
      { key: 'delta_Phi', label: 'Perubahan Fluks (ΔΦ)', default: 0.06, unit: 'Wb' },
      { key: 'delta_t', label: 'Selang Waktu (Δt)', default: 0.1, unit: 's' }
    ],
    outputUnit: 'V (Volt)',
    outputName: 'GGL Induksi (ε)'
  },
  {
    id: 'ggl-generator-ac',
    grade: '12',
    category: 'Induksi Elektromagnetik',
    title: 'GGL Maksimum Generator Listrik AC',
    expression: 'B * A * omega * N',
    latex: '\\varepsilon_{\\max} = B \\cdot A \\cdot \\omega \\cdot N',
    description: 'Tegangan puncak maksimum yang dihasilkan oleh kumparan berputar berkecepatan sudut omega di dalam medan magnet.',
    astronomyApplication: 'Prinsip generator turbin termal reaktor nuklir pangkalan bulan masa depan.',
    variables: [
      { key: 'B', label: 'Induksi Magnet (B)', default: 0.5, unit: 'T' },
      { key: 'A', label: 'Luas Penampang Kumparan (A)', default: 0.04, unit: 'm²' },
      { key: 'omega', label: 'Kecepatan Sudut (ω)', default: 100, unit: 'rad/s' },
      { key: 'N', label: 'Jumlah Lilitan (N)', default: 500, unit: 'lilitan' }
    ],
    outputUnit: 'V (Volt)',
    outputName: 'GGL Maksimum (ε_max)'
  },
  {
    id: 'energi-induktor-magnet',
    grade: '12',
    category: 'Induksi Elektromagnetik',
    title: 'Energi Tersimpan dalam Induktor',
    expression: '0.5 * L * (I^2)',
    latex: 'W = \\frac{1}{2} L \\cdot I^2',
    description: 'Energi potensial magnetik yang tersimpan di dalam medan magnet sebuah induktor berinduktansi L dialiri arus I.',
    astronomyApplication: 'Penyimpanan energi denyut magnetik dalam bintang magnetar dengan medan magnet terkuat di jagat raya.',
    variables: [
      { key: 'L', label: 'Induktansi Diri (L)', default: 0.5, unit: 'H', note: '0.5 Henry' },
      { key: 'I', label: 'Kuat Arus (I)', default: 6, unit: 'A' }
    ],
    outputUnit: 'J (Joule)',
    outputName: 'Energi Magnetik (W)'
  },
  {
    id: 'reaktansi-induktif-ac',
    grade: '12',
    category: 'Arus Bolak-Balik (RLC)',
    title: 'Reaktansi Induktif (Rangkaian AC)',
    expression: '2 * pi * f * L',
    latex: 'X_L = \\omega \\cdot L = 2\\pi f \\cdot L',
    description: 'Hambatan semu yang ditimbulkan oleh induktor terhadap aliran arus bolak-balik berfrekuensi f.',
    astronomyApplication: 'Filter frekuensi pada penerima sinyal radio teleskop SETI.',
    variables: [
      { key: 'f', label: 'Frekuensi AC (f)', default: 50, unit: 'Hz' },
      { key: 'L', label: 'Induktansi (L)', default: 0.2, unit: 'H' }
    ],
    outputUnit: 'Ω (Ohm)',
    outputName: 'Reaktansi Induktif (XL)'
  },
  {
    id: 'reaktansi-kapasitif-ac',
    grade: '12',
    category: 'Arus Bolak-Balik (RLC)',
    title: 'Reaktansi Kapasitif (Rangkaian AC)',
    expression: '1 / (2 * pi * f * C)',
    latex: 'X_C = \\frac{1}{\\omega \\cdot C} = \\frac{1}{2\\pi f \\cdot C}',
    description: 'Hambatan semu yang ditimbulkan oleh kapasitor terhadap arus bolak-balik berfrekuensi f.',
    astronomyApplication: 'Pemisahan sinyal frekuensi tinggi pada instrumentasi spektrograf inframerah.',
    variables: [
      { key: 'f', label: 'Frekuensi AC (f)', default: 50, unit: 'Hz' },
      { key: 'C', label: 'Kapasitansi (C)', default: 5e-6, unit: 'F', note: '5 μF = 5e-6 F' }
    ],
    outputUnit: 'Ω (Ohm)',
    outputName: 'Reaktansi Kapasitif (XC)'
  },
  {
    id: 'impedansi-rlc-seri',
    grade: '12',
    category: 'Arus Bolak-Balik (RLC)',
    title: 'Impedansi Total RLC Seri',
    expression: 'sqrt((R^2) + ((XL - XC)^2))',
    latex: 'Z = \\sqrt{R^2 + (X_L - X_C)^2}',
    description: 'Hambatan total total gabungan resistif, induktif, dan kapasitif dalam rangkaian seri bolak-balik.',
    astronomyApplication: 'Rangkaian penala frekuensi resonansi gelombang elektromagnetik komunikasi wahana Deep Space Network.',
    variables: [
      { key: 'R', label: 'Resistor (R)', default: 40, unit: 'Ω' },
      { key: 'XL', label: 'Reaktansi Induktif (X_L)', default: 100, unit: 'Ω' },
      { key: 'XC', label: 'Reaktansi Kapasitif (X_C)', default: 70, unit: 'Ω' }
    ],
    outputUnit: 'Ω (Ohm)',
    outputName: 'Impedansi Total (Z)'
  },

  // --- KELAS 12: RELATIVITAS KHUSUS (DARI MODUL BAB II) ---
  {
    id: 'dilatasi-waktu-relativistik',
    grade: '12',
    category: 'Relativitas Khusus',
    title: 'Dilatasi Waktu (Time Dilation)',
    expression: 'delta_t0 / sqrt(1 - ((v / c)^2))',
    latex: '\\Delta t = \\frac{\\Delta t_0}{\\sqrt{1 - \\frac{v^2}{c^2}}} = \\gamma \\cdot \\Delta t_0',
    description: 'Pemelaran selang waktu yang dialami oleh pengamat diam terhadap jam yang bergerak dengan kelajuan v mendekati kelajuan cahaya.',
    astronomyApplication: 'Waktu berjalan lebih lambat bagi astronaut yang meluncur pada kecepatan relativistik (Paradoks Kembar). Jam satelit GPS harus dikoreksi setiap hari.',
    variables: [
      { key: 'delta_t0', label: 'Waktu Sejati / Diam (Δt₀)', default: 3, unit: 'tahun/jam/detik' },
      { key: 'v', label: 'Kecepatan Gerak (v)', default: 2.4e8, unit: 'm/s', note: '2.4e8 m/s = 0.8 c' }
    ],
    outputUnit: 'satuan waktu (mengikuti input)',
    outputName: 'Waktu Relativistik (Δt)'
  },
  {
    id: 'kontraksi-panjang-relativistik',
    grade: '12',
    category: 'Relativitas Khusus',
    title: 'Kontraksi Panjang (Length Contraction)',
    expression: 'L0 * sqrt(1 - ((v / c)^2))',
    latex: 'L = L_0 \\sqrt{1 - \\frac{v^2}{c^2}} = \\frac{L_0}{\\gamma}',
    description: 'Penyusutan panjang benda pada arah geraknya yang teramati oleh pengamat diam ketika bergerak mendekati kecepatan cahaya.',
    astronomyApplication: 'Partikel muon kosmis berumur pendek dapat menembus atmosfer Bumi karena jarak atmosfer terkontraksi dari sudut pandang muon.',
    variables: [
      { key: 'L0', label: 'Panjang Sejati / Diam (L₀)', default: 100, unit: 'm' },
      { key: 'v', label: 'Kecepatan Relatif (v)', default: 1.8e8, unit: 'm/s', note: '1.8e8 m/s = 0.6 c' }
    ],
    outputUnit: 'm (meter)',
    outputName: 'Panjang Relativistik (L)'
  },
  {
    id: 'massa-relativistik',
    grade: '12',
    category: 'Relativitas Khusus',
    title: 'Massa Relativistik',
    expression: 'm0 / sqrt(1 - ((v / c)^2))',
    latex: 'm = \\frac{m_0}{\\sqrt{1 - \\frac{v^2}{c^2}}} = \\gamma \\cdot m_0',
    description: 'Massa inersial benda yang bertambah besar seiring kelajuannya mendekati kecepatan cahaya c.',
    astronomyApplication: 'Partikel di akselerator kosmis seperti pulsar membutuhkan energi tak hingga untuk mencapai c.',
    variables: [
      { key: 'm0', label: 'Massa Diam (m₀)', default: 1.67e-27, unit: 'kg', note: 'Massa proton' },
      { key: 'v', label: 'Kecepatan (v)', default: 2.7e8, unit: 'm/s', note: '0.9 c' }
    ],
    outputUnit: 'kg',
    outputName: 'Massa Relativistik (m)'
  },
  {
    id: 'penjumlahan-kecepatan-relativistik',
    grade: '12',
    category: 'Relativitas Khusus',
    title: 'Penjumlahan Kecepatan Relativistik Einstein',
    expression: '(v1 + v2) / (1 + (v1 * v2 / (c^2)))',
    latex: 'v_{ab} = \\frac{v_{ac} + v_{cb}}{1 + \\frac{v_{ac} \\cdot v_{cb}}{c^2}}',
    description: 'Kombinasi kecepatan dua objek yang bergerak berlawanan atau searah tanpa pernah melampaui kelajuan cahaya c.',
    astronomyApplication: 'Analisis kecepatan pemisahan dua jet relativistik galaksi radio yang tampak bergerak superluminal.',
    variables: [
      { key: 'v1', label: 'Kecepatan Objek 1 (v_ac)', default: 2.1e8, unit: 'm/s', note: '0.7 c' },
      { key: 'v2', label: 'Kecepatan Objek 2 (v_cb)', default: 2.4e8, unit: 'm/s', note: '0.8 c' }
    ],
    outputUnit: 'm/s',
    outputName: 'Kecepatan Relatif Gabungan (v_ab)'
  },

  // --- KELAS 12: FISIKA KUANTUM ---
  {
    id: 'efek-fotolistrik-einstein',
    grade: '12',
    category: 'Fisika Kuantum & Radiasi',
    title: 'Energi Kinetik Maksimum Efek Fotolistrik',
    expression: '(h * c / lambda) - W0',
    latex: 'E_k = h \\cdot f - W_0 = \\frac{h \\cdot c}{\\lambda} - W_0',
    description: 'Energi kinetik elektron yang lepas dari permukaan logam ketika disinari foton yang melebihi fungsi kerja logam (W0).',
    astronomyApplication: 'Prinsip deteksi foton individual pada sensor CCD teleskop optik Hubble dan James Webb.',
    variables: [
      { key: 'lambda', label: 'Panjang Gelombang Foton (λ)', default: 3e-7, unit: 'm', note: '300 nm = 3e-7 m' },
      { key: 'W0', label: 'Fungsi Kerja Logam (W₀)', default: 3.2e-19, unit: 'J', note: 'Misal: 2 eV = 3.2e-19 J' }
    ],
    outputUnit: 'Joule (J)',
    outputName: 'Energi Kinetik Maksimum (Ek)'
  },
  {
    id: 'hamburan-compton-shift',
    grade: '12',
    category: 'Fisika Kuantum & Radiasi',
    title: 'Pergeseran Panjang Gelombang Hamburan Compton',
    expression: '(h / (m_e * c)) * (1 - cos(theta * pi / 180))',
    latex: '\\Delta\\lambda = \\lambda\' - \\lambda_0 = \\frac{h}{m_e \\cdot c}(1 - \\cos\\theta)',
    description: 'Pertambahan panjang gelombang foton sinar-X atau sinar gamma setelah menumbuk elektron bebas pada sudut hamburan theta.',
    astronomyApplication: 'Efek Sunyaev-Zeldovich dalam kosmologi: foton radiasi CMB dihamburkan oleh gas panas dalam gugus galaksi.',
    variables: [
      { key: 'theta', label: 'Sudut Hamburan Foton (θ)', default: 60, unit: 'derajat' }
    ],
    outputUnit: 'meter (m)',
    outputName: 'Pergeseran Panjang Gelombang (Δλ)'
  },
  {
    id: 'panjang-gelombang-debroglie',
    grade: '12',
    category: 'Fisika Kuantum & Radiasi',
    title: 'Panjang Gelombang De Broglie (Dualisme Gelombang-Partikel)',
    expression: 'h / (m * v)',
    latex: '\\lambda = \\frac{h}{p} = \\frac{h}{m \\cdot v}',
    description: 'Panjang gelombang materi yang berasosiasi dengan partikel bermassa m yang bergerak dengan kecepatan v.',
    astronomyApplication: 'Prinsip mikroskop elektron dan kondisi degenerasi elektron dalam bintang katai putih (White Dwarf).',
    variables: [
      { key: 'm', label: 'Massa Partikel (m)', default: 9.11e-31, unit: 'kg', note: 'Massa elektron' },
      { key: 'v', label: 'Kecepatan Partikel (v)', default: 1e7, unit: 'm/s' }
    ],
    outputUnit: 'm (meter)',
    outputName: 'Panjang Gelombang De Broglie (λ)'
  },

  // --- KELAS 12: FISIKA INTI & RADIOAKTIVITAS ---
  {
    id: 'defek-massa-inti-atom',
    grade: '12',
    category: 'Fisika Inti & Radioaktivitas',
    title: 'Defek Massa Inti Atom',
    expression: '((Z * 1.007825) + ((A - Z) * 1.008665)) - m_inti',
    latex: '\\Delta m = [Z \\cdot m_p + (A - Z) \\cdot m_n] - m_{inti}',
    description: 'Selisih massa antara total nukleon penyusun bebas (proton & neutron) dengan massa inti atom utuh yang terikat.',
    astronomyApplication: 'Kunci energi nuklir bintang: defek massa inilah yang diubah menjadi energi panas radiasi bintang selama miliaran tahun.',
    variables: [
      { key: 'Z', label: 'Nomor Atom / Proton (Z)', default: 2, unit: 'nukleon', note: 'Helium: Z=2' },
      { key: 'A', label: 'Nomor Massa / Total (A)', default: 4, unit: 'nukleon', note: 'Helium-4: A=4' },
      { key: 'm_inti', label: 'Massa Inti Terukur (m_i)', default: 4.0015, unit: 'sma' }
    ],
    outputUnit: 'sma (satuan massa atom)',
    outputName: 'Defek Massa (Δm)'
  },
  {
    id: 'energi-ikat-inti',
    grade: '12',
    category: 'Fisika Inti & Radioaktivitas',
    title: 'Energi Ikat Inti Atom (Nuclear Binding Energy)',
    expression: 'delta_m * 931.5',
    latex: 'E_{ikat} = \\Delta m \\times 931{,}5 \\text{ MeV}',
    description: 'Energi total yang dibutuhkan untuk memisahkan inti atom menjadi proton dan neutron individualnya.',
    astronomyApplication: 'Menentukan kestabilan unsur kosmis: Besi-56 memiliki energi ikat per nukleon tertinggi di alam semesta.',
    variables: [
      { key: 'delta_m', label: 'Defek Massa (Δm)', default: 0.0315, unit: 'sma', note: 'Helium-4: ~0.0315 sma' }
    ],
    outputUnit: 'MeV (Mega Elektron Volt)',
    outputName: 'Energi Ikat Inti (E_ikat)'
  },
  {
    id: 'waktu-paruh-radioaktif',
    grade: '12',
    category: 'Fisika Inti & Radioaktivitas',
    title: 'Peluruhan Radioaktif (Waktu Paruh)',
    expression: 'N0 * (0.5 ^ (t / Thalf))',
    latex: 'N(t) = N_0 \\left(\\frac{1}{2}\\right)^{\\frac{t}{T_{1/2}}}',
    description: 'Jumlah partikel atau massa isotop radioaktif yang tersisa setelah meluruh selama selang waktu t dengan waktu paruh Thalf.',
    astronomyApplication: 'Penanggalan radiometrik meteorit dan batuan Bulan untuk menentukan usia Tata Surya kita (~4.56 miliar tahun).',
    variables: [
      { key: 'N0', label: 'Jumlah / Massa Awal (N₀)', default: 80, unit: 'gram/inti' },
      { key: 't', label: 'Lama Waktu Peluruhan (t)', default: 24, unit: 'hari/tahun' },
      { key: 'Thalf', label: 'Waktu Paruh (T_1/2)', default: 8, unit: 'hari/tahun' }
    ],
    outputUnit: 'satuan awal (gram/inti)',
    outputName: 'Jumlah Zat Tersisa (N)'
  },
  {
    id: 'aktivitas-radioaktif-hukum',
    grade: '12',
    category: 'Fisika Inti & Radioaktivitas',
    title: 'Laju Aktivitas Radioaktif',
    expression: '(0.693 / Thalf) * N',
    latex: 'A = \\lambda \\cdot N = \\frac{\\ln 2}{T_{1/2}} \\cdot N',
    description: 'Banyaknya peluruhan inti radioaktif yang terjadi per satuan detik (Bequerel).',
    astronomyApplication: 'Pemanas radioisotop RTG yang memberi daya wahana antariksa Voyager 1 & 2 di ruang antarbintang.',
    variables: [
      { key: 'Thalf', label: 'Waktu Paruh dalam Detik (T_1/2)', default: 693000, unit: 'sekon' },
      { key: 'N', label: 'Jumlah Partikel Radioaktif (N)', default: 1e20, unit: 'partikel' }
    ],
    outputUnit: 'Bq (Bequerel = peluruhan/sekon)',
    outputName: 'Aktivitas Inti (A)'
  }
];
