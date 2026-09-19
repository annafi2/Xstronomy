// Kurikulum Fisika SMA Kelas 10-12 sebagai Fundamental Astrofisika

export const CURRICULUM_DATA = [
  {
    grade: '10',
    gradeTitle: 'Kelas 10 SMA: Mekanika Klasik, Gravitasi & Dinamika Kosmik',
    description: 'Fondasi gerak benda, interaksi gravitasi Newton, dan dinamika orbit planet yang mendasari mekanika benda langit (Celestial Mechanics).',
    topics: [
      {
        id: 'newton-gravity',
        title: 'Hukum Gravitasi Newton & Orbit Kepler',
        icon: 'Orbit',
        summary: 'Gaya gravitasi universal sebagai pengikat tata surya, orbit planet, dan pembentukan struktur galaksi.',
        physicsConcept: 'Setiap partikel materi di alam semesta menarik partikel lain dengan gaya yang sebanding dengan hasil kali kedua massa dan berbanding terbalik dengan kuadrat jaraknya. Gaya ini berlaku universal baik di laboratorium maupun di kedalaman kosmos.',
        astroBridge: 'Hukum gravitasi Newton menyempurnakan 3 Hukum Kepler empiris. Dari rumus ini, astronom dapat menimbang massa Matahari, massa planet asing (eksoplanet), bahkan mendeteksi keberadaan Materi Gelap (Dark Matter) melalui anomali kurva rotasi galaksi spiral.',
        keyFormulas: [
          {
            name: 'Gaya Gravitasi Universal',
            latex: 'F = \\frac{G \\cdot M \\cdot m}{r^2}',
            presetId: 'gravitasi-newton',
            meaning: 'Gaya tarik timbal balik antara dua objek bermassa M dan m berjarak r.'
          },
          {
            name: 'Kecepatan Orbit Sirkular',
            latex: 'v_{orb} = \\sqrt{\\frac{G \\cdot M}{r}}',
            presetId: 'kecepatan-orbit',
            meaning: 'Kelajuan linear yang dibutuhkan sebuah satelit agar tetap berada di orbit melingkar stabil.'
          },
          {
            name: 'Hukum III Kepler Harmonik',
            latex: 'T^2 = \\frac{4\\pi^2}{G \\cdot M} a^3',
            presetId: 'kepler-periode',
            meaning: 'Kuadrat periode revolusi berbanding lurus dengan pangkat tiga sumbu semi-mayor orbit.'
          }
        ],
        realScenario: {
          title: 'Menimbang Massa Lubang Hitam Supermasif Bima Sakti (Sagittarius A*)',
          description: 'Astronom mengamati bintang S2 yang mengitari pusat galaksi kita dalam orbit elips dengan periode 16 tahun dan sumbu semi-mayor ~1000 AU. Menggunakan Hukum III Kepler versi Newton, ilmuwan membuktikan adanya massa terpusat sebesar 4,1 juta kali massa Matahari di ruang sekecil tata surya — membuktikan eksistensi supermassive black hole!'
        },
        quiz: {
          question: 'Jika jarak sebuah planet dari Matahari digandakan menjadi 2 kali lipat semula, bagaimana pengaruhnya terhadap gaya gravitasi matahari yang dialaminya?',
          options: [
            'Menjadi 2 kali lebih besar',
            'Menjadi 1/2 kali semula',
            'Menjadi 1/4 kali semula',
            'Tetap konstan'
          ],
          correctIndex: 2,
          explanation: 'Berdasarkan hukum kuadrat terbalik (inverse-square law) F ~ 1/r^2, jika jarak r menjadi 2r, maka gaya menjadi 1/(2^2) = 1/4 kali semula.'
        }
      },
      {
        id: 'escape-velocity-energy',
        title: 'Energi Gravitasi & Kecepatan Lepas (Escape Velocity)',
        icon: 'Rocket',
        summary: 'Kekekalan energi mekanik, energi potensial gravitasi tak hingga, dan syarat batas wahana antariksa keluar dari pengaruh gravitasi.',
        physicsConcept: 'Energi mekanik total sistem tertutup adalah kekal (Em = Ek + Ep). Karena medan gravitasi bersifat konservatif, energi potensial bernilai nol di jarak tak berhingga dan negatif di dalam medan gravitasi (sumur potensial).',
        astroBridge: 'Kecepatan lepas menentukan apakah sebuah planet dapat mempertahankan atmosfernya. Di Bulan, kecepatan lepasnya rendah (~2,38 km/s), sehingga gas seperti Oksigen dan Nitrogen menguap ke angkasa luar. Jika kecepatan lepas suatu benda sama dengan kelajuan cahaya (c), objek tersebut menjadi Lubang Hitam.',
        keyFormulas: [
          {
            name: 'Kecepatan Lepas',
            latex: 'v_{esc} = \\sqrt{\\frac{2 \\cdot G \\cdot M}{R}}',
            presetId: 'kecepatan-lepas',
            meaning: 'Kelajuan awal minimum agar objek mencapai tak hingga dengan kecepatan sisa nol.'
          },
          {
            name: 'Energi Potensial Gravitasi Kosmis',
            latex: 'E_p = -\\frac{G \\cdot M \\cdot m}{r}',
            presetId: 'energi-potensial-gravitasi',
            meaning: 'Energi ikatan gravitasi dua benda.'
          }
        ],
        realScenario: {
          title: 'Mengapa Atmosfer Mars Menipis dan Mars Kehilangan Air?',
          description: 'Massa Mars hanya ~0,107 massa Bumi dengan kecepatan lepas ~5,0 km/s (setengah Bumi). Tanpa medan magnet global dan gravitasi yang lebih lemah, radiasi angin matahari berhasil meniup sebagian besar atmosfer Mars selama miliaran tahun, mengeringkan lautan kunonya.'
        },
        quiz: {
          question: 'Berapa perbandingan antara kecepatan lepas (v_esc) dan kecepatan orbit sirkular (v_orb) pada ketinggian yang sama dari pusat planet?',
          options: [
            'v_esc = v_orb',
            'v_esc = √2 · v_orb (~1,414 kali)',
            'v_esc = 2 · v_orb',
            'v_esc = (1/√2) · v_orb'
          ],
          correctIndex: 1,
          explanation: 'v_esc = √(2GM/R) sedangkan v_orb = √(GM/R), sehingga v_esc = √2 · v_orb.'
        }
      }
    ]
  },
  {
    grade: '11',
    gradeTitle: 'Kelas 11 SMA: Dinamika Rotasi, Fluida Bintang, & Gelombang Cahaya',
    description: 'Penerapan momentum sudut pada pulsar, keseimbangan tekanan bintang, serta spektroskopi dan optika gelombang cahaya dalam teleskop kosmis.',
    topics: [
      {
        id: 'rotational-dynamics',
        title: 'Kekekalan Momentum Sudut & Bintang Neutron / Pulsar',
        icon: 'RotateCw',
        summary: 'Momentum sudut dalam ruang hampa, momen inersia massa terkompresi, dan kelahiran pulsar super-cepat.',
        physicsConcept: 'Jika torsi eksternal pada sistem bernilai nol (Sigma tau = 0), maka momentum sudut total adalah kekal: L = I · omega = konstan. Ketika momen inersia (I) berkurang karena massa mengerut ke pusat, kecepatan sudut (omega) harus meningkat drastis.',
        astroBridge: 'Ketika bintang masif kehabisan bahan bakar nuklir, intinya runtuh dari radius ~700.000 km menjadi bola seukuran kota (~10-15 km) bernama Bintang Neutron. Karena momentum sudut kekal, rotasinya yang semula 1 kali per bulan melonjak menjadi ratusan putaran per detik, memancarkan gelombang radio seperti mercusuar kosmis (Pulsar).',
        keyFormulas: [
          {
            name: 'Kekekalan Momentum Sudut Runtuhan Bintang',
            latex: '\\omega_2 = \\omega_1 \\cdot \\left(\\frac{R_1}{R_2}\\right)^2',
            presetId: 'momentum-sudut-bintang',
            meaning: 'Percepatan putaran bintang akibat penyusutan radius drastis saat supernova.'
          }
        ],
        realScenario: {
          title: 'Pulsar Kepiting (Crab Pulsar)',
          description: 'Sisa ledakan supernova yang dicatat astronom Tiongkok pada tahun 1054 M kini menjadi Crab Pulsar. Bintang neutron ini memiliki diameter hanya 20 km namun bermassa 1,4 kali Matahari, berputar 30 kali setiap detiknya!'
        },
        quiz: {
          question: 'Jika radius sebuah bintang mengerut menjadi 1/100 dari ukuran aslinya saat meledak tanpa kehilangan massa rotasi, berapakah kelipatan kecepatan sudut barunya?',
          options: [
            '100 kali lebih cepat',
            '10.000 kali lebih cepat',
            'Sama saja',
            '100 kali lebih lambat'
          ],
          correctIndex: 1,
          explanation: 'Karena momen inersia bola pejal I = 2/5 M R^2, jika R menjadi R/100 maka I menjadi I/10.000. Karena L = I·ω kekal, maka ω menjadi 10.000 kali lebih cepat.'
        }
      },
      {
        id: 'stellar-fluids',
        title: 'Keseimbangan Hidrostatis & Termodinamika Bintang',
        icon: 'Flame',
        summary: 'Pertarungan abadi antara tarikan gravitasi ke dalam dan tekanan radiasi/gas termal ke luar di dalam bintang.',
        physicsConcept: 'Fluida statis memenuhi gradien tekanan dP/dr = -rho · g. Pada bintang gas murni, tekanan termal dan radiasi foton menahan seluruh massa luar bintang agar tidak runtuh karena beratnya sendiri.',
        astroBridge: 'Keseimbangan Hidrostatis adalah rahasia mengapa Matahari stabil bersinar selama miliaran tahun. Jika fusi nuklir mereda, gravitasi memampatkan inti, menaikkan suhu dan tekanan sampai fusi kembali seimbang. Jika tekanan radiasi hilang total, bintang akan mati menjadi Katai Putih, Bintang Netron, atau Lubang Hitam.',
        keyFormulas: [
          {
            name: 'Estimasi Tekanan Inti Bintang',
            latex: 'P_c \\sim \\frac{G \\cdot M^2}{R^4}',
            presetId: 'keseimbangan-hidrostatis',
            meaning: 'Tekanan luar biasa di pusat bintang yang dibutuhkan untuk menopang berat kolom gas di atasnya.'
          }
        ],
        realScenario: {
          title: 'Inti Matahari: Reaktor Fusi Alami',
          description: 'Di pusat Matahari, tekanan mencapai ~250 miliar atmosfer (2,5 x 10^16 Pa) dengan kerapatan 150 kali air dan suhu 15 juta Kelvin, cukup rapat untuk memaksa proton mengatasi tolakan Coulomb dan berfusi menjadi helium.'
        },
        quiz: {
          question: 'Apa yang terjadi pada bintang deret utama jika gaya gravitasi tiba-tiba melebihi tekanan radiasi inti?',
          options: [
            'Bintang akan mengembang menjadi raksasa merah seketika',
            'Inti bintang akan mengerut dan memanas hingga tekanan naik kembali',
            'Bintang langsung meledak seketika tanpa sisa',
            'Bintang kehilangan gravitasinya'
          ],
          correctIndex: 1,
          explanation: 'Keruntuhan gravitasi menyebabkan kenaikan kerapatan dan suhu gas (hukum termodinamika), yang selanjutnya meningkatkan laju fusi dan tekanan hingga tercapai titik keseimbangan baru.'
        }
      },
      {
        id: 'optics-doppler',
        title: 'Gelombang Cahaya, Difraksi & Efek Doppler Kosmis',
        icon: 'Eye',
        summary: 'Interferensi, kriteria Rayleigh resolusi teleskop, dan pergeseran merah (redshift) sebagai bukti pemuaian ruang alam semesta.',
        physicsConcept: 'Cahaya merambat sebagai gelombang elektromagnetik transversal. Saat sumber gelombang bergerak relatif terhadap pengamat, frekuensi dan panjang gelombang yang teramati akan berubah (Efek Doppler). Selain itu, apertur celah melingkar membatasi resolusi bayangan akibat difraksi Airy disk.',
        astroBridge: 'Edwin Hubble mengamati bahwa garis spektrum absorpsi galaksi-galaksi jauh bergeser ke arah warna merah (Redshift, z > 0). Menggunakan efek Doppler, terbukti galaksi-galaksi menjauhi kita: alam semesta sedang memuai! Sementara itu, kriteria Rayleigh menjelaskan mengapa teleskop berdiameter besar (seperti JWST 6,5 m) memiliki daya pisah sudut tajam luar biasa.',
        keyFormulas: [
          {
            name: 'Redshift Kosmis Non-Relativistik',
            latex: 'z = \\frac{\\Delta \\lambda}{\\lambda_0} = \\frac{v}{c}',
            presetId: 'doppler-redshift',
            meaning: 'Rasio perubahan panjang gelombang terhadap panjang gelombang diam akibat kecepatan menjauh.'
          },
          {
            name: 'Resolusi Sudut Difraksi (Rayleigh)',
            latex: '\\theta = 1.22 \\cdot \\frac{\\lambda}{D}',
            presetId: 'resolusi-teleskop',
            meaning: 'Sudut separasi terkecil yang bisa dibedakan secara terpisah oleh cermin berdiameter D.'
          }
        ],
        realScenario: {
          title: 'Menemukan Galaksi Paling Awal dengan James Webb Space Telescope (JWST)',
          description: 'JWST mendeteksi galaksi JADES-GS-z14-0 pada redshift z = 14,32! Cahaya ultraviolet yang dipancarkan galaksi ini 13,5 miliar tahun lalu telah diregangkan oleh ekspansi kosmos menjadi inframerah yang hanya dapat ditangkap oleh instrumen inframerah dingin JWST.'
        },
        quiz: {
          question: 'Jika diameter lensa/cermin teleskop diperbesar 2 kali lipat, bagaimana resolusi sudut pemisahan minimum (theta)?',
          options: [
            'Menjadi 2 kali lebih besar (kurang tajam)',
            'Menjadi 1/2 kali semula (2 kali lebih tajam)',
            'Menjadi 4 kali lebih tajam',
            'Tidak berubah karena panjang gelombang sama'
          ],
          correctIndex: 1,
          explanation: 'Berdasarkan kriteria Rayleigh theta = 1.22 lambda / D, nilai sudut theta berbanding terbalik dengan D. Sudut lebih kecil berarti kemampuan memisahkan detail halus menjadi 2 kali lebih tajam.'
        }
      }
    ]
  },
  {
    grade: '12',
    gradeTitle: 'Kelas 12 SMA: Fisika Modern, Kuantum, Relativitas & Kosmologi',
    description: 'Radiasi benda hitam bintang, fusi inti E=mc², dilatasi waktu relativistik, serta fisika lubang hitam dan awal mula alam semesta.',
    topics: [
      {
        id: 'blackbody-radiation',
        title: 'Radiasi Benda Hitam, Hukum Stefan-Boltzmann & Hukum Wien',
        icon: 'Sun',
        summary: 'Spektrum emisi termal bintang, klasifikasi warna dan temperatur permukaan bintang, serta luminositas total.',
        physicsConcept: 'Objek ideal yang menyerap seluruh radiasi elektromagnetik (benda hitam) akan memancarkan spektrum kontinu yang hanya bergantung pada temperaturnya. Hukum Stefan-Boltzmann menyatakan bahwa daya per satuan luas sebanding dengan T^4, sedangkan Hukum Pergeseran Wien menunjukkan panjang gelombang emisi puncak berbanding terbalik dengan temperatur (lambda_max · T = b).',
        astroBridge: 'Bintang berperilaku hampir seperti benda hitam sempurna. Dari warna bintang, astronom mengetahui suhunya: bintang biru (Rigel ~12.000 K) jauh lebih panas daripada Matahari kita (kuning ~5.800 K) dan bintang merah (Betelgeuse ~3.500 K). Menggabungkan suhu dan radius memberikan luminositas mutlak bintang.',
        keyFormulas: [
          {
            name: 'Luminositas Bintang (Stefan-Boltzmann)',
            latex: 'L = 4\\pi R^2 \\sigma T^4',
            presetId: 'stefan-boltzmann',
            meaning: 'Total daya foton yang dipancarkan dari seluruh permukaan bola bintang beradius R.'
          },
          {
            name: 'Hukum Pergeseran Wien',
            latex: '\\lambda_{\\max} = \\frac{b}{T}',
            presetId: 'hukum-wien',
            meaning: 'Panjang gelombang puncak kurva spektrum emisi bergeser ke panjang gelombang lebih pendek saat suhu naik.'
          }
        ],
        realScenario: {
          title: 'Radiasi Latar Belakang Kosmik (Cosmic Microwave Background / CMB)',
          description: 'CMB adalah sisa pendaran cahaya pertama alam semesta pasca Big Bang (380.000 tahun). Karena alam semesta memuai ribuan kali, radiasi yang semula bersuhu ribuan Kelvin kini terdinginkan menjadi benda hitam paling sempurna di alam dengan temperatur 2,725 K, berpuncak pada gelombang mikro.'
        },
        quiz: {
          question: 'Sebuah bintang memiliki temperatur permukaan 2 kali lebih tinggi dari Matahari namun berukuran sama. Berapa kali lipat luminositas daya radiasi totalnya dibandingkan Matahari?',
          options: [
            '2 kali lipat',
            '4 kali lipat',
            '8 kali lipat',
            '16 kali lipat'
          ],
          correctIndex: 3,
          explanation: 'Berdasarkan Hukum Stefan-Boltzmann L ~ T^4. Jika T berlipat 2, maka luminositas meningkat sebesar 2^4 = 16 kali lipat!'
        }
      },
      {
        id: 'special-relativity-nuclear',
        title: 'Relativitas Khusus, E = mc² & Fusi Inti Bintang',
        icon: 'Zap',
        summary: 'Postulat Einstein, faktor Lorentz, dilatasi waktu jet relativistik, dan konversi defek massa menjadi energi nuklir murni bintang.',
        physicsConcept: 'Kecepatan cahaya c adalah konstan dalam semua kerangka inersia. Akibatnya, ruang dan waktu bersifat relatif: waktu berjalan lebih lambat bagi pengamat bergerak (dilatasi waktu) dengan faktor Lorentz gamma = 1 / sqrt(1 - v^2/c^2). Selain itu, massa adalah bentuk terkonsentrasi dari energi (E = mc^2).',
        astroBridge: 'Matahari mengubah 600 juta ton hidrogen menjadi helium setiap detik. Sekitar 4,3 juta ton massa hilang setiap detiknya (defek massa 0,7%) dan langsung terkonversi menjadi 3,8 x 10^26 Watt radiasi murni yang menghangatkan Bumi. Tanpa E=mc², Matahari hanya akan mampu bertahan beberapa puluh juta tahun.',
        keyFormulas: [
          {
            name: 'Kesetaraan Massa-Energi Einstein',
            latex: 'E = \\Delta m \\cdot c^2',
            presetId: 'kesetaraan-massa-energi',
            meaning: 'Energi setara dari selisih massa pada reaksi fusi nuklir inti bintang.'
          },
          {
            name: 'Faktor Lorentz Relativitas',
            latex: '\\gamma = \\frac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}}',
            presetId: 'faktor-lorentz',
            meaning: 'Faktor pengali pergeseran waktu dan ruang bagi partikel berkecepatan tinggi.'
          }
        ],
        realScenario: {
          title: 'Muon Kosmis: Bukti Nyata Dilatasi Waktu di Atmosfer Bumi',
          description: 'Partikel muon tercipta akibat sinar kosmis di atmosfer atas (ketinggian ~15 km). Muon memiliki waktu hidup sangat singkat (~2,2 mikrodetik) sehingga secara fisika klasik mestinya luruh sebelum mencapai tanah. Namun karena bergerak pada 99,9% kelajuan cahaya, waktu internal muon melambat bagi kita di Bumi, memungkinkannya menembus hingga ke detektor di permukaan tanah!'
        },
        quiz: {
          question: 'Apa arti utama dari rumus kesetaraan massa-energi E = mc² dalam konteks fusi nuklir bintang?',
          options: [
            'Massa bergerak lebih cepat daripada cahaya',
            'Defek massa dalam fusi proton menghasilkan pelepasan energi radiasi yang masif',
            'Energi total bintang selalu berkurang tanpa ada cahaya yang keluar',
            'Kecepatan cahaya berubah seiring waktu'
          ],
          correctIndex: 1,
          explanation: 'Selisih massa inti helium hasil fusi dibandingkan 4 proton awal dikalikan c^2 menghasilkan energi radiasi elektromagnetik yang menopang kehidupan di tata surya.'
        }
      },
      {
        id: 'black-holes-quantum',
        title: 'Horison Peristiwa Lubang Hitam & Fisika Kuantum Kosmis',
        icon: 'Compass',
        summary: 'Radius Schwarzschild, gravitasi singularitas, dan jembatan antara relativitas umum dengan mekanika kuantum.',
        physicsConcept: 'Ketika massa terkonsentrasi dalam batas gravitasi ekstrem, kelengkungan ruang-waktu menjadi begitu curam sehingga kecepatan lepas menyamai kelajuan cahaya. Titik batas ini dinamakan Horison Peristiwa (Event Horizon). Di tingkat subatomik, prinsip ketidakpastian Heisenberg dan kuantisasi foton E = hf mengatur interaksi radiasi materi.',
        astroBridge: 'Radius Schwarzschild Rs = 2GM/c^2 mendefinisikan ukuran bayangan lubang hitam yang berhasil dipotret oleh Event Horizon Telescope (EHT) pada M87* dan Sagittarius A*. Pada tepi lubang hitam, efek kuantum juga diperkirakan memicu Radiasi Hawking.',
        keyFormulas: [
          {
            name: 'Radius Schwarzschild Lubang Hitam',
            latex: 'R_s = \\frac{2 \\cdot G \\cdot M}{c^2}',
            presetId: 'radius-schwarzschild',
            meaning: 'Batas horizon peristiwa di mana tidak ada materi maupun foton cahaya yang dapat keluar.'
          },
          {
            name: 'Energi Kuantum Foton',
            latex: 'E = h \\cdot f = \\frac{h \\cdot c}{\\lambda}',
            presetId: 'energi-foton',
            meaning: 'Energi kuantum sebuah foton cahaya pada frekuensi f atau panjang gelombang lambda.'
          }
        ],
        realScenario: {
          title: 'Foto Horison Peristiwa Sagittarius A*',
          description: 'Pada Mei 2022, kolaborasi teleskop global Event Horizon Telescope (EHT) merilis gambar cincin gas berpijar yang mengitari bayangan gelap lubang hitam Sagittarius A* di pusat Bima Sakti kita, persis sesuai prediksi Teori Relativitas Umum Einstein!'
        },
        quiz: {
          question: 'Jika Matahari kita tiba-tiba dirapatkan menjadi lubang hitam tanpa mengurangi massanya, berapakah radius horison peristiwa (Rs) Matahari?',
          options: [
            'Sekitar 3 meter',
            'Sekitar 3 kilometer',
            'Sekitar 3.000 kilometer',
            'Sekitar 700.000 kilometer'
          ],
          correctIndex: 1,
          explanation: 'Rs = 2GM/c^2 = 2 * (6.674e-11) * (1.989e30) / (3e8)^2 ≈ 2.950 meter atau ~2,95 km.'
        }
      }
    ]
  }
];
