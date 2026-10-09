'use client';

import React from 'react';
import Image from 'next/image';
import { X, Bookmark, Trash2, Palette, Flame } from 'lucide-react';
import { OutfitItem } from '@/lib/fashion-data';

interface SavedMoodboardDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedOutfits: OutfitItem[];
  savedPalettes: { name: string; colors: string[] }[];
  onRemoveLook: (id: string) => void;
  onRemovePalette: (index: number) => void;
  onSelectLook: (outfit: OutfitItem) => void;
}

export function SavedMoodboardDrawer({
  isOpen,
  onClose,
  savedOutfits,
  savedPalettes,
  onRemoveLook,
  onRemovePalette,
  onSelectLook,
}: SavedMoodboardDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md h-full bg-[#1c0026] border-l-2 border-[#6a0dad] p-6 flex flex-col justify-between shadow-[0_0_50px_rgba(106,13,173,0.8)] overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#6a0dad]/40">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[#ff1493]" />
              <h3 className="font-serif text-xl text-[#ff2d95] font-semibold flex items-center gap-1.5">
                <span>Moodboard da Diva</span>
                <Flame className="w-4 h-4 text-[#ff69b4]" />
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#2e003e] hover:bg-[#43005b] text-[#ffb6c1] flex items-center justify-center transition-colors border border-[#ff1493]/30"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Intro Notice */}
          <p className="text-xs text-[#ffb6c1] mt-3 font-light">
            Sua coleção privada de looks de oncinha e combinações extravagantes, salva no seu navegador com privacidade total.
          </p>

          {/* Section 1: Saved Looks */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#ff69b4] font-bold">
                Looks de Onça Salvos ({savedOutfits.length})
              </span>
            </div>

            {savedOutfits.length === 0 ? (
              <div className="p-6 rounded-xl bg-[#260036] border border-[#6a0dad]/40 text-center space-y-2">
                <Bookmark className="w-6 h-6 text-[#ebb3f9] mx-auto opacity-50" />
                <p className="text-xs text-[#ffb6c1]">
                  Você ainda não salvou nenhum look de oncinha.
                </p>
                <p className="text-[11px] text-[#ebb3f9]">
                  Clique no marcador nos cards para guardar suas escolhas favoritas!
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                {savedOutfits.map((outfit) => (
                  <div
                    key={outfit.id}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-[#260036] border border-[#6a0dad]/40 hover:border-[#ff1493]/60 transition-all group"
                  >
                    <div
                      className="relative w-14 h-16 rounded-lg overflow-hidden shrink-0 cursor-pointer border border-[#ff1493]/30"
                      onClick={() => {
                        onSelectLook(outfit);
                        onClose();
                      }}
                    >
                      <Image
                        src={outfit.image}
                        alt={outfit.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        unoptimized
                      />
                    </div>

                    <div
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => {
                        onSelectLook(outfit);
                        onClose();
                      }}
                    >
                      <p className="text-xs font-bold text-white truncate group-hover:text-[#ff1493] transition-colors">
                        {outfit.title}
                      </p>
                      <p className="text-[10px] text-[#ebb3f9] uppercase tracking-wider mt-0.5 font-semibold">
                        {outfit.aesthetic}
                      </p>
                      <div className="flex gap-1 mt-1">
                        {outfit.palette.map((c) => (
                          <span
                            key={c.hex}
                            className="w-2.5 h-2.5 rounded-full border border-white/20"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveLook(outfit.id)}
                      className="text-[#ebb3f9] hover:text-[#ff1493] p-1.5 transition-colors"
                      title="Remover look"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Saved Palettes */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#ff69b4] font-bold">
                Paletas Cromáticas Salvas ({savedPalettes.length})
              </span>
            </div>

            {savedPalettes.length === 0 ? (
              <div className="p-4 rounded-xl bg-[#260036] border border-[#6a0dad]/40 text-center">
                <Palette className="w-5 h-5 text-[#ebb3f9] mx-auto opacity-50 mb-1" />
                <p className="text-xs text-[#ffb6c1]">
                  Nenhuma paleta guardada do Ateliê.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                {savedPalettes.map((pal, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#260036] border border-[#6a0dad]/40 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-white truncate max-w-[220px]">
                        {pal.name}
                      </p>
                      <div className="flex gap-1.5 mt-2">
                        {pal.colors.map((hex, cIdx) => (
                          <span
                            key={cIdx}
                            className="w-4 h-4 rounded-full border border-white/20"
                            style={{ backgroundColor: hex }}
                            title={hex}
                          />
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemovePalette(idx)}
                      className="text-[#ebb3f9] hover:text-[#ff1493] p-1.5 transition-colors"
                      title="Remover paleta"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#6a0dad]/40">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#ff1493] to-[#8a2be2] text-white text-xs uppercase tracking-wider font-bold border border-white/20 shadow-md"
          >
            Continuar Explorando
          </button>
        </div>
      </div>
    </div>
  );
}
