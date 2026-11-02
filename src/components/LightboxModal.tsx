import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { PortfolioWork } from '../data/portfolioData';

interface LightboxModalProps {
  work: PortfolioWork | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onInquireWork: (work: PortfolioWork) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  work,
  onClose,
  onPrev,
  onNext,
  onInquireWork,
}) => {
  const [compareActive, setCompareActive] = useState(false);
  const [gradeSplit, setGradeSplit] = useState(50);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loadedImgRef = useRef<HTMLImageElement | null>(null);
  const draggingRef = useRef(false);
  const [imageReady, setImageReady] = useState(false);

  useEffect(() => {
    if (!work) return;
    setCompareActive(false);
    setGradeSplit(50);
    setImageReady(false);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      loadedImgRef.current = img;
      setImageReady(true);
    };
    img.src = work.imageUrl;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [work, onClose, onPrev, onNext]);

  useEffect(() => {
    if (!work || !imageReady || !loadedImgRef.current || !canvasRef.current) return;

    const drawComparison = () => {
      const canvas = canvasRef.current;
      const img = loadedImgRef.current;
      if (!canvas || !img) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = Math.max(320, Math.floor(rect.width * dpr));
      const ch = Math.max(220, Math.floor(rect.height * dpr));

      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw;
        canvas.height = ch;
      }

      ctx.clearRect(0, 0, cw, ch);

      // Compute cover crop dimensions
      const imgRatio = img.width / img.height;
      const canvasRatio = cw / ch;
      let sx = 0;
      let sy = 0;
      let sw = img.width;
      let sh = img.height;

      if (imgRatio > canvasRatio) {
        sw = img.height * canvasRatio;
        sx = (img.width - sw) * 0.5;
      } else {
        sh = img.width / canvasRatio;
        sy = (img.height - sh) * 0.35;
      }

      // Draw full 4K Graded image
      ctx.save();
      ctx.filter = 'contrast(1.06) saturate(1.08)';
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
      ctx.restore();

      if (compareActive) {
        const splitX = Math.round((gradeSplit / 100) * cw);

        // Draw flat Raw S-Log3 sensor profile on left side
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, splitX, ch);
        ctx.clip();
        ctx.filter = 'saturate(0.28) contrast(0.72) brightness(1.08)';
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
        ctx.restore();

        // Split divider line & circular handle
        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,0.92)';
        ctx.lineWidth = Math.max(1.5, dpr);
        ctx.beginPath();
        ctx.moveTo(splitX, 0);
        ctx.lineTo(splitX, ch);
        ctx.stroke();

        const cy = ch * 0.5;
        const r = 15 * dpr;
        ctx.fillStyle = 'rgba(10,10,12,0.88)';
        ctx.beginPath();
        ctx.arc(splitX, cy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.6 * dpr;
        ctx.beginPath();
        ctx.moveTo(splitX - 3 * dpr, cy - 4 * dpr);
        ctx.lineTo(splitX - 7 * dpr, cy);
        ctx.lineTo(splitX - 3 * dpr, cy + 4 * dpr);
        ctx.moveTo(splitX + 3 * dpr, cy - 4 * dpr);
        ctx.lineTo(splitX + 7 * dpr, cy);
        ctx.lineTo(splitX + 3 * dpr, cy + 4 * dpr);
        ctx.stroke();
        ctx.restore();
      }
    };

    drawComparison();
    window.addEventListener('resize', drawComparison);
    return () => window.removeEventListener('resize', drawComparison);
  }, [work, imageReady, compareActive, gradeSplit]);

  if (!work) return null;

  const updatePointerSplit = (clientX: number) => {
    if (!compareActive || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setGradeSplit(Math.max(5, Math.min(95, Math.round(ratio))));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-work-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 lg:p-10 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-5xl rounded-lg border border-white/15 bg-[#101013] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3.5 sm:px-7">
          <div className="flex items-center gap-2 text-xs text-zinc-400 truncate">
            <span className="text-zinc-100 font-medium">{work.clientOrOrg}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{work.year}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Karya sebelumnya"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-zinc-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Karya berikutnya"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-zinc-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup pratinjau karya"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/15 text-white hover:bg-white/25 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* High-Resolution Photographic & Color Grading Canvas */}
        <div className="relative aspect-[16/10] w-full bg-zinc-950 overflow-hidden">
          <canvas
            ref={canvasRef}
            onPointerDown={(e) => {
              if (!compareActive) return;
              draggingRef.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              updatePointerSplit(e.clientX);
            }}
            onPointerMove={(e) => {
              if (!draggingRef.current) return;
              updatePointerSplit(e.clientX);
            }}
            onPointerUp={() => {
              draggingRef.current = false;
            }}
            onPointerCancel={() => {
              draggingRef.current = false;
            }}
            className={`block h-full w-full ${compareActive ? 'cursor-ew-resize touch-none' : ''}`}
          />

          {compareActive && (
            <div className="pointer-events-none absolute inset-x-5 top-4 flex items-center justify-between text-xs font-medium text-zinc-100">
              <span className="bg-black/75 px-2.5 py-1 rounded">Profil Sensor Raw Log</span>
              <span className="bg-black/75 px-2.5 py-1 rounded">Hasil Akhir 4K Grade</span>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-5 py-4 sm:px-7 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setCompareActive((prev) => !prev)}
              className={`inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                compareActive
                  ? 'bg-[#E3D7C8] text-zinc-950 font-semibold'
                  : 'bg-black/65 backdrop-blur-sm text-white hover:bg-black/80 border border-white/15'
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>{compareActive ? 'Tutup Split Grading' : 'Bandingkan Raw vs 4K Grade'}</span>
            </button>

            {compareActive ? (
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-200">
                <label htmlFor="lut-range" className="whitespace-nowrap">
                  Split
                </label>
                <input
                  id="lut-range"
                  type="range"
                  min={5}
                  max={95}
                  value={gradeSplit}
                  onChange={(e) => setGradeSplit(Number(e.target.value))}
                  className="w-28 sm:w-36 accent-[#E3D7C8] cursor-pointer"
                />
                <span className="tabular-nums w-9 text-right">{gradeSplit}%</span>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-zinc-200 tabular-nums">
                {work.exifSpecs.map((spec, i) => (
                  <React.Fragment key={spec}>
                    {i > 0 && <span aria-hidden="true">·</span>}
                    <span>{spec}</span>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Production Details */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pb-6 border-b border-white/10">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mb-2">
                <span>{work.role}</span>
                <span aria-hidden="true">·</span>
                <span>{work.aspectLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{work.durationOrSeries}</span>
              </div>
              <h3 id="lightbox-work-title" className="font-display text-xl sm:text-2xl font-bold text-white">
                {work.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">{work.summary}</p>
            </div>

            <div className="shrink-0">
              <button
                type="button"
                onClick={() => onInquireWork(work)}
                className="inline-flex items-center justify-center rounded-md bg-[#E3D7C8] px-5 py-2.5 text-xs sm:text-sm font-semibold text-zinc-950 hover:bg-[#F0E7DC] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Diskusikan Proyek Serupa
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-semibold text-[#E3D7C8]">01. Pra-Produksi</p>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-300">
                {work.preProduction}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#E3D7C8]">02. Produksi Lapangan / Studio</p>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-300">
                {work.production}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#E3D7C8]">03. Pasca-Produksi &amp; Grading</p>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-300">
                {work.postProduction}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
