// Database Berita Astronomi dan Astrofisika Awal

export const INITIAL_NEWS = [
  {
    id: 'news-1',
    title: 'James Webb Deteksi Atmosfer Eksoplanet LHS 475 b: Menyingkap Rahasia Dunia Seukuran Bumi',
    category: 'Eksoplanet & Planetologi',
    author: 'Tim Riset Astrofisika Xstronomy',
    date: '2026-09-18',
    readTime: '4 menit baca',
    coverImage: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
    summary: 'Teleskop Luar Angkasa James Webb (JWST) berhasil merekam data spektroskopi transmisi presisi tinggi dari eksoplanet berbatu yang berjarak hanya 41 tahun cahaya di konstelasi Octans.',
    content: `Observasi terbaru menggunakan instrumen NIRSpec (Near-Infrared Spectrograph) pada Teleskop Luar Angkasa James Webb telah mengonfirmasi karakteristik eksoplanet LHS 475 b. Eksoplanet ini memiliki ukuran 99% dari diameter Bumi dan mengorbit bintang katai merah dengan periode orbit hanya dua hari.

Data kurva cahaya transit menunjukkan kepastian tinggi bahwa planet ini merupakan dunia berbatu padat. Namun, berbeda dengan eksoplanet gas raksasa, menganalisis atmosfer tipis planet berbatu memerlukan kepekaan spektroskopi tingkat ekstrem.

Para astrofisikawan membandingkan data spektrum serapan dengan berbagai model atmosfer teoritis. Hasil awal mengesampingkan atmosfer tebal bermuatan metana seperti Titan, dan mengarah pada dua kemungkinan: atmosfer murni karbon dioksida yang sangat rapat seperti Venus, atau planet tersebut sepenuhnya kehilangan atmosfer akibat semburan suar radiasi ultraviolet dari bintang induknya.

Penelitian ini menandai era baru dalam astrofisika planet, di mana kita tidak hanya dapat mendeteksi planet seukuran Bumi, tetapi juga mulai mengkarakterisasi komposisi molekuler kimianya secara langsung.`,
    tags: ['JWST', 'Eksoplanet', 'Spektroskopi', 'Astrobiologi'],
    featured: true
  },
  {
    id: 'news-2',
    title: 'Observatorium Gelombang Gravitasi LIGO-Virgo-KAGRA Catat Penggabungan Bintang Neutron Terbesar',
    category: 'Astrofisika & Kosmologi',
    author: 'Dr. Alistair Thorne',
    date: '2026-09-15',
    readTime: '5 menit baca',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    summary: 'Riak ruang-waktu GW260814 mengungkap tabrakan dua bintang neutron masif yang memicu kilonova dan pembentukan elemen berat seperti emas dan platinum di alam semesta.',
    content: `Kolaborasi interferometris LIGO di Amerika Serikat, Virgo di Italia, dan KAGRA di Jepang baru saja merilis sinyal gelombang gravitasi terbaru berkode GW260814. Sinyal ini berasal dari peristiwa tumbukan dua bintang neutron berkepadatan nuklir pada jarak 1,2 miliar tahun cahaya.

Selama detik-detik terakhir sebelum menyatu, kedua bintang netron berputar mengelilingi satu sama lain ratusan kali per detik, memancarkan gelombang gravitasi berfrekuensi tinggi yang terdeteksi sebagai "chirp signal" di Bumi.

Tabrakan ini juga disertai kilatan radiasi elektromagnetik kilonova, yang membuktikan proses r-process (rapid neutron capture). Di sinilah sebagian besar unsur-unsur berat di tabel periodik, termasuk emas, uranium, dan platinum, disintesis di jagat raya sebelum tersebar menjadi awan debu pembentuk bintang generasi berikutnya.

Peristiwa ini juga memberikan pengukuran independen konstanta Hubble H0, memperdalam pemahaman kita tentang laju ekspansi ruang alam semesta.`,
    tags: ['Gelombang Gravitasi', 'LIGO', 'Bintang Neutron', 'Kilonova'],
    featured: false
  },
  {
    id: 'news-3',
    title: 'Siklus Maksimum Badai Matahari: Detektor SDO Rekam Semburan Suar Kelas X9.3',
    category: 'Matahari & Cuaca Antariksa',
    author: 'Sarah Nurhaliza, M.Sc.',
    date: '2026-09-12',
    readTime: '3 menit baca',
    coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    summary: 'Puncak siklus solar ke-25 menghasilkan lontaran massa korona (CME) terkuat tahun ini, memicu aurora dramatis hingga lintang sedang dan pemantauan satelit orbit rendah.',
    content: `Aktivitas matahari mencapai intensitas tertinggi dalam siklus 11 tahunannya. Solar Dynamics Observatory (SDO) NASA mencatat semburan suar api matahari (solar flare) berkategori X9.3 dari wilayah bintik matahari aktif AR3884.

Semburan suar ini melontarkan miliaran ton plasma bermuatan listrik berkecepatan lebih dari 2.000 kilometer per detik menuju heliosfer. Ketika partikel plasma ini menghantam magnetosfer Bumi, terjadi badai geomagnetik kelas G4.

Selain menciptakan pemandangan aurora borealis dan australis yang memukau hingga garis lintang selatan, para ilmuwan fisika plasma antariksa terus memantau dampaknya terhadap sistem navigasi GPS, transmisi radio gelombang pendek frekuensi tinggi, dan kestabilan jaringan listrik transmisi tegangan tinggi.`,
    tags: ['Matahari', 'Suar Matahari', 'Aurora', 'Fisika Plasma'],
    featured: false
  },
  {
    id: 'news-4',
    title: 'Misi Artemis: Robot Penjelajah Deteksi Lapisan Es Air di Kawah Abadi Kutub Selatan Bulan',
    category: 'Eksplorasi Antariksa',
    author: 'Komisi Misi Antariksa Xstronomy',
    date: '2026-09-08',
    readTime: '4 menit baca',
    coverImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    summary: 'Instrumen spektrometer neutron pada wahana penjelajah lunar mengonfirmasi konsentrasi volatil es air di kawah Shackleton yang tidak pernah tersentuh sinar matahari.',
    content: `Kutub selatan Bulan menyimpan salah satu misteri terbesar tata surya: kawah-kawah yang berada dalam bayangan abadi (Permanently Shadowed Regions). Data terbaru yang dikirimkan oleh rover penjelajah permukaan menunjukkan deposit es air di kedalaman beberapa sentimeter di bawah regolit bulan.

Es ini diperkirakan terakumulasi selama miliaran tahun dari tumbukan komet purba. Di lingkungan bersuhu mendekati -230 derajat Celsius, molekul air membeku stabil tanpa menguap.

Penemuan ini memiliki signifikansi luar biasa bagi masa depan koloni manusia. Air es di Bulan bukan hanya sumber air minum bagi astronot di pangkalan masa depan, melainkan dapat diuraikan melalui elektrolisis menjadi Oksigen untuk bernapas dan Hidrogen cair sebagai bahan bakar roket menuju Mars.`,
    tags: ['Bulan', 'Artemis', 'Air Es Lunar', 'Eksplorasi'],
    featured: false
  },
  {
    id: 'news-5',
    title: 'Anomali Lubang Hitam Supermasif di Galaksi Dini: Tantangan Terhadap Teori Pertumbuhan Kosmologis',
    category: 'Astrofisika & Kosmologi',
    author: 'Prof. Hendrik Wicaksono',
    date: '2026-09-02',
    readTime: '6 menit baca',
    coverImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80',
    summary: 'Penemuan quasar bermassa miliaran kali matahari saat alam semesta baru berusia 400 juta tahun memicu perdebatan sengit tentang benih lubang hitam (Direct Collapse Black Holes).',
    content: `Menurut model standar evolusi bintang, lubang hitam terbentuk dari kematian bintang generasi pertama (Populasi III) yang bermassa sekitar seratus kali matahari, kemudian tumbuh perlahan dengan memangsa gas di sekitarnya sesuai batas akresi Eddington.

Namun, observasi inframerah JWST dan teleskop sinar-X Chandra menemukan lubang hitam supermasif yang sudah mencapai 10^9 massa matahari pada redshift z > 10. Jika menggunakan model pertumbuhan akresi standar, waktu 400 juta tahun pasca Big Bang tidak cukup untuk menghasilkan raksasa sebesar itu.

Para astrofisikawan kini condong pada teori "Direct Collapse": awan gas primordial masif runtuh secara gravitasi langsung menjadi lubang hitam raksasa tanpa melalui tahap pembentukan bintang terlebih dahulu. Penemuan ini mendorong peninjauan ulang terhadap kosmologi komputasi kuantum di era fajar kosmis (Cosmic Dawn).`,
    tags: ['Lubang Hitam', 'Kosmologi', 'Big Bang', 'JWST'],
    featured: false
  }
];

export const NEWS_CATEGORIES = [
  'Semua Kategori',
  'Astrofisika & Kosmologi',
  'Eksoplanet & Planetologi',
  'Eksplorasi Antariksa',
  'Matahari & Cuaca Antariksa'
];
