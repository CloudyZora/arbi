/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Briefcase,
  Camera,
  Check,
  Copy,
  GraduationCap,
  Mail,
  MapPin,
  Maximize2,
  Phone,
} from 'lucide-react';
import {
  EXPERIENCE_ITEMS,
  HERO_STUDIO_IMAGE,
  PORTFOLIO_WORKS,
  PROFILE_DATA,
  PortfolioWork,
  PosterStyle,
  WorkFilter,
} from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { LightboxModal } from './components/LightboxModal';
import { BriefModal } from './components/BriefModal';

const FILTER_TABS: WorkFilter[] = [
  WorkFilter.FEATURED,
  WorkFilter.ALL,
  WorkFilter.VIDEO,
  WorkFilter.PHOTO,
];

function mapWorkToService(work: PortfolioWork): string {
  if (work.id.includes('unikma')) {
    return 'Dokumentasi Kampus, Wisuda & Simposium';
  }
  if (work.posterStyle === PosterStyle.CREAM_STUDIO) {
    return 'Fotografi Produk, F&B & Potret';
  }
  if (work.id === 'film-pendek-dan-profil-brand') {
    return 'Film Pendek & Pasca-Produksi 4K';
  }
  return 'Video Profil Brand & Komersial';
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState<WorkFilter>(WorkFilter.FEATURED);
  const [selectedWorkId, setSelectedWorkId] = useState<string | null>(null);
  const [briefModalOpen, setBriefModalOpen] = useState(false);
  const [briefPreset, setBriefPreset] = useState('Video Profil Brand & Komersial');
  const [copiedContact, setCopiedContact] = useState<'phone' | 'email' | null>(null);
  const [portraitError, setPortraitError] = useState(false);
  const [heroImgError, setHeroImgError] = useState(false);

  const visibleWorks = useMemo(() => {
    if (activeFilter === WorkFilter.FEATURED) {
      return PORTFOLIO_WORKS.filter((w) => w.featured);
    }
    if (activeFilter === WorkFilter.ALL) {
      return PORTFOLIO_WORKS;
    }
    return PORTFOLIO_WORKS.filter((w) => w.filterGroup === activeFilter);
  }, [activeFilter]);

  const selectedIndex = useMemo(() => {
    if (!selectedWorkId) return -1;
    return visibleWorks.findIndex((w) => w.id === selectedWorkId);
  }, [visibleWorks, selectedWorkId]);

  const activeWork = selectedIndex >= 0 ? visibleWorks[selectedIndex] : null;

  const handlePrevWork = () => {
    if (visibleWorks.length === 0 || selectedIndex < 0) return;
    const prev = (selectedIndex - 1 + visibleWorks.length) % visibleWorks.length;
    setSelectedWorkId(visibleWorks[prev].id);
  };

  const handleNextWork = () => {
    if (visibleWorks.length === 0 || selectedIndex < 0) return;
    const next = (selectedIndex + 1) % visibleWorks.length;
    setSelectedWorkId(visibleWorks[next].id);
  };

  const copyQuickContact = async (value: string, field: 'phone' | 'email') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedContact(field);
      window.setTimeout(() => {
        setCopiedContact((curr) => (curr === field ? null : curr));
      }, 2000);
    } catch {
      setCopiedContact(null);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#2A2B30] via-[#222327] to-[#1A1B1E] text-zinc-100">
      {/* =======================================================================
          OUTER ARCHITECTURAL GEOMETRIC BACKDROP (Matching Reference Margins)
      ======================================================================= */}
      {/* Top-Left Diagonal Multi-Tone Accent Lines */}
      <svg
        aria-hidden="true"
        viewBox="0 0 360 360"
        className="pointer-events-none fixed top-0 left-0 z-0 h-72 w-72 sm:h-96 sm:w-96 opacity-45"
        fill="none"
      >
        <line x1="-20" y1="220" x2="195" y2="-15" stroke="#84C7B5" strokeWidth="1.2" />
        <line x1="15" y1="245" x2="230" y2="10" stroke="#E3D7C8" strokeWidth="1.2" />
        <line x1="55" y1="255" x2="265" y2="25" stroke="#D19399" strokeWidth="1.2" />
        <line x1="115" y1="230" x2="295" y2="35" stroke="#5A8DEE" strokeWidth="1.2" />
      </svg>

      {/* Top-Right Subtle Rounded-Square Line Geometry */}
      <svg
        aria-hidden="true"
        viewBox="0 0 280 320"
        className="pointer-events-none fixed top-12 right-0 z-0 h-72 w-64 opacity-25"
        fill="none"
      >
        <rect x="110" y="20" width="120" height="120" rx="22" stroke="#3B82F6" strokeWidth="1.5" />
        <rect x="65" y="95" width="95" height="95" rx="18" stroke="#3B82F6" strokeWidth="1.5" />
      </svg>

      {/* Bottom-Left Subtle Rounded-Square Line Geometry */}
      <svg
        aria-hidden="true"
        viewBox="0 0 280 320"
        className="pointer-events-none fixed bottom-0 left-0 z-0 h-72 w-64 opacity-25"
        fill="none"
      >
        <rect x="20" y="90" width="76" height="76" rx="16" stroke="#3B82F6" strokeWidth="1.5" />
        <rect x="85" y="165" width="135" height="135" rx="24" stroke="#3B82F6" strokeWidth="1.5" />
      </svg>

      {/* Bottom-Right Diagonal Accent Lines */}
      <svg
        aria-hidden="true"
        viewBox="0 0 360 360"
        className="pointer-events-none fixed right-0 bottom-0 z-0 h-72 w-72 sm:h-96 sm:w-96 opacity-40"
        fill="none"
      >
        <line x1="90" y1="370" x2="340" y2="95" stroke="#E3D7C8" strokeWidth="1.2" />
        <line x1="135" y1="375" x2="370" y2="115" stroke="#84C7B5" strokeWidth="1.2" />
        <line x1="185" y1="375" x2="380" y2="160" stroke="#D19399" strokeWidth="1.2" />
      </svg>

      {/* 3-Zone Top Bar */}
      <Navbar onOpenBrief={() => setBriefModalOpen(true)} />

      {/* =======================================================================
          4 STACKED EDITORIAL PORTFOLIO BOARDS (Matching Reference Composition)
      ======================================================================= */}
      <main className="relative z-10 mx-auto max-w-[1060px] px-4 sm:px-8 py-8 sm:py-12 space-y-8 sm:space-y-11">
        {/* =====================================================================
            BOARD 1: DESAIN / PORTOFOLIO VISUAL HERO BOARD
        ===================================================================== */}
        <section
          id="beranda"
          className="scroll-mt-20 relative overflow-hidden bg-gradient-to-b from-[#5E5E64] via-[#151518] via-36% to-[#030304] px-6 sm:px-12 lg:px-14 pt-6 sm:pt-8 pb-12 sm:pb-16 shadow-[0_28px_65px_rgba(0,0,0,0.82)] border border-white/10"
        >
          {/* Board Internal Header */}
          <div className="flex items-center justify-between gap-4 text-xs text-zinc-200 pb-8 sm:pb-10">
            <div className="inline-flex items-center gap-2.5 font-bold tracking-wide text-white">
              <Briefcase className="h-4 w-4 text-white" />
              <span>Portofolio Visual</span>
            </div>
            <span className="text-[11px] sm:text-xs tracking-wide text-zinc-200">
              Portofolio Saya
            </span>
          </div>

          {/* Overlapping Title + Cream Slab + Warm Studio Desk Photography */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-0">
            {/* Left Overlapping Headline & Author Signature */}
            <div className="lg:col-span-5 relative z-20 lg:-mr-24">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.6rem] font-bold leading-[1.03] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
                Portofolio
                <br />
                Visual
              </h1>

              <div className="mt-7 h-[2px] w-16 bg-white" />

              <div className="mt-5">
                <p className="font-display text-sm sm:text-base font-bold tracking-wide text-white">
                  {PROFILE_DATA.fullName}
                </p>
                <div className="mt-1.5 flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300">
                  <span aria-hidden="true" className="inline-block h-2.5 w-2.5 shrink-0 bg-white" />
                  <span>{PROFILE_DATA.roleSummary}</span>
                </div>
              </div>
            </div>

            {/* Right Studio Editing Desk Photo + Vertical Warm Cream Architectural Block */}
            <div className="lg:col-span-7 relative py-5 sm:py-7">
              {/* Signature Warm Cream Vertical Block protruding Top & Bottom */}
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-36 sm:w-52 lg:w-60 bg-[#E3D7C8]"
              />

              <div className="relative z-10 aspect-[16/10] w-full overflow-hidden bg-[#16110E] shadow-2xl">
                {!heroImgError ? (
                  <img
                    src={HERO_STUDIO_IMAGE}
                    alt="Meja kerja editing video dan fotografi studio"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgError(true)}
                    className="h-full w-[190%] max-w-none ml-auto object-cover object-right"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#1A1411] p-6 text-center text-xs text-zinc-400">
                    Arbi Studio Production — 4K Editing &amp; Cinematography Suite
                  </div>
                )}
                {/* Subtle left-edge contrast scrim where white headline overlaps */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/55 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            BOARD 2: TENTANG SAYA · COMPACT UNALTERED PORTRAIT · PENGALAMAN
        ===================================================================== */}
        <section
          id="tentang"
          className="scroll-mt-20 relative overflow-hidden bg-gradient-to-b from-[#5E5E64] via-[#18181C] via-38% to-[#060608] pt-6 sm:pt-8 shadow-[0_28px_65px_rgba(0,0,0,0.82)] border border-white/10"
        >
          {/* Subtle Left Organic Contour Graphic matching Reference Panel 2 */}
          <svg
            aria-hidden="true"
            viewBox="0 0 260 260"
            className="pointer-events-none absolute top-16 left-0 h-56 w-56 text-white/[0.06]"
            fill="currentColor"
          >
            <path d="M-20,65 C30,30 85,45 105,85 C125,125 180,105 190,150 C200,195 135,230 70,220 C5,210 -45,150 -20,65 Z" />
          </svg>

          {/* Subtle Right Dark Workspace Silhouette Ambiance matching Reference Panel 2 */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 bottom-0 h-64 w-72 opacity-15 overflow-hidden hidden lg:block"
          >
            {!heroImgError && (
              <img
                src={HERO_STUDIO_IMAGE}
                alt=""
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-right grayscale"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/60 to-[#18181C]" />
          </div>

          <div className="relative z-10 px-6 sm:px-12 lg:px-14">
            {/* Board Internal Header */}
            <div className="flex items-center justify-between gap-4 text-xs text-zinc-200 pb-6 sm:pb-8">
              <div className="inline-flex items-center gap-2.5 font-bold tracking-wide text-white">
                <Briefcase className="h-4 w-4 text-white" />
                <span>Portofolio Visual</span>
              </div>
              <span className="text-[11px] sm:text-xs tracking-wide text-zinc-200">
                Portofolio Saya
              </span>
            </div>

            {/* 3-Column Editorial Band */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-7 items-end">
              {/* Column 1: Tentang Saya + Exact Biography */}
              <div className="lg:col-span-4 pb-8 lg:pb-10">
                <h2 className="font-display text-2xl sm:text-3xl font-bold leading-[1.1] tracking-tight text-white">
                  Tentang
                  <br />
                  Saya
                </h2>

                <div className="mt-5 flex items-center gap-3">
                  <span aria-hidden="true" className="h-7 w-[1.5px] bg-white/85 shrink-0" />
                  <div>
                    <p className="font-display text-xs sm:text-sm font-bold leading-tight text-white">
                      {PROFILE_DATA.fullName}
                    </p>
                    <p className="mt-0.5 text-[11px] text-zinc-300">{PROFILE_DATA.university}</p>
                  </div>
                </div>

                <p className="mt-4 text-xs sm:text-[13px] leading-[1.72] text-zinc-200">
                  {PROFILE_DATA.biography}
                </p>
              </div>

              {/* Column 2: Tall Warm Cream Pedestal + Compact 100% Unaltered Profile Photo */}
              <div className="lg:col-span-3 flex flex-col items-center justify-end">
                <figure className="w-full max-w-[225px] bg-[#E5DDD2] px-6 pt-9 pb-6 flex flex-col items-center justify-end shadow-xl">
                  {/* Compact Native-Ratio Original Photo — Zero Face Alteration, Zero Cropping, Zero Filter */}
                  <div className="w-28 sm:w-32 lg:w-34 overflow-hidden bg-zinc-900 shadow-md border-2 border-white">
                    {!portraitError ? (
                      <img
                        src={PROFILE_DATA.photoUrl}
                        alt={`Potret profil resmi ${PROFILE_DATA.fullName}`}
                        referrerPolicy="no-referrer"
                        onError={() => setPortraitError(true)}
                        className="block w-full h-auto"
                      />
                    ) : (
                      <div className="flex aspect-[2/3] w-full flex-col items-center justify-center gap-2 bg-zinc-800 p-3 text-center">
                        <Camera className="h-5 w-5 text-zinc-300" />
                        <p className="font-display text-[11px] font-semibold text-white">
                          {PROFILE_DATA.fullName}
                        </p>
                      </div>
                    )}
                  </div>

                  <figcaption className="mt-3 text-center">
                    <p className="font-display text-[11px] font-bold text-zinc-900">
                      {PROFILE_DATA.studio}
                    </p>
                    <p className="text-[10px] text-zinc-700">{PROFILE_DATA.location}</p>
                  </figcaption>
                </figure>
              </div>

              {/* Column 3: Pengalaman Profesional */}
              <div id="pengalaman" className="lg:col-span-5 pb-8 lg:pb-10 scroll-mt-20">
                <h2 className="font-display text-base sm:text-lg font-bold tracking-wide text-white mb-4">
                  Pengalaman
                </h2>

                <ul className="space-y-4">
                  {EXPERIENCE_ITEMS.map((exp) => (
                    <li key={exp.id} className="text-xs sm:text-[12.5px] leading-relaxed text-zinc-200">
                      <div className="flex items-start gap-2">
                        <span aria-hidden="true" className="text-white font-bold">
                          •
                        </span>
                        <div>
                          <p className="font-semibold text-white">
                            {exp.organization} — {exp.role}{' '}
                            <span className="font-mono text-[11px] font-normal text-[#E3D7C8] tabular-nums">
                              ({exp.period})
                            </span>
                          </p>
                          <p className="mt-1 text-zinc-300 leading-relaxed">{exp.description}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Signature Horizontal Silver-to-White Base Bar under Columns 1 & 2 */}
          <div className="h-7 sm:h-9 w-full lg:w-[60%] bg-gradient-to-r from-[#26262B] via-[#D8D8DE] to-[#FFFFFF]" />
        </section>

        {/* =====================================================================
            BOARD 3: HASIL KARYA BOARD (Rotated Vertical Label + 3 Tall Poster Cards)
        ===================================================================== */}
        <section
          id="karya"
          className="scroll-mt-20 relative overflow-hidden bg-gradient-to-b from-[#5E5E64] via-[#151518] via-35% to-[#050507] px-6 sm:px-12 lg:px-14 pt-6 sm:pt-8 pb-12 sm:pb-14 shadow-[0_28px_65px_rgba(0,0,0,0.82)] border border-white/10"
        >
          {/* Board Internal Header + Interactive Filter Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8">
            <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-wide text-white">
              <Briefcase className="h-4 w-4 text-white" />
              <span>Portofolio Visual</span>
            </div>

            <div
              role="tablist"
              aria-label="Filter kategori karya"
              className="inline-flex flex-wrap items-center gap-1 rounded bg-black/35 p-1 border border-white/10"
            >
              {FILTER_TABS.map((tab) => {
                const active = activeFilter === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveFilter(tab)}
                    className={`rounded-sm px-2.5 py-1 text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#E3D7C8] text-zinc-950 font-semibold'
                        : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Vertical Rotated Sidebar Title + 3-Column Tall Vertical Showcase Posters */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            {/* Left Vertical Label matching Reference Panel 3 */}
            <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start justify-between lg:justify-end gap-4 pb-2">
              <div className="lg:-rotate-90 lg:origin-bottom-left lg:translate-x-8 lg:-translate-y-6 lg:whitespace-nowrap">
                <h2 className="font-display text-xl sm:text-2xl font-bold tracking-wide text-white">
                  Hasil Karya
                </h2>
                <p className="text-[11px] font-medium text-zinc-300">— Video &amp; Foto</p>
              </div>

              <div className="h-[2px] w-8 bg-white" />
            </div>

            {/* Right 3 Tall Vertical Poster Cards */}
            <div className="lg:col-span-10 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
              {visibleWorks.map((work) => {
                const isDarkPoster = work.posterStyle === PosterStyle.DARK_EDITORIAL;
                const isAmberPoster = work.posterStyle === PosterStyle.WARM_AMBER;

                return (
                  <article
                    key={work.id}
                    className={`group relative overflow-hidden shadow-2xl transition-transform duration-200 hover:-translate-y-1 flex flex-col ${
                      isDarkPoster
                        ? 'bg-[#17181C] text-white border border-white/15'
                        : isAmberPoster
                          ? 'bg-[#FBF7F0] text-zinc-900 border-4 border-white'
                          : 'bg-[#FAF8F3] text-zinc-900 border-4 border-white'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedWorkId(work.id)}
                      className="flex flex-1 flex-col text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E3D7C8]"
                    >
                      {/* Top Poster Visual Header */}
                      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
                        <img
                          src={work.imageUrl}
                          alt={work.title}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Measured Contrast Scrim for Poster Typography */}
                        <div
                          className={`pointer-events-none absolute inset-0 ${
                            isDarkPoster
                              ? 'bg-gradient-to-t from-[#17181C] via-black/35 to-black/55'
                              : isAmberPoster
                                ? 'bg-gradient-to-b from-amber-950/65 via-transparent to-black/45'
                                : 'bg-gradient-to-b from-black/45 via-transparent to-black/35'
                          }`}
                        />

                        {/* Poster Top Display Header */}
                        <div className="absolute inset-x-3.5 top-3.5 flex items-start justify-between gap-2">
                          <p className="font-display text-xs sm:text-sm font-bold leading-tight text-white drop-shadow">
                            {work.posterHeadline}
                          </p>
                          <span
                            aria-hidden="true"
                            className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-black/50 text-white opacity-80 group-hover:opacity-100"
                          >
                            <Maximize2 className="h-3 w-3" />
                          </span>
                        </div>

                        <div className="absolute inset-x-3.5 bottom-3 text-[11px] font-mono text-zinc-100 tabular-nums drop-shadow">
                          {work.year}
                        </div>
                      </div>

                      {/* Bottom Structured Editorial Poster Sheet */}
                      <div
                        className={`flex flex-1 flex-col justify-between p-3.5 ${
                          isDarkPoster ? 'bg-[#17181C] text-zinc-100' : 'bg-white text-zinc-900'
                        }`}
                      >
                        <div>
                          <p
                            className={`text-[10px] font-semibold ${
                              isDarkPoster ? 'text-[#E3D7C8]' : 'text-amber-800'
                            }`}
                          >
                            {work.clientOrOrg}
                          </p>
                          <h3
                            className={`mt-1 font-display text-xs sm:text-sm font-bold leading-snug ${
                              isDarkPoster ? 'text-white' : 'text-zinc-950'
                            }`}
                          >
                            {work.title}
                          </h3>
                        </div>

                        <div
                          className={`mt-3 pt-2 border-t flex items-center justify-between gap-2 text-[10px] font-mono tabular-nums ${
                            isDarkPoster
                              ? 'border-white/10 text-zinc-400'
                              : 'border-zinc-200 text-zinc-600'
                          }`}
                        >
                          <span className="truncate">{work.exifSpecs.slice(0, 2).join(' · ')}</span>
                          <span
                            className={`font-sans font-semibold shrink-0 ${
                              isDarkPoster ? 'text-[#E3D7C8]' : 'text-zinc-900'
                            }`}
                          >
                            Buka →
                          </span>
                        </div>
                      </div>
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================================
            BOARD 4: TERIMA KASIH / LETS WORK TOGETHER BOARD
        ===================================================================== */}
        <section
          id="kontak"
          className="scroll-mt-20 relative overflow-hidden bg-gradient-to-b from-[#5E5E64] via-[#111114] via-32% to-[#030304] px-6 sm:px-12 lg:px-14 pt-6 sm:pt-8 pb-12 sm:pb-16 shadow-[0_28px_65px_rgba(0,0,0,0.82)] border border-white/10"
        >
          {/* Subtle Internal Geometric Accents matching Reference Panel 4 */}
          <svg
            aria-hidden="true"
            viewBox="0 0 320 220"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-15"
            fill="none"
          >
            <rect x="18" y="48" width="28" height="28" rx="6" stroke="#60A5FA" strokeWidth="1" />
            <rect x="42" y="88" width="22" height="22" rx="5" stroke="#60A5FA" strokeWidth="1" />
            <line x1="135" y1="165" x2="175" y2="120" stroke="#E3D7C8" strokeWidth="0.9" />
            <line x1="148" y1="170" x2="188" y2="125" stroke="#E3D7C8" strokeWidth="0.9" />
            <rect x="250" y="145" width="38" height="38" rx="7" stroke="#A1A1AA" strokeWidth="1" />
            <rect x="195" y="175" width="24" height="24" rx="5" stroke="#A1A1AA" strokeWidth="1" />
          </svg>

          <div className="relative z-10">
            {/* Board Internal Header */}
            <div className="flex items-center justify-between gap-4 text-xs text-zinc-200">
              <div className="inline-flex items-center gap-2.5 font-bold tracking-wide text-white">
                <Briefcase className="h-4 w-4 text-white" />
                <span>Portofolio Visual</span>
              </div>
              <span className="text-[11px] sm:text-xs tracking-wide text-zinc-200">
                Portofolio Saya
              </span>
            </div>

            {/* Monumental Centered Closing Heading */}
            <div className="mt-10 sm:mt-12 text-center">
              <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-white">
                Terima Kasih
              </h2>
              <p className="mt-2 font-display text-sm sm:text-lg font-bold tracking-wide text-white">
                Let&apos;s Work Together · Mari Berkolaborasi
              </p>
            </div>

            {/* Clean 2-Column Contact Medallions (Left) + Author Sign-Off (Right) */}
            <div className="mt-11 sm:mt-14 grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
              {/* Left Column: 4 White Circular Contact Medallions */}
              <div className="md:col-span-7 space-y-4">
                {/* 1. Phone / WhatsApp */}
                <div className="flex items-center gap-3.5">
                  <a
                    href={`https://wa.me/${PROFILE_DATA.whatsappInternational}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3.5 min-w-0"
                  >
                    <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-white text-zinc-950 transition-transform duration-150 group-hover:scale-105">
                      <Phone className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                    </span>
                    <span className="font-mono text-xs sm:text-sm tabular-nums text-zinc-200 group-hover:text-white transition-colors">
                      {PROFILE_DATA.phoneDisplay}
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={() => copyQuickContact(PROFILE_DATA.phoneDisplay, 'phone')}
                    aria-label="Salin nomor telepon"
                    className="inline-flex items-center gap-1 rounded border border-white/15 bg-white/5 px-2 py-1 text-[11px] text-zinc-300 hover:bg-white/15 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedContact === 'phone' ? (
                      <>
                        <Check className="h-3 w-3 text-[#E3D7C8]" />
                        <span>Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 2. Official Email */}
                <div className="flex items-center gap-3.5">
                  <a
                    href={`mailto:${PROFILE_DATA.email}`}
                    className="group inline-flex items-center gap-3.5 min-w-0"
                  >
                    <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-white text-zinc-950 transition-transform duration-150 group-hover:scale-105">
                      <Mail className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-zinc-200 group-hover:text-white transition-colors truncate">
                      {PROFILE_DATA.email}
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={() => copyQuickContact(PROFILE_DATA.email, 'email')}
                    aria-label="Salin alamat email"
                    className="inline-flex items-center gap-1 rounded border border-white/15 bg-white/5 px-2 py-1 text-[11px] text-zinc-300 hover:bg-white/15 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedContact === 'email' ? (
                      <>
                        <Check className="h-3 w-3 text-[#E3D7C8]" />
                        <span>Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 3. Studio & University */}
                <div className="flex items-center gap-3.5">
                  <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-white text-zinc-950">
                    <GraduationCap className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  </span>
                  <span className="text-xs sm:text-sm text-zinc-200">
                    {PROFILE_DATA.studio} · {PROFILE_DATA.university}
                  </span>
                </div>

                {/* 4. Location & Out-of-Town Readiness */}
                <div className="flex items-center gap-3.5">
                  <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-white text-zinc-950">
                    <MapPin className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  </span>
                  <span className="text-xs sm:text-sm text-zinc-200">
                    {PROFILE_DATA.location} ({PROFILE_DATA.availability})
                  </span>
                </div>
              </div>

              {/* Right Column: Signature Author Sign-Off + Brief Action */}
              <div className="md:col-span-5 flex flex-col md:items-end">
                <div className="text-left">
                  <div className="h-[2px] w-14 bg-white mb-4" />
                  <p className="font-display text-sm sm:text-base font-bold text-white">
                    {PROFILE_DATA.fullName}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <span
                      aria-hidden="true"
                      className="inline-block h-2.5 w-2.5 shrink-0 bg-white"
                    />
                    <span>{PROFILE_DATA.roleSummary}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setBriefModalOpen(true)}
                    className="mt-5 inline-flex items-center gap-2 rounded bg-[#E3D7C8] px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-[#F2E9DD] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Kirim Brief Proyek</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="relative z-10 mx-auto max-w-[1060px] px-4 sm:px-8 pb-10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
        <p>
          © {new Date().getFullYear()} {PROFILE_DATA.fullName} — {PROFILE_DATA.studio}
        </p>
        <p>
          {PROFILE_DATA.location} · {PROFILE_DATA.availability}
        </p>
      </footer>

      {/* Fullscreen Lightbox & 4K Color Grading Inspector */}
      <LightboxModal
        work={activeWork}
        onClose={() => setSelectedWorkId(null)}
        onPrev={handlePrevWork}
        onNext={handleNextWork}
        onInquireWork={(work) => {
          const service = mapWorkToService(work);
          setSelectedWorkId(null);
          setBriefPreset(service);
          setBriefModalOpen(true);
        }}
      />

      {/* Interactive WhatsApp / Email Brief Composer Modal */}
      <BriefModal
        isOpen={briefModalOpen}
        initialService={briefPreset}
        onClose={() => setBriefModalOpen(false)}
      />
    </div>
  );
}
