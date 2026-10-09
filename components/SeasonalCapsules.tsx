'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, Flame } from 'lucide-react';
import { SEASONAL_CAPSULES } from '@/lib/fashion-data';

interface SeasonalCapsulesProps {
  onSelectCapsulePalette: (colorHex: string) => void;
}

export function SeasonalCapsules({ onSelectCapsulePalette }: SeasonalCapsulesProps) {
  return (
    <section id="seasonal" className="w-full bg-[#160021]/95 py-16 lg:py-24 border-t-2 border-[#6a0dad]/40 relative overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#6a0dad]/40">
          <div>
            <div className="flex items-center gap-2 text-[#ff1493] text-xs uppercase tracking-widest font-bold mb-1.5">
              <Flame className="w-4 h-4 text-[#ff2d95]" />
              <span>Previsão de Cápsulas 2025 • Coleção Oncinha & Glamour</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#ff2d95] font-semibold drop-shadow-[0_2px_15px_rgba(255,45,149,0.4)]">
              Cápsulas de Alta-Costura & Fubanga Chic
            </h2>
            <p className="text-sm sm:text-base text-[#ffb6c1] mt-1 font-light">
              Direções cromáticas de onça selvagem, fúcsia elétrico e roxo berinjela para todas as estações.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {SEASONAL_CAPSULES.map((capsule) => (
            <div
              key={capsule.id}
              className="group rounded-2xl bg-[#260036]/95 border-2 border-[#6a0dad]/40 p-4 transition-all duration-300 hover:bg-[#340049] hover:border-[#ff1493]/70 hover:-translate-y-1 shadow-[0_6px_25px_rgba(46,0,62,0.6)] flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-[#12001a]">
                  <Image
                    src={capsule.image}
                    alt={capsule.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    unoptimized
                  />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#2e003e]/90 backdrop-blur-md text-[#ff69b4] text-[10px] uppercase font-bold border border-[#ff1493]/40">
                    {capsule.keyPalette}
                  </div>
                </div>

                <h3 className="font-serif text-lg text-[#ff2d95] font-semibold group-hover:text-[#ff69b4] transition-colors leading-snug">
                  {capsule.title}
                </h3>

                <p className="text-xs text-[#ffb6c1] mt-1.5 font-light leading-relaxed">
                  {capsule.description}
                </p>
              </div>

              {/* Bottom colors strip & action */}
              <div className="mt-4 pt-3 border-t border-[#6a0dad]/30 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {capsule.colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => onSelectCapsulePalette(c)}
                      className="w-4 h-4 rounded-full shadow hover:scale-125 transition-transform border border-white/30"
                      style={{ backgroundColor: c }}
                      title={`Filtrar looks com ${c}`}
                    />
                  ))}
                </div>

                <span className="text-[11px] text-[#ebb3f9] uppercase tracking-wider font-bold">
                  {capsule.season}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
