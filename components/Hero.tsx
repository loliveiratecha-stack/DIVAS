'use client';

import React from 'react';
import { Palette, Sparkles, Flame, Crown } from 'lucide-react';
import { HARMONIC_BASES, AESTHETIC_FILTERS } from '@/lib/fashion-data';

interface HeroProps {
  selectedBaseId: string;
  onSelectBase: (baseId: string) => void;
  selectedAesthetic: string;
  onSelectAesthetic: (aestheticId: string) => void;
  matchingOutfitsCount: number;
}

export function Hero({
  selectedBaseId,
  onSelectBase,
  selectedAesthetic,
  onSelectAesthetic,
  matchingOutfitsCount,
}: HeroProps) {
  const activeBase = HARMONIC_BASES.find((b) => b.id === selectedBaseId) || HARMONIC_BASES[0];
  const activeAestheticObj = AESTHETIC_FILTERS.find((a) => a.id === selectedAesthetic) || AESTHETIC_FILTERS[0];

  return (
    <section id="hero" className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14 lg:pt-36 lg:pb-20 flex flex-col items-center text-center">
      {/* Editorial Overline Marker: Pink & Roxo Fubanga Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2e003e]/90 border border-[#ff1493]/60 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(255,20,147,0.35)]">
        <Crown className="w-3.5 h-3.5 text-[#ff1493]" />
        <span className="text-[11px] uppercase tracking-widest text-[#ff69b4] font-bold">
          Panthera Onça Chic • Edição Diva Fubanga & Detalhes em Roxo
        </span>
        <Flame className="w-3.5 h-3.5 text-[#ebb3f9]" />
      </div>

      {/* Regal Editorial Headline: Pink letters with glowing gradient */}
      <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-[#ff2d95] max-w-5xl leading-[1.12] text-balance drop-shadow-[0_4px_25px_rgba(255,45,149,0.45)]">
        Encontre seu Estilo & Combinações de Roupas na{' '}
        <span className="italic font-light text-[#ffd9e3] bg-gradient-to-r from-[#ff1493] via-[#ff69b4] to-[#9d00ff] bg-clip-text text-transparent underline decoration-[#6a0dad]/60 decoration-wavy">
          Panthera Onça.
        </span>
      </h1>

      {/* Subtitle in soft pink with purple highlights */}
      <p className="text-base sm:text-lg text-[#ffb6c1] max-w-2xl mt-5 font-normal leading-relaxed drop-shadow-sm">
        Explore a harmonia selvagem de estampas felinas, plumas, pink neon e roxo profundo para criar looks extravagantes com atitude inabalável de diva.
      </p>

      {/* Interactive Color & Aesthetic Matrix Bar (Purple Container with Pink Borders) */}
      <div className="w-full max-w-4xl mt-10 rounded-2xl bg-[#1d0029]/95 border-2 border-[#6a0dad]/60 backdrop-blur-2xl p-4 sm:p-6 shadow-[0_10px_40px_rgba(106,13,173,0.5)] flex flex-col gap-5">
        {/* Swatch Selection Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 bg-[#2b003d]/80 rounded-xl p-3 border border-[#ff1493]/30">
          <div className="flex items-center gap-2 text-left self-start md:self-center">
            <Palette className="w-4 h-4 text-[#ff1493]" />
            <span className="text-xs uppercase tracking-wider text-[#ff69b4] font-bold">
              Base da Diva:
            </span>
          </div>

          {/* Color Swatch Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {HARMONIC_BASES.map((swatch) => {
              const isSelected = selectedBaseId === swatch.id;
              return (
                <button
                  key={swatch.id}
                  type="button"
                  onClick={() => onSelectBase(isSelected ? 'all' : swatch.id)}
                  className={`group flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 border ${
                    isSelected
                      ? 'bg-[#4a0e4e] scale-105 shadow-[0_0_12px_rgba(255,20,147,0.6)] border-[#ff1493] text-white font-bold ring-2 ring-[#ff69b4]/50'
                      : 'bg-[#220030] hover:bg-[#38004f] text-[#ebb3f9] hover:text-white border-[#6a0dad]/40'
                  }`}
                  title={`${swatch.fullName} (${swatch.hex})`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full shadow-inner ${
                      swatch.hex === '#121212' ? 'border border-white/40' : ''
                    }`}
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <span className="text-[11px] uppercase tracking-wider">
                    {swatch.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Aesthetic Filter Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar justify-start sm:justify-center">
          {AESTHETIC_FILTERS.map((tab) => {
            const isCurrent = selectedAesthetic === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectAesthetic(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap shrink-0 font-bold ${
                  isCurrent
                    ? 'bg-gradient-to-r from-[#ff1493] to-[#8a2be2] text-white shadow-[0_0_15px_rgba(255,20,147,0.6)] border border-white/30 scale-105'
                    : 'bg-[#2e003e] hover:bg-[#43005b] text-[#ebb3f9] hover:text-[#ff69b4] border border-[#6a0dad]/40'
                }`}
              >
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Active Filter Summary Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-2 border-t border-[#6a0dad]/30 text-xs text-[#ffb6c1] gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-[#ebb3f9] font-bold">
              Matriz Ativa:
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#3b0054] text-[#ff69b4] font-semibold text-[11px] border border-[#ff1493]/30">
              <span
                className="w-2 h-2 rounded-full shadow"
                style={{ backgroundColor: activeBase.hex }}
              />
              {activeBase.name} • Estilo Fubanga
            </span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-[#3b0054] text-[#ebb3f9] text-[11px] border border-[#6a0dad]/30">
              {activeAestheticObj.name}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#ffb6c1]">
            <Sparkles className="w-3.5 h-3.5 text-[#ff1493]" />
            <span>
              Exibindo <strong className="text-white font-bold">{matchingOutfitsCount}</strong> seleções de looks extravagantes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
