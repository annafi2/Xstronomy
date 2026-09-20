// Data Soal Kuis Fisika Awal (Fallback Client & Initial State)

export const INITIAL_QUIZ_DATA = [
  {
    id: 'quiz-coulomb-1',
    grade: 12,
    topic: 'Listrik Statis & Hukum Coulomb',
    difficulty: 'Sedang',
    question: 'Dua buah muatan titik $q_1 = 4\\,\\mu\\text{C}$ dan $q_2 = 9\\,\\mu\\text{C}$ terpisah sejauh $30\\text{ cm}$ di ruang hampa. Jika konstanta Coulomb $K = 9 \\times 10^9\\,\\text{N}\\cdot\\text{m}^2/\\text{C}^2$, berapakah besar gaya tolak-menolak Coulomb antara kedua muatan tersebut?',
    questionLatex: 'F = K \\frac{q_1 \\cdot q_2}{r^2}',
    formulaHint: 'F = K \\frac{q_1 q_2}{r^2} \\quad (r = 0.3\\text{ m})',
    options: [
      { text: '1.8 N', latex: '1{,}8\\,\\text{N}', isCorrect: false },
      { text: '3.6 N', latex: '3{,}6\\,\\text{N}', isCorrect: true },
      { text: '7.2 N', latex: '7{,}2\\,\\text{N}', isCorrect: false },
      { text: '36 N', latex: '36\\,\\text{N}', isCorrect: false }
    ],
    explanation: 'Substitusi ke rumus gaya Coulomb:\n$$F = 9 \\times 10^9 \\times \\frac{(4 \\times 10^{-6}) \\times (9 \\times 10^{-6})}{(0{,}3)^2} = \\frac{324 \\times 10^{-3}}{0{,}09} = 3{,}6\\,\\text{N}.$$'
  },
  {
    id: 'quiz-hambatan-1',
    grade: 12,
    topic: 'Hambatan Jenis & Hukum Ohm',
    difficulty: 'Mudah',
    question: 'Kawat tembaga sepanjang $20\\text{ m}$ memiliki luas penampang $2\\,\\text{mm}^2$. Jika hambatan jenis tembaga $\\rho = 1{,}7 \\times 10^{-8}\\,\\Omega\\cdot\\text{m}$, berapakah nilai hambatan kawat tersebut?',
    questionLatex: 'R = \\rho \\frac{l}{A}',
    formulaHint: 'A = 2\\,\\text{mm}^2 = 2 \\times 10^{-6}\\,\\text{m}^2',
    options: [
      { text: '0.17 Ω', latex: '0{,}17\\,\\Omega', isCorrect: true },
      { text: '1.7 Ω', latex: '1{,}7\\,\\Omega', isCorrect: false },
      { text: '0.34 Ω', latex: '0{,}34\\,\\Omega', isCorrect: false },
      { text: '0.017 Ω', latex: '0{,}017\\,\\Omega', isCorrect: false }
    ],
    explanation: '$$R = \\rho \\frac{l}{A} = 1{,}7 \\times 10^{-8} \\times \\frac{20}{2 \\times 10^{-6}} = 1{,}7 \\times 10^{-8} \\times 10^7 = 0{,}17\\,\\Omega.$$'
  },
  {
    id: 'quiz-shunt-1',
    grade: 12,
    topic: 'Pengukuran Hambatan Shunt Amperemeter',
    difficulty: 'Tantangan',
    question: 'Sebuah amperemeter mempunyai hambatan dalam $R_A = 18\\,\\Omega$ dan batas ukur maksimum $10\\,\\text{mA}$. Agar amperemeter dapat digunakan untuk mengukur kuat arus hingga $100\\,\\text{mA}$, berapakah nilai hambatan shunt ($R_{sh}$) yang harus dipasang paralel?',
    questionLatex: 'R_{sh} = \\frac{R_A}{n - 1} \\quad \\text{dengan } n = \\frac{I_t}{I_0}',
    formulaHint: 'n = 100\\,\\text{mA} / 10\\,\\text{mA} = 10',
    options: [
      { text: '2 Ω', latex: '2\\,\\Omega', isCorrect: true },
      { text: '1.8 Ω', latex: '1{,}8\\,\\Omega', isCorrect: false },
      { text: '9 Ω', latex: '9\\,\\Omega', isCorrect: false },
      { text: '0.5 Ω', latex: '0{,}5\\,\\Omega', isCorrect: false }
    ],
    explanation: 'Faktor pelipat ukur $n = \\frac{I_t}{I_0} = \\frac{100\\,\\text{mA}}{10\\,\\text{mA}} = 10$.\nHambatan shunt:\n$$R_{sh} = \\frac{R_A}{n - 1} = \\frac{18}{10 - 1} = \\frac{18}{9} = 2\\,\\Omega.$$'
  },
  {
    id: 'quiz-magnet-1',
    grade: 12,
    topic: 'Medan Magnet Kawat Lurus',
    difficulty: 'Mudah',
    question: 'Kawat lurus panjang dialiri arus listrik $I = 5\\,\\text{A}$. Berapakah induksi magnetik $B$ pada titik yang berjarak $a = 10\\text{ cm}$ dari kawat? (Permeabilitas $\\mu_0 = 4\\pi \\times 10^{-7}\\,\\text{Wb}/\\text{A}\\cdot\\text{m}$)',
    questionLatex: 'B = \\frac{\\mu_0 I}{2\\pi a}',
    formulaHint: 'a = 10\\text{ cm} = 0.1\\text{ m}',
    options: [
      { text: '1 × 10⁻⁵ T', latex: '1 \\times 10^{-5}\\,\\text{T}', isCorrect: true },
      { text: '2 × 10⁻⁵ T', latex: '2 \\times 10^{-5}\\,\\text{T}', isCorrect: false },
      { text: '5 × 10⁻⁶ T', latex: '5 \\times 10^{-6}\\,\\text{T}', isCorrect: false },
      { text: '4π × 10⁻⁵ T', latex: '4\\pi \\times 10^{-5}\\,\\text{T}', isCorrect: false }
    ],
    explanation: '$$B = \\frac{\\mu_0 I}{2\\pi a} = \\frac{(4\\pi \\times 10^{-7}) \\times 5}{2\\pi \\times 0{,}1} = \\frac{20\\pi \\times 10^{-7}}{0{,}2\\pi} = 10^{-5}\\,\\text{T}.$$'
  },
  {
    id: 'quiz-lorentz-1',
    grade: 12,
    topic: 'Gaya Lorentz Muatan Gerak',
    difficulty: 'Sedang',
    question: 'Sebuah proton ($q = 1{,}6 \\times 10^{-19}\\,\\text{C}$, $m = 1{,}67 \\times 10^{-27}\\,\\text{kg}$) meluncur tegak lurus ke dalam medan magnet homogen $B = 0{,}2\\,\\text{T}$ dengan kelajuan $v = 2 \\times 10^6\\,\\text{m/s}$. Berapakah jari-jari lintasan sirkular proton tersebut?',
    questionLatex: 'r = \\frac{m \\cdot v}{q \\cdot B}',
    formulaHint: 'Gaya Lorentz berfungsi sebagai gaya sentripetal: q v B = m \\frac{v^2}{r}',
    options: [
      { text: '0.052 m', latex: '0{,}052\\,\\text{m} \\; (5{,}2\\,\\text{cm})', isCorrect: false },
      { text: '0.104 m', latex: '0{,}104\\,\\text{m} \\; (10{,}4\\,\\text{cm})', isCorrect: true },
      { text: '0.208 m', latex: '0{,}208\\,\\text{m}', isCorrect: false },
      { text: '0.026 m', latex: '0{,}026\\,\\text{m}', isCorrect: false }
    ],
    explanation: '$$r = \\frac{m v}{q B} = \\frac{(1{,}67 \\times 10^{-27}) \\times (2 \\times 10^6)}{(1{,}6 \\times 10^{-19}) \\times 0{,}2} = \\frac{3{,}34 \\times 10^{-21}}{0{,}32 \\times 10^{-19}} \\approx 0{,}104\\,\\text{m} = 10{,}4\\,\\text{cm}.$$'
  },
  {
    id: 'quiz-faraday-1',
    grade: 12,
    topic: 'Hukum Induksi Faraday',
    difficulty: 'Sedang',
    question: 'Kumparan dengan $N = 200\\text{ lilitan}$ mengalami perubahan fluks magnetik dari $0{,}08\\,\\text{Wb}$ menjadi $0{,}02\\,\\text{Wb}$ dalam selang waktu $\\Delta t = 0{,}1\\,\\text{s}$. Tentukan besar GGL induksi rata-rata yang timbul pada kumparan!',
    questionLatex: '\\varepsilon = -N \\frac{\\Delta \\Phi}{\\Delta t}',
    formulaHint: '\\Delta \\Phi = \\Phi_2 - \\Phi_1 = 0.02 - 0.08 = -0.06\\,\\text{Wb}',
    options: [
      { text: '60 V', latex: '60\\,\\text{V}', isCorrect: false },
      { text: '120 V', latex: '120\\,\\text{V}', isCorrect: true },
      { text: '180 V', latex: '180\\,\\text{V}', isCorrect: false },
      { text: '240 V', latex: '240\\,\\text{V}', isCorrect: false }
    ],
    explanation: '$$\\varepsilon = -N \\frac{\\Delta \\Phi}{\\Delta t} = -200 \\times \\frac{0{,}02 - 0{,}08}{0{,}1} = -200 \\times (-0{,}6) = +120\\,\\text{V}.$$'
  },
  {
    id: 'quiz-rlc-1',
    grade: 12,
    topic: 'Rangkaian RLC Seri & Impedansi',
    difficulty: 'Tantangan',
    question: 'Rangkaian seri RLC memiliki resistor $R = 40\\,\\Omega$, induktor dengan reaktansi $X_L = 100\\,\\Omega$, dan kapasitor dengan reaktansi $X_C = 70\\,\\Omega$. Berapakah impedansi total ($Z$) rangkaian tersebut?',
    questionLatex: 'Z = \\sqrt{R^2 + (X_L - X_C)^2}',
    formulaHint: 'X_L - X_C = 100 - 70 = 30\\,\\Omega',
    options: [
      { text: '50 Ω', latex: '50\\,\\Omega', isCorrect: true },
      { text: '70 Ω', latex: '70\\,\\Omega', isCorrect: false },
      { text: '110 Ω', latex: '110\\,\\Omega', isCorrect: false },
      { text: '210 Ω', latex: '210\\,\\Omega', isCorrect: false }
    ],
    explanation: '$$Z = \\sqrt{R^2 + (X_L - X_C)^2} = \\sqrt{40^2 + (100 - 70)^2} = \\sqrt{1600 + 900} = \\sqrt{2500} = 50\\,\\Omega.$$'
  },
  {
    id: 'quiz-relativity-1',
    grade: 12,
    topic: 'Dilatasi Waktu Relativistik',
    difficulty: 'Sedang',
    question: 'Sebuah pesawat antariksa meluncur meninggalkan Bumi dengan kelajuan $v = 0{,}8\\,c$. Jika astronaut di dalam pesawat mengukur perjalanan berlangsung selama $\\Delta t_0 = 3\\text{ tahun}$ menurut jamnya, berapa tahun waktu yang teramati oleh pengamat di Bumi?',
    questionLatex: '\\Delta t = \\frac{\\Delta t_0}{\\sqrt{1 - (v/c)^2}} = \\gamma \\cdot \\Delta t_0',
    formulaHint: '\\sqrt{1 - (0.8)^2} = \\sqrt{1 - 0.64} = \\sqrt{0.36} = 0.6',
    options: [
      { text: '3.6 tahun', latex: '3{,}6\\text{ tahun}', isCorrect: false },
      { text: '4.5 tahun', latex: '4{,}5\\text{ tahun}', isCorrect: false },
      { text: '5.0 tahun', latex: '5{,}0\\text{ tahun}', isCorrect: true },
      { text: '6.2 tahun', latex: '6{,}2\\text{ tahun}', isCorrect: false }
    ],
    explanation: 'Faktor Lorentz:\n$$\\gamma = \\frac{1}{\\sqrt{1 - (0{,}8)^2}} = \\frac{1}{0{,}6} = \\frac{5}{3}$$\nWaktu bagi pengamat Bumi:\n$$\\Delta t = \\gamma \\cdot \\Delta t_0 = \\frac{5}{3} \\times 3 = 5{,}0\\text{ tahun}.$$'
  },
  {
    id: 'quiz-relativity-2',
    grade: 12,
    topic: 'Kontraksi Panjang Relativistik',
    difficulty: 'Sedang',
    question: 'Sebuah pesawat ruang angkasa memiliki panjang diam $L_0 = 100\\text{ meter}$. Ketika bergerak melewati stasiun antariksa dengan kecepatan $v = 0{,}6\\,c$, berapakah panjang pesawat yang terukur oleh awak stasiun?',
    questionLatex: 'L = L_0 \\sqrt{1 - (v/c)^2}',
    formulaHint: '\\sqrt{1 - (0.6)^2} = 0.8',
    options: [
      { text: '60 meter', latex: '60\\,\\text{m}', isCorrect: false },
      { text: '80 meter', latex: '80\\,\\text{m}', isCorrect: true },
      { text: '100 meter', latex: '100\\,\\text{m}', isCorrect: false },
      { text: '125 meter', latex: '125\\,\\text{m}', isCorrect: false }
    ],
    explanation: '$$L = L_0 \\sqrt{1 - (v/c)^2} = 100 \\times \\sqrt{1 - 0{,}36} = 100 \\times 0{,}8 = 80\\,\\text{m}.$$'
  },
  {
    id: 'quiz-quantum-1',
    grade: 12,
    topic: 'Energi Foton & Efek Fotolistrik',
    difficulty: 'Sedang',
    question: 'Foton sinar ultraviolet memiliki frekuensi $f = 1{,}5 \\times 10^{15}\\,\\text{Hz}$. Berapakah energi foton tersebut dalam satuan Joule jika konstanta Planck $h = 6{,}63 \\times 10^{-34}\\,\\text{J}\\cdot\\text{s}$?',
    questionLatex: 'E = h \\cdot f',
    formulaHint: 'E = h f',
    options: [
      { text: '4.42 × 10⁻¹⁹ J', latex: '4{,}42 \\times 10^{-19}\\,\\text{J}', isCorrect: false },
      { text: '9.945 × 10⁻¹⁹ J', latex: '9{,}945 \\times 10^{-19}\\,\\text{J}', isCorrect: true },
      { text: '6.63 × 10⁻¹⁹ J', latex: '6{,}63 \\times 10^{-19}\\,\\text{J}', isCorrect: false },
      { text: '1.5 × 10⁻¹⁸ J', latex: '1{,}5 \\times 10^{-18}\\,\\text{J}', isCorrect: false }
    ],
    explanation: '$$E = h f = (6{,}63 \\times 10^{-34}) \\times (1{,}5 \\times 10^{15}) = 9{,}945 \\times 10^{-19}\\,\\text{J}\\; (\\approx 6{,}2\\,\\text{eV}).$$'
  },
  {
    id: 'quiz-nuclear-1',
    grade: 12,
    topic: 'Defek Massa & Energi Ikat Inti',
    difficulty: 'Tantangan',
    question: 'Inti atom Helium $_2^4\\text{He}$ memiliki massa terukur $m_i = 4{,}0015\\,\\text{sma}$. Jika massa proton $m_p = 1{,}0078\\,\\text{sma}$ dan massa neutron $m_n = 1{,}0087\\,\\text{sma}$, berapakah defek massa ($\\Delta m$) inti tersebut?',
    questionLatex: '\\Delta m = [Z \\cdot m_p + (A - Z) \\cdot m_n] - m_i',
    formulaHint: 'Z = 2, \\; N = 4 - 2 = 2',
    options: [
      { text: '0.0155 sma', latex: '0{,}0155\\,\\text{sma}', isCorrect: false },
      { text: '0.0315 sma', latex: '0{,}0315\\,\\text{sma}', isCorrect: true },
      { text: '0.0630 sma', latex: '0{,}0630\\,\\text{sma}', isCorrect: false },
      { text: '0.0035 sma', latex: '0{,}0035\\,\\text{sma}', isCorrect: false }
    ],
    explanation: 'Massa nukleon penyusun:\n$$m_{nukleon} = 2(1{,}0078) + 2(1{,}0087) = 2{,}0156 + 2{,}0174 = 4{,}0330\\,\\text{sma}$$\nDefek massa:\n$$\\Delta m = 4{,}0330 - 4{,}0015 = 0{,}0315\\,\\text{sma}.$$\n(Jika dikonversi ke energi ikat: $E = 0{,}0315 \\times 931{,}5 \\approx 29{,}34\\,\\text{MeV}$).'
  },
  {
    id: 'quiz-nuclear-2',
    grade: 12,
    topic: 'Waktu Paruh Radioaktif',
    difficulty: 'Mudah',
    question: 'Sampel isotop Iodium-131 memiliki waktu paruh $T_{1/2} = 8\\text{ hari}$. Jika massa awal zat adalah $m_0 = 80\\text{ gram}$, berapakah massa zat yang tersisa setelah meluruh selama $t = 24\\text{ hari}$?',
    questionLatex: 'm = m_0 \\left(\\frac{1}{2}\\right)^{t / T_{1/2}}',
    formulaHint: 'n = t / T_{1/2} = 24 / 8 = 3',
    options: [
      { text: '5 gram', latex: '5\\,\\text{gram}', isCorrect: false },
      { text: '10 gram', latex: '10\\,\\text{gram}', isCorrect: true },
      { text: '20 gram', latex: '20\\,\\text{gram}', isCorrect: false },
      { text: '40 gram', latex: '40\\,\\text{gram}', isCorrect: false }
    ],
    explanation: 'Jumlah periode peluruhan $n = \\frac{t}{T_{1/2}} = \\frac{24}{8} = 3$.\nMassa tersisa:\n$$m = 80 \\times \\left(\\frac{1}{2}\\right)^3 = 80 \\times \\frac{1}{8} = 10\\,\\text{gram}.$$'
  }
];
