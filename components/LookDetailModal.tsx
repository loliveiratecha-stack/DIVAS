'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Bookmark, Wand2, Flame } from 'lucide-react';
import { OutfitItem } from '@/lib/fashion-data';

interface LookDetailModalProps {
  outfit: OutfitItem | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export function LookDetailModal({
  outfit,
  onClose,
  isSaved,
  onToggleSave,
}: LookDetailModalProps) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  if (!outfit) return null;

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#1c0026] border-2 border-[#6a0dad] shadow-[0_0_50px_rgba(106,13,173,0.7)] flex flex-col md:flex-row overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#2e003e]/90 backdrop-blur-md text-white hover:text-[#ff1493] flex items-center justify-center transition-colors border border-[#ff1493]/40 shadow-md"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image with Overlay */}
        <div className="md:w-5/12 relative aspect-[3/4] md:aspect-auto min-h-[350px] md:min-h-full bg-[#12001a]">
          <Image
            src={outfit.image}
            alt={outfit.alt}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
            referrerPolicy="no-referrer"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c0026] via-transparent to-black/30 md:hidden" />

          {/* Floating Aesthetic Chip on Image */}
          <div className="absolute bottom-4 left-4 z-10">
            <span className="px-3.5 py-1 rounded-full bg-[#2e003e]/90 backdrop-blur-md text-[#ff69b4] text-xs uppercase tracking-wider font-bold border border-[#ff1493]/50 shadow-md flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[#ff1493]" />
              {outfit.aesthetic}
            </span>
          </div>
        </div>

        {/* Right Column: Detailed Breakdown */}
        <div className="md:w-7/12 p-6 sm:p-8 space-y-6 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between pr-8">
              <span className="text-[10px] uppercase tracking-widest text-[#ebb3f9] font-bold">
                {outfit.collection}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#ff2d95] font-semibold mt-1 leading-snug drop-shadow">
              {outfit.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#ffb6c1] mt-2 font-light leading-relaxed">
              {outfit.description}
            </p>

            {/* Color Palette with 1-click copy */}
            <div className="mt-5 p-4 rounded-xl bg-[#280036] border border-[#6a0dad]/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#ff69b4] font-bold">
                  Paleta de Cores da Roupa
                </span>
                <span className="text-[10px] text-[#ebb3f9]">Clique para copiar HEX</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {outfit.palette.map((p) => {
                  const isCopied = copiedHex === p.hex;
                  return (
                    <button
                      key={p.hex}
                      type="button"
                      onClick={() => handleCopyHex(p.hex)}
                      className="flex items-center gap-2 p-2 rounded-lg bg-[#1a0026] hover:bg-[#3b0054] transition-all border border-[#6a0dad]/40 text-left group"
                    >
                      <span
                        className="w-4 h-4 rounded-full shadow-inner shrink-0 border border-white/20"
                        style={{ backgroundColor: p.hex }}
                      />
                      <div className="truncate">
                        <span className="text-[11px] font-bold text-white block truncate">
                          {p.name}
                        </span>
                        <span className="text-[9px] font-mono text-[#ffb6c1]">
                          {isCopied ? 'Copiado!' : p.hex}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pieces Breakdown */}
            <div className="mt-5 space-y-2.5">
              <span className="text-xs uppercase tracking-wider text-[#ff69b4] font-bold block">
                Peças da Combinação de Roupa
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[#280036] border border-[#6a0dad]/40">
                  <span className="text-[10px] uppercase text-[#ff1493] font-bold block">
                    Terceira Peça / Sobretudo
                  </span>
                  <span className="text-white font-medium mt-0.5 block">{outfit.pieces.outerwear}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#280036] border border-[#6a0dad]/40">
                  <span className="text-[10px] uppercase text-[#ff69b4] font-bold block">
                    Peça Principal
                  </span>
                  <span className="text-white font-medium mt-0.5 block">{outfit.pieces.mainPiece}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#280036] border border-[#6a0dad]/40">
                  <span className="text-[10px] uppercase text-[#ebb3f9] font-bold block">
                    Parte Inferior / Estrutura
                  </span>
                  <span className="text-white font-medium mt-0.5 block">{outfit.pieces.lowerOrInner}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#280036] border border-[#6a0dad]/40">
                  <span className="text-[10px] uppercase text-[#debec7] font-bold block">
                    Calçados de Diva
                  </span>
                  <span className="text-white font-medium mt-0.5 block">{outfit.pieces.shoes}</span>
                </div>
              </div>
            </div>

            {/* Stylist Tip & Occasion */}
            <div className="mt-5 p-4 rounded-xl bg-[#280036] border border-[#ff1493]/30 space-y-2">
              <div className="flex items-center gap-1.5 text-[#ff1493] text-xs uppercase font-bold">
                <Wand2 className="w-3.5 h-3.5" />
                <span>Conselho da Consultoria Fubanga</span>
              </div>
              <p className="text-xs text-[#ffb6c1] italic leading-relaxed font-light">
                “{outfit.stylistTip}”
              </p>
              {outfit.stylistRationale && (
                <p className="text-[11px] text-[#ebb3f9] font-light pt-1 border-t border-[#6a0dad]/30">
                  {outfit.stylistRationale}
                </p>
              )}
            </div>

            {/* Metadata Tags (Occasion & Metals) */}
            <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-[#ebb3f9] gap-2 pt-2 border-t border-[#6a0dad]/30">
              <div>
                <span className="text-[#ff69b4] font-bold">Ocasião: </span>
                <span className="text-white">{outfit.occasion}</span>
              </div>
              <div>
                <span className="text-[#ff1493] font-bold">Metais: </span>
                <span className="text-white">{outfit.metals}</span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-[#6a0dad]/40 flex gap-3">
            <button
              type="button"
              onClick={() => onToggleSave(outfit.id)}
              className={`flex-1 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 ${
                isSaved
                  ? 'bg-[#3b0054] text-white border-2 border-[#ff1493] shadow-lg'
                  : 'bg-gradient-to-r from-[#ff1493] to-[#8a2be2] text-white shadow-[0_4px_15px_rgba(255,20,147,0.5)] border border-white/20'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#ff1493] text-[#ff1493]' : ''}`} />
              <span>{isSaved ? 'Look Salvo no Moodboard' : 'Salvar no Meu Moodboard'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-[#2e003e] hover:bg-[#43005b] text-[#ffb6c1] text-xs uppercase tracking-wider font-bold border border-[#6a0dad]/40"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
