import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail, X } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface BriefModalProps {
  isOpen: boolean;
  initialService: string;
  onClose: () => void;
}

const SERVICE_OPTIONS = [
  'Video Profil Brand & Komersial',
  'Fotografi Produk, F&B & Potret',
  'Dokumentasi Kampus, Wisuda & Simposium',
  'Film Pendek & Pasca-Produksi 4K',
];

const ASSIGNMENT_SCOPES = [
  'Dalam Kota / Studio',
  'Penugasan Luar Kota (Seluruh Indonesia)',
];

export const BriefModal: React.FC<BriefModalProps> = ({
  isOpen,
  initialService,
  onClose,
}) => {
  const [clientName, setClientName] = useState('');
  const [organization, setOrganization] = useState('');
  const [serviceType, setServiceType] = useState(SERVICE_OPTIONS[0]);
  const [assignmentScope, setAssignmentScope] = useState(ASSIGNMENT_SCOPES[0]);
  const [projectDate, setProjectDate] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialService && SERVICE_OPTIONS.includes(initialService)) {
      setServiceType(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formattedBrief = [
    `Halo ${PROFILE_DATA.fullName},`,
    '',
    `Saya ingin mendiskusikan rencana kolaborasi visual:`,
    `- Nama: ${clientName.trim() || '(Belum diisi)'}`,
    `- Brand / Instansi: ${organization.trim() || '(Pribadi / Independen)'}`,
    `- Layanan: ${serviceType}`,
    `- Lokasi Penugasan: ${assignmentScope}`,
    `- Estimasi Jadwal: ${projectDate.trim() || 'Fleksibel'}`,
    `- Catatan Proyek: ${notes.trim() || 'Mohon info ketersediaan jadwal produksi.'}`,
    '',
    'Terima kasih.',
  ].join('\n');

  const whatsappHref = `https://wa.me/${PROFILE_DATA.whatsappInternational}?text=${encodeURIComponent(
    formattedBrief
  )}`;

  const mailtoHref = `mailto:${PROFILE_DATA.email}?subject=${encodeURIComponent(
    `Kolaborasi Proyek Visual — ${serviceType}`
  )}&body=${encodeURIComponent(formattedBrief)}`;

  const handleCopyBrief = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(formattedBrief);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="brief-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-xl rounded-lg border border-white/15 bg-[#121215] p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
          <div>
            <h3 id="brief-modal-title" className="font-display text-xl font-bold text-white">
              Tulis Brief Kolaborasi Proyek
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400">
              Pesan terformat akan langsung siap dikirim ke WhatsApp atau Email resmi{' '}
              {PROFILE_DATA.fullName}.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup formulir brief"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-zinc-200 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleCopyBrief} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="modal-name" className="block text-xs font-medium text-zinc-300 mb-1.5">
                Nama Anda
              </label>
              <input
                id="modal-name"
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Nama lengkap"
                className="w-full rounded-md border border-zinc-700 bg-[#09090B] px-3.5 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-[#E3D7C8] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="modal-org" className="block text-xs font-medium text-zinc-300 mb-1.5">
                Brand / Instansi
              </label>
              <input
                id="modal-org"
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Perusahaan / Kampus"
                className="w-full rounded-md border border-zinc-700 bg-[#09090B] px-3.5 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-[#E3D7C8] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="modal-service" className="block text-xs font-medium text-zinc-300 mb-1.5">
                Kebutuhan Layanan
              </label>
              <select
                id="modal-service"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full rounded-md border border-zinc-700 bg-[#09090B] px-3.5 py-2 text-sm text-white focus:border-[#E3D7C8] focus:outline-none"
              >
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="modal-scope" className="block text-xs font-medium text-zinc-300 mb-1.5">
                Cakupan Lokasi
              </label>
              <select
                id="modal-scope"
                value={assignmentScope}
                onChange={(e) => setAssignmentScope(e.target.value)}
                className="w-full rounded-md border border-zinc-700 bg-[#09090B] px-3.5 py-2 text-sm text-white focus:border-[#E3D7C8] focus:outline-none"
              >
                {ASSIGNMENT_SCOPES.map((scope) => (
                  <option key={scope} value={scope}>
                    {scope}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="modal-date" className="block text-xs font-medium text-zinc-300 mb-1.5">
              Estimasi Jadwal Shooting / Pemotretan
            </label>
            <input
              id="modal-date"
              type="text"
              value={projectDate}
              onChange={(e) => setProjectDate(e.target.value)}
              placeholder="Contoh: Akhir bulan ini · 2 Hari Produksi"
              className="w-full rounded-md border border-zinc-700 bg-[#09090B] px-3.5 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-[#E3D7C8] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="modal-notes" className="block text-xs font-medium text-zinc-300 mb-1.5">
              Gambaran Singkat Proyek
            </label>
            <textarea
              id="modal-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ceritakan konsep video, dokumentasi, atau katalog produk yang direncanakan..."
              className="w-full rounded-md border border-zinc-700 bg-[#09090B] px-3.5 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-[#E3D7C8] focus:outline-none resize-y"
            />
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#E3D7C8] px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-950 hover:bg-[#F2E9DD] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Kirim ke WhatsApp</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <a
              href={mailtoHref}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-white/15 transition-colors whitespace-nowrap shrink-0"
            >
              <Mail className="h-4 w-4" />
              <span>Kirim via Email</span>
            </a>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/10 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-zinc-300 hover:bg-white/5 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-[#E3D7C8]" />
                  <span>Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Salin Teks</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
