import heroWorkspaceImg from '../assets/images/hero_editing_workspace_1792989606613.jpg';
import campusDocImg from '../assets/images/work_campus_documentary_1792989608014.jpg';
import filmCinemaImg from '../assets/images/work_film_cinematography_1792989608533.jpg';
import commercialFnbImg from '../assets/images/work_commercial_product_fnb_1792989609819.jpg';

export enum WorkFilter {
  FEATURED = 'Unggulan (3)',
  ALL = 'Semua Karya (6)',
  VIDEO = 'Videografi & Film',
  PHOTO = 'Fotografi & Kampus',
}

export enum PosterStyle {
  DARK_EDITORIAL = 'dark_editorial',
  WARM_AMBER = 'warm_amber',
  CREAM_STUDIO = 'cream_studio',
}

export interface PortfolioWork {
  id: string;
  title: string;
  posterHeadline: string;
  clientOrOrg: string;
  role: string;
  year: string;
  filterGroup: WorkFilter.VIDEO | WorkFilter.PHOTO;
  featured: boolean;
  posterStyle: PosterStyle;
  imageUrl: string;
  aspectLabel: string;
  durationOrSeries: string;
  exifSpecs: string[];
  summary: string;
  preProduction: string;
  production: string;
  postProduction: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  description: string;
}

export const HERO_STUDIO_IMAGE = heroWorkspaceImg;

export const PROFILE_DATA = {
  fullName: 'Arbi Muhammad Mustofa',
  shortBrand: 'Arbi Muhammad Mustofa',
  roleSummary: 'Videografer, Fotografer & Visual Storyteller',
  photoUrl: '/assets/aistudio/b1b4126b-b163-4183-a044-bd368da3fb32_f0ac6e07.jpg',
  email: 'ard930909@gmail.com',
  phoneDisplay: '0852345678910',
  whatsappInternational: '62852345678910',
  location: 'Indonesia',
  availability: 'Tersedia untuk Penugasan Luar Kota',
  university: 'Universitas Komputama (UNIKMA)',
  studio: 'Arbi Studio Production',
  biography:
    'Saya tertarik dengan dunia fotografi dan videografi sejak duduk di bangku sekolah. Saya terus mengembangkan kemampuan visual storytelling, komposisi lensa, dan sinematografi ini hingga dipercaya menangani dokumentasi komersial, video profil brand, dan film pendek independen. Saat ini, saya menempuh studi di Universitas Komputama (UNIKMA) dan aktif mengelola proyek kreatif mandiri serta menjadi videografer lepas untuk berbagai klien.',
};

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'arbi-studio',
    period: '2022 — Sekarang',
    role: 'Videografer & Editor Kreatif Lepas',
    organization: 'Arbi Studio Production',
    description:
      'Menyediakan layanan end-to-end pembuatan konten video mulai dari tahap pra-produksi (storyboard & breakdown naskah), produksi lapangan (shooting & tata audio), hingga pasca-produksi (editing, sound design, & color grading 4K).',
  },
  {
    id: 'unikma-multimedia',
    period: '2022 — 2024',
    role: 'Koordinator Multimedia & Dokumentasi Visual',
    organization: 'Universitas Komputama (UNIKMA)',
    description:
      'Memimpin tim dokumentasi visual kampus dalam mengabadikan momen penting universitas, wisuda sarjana, simposium teknologi, serta memproduksi konten video promosi pendaftaran mahasiswa baru.',
  },
  {
    id: 'lensa-kreasi',
    period: '2021 — 2023',
    role: 'Fotografer Komersial & Produk',
    organization: 'Lensa Kreasi Visual',
    description:
      'Menjalankan pemotretan foto katalog studio, foto makanan & minuman (F&B), serta foto potret profesional untuk profil eksekutif dan seniman.',
  },
];

export const PORTFOLIO_WORKS: PortfolioWork[] = [
  {
    id: 'dokumentasi-kampus-unikma',
    title: 'Dokumentasi Kampus, Wisuda & Simposium UNIKMA',
    posterHeadline: 'DOKUMENTASI & PROFIL KAMPUS',
    clientOrOrg: 'Universitas Komputama (UNIKMA)',
    role: 'Koordinator Multimedia & Dokumentasi Visual',
    year: '2022 — 2024',
    filterGroup: WorkFilter.PHOTO,
    featured: true,
    posterStyle: PosterStyle.DARK_EDITORIAL,
    imageUrl: campusDocImg,
    aspectLabel: '16:9 UHD & 3:2 Still',
    durationOrSeries: 'Video Promosi PMB & Arsip Wisuda',
    exifSpecs: ['24mm f/2.8', '50fps', 'ISO 400', '4K Rec.709'],
    summary:
      'Kepemimpinan tim dokumentasi visual Universitas Komputama dalam mengabadikan wisuda sarjana, simposium teknologi, dan produksi video kampanye penerimaan mahasiswa baru.',
    preProduction:
      'Riset narasi kampus, pemetaan titik kamera prosesi wisuda, serta penyusunan shot-list promosi mahasiswa baru.',
    production:
      'Koordinasi tim multi-kamera menggunakan gimbal stabilizer serta perekaman audio pidato dan testimoni jernih.',
    postProduction:
      'Kurasi foto rilis cepat, penyuntingan aftermovie ritmis, dan penyelarasan warna identitas institusi UNIKMA.',
  },
  {
    id: 'film-pendek-dan-profil-brand',
    title: 'Langkah di Ambang Senja — Film Pendek & Video Brand',
    posterHeadline: 'SINEMATOGRAFI & COLOR GRADING 4K',
    clientOrOrg: 'Arbi Studio Production',
    role: 'Videografer & Editor Kreatif',
    year: '2022 — Sekarang',
    filterGroup: WorkFilter.VIDEO,
    featured: true,
    posterStyle: PosterStyle.WARM_AMBER,
    imageUrl: filmCinemaImg,
    aspectLabel: '2.39:1 Anamorphic 4K',
    durationOrSeries: 'End-to-End Video Production',
    exifSpecs: ['35mm T1.5', '24fps', 'ISO 200', '4K S-Log3'],
    summary:
      'Produksi end-to-end film pendek independen dan video profil brand komersial dengan kekuatan visual storytelling, komposisi cahaya golden hour, sound design, dan color grading 4K.',
    preProduction:
      'Pembuatan storyboard detail, breakdown naskah per adegan, serta perancangan palet cahaya sinematik.',
    production:
      'Shooting lapangan resolusi 4K dengan pergerakan kamera terukur dan tata audio lapangan dual-system.',
    postProduction:
      'Offline/online editing, perancangan lapisan sound design atmosferik, dan kalibrasi warna 4K dari profil Log.',
  },
  {
    id: 'fotografi-komersial-katalog-fnb',
    title: 'Rasa & Karakter — Fotografi Katalog Produk, F&B & Potret',
    posterHeadline: 'FOTOGRAFI PRODUK & KOMERSIAL',
    clientOrOrg: 'Lensa Kreasi Visual',
    role: 'Fotografer Komersial & Produk',
    year: '2021 — 2023',
    filterGroup: WorkFilter.PHOTO,
    featured: true,
    posterStyle: PosterStyle.CREAM_STUDIO,
    imageUrl: commercialFnbImg,
    aspectLabel: '4:5 Studio Medium Crop',
    durationOrSeries: 'Katalog Studio, F&B & Eksekutif',
    exifSpecs: ['85mm Macro', 'f/5.6', 'ISO 100', 'Dual Strobe'],
    summary:
      'Pemotretan komersial untuk katalog produk di dalam studio, sajian makanan & minuman (F&B), serta potret profesional bagi profil eksekutif dan pekerja seni.',
    preProduction:
      'Penataan konsep permukaan batu alam dan properti minimalis sesuai karakter identitas visual klien.',
    production:
      'Pemotretan studio dengan tata lampu softbox terarah untuk menonjolkan tekstur sajian dan dimensi wajah.',
    postProduction:
      'Seleksi ketajaman optik, pembersihan detail mikro secara natural, dan kalibrasi warna siap cetak maupun digital.',
  },
  {
    id: 'video-promosi-pmb-unikma',
    title: 'Kampanye Video Promosi Mahasiswa Baru UNIKMA',
    posterHeadline: 'VIDEO PROMOSI INSTITUSI',
    clientOrOrg: 'Universitas Komputama (UNIKMA)',
    role: 'Sutradara Visual & Editor',
    year: '2024',
    filterGroup: WorkFilter.VIDEO,
    featured: false,
    posterStyle: PosterStyle.DARK_EDITORIAL,
    imageUrl: campusDocImg,
    aspectLabel: '16:9 Cinema UHD',
    durationOrSeries: 'Video Profil · 03:20 Menit',
    exifSpecs: ['24-70mm f/2.8', '50fps', 'ISO 320', '4K 10-Bit'],
    summary:
      'Produksi konten video utama untuk pendaftaran mahasiswa baru Universitas Komputama yang merangkum suasana akademik, fasilitas laboratorium, dan semangat inovasi.',
    preProduction:
      'Penulisan naskah voice-over inspiratif, casting mahasiswa lintas program studi, dan penjadwalan lokasi kampus.',
    production:
      'Pengambilan gambar dinamis lintas gedung kuliah, ruang praktik teknologi, dan wawancara pimpinan kampus.',
    postProduction:
      'Pemotongan gambar berenergi tinggi, penataan musik latar & efek transisi halus, serta color grading 4K.',
  },
  {
    id: 'dokumenter-komersial-brand',
    title: 'Cerita di Balik Karya — Dokumentasi Video Profil Brand',
    posterHeadline: 'VIDEO PROFIL KOMERSIAL',
    clientOrOrg: 'Arbi Studio Production',
    role: 'Videografer Lepas & Colorist',
    year: '2025',
    filterGroup: WorkFilter.VIDEO,
    featured: false,
    posterStyle: PosterStyle.WARM_AMBER,
    imageUrl: filmCinemaImg,
    aspectLabel: '16:9 Widescreen 4K',
    durationOrSeries: 'Company Profile · 04:45 Menit',
    exifSpecs: ['50mm f/1.4', '25fps', 'ISO 400', '4K S-Log3'],
    summary:
      'Layanan videografi lepas bagi klien korporat dan UMKM untuk membangun kredibilitas usaha melalui narasi dokumenter yang humanis dan sinematik.',
    preProduction:
      'Diskusi objektif komunikasi klien, penyusunan kerangka wawancara tiga babak, dan survei pencahayaan lokasi.',
    production:
      'Perekaman wawancara multi-sudut beserta b-roll aktivitas kerja berdefinisi tinggi di lokasi klien luar kota.',
    postProduction:
      'Penyuntingan alur cerita dokumenter, pembersihan dialog audio, dan penguatan karakter warna brand.',
  },
  {
    id: 'potret-eksekutif-dan-seniman',
    title: 'Dimensi Karakter — Potret Profesional Eksekutif & Seniman',
    posterHeadline: 'POTRET STUDIO & KATALOG',
    clientOrOrg: 'Lensa Kreasi Visual',
    role: 'Fotografer Potret & Katalog',
    year: '2023',
    filterGroup: WorkFilter.PHOTO,
    featured: false,
    posterStyle: PosterStyle.CREAM_STUDIO,
    imageUrl: commercialFnbImg,
    aspectLabel: '3:4 Editorial Portrait',
    durationOrSeries: '18 Sesi Potret & Produk',
    exifSpecs: ['50mm Prime', 'f/4.0', 'ISO 64', 'Rembrandt Key'],
    summary:
      'Sesi fotografi potret karakter dan katalog produk minimalis dengan rasio pencahayaan studio terukur bagi profil kepemimpinan perusahaan dan musisi.',
    preProduction:
      'Konsultasi gaya personal subjek, arahan palet busana, dan pengujian skema lampu utama di studio.',
    production:
      'Pengarahan ekspresi secara komunikatif agar subjek tampil rileks, berwibawa, dan autentik.',
    postProduction:
      'Penyempurnaan nada warna kulit dan detail material secara jujur tanpa menghilangkan tekstur alami.',
  },
];
