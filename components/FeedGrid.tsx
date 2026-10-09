'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  LayoutGrid,
  Heart,
  Share2,
  Bookmark,
  ChevronDown,
  Layers,
  Sparkles,
  Maximize2,
  Check,
  Flame,
} from 'lucide-react';
import { OutfitItem } from '@/lib/fashion-data';

interface FeedGridProps {
  outfits: OutfitItem[];
  onOpenLookModal: (outfit: OutfitItem) => void;
  savedLookIds: string[];
  onToggleSaveLook: (outfitId: string) => void;
  onSelectColor: (hex: string) => void;
  onSelectTag: (tag: string) => void;
}

export function FeedGrid({
  outfits,
  onOpenLookModal,
  savedLookIds,
  onToggleSaveLook,
  onSelectColor,
  onSelectTag,
}: FeedGridProps) {
  const [sortBy, setSortBy] = useState<'impact' | 'likes' | 'alphabetical'>('impact');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const handleShare = (outfit: OutfitItem) => {
    const text = `Confira a combinação de moda "${outfit.title}" na Divas dress well.`;
    navigator.clipboard.writeText(text);
    setCopiedLink(outfit.id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const sortedOutfits = [...outfits].sort((a, b) => {
    if (sortBy === 'likes') return b.likes - a.likes;
    if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
    return 0; // Default curated order
  });

  const displayedOutfits = sortedOutfits.slice(0, visibleCount);

  return (
    <section id="feed" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      {/* Feed Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#6a0dad]/40">
        <div>
          <div className="flex items-center gap-2 text-[#ff1493] text-xs uppercase tracking-widest font-bold mb-1.5">
            <Flame className="w-4 h-4 text-[#ff2d95]" />
            <span>Feed Fubanga de Oncinha • Mais Seleções de Roupas</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#ff2d95] font-semibold drop-shadow-[0_2px_15px_rgba(255,45,149,0.4)]">
            Galeria de Roupas & Combinações Poderosas
          </h2>
          <p className="text-sm sm:text-base text-[#ffb6c1] mt-1 font-light">
            Modelos de onça-pintada, casacos de pelo, botas over-the-knee, vestidos pink choque e silhuetas extravagantes.
          </p>
        </div>

        {/* Sort and View controls */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <span className="text-xs uppercase text-[#ebb3f9] tracking-wider font-bold">
            Ordenar:
          </span>
          <div className="relative inline-block text-left">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-[#2e003e] text-[#ffb0ca] text-xs uppercase tracking-wider px-3.5 py-1.5 pr-8 rounded-full border border-[#ff1493]/40 focus:outline-none cursor-pointer hover:bg-[#43005b] transition-colors font-bold shadow-md"
            >
              <option value="impact">Impacto de Passarela</option>
              <option value="likes">Mais Amados das Divas</option>
              <option value="alphabetical">Nome A-Z</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#ff69b4] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff1493] to-[#8a2be2] text-white flex items-center justify-center shadow-lg border border-[#ffb0ca]/30" title="Grade de Looks">
            <LayoutGrid className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Staggered Masonry / Pinterest Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
        {displayedOutfits.map((outfit, index) => {
          const isSaved = savedLookIds.includes(outfit.id);

          return (
            <article
              key={outfit.id}
              className={`group rounded-2xl bg-[#1d0029]/95 border-2 border-[#6a0dad]/40 hover:border-[#ff1493]/70 overflow-hidden shadow-[0_8px_30px_rgba(46,0,62,0.6)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between ${
                index % 3 === 1 ? 'lg:-mt-3' : index % 3 === 2 ? 'lg:-mt-5' : ''
              }`}
            >
              {/* Image Container with Badges */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#12001a]">
                <Image
                  src={outfit.image}
                  alt={outfit.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d0029] via-transparent to-black/50" />

                {/* Floating Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full bg-[#2e003e]/90 backdrop-blur-md text-[#ff69b4] text-[10px] uppercase tracking-wider font-bold border border-[#ff1493]/50 shadow-md">
                    {outfit.aesthetic}
                  </span>

                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => onToggleSaveLook(outfit.id)}
                      className="w-8 h-8 rounded-full bg-[#1a0026]/80 backdrop-blur-md text-white hover:text-[#ff1493] flex items-center justify-center transition-colors border border-[#ff1493]/30 shadow-md"
                      title={isSaved ? 'Remover dos Salvos' : 'Salvar Look'}
                      aria-label="Salvar look"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#ff1493] text-[#ff1493]' : ''}`} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenLookModal(outfit)}
                      className="w-8 h-8 rounded-full bg-[#1a0026]/80 backdrop-blur-md text-white hover:text-[#ff1493] flex items-center justify-center transition-colors border border-[#ff1493]/30 shadow-md"
                      title="Ver Detalhes Completos"
                      aria-label="Expandir detalhes"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Color Swatches floating over bottom of photo */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-[#250036]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#ff1493]/40 z-10 shadow-md">
                  {outfit.palette.map((p) => (
                    <button
                      key={p.hex}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectColor(p.hex);
                      }}
                      className="w-3.5 h-3.5 rounded-full shadow hover:scale-125 transition-transform border border-white/20"
                      style={{ backgroundColor: p.hex }}
                      title={`${p.name} (${p.hex})`}
                    />
                  ))}
                  <span className="text-[10px] text-[#ffb6c1] ml-1 font-bold">
                    {outfit.paletteBadgeText}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => onOpenLookModal(outfit)}
                    className="font-serif text-xl text-[#ff2d95] group-hover:text-[#ff69b4] transition-colors cursor-pointer font-semibold leading-snug"
                  >
                    {outfit.title}
                  </h3>

                  <p className="text-xs text-[#ffb6c1] mt-1.5 line-clamp-2 font-light">
                    {outfit.description}
                  </p>

                  {/* Stylist Formula */}
                  <div className="mt-3 p-3 rounded-lg bg-[#280238] border border-[#ff1493]/30 text-[#ffb6c1] text-xs">
                    <p className="text-[10px] uppercase tracking-wider text-[#ff1493] font-bold mb-0.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#ff69b4]" />
                      Dica da Consultora Fubanga
                    </p>
                    <p className="line-clamp-2 italic font-light">
                      “{outfit.stylistTip}”
                    </p>
                  </div>

                  {/* Portuguese Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {outfit.tags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => onSelectTag(tag)}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-[#340049] hover:bg-[#520075] text-[#ebb3f9] hover:text-[#ff1493] transition-colors border border-[#6a0dad]/40 font-medium"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Footer of Card */}
                <div className="pt-3 border-t border-[#6a0dad]/30 space-y-3">
                  <button
                    type="button"
                    onClick={() => onOpenLookModal(outfit)}
                    className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#ff1493] via-[#a1045a] to-[#6a0dad] hover:brightness-110 text-white text-xs uppercase tracking-wider font-bold transition-all shadow-[0_4px_15px_rgba(255,20,147,0.4)] flex items-center justify-center gap-1.5"
                  >
                    <span>Ver Detalhes da Roupa</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-[#ebb3f9]">
                    <span className="uppercase tracking-wider font-semibold">{outfit.collection}</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onToggleSaveLook(outfit.id)}
                        className="hover:text-[#ff1493] flex items-center gap-1 transition-colors font-bold"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#ff1493] text-[#ff1493]' : ''}`} />
                        <span>{isSaved ? outfit.likes + 1 : outfit.likes}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleShare(outfit)}
                        className="hover:text-[#ff1493] flex items-center gap-1 transition-colors"
                        title="Compartilhar Look"
                      >
                        {copiedLink === outfit.id ? (
                          <Check className="w-3.5 h-3.5 text-green-400" />
                        ) : (
                          <Share2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Editorial Theory Cards (Styled with Onça & Pink & Roxo) */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Infográfico Fubanga 60-30-10 */}
        <div className="rounded-2xl bg-[#1d0029]/95 p-6 border-2 border-[#6a0dad]/50 shadow-[0_8px_30px_rgba(46,0,62,0.7)] space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-[#ff1493]/20 text-[#ff69b4] text-[10px] uppercase tracking-wider font-bold border border-[#ff1493]/40">
              Teoria Fubanga da Proporção
            </span>
            <Layers className="w-4 h-4 text-[#ebb3f9]" />
          </div>
          <h3 className="font-serif text-2xl text-[#ff2d95] font-semibold">
            O Equilíbrio Oncinha 60-30-10
          </h3>
          <p className="text-xs text-[#ffb6c1] leading-relaxed font-light">
            Como dosar a estampa Panthera onça com pink neon e roxo profundo para uma presença hipnótica sem perder a elegância glamourosa.
          </p>

          <div className="bg-[#2a003b] rounded-xl p-4 space-y-2 border border-[#6a0dad]/40">
            <div className="flex justify-between text-xs">
              <span className="text-[#ffb6c1] font-semibold">Casacão de Pelo Panthera Onça (60%)</span>
              <span className="font-mono text-[#C68642] font-bold">#C68642</span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#180024] overflow-hidden border border-[#ff1493]/20">
              <div className="h-full rounded-full bg-[#C68642]" style={{ width: '60%' }} />
            </div>

            <div className="flex justify-between text-xs pt-1">
              <span className="text-[#ffb6c1] font-semibold">Slip Dress / Vestido Pink Choque (30%)</span>
              <span className="font-mono text-[#ff1493] font-bold">#FF1493</span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#180024] overflow-hidden border border-[#ff1493]/20">
              <div className="h-full rounded-full bg-[#ff1493]" style={{ width: '30%' }} />
            </div>

            <div className="flex justify-between text-xs pt-1">
              <span className="text-[#ffb6c1] font-semibold">Botas Veludo & Acessórios Roxos (10%)</span>
              <span className="font-mono text-[#9d00ff] font-bold">#9D00FF</span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#180024] overflow-hidden border border-[#ff1493]/20">
              <div className="h-full rounded-full bg-[#9d00ff]" style={{ width: '10%' }} />
            </div>
          </div>
        </div>

        {/* Glossário Tátil de Tecidos Fubanga */}
        <div className="rounded-2xl bg-[#1d0029]/95 p-6 border-2 border-[#6a0dad]/50 shadow-[0_8px_30px_rgba(46,0,62,0.7)] space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-[#8a2be2]/20 text-[#ebb3f9] text-[10px] uppercase tracking-wider font-bold border border-[#8a2be2]/40">
              Texturas de Diva
            </span>
            <Sparkles className="w-4 h-4 text-[#ff1493]" />
          </div>
          <h3 className="font-serif text-2xl text-[#ff2d95] font-semibold">
            Pele de Onça vs. Cetim Pink & Veludo Roxo
          </h3>
          <p className="text-xs text-[#ffb6c1] leading-relaxed font-light">
            O atrito visual entre a textura felpuda selvagem da onça e o brilho úmido do cetim cria uma presença de tapete vermelho inconfundível.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-[#2a003b] border border-[#6a0dad]/40">
              <span className="text-[10px] uppercase text-[#ebb3f9] font-bold block">
                Impacto Felino
              </span>
              <p className="text-sm font-bold text-white mt-0.5">Nota 10 • Indomável</p>
              <p className="text-[11px] text-[#ffb6c1] mt-1">Pele Fake Oncinha & Vinil</p>
            </div>
            <div className="p-3 rounded-xl bg-[#2a003b] border border-[#6a0dad]/40">
              <span className="text-[10px] uppercase text-[#ebb3f9] font-bold block">
                Glow & Ostentação
              </span>
              <p className="text-sm font-bold text-[#ff1493] mt-0.5">Glow Espelhado</p>
              <p className="text-[11px] text-[#ffb6c1] mt-1">Cetim Neon & Veludo Roxo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination / Load more */}
      {visibleCount < sortedOutfits.length && (
        <div className="flex flex-col items-center justify-center mt-14 gap-3">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ff1493] via-[#a1045a] to-[#6a0dad] hover:brightness-110 text-white text-xs uppercase tracking-wider font-bold transition-all shadow-[0_6px_25px_rgba(255,20,147,0.5)] hover:scale-105 flex items-center gap-2 border border-white/20"
          >
            <span>Carregar Mais Seleções de Roupas</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <span className="text-[10px] uppercase tracking-widest text-[#ebb3f9] font-bold">
            Exibindo {Math.min(visibleCount, sortedOutfits.length)} de {sortedOutfits.length} seleções luxuosas
          </span>
        </div>
      )}
    </section>
  );
}
