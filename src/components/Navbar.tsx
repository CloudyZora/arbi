import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface NavbarProps {
  onOpenBrief: () => void;
}

const NAV_ITEMS = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang Saya', href: '#tentang' },
  { label: 'Pengalaman', href: '#pengalaman' },
  { label: 'Hasil Karya', href: '#karya' },
  { label: 'Kontak', href: '#kontak' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenBrief }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#1C1D21]/90 backdrop-blur-md">
      <div className="mx-auto flex h-15 max-w-[1060px] items-center justify-between gap-8 px-4 sm:px-8">
        {/* Zone 1: Single text element Brand wordmark */}
        <a
          href="#beranda"
          className="font-display text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E3D7C8]"
        >
          {PROFILE_DATA.shortBrand}
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-zinc-300"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-white hover:underline hover:underline-offset-8 decoration-[#E3D7C8]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBrief}
            className="hidden sm:inline-flex items-center justify-center rounded bg-[#E3D7C8] px-3.5 py-1.5 text-xs font-semibold text-zinc-950 transition-colors duration-150 hover:bg-[#F2E9DD] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Tulis Brief
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="inline-flex md:hidden h-9 w-9 items-center justify-center rounded border border-white/15 text-zinc-200 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#17181C] px-4 py-4">
          <nav aria-label="Navigasi Seluler" className="flex flex-col gap-2.5">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-1.5 text-sm font-medium text-zinc-200 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenBrief();
              }}
              className="mt-2 inline-flex w-full items-center justify-center rounded bg-[#E3D7C8] px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-[#F2E9DD] transition-colors cursor-pointer"
            >
              Tulis Brief Proyek
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
