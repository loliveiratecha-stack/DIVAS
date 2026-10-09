'use client';

import React, { useState } from 'react';
import { Wand2, CheckCircle2, BookmarkPlus, Filter, Heart, Copy, Check, Flame } from 'lucide-react';
import { HARMONIC_THEORIES } from '@/lib/fashion-data';

interface ChromaticAtelierProps {
  onApplyToFeed: (colorHex: string) => void;
  onSavePalette: (palette: { name: string; colors: string[] }) => void;
  isSaved?: boolean;
}

const ALTERNATIVE_PIGMENTS = [
  { name: 'Panthera Onça', hex: '#C68642', rgb: '198, 134, 66', gradient: 'from-[#C68642] via-[#8B4513] to-[#3B0054]' },
  { name: 'Pink Choque', hex: '#FF1493', rgb: '255, 20, 147', gradient: 'from-[#FF1493] via-[#FF69B4] to-[#6A0DAD]' },
  { name: 'Roxo Imperial', hex: '#3B0054', rgb: '59, 0, 84', gradient: 'from-[#3B0054] to-[#1a0026]' },
  { name: 'Roxo Elétrico', hex: '#8A2BE2', rgb: '138, 43, 226', gradient: 'from-[#8A2BE2] to-[#4A0E4E]' },
  { name: 'Magenta Profundo', hex: '#A1045A', rgb: '161, 4, 90', gradient: 'from-[#A1045A] to-[#3B0054]' },
  { name: 'Veludo Noir', hex: '#1A1A1A', rgb: '26, 26, 26', gradient: 'from-[#1A1A1A] to-[#0A0A0A]' },
];

export function ChromaticAtelier({ onApplyToFeed, onSavePalette, isSaved = false }: ChromaticAtelierProps) {
  const [selectedPigmentIndex, setSelectedPigmentIndex] = useState(0);
  const [selectedTheoryIndex, setSelectedTheoryIndex] = useState(0);
  const [saturation, setSaturation] = useState(98);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentPigment = ALTERNATIVE_PIGMENTS[selectedPigmentIndex];
  const currentTheory = HARMONIC_THEORIES[selectedTheoryIndex] || HARMONIC_THEORIES[0];

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setToastMessage(`Código ${hex} copiado!`);
    setTimeout(() => {
      setCopiedHex(null);
      setToastMessage(null);
    }, 2000);
  };

  const handleSaveCurrentPalette = () => {
    onSavePalette({
      name: `${currentTheory.compositionName} (${currentPigment.name})`,
      colors: currentTheory.colors,
    });
    setToastMessage('Paleta adicionada ao seu Moodboard Fubanga!');
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <section id="atelier" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative">
      {/* Toast feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2e003e] border-2 border-[#ff1493] text-white px-5 py-3 rounded-full shadow-[0_0_25px_rgba(255,20,147,0.7)] text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 font-bold">
          <Check className="w-4 h-4 text-[#ff1493]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="rounded-2xl bg-[#1d0029]/95 border-2 border-[#6a0dad]/60 p-6 lg:p-10 shadow-[0_10px_40px_rgba(46,0,62,0.8)] relative overflow-hidden">
        {/* Atmospheric Backlights: Pink and Roxo */}
        <div className="pointer-events-none absolute -right-36 -top-36 w-96 h-96 bg-[#8a2be2]/25 blur-[140px] rounded-full" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 w-80 h-80 bg-[#ff1493]/25 blur-[130px] rounded-full" />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#6a0dad]/40">
          <div>
            <div className="flex items-center gap-2 text-[#ff1493] text-xs uppercase tracking-widest font-bold mb-1.5">
              <Wand2 className="w-4 h-4 text-[#ff2d95]" />
              <span>Química Cromática: Onça, Pink Choque & Roxo</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#ff2d95] font-semibold drop-shadow-[0_2px_15px_rgba(255,45,149,0.4)]">
              O Ateliê Cromático das Divas
            </h2>
            <p className="text-sm sm:text-base text-[#ffb6c1] mt-1.5 font-light">
              Harmonia de passarela e ostentação: balance a estampa felina com pinks radiantes e roxos nobres.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#2e003e] border border-[#ff1493]/40 px-4 py-2 rounded-full self-start md:self-auto shadow-md">
            <Flame className="w-4 h-4 text-[#ff1493]" />
            <span className="text-[#ff69b4] font-bold text-xs uppercase tracking-wider">
              Harmonia 100% Onça
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ebb3f9]" />
            <span className="text-[11px] text-[#ebb3f9] uppercase tracking-wider font-semibold">
              Calibrado para Impacto
            </span>
          </div>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Step 01 Base Silhouette Tint */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#2a003b] rounded-xl p-5 border border-[#6a0dad]/50 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-[#ff69b4] font-bold">
                  1. Tom Base da Diva
                </span>
                <span className="text-[#ff1493] text-[10px] uppercase font-bold tracking-widest bg-[#ff1493]/20 px-2 py-0.5 rounded-full border border-[#ff1493]/30">
                  Etapa 01
                </span>
              </div>

              {/* Active Base Pigment Card */}
              <div
                className={`relative w-full h-36 rounded-xl p-4 flex flex-col justify-between overflow-hidden shadow-inner mb-5 bg-gradient-to-br ${currentPigment.gradient} border border-white/20`}
              >
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-bold border border-white/20">
                    Dominante 60%
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-white/90" />
                </div>
                <div className="text-white drop-shadow-md">
                  <p className="font-serif text-xl font-bold tracking-wide">
                    {currentPigment.name}
                  </p>
                  <p className="text-[11px] text-white/90 font-mono tracking-wider mt-0.5">
                    HEX {currentPigment.hex} • RGB {currentPigment.rgb}
                  </p>
                </div>
              </div>

              {/* Swatch Selector */}
              <p className="text-[11px] uppercase tracking-wider text-[#ebb3f9] mb-2.5 font-bold">
                Selecione o Pigmento da Diva:
              </p>
              <div className="grid grid-cols-6 gap-2">
                {ALTERNATIVE_PIGMENTS.map((pigment, idx) => (
                  <button
                    key={pigment.name}
                    type="button"
                    onClick={() => setSelectedPigmentIndex(idx)}
                    className={`w-full aspect-square rounded-lg transition-transform hover:scale-110 shadow-md border ${
                      selectedPigmentIndex === idx
                        ? 'border-[#ff1493] ring-2 ring-[#ff69b4] scale-105'
                        : 'border-[#6a0dad]/40'
                    }`}
                    style={{ backgroundColor: pigment.hex }}
                    title={`${pigment.name} (${pigment.hex})`}
                  />
                ))}
              </div>

              {/* Saturation Slider */}
              <div className="mt-6 pt-5 border-t border-[#6a0dad]/30 space-y-2">
                <div className="flex justify-between text-xs text-[#ffb6c1]">
                  <span className="font-semibold">Potência de Pigmento</span>
                  <span className="text-[#ff1493] font-bold font-mono">
                    {saturation}% (Ostentação)
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={saturation}
                  onChange={(e) => setSaturation(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none bg-[#190024] accent-[#ff1493] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Middle Column: Step 02 Harmonic Theory */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs uppercase tracking-wider text-[#ff69b4] font-bold">
                2. Teoria Cromática
              </span>
              <span className="text-[#ebb3f9] text-[10px] uppercase font-bold tracking-widest bg-[#6a0dad]/30 px-2 py-0.5 rounded-full border border-[#8a2be2]/40">
                Etapa 02
              </span>
            </div>

            <div className="space-y-3">
              {HARMONIC_THEORIES.map((theory, idx) => {
                const isSelected = selectedTheoryIndex === idx;
                return (
                  <button
                    key={theory.id}
                    type="button"
                    onClick={() => setSelectedTheoryIndex(idx)}
                    className={`w-full p-4 rounded-xl text-left transition-all border ${
                      isSelected
                        ? 'bg-[#3b0054] border-[#ff1493] shadow-[0_0_15px_rgba(255,20,147,0.4)]'
                        : 'bg-[#250036] hover:bg-[#340049] border-[#6a0dad]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">
                        {theory.title}
                      </span>
                      <span
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-[#ff1493] bg-[#ff1493]'
                            : 'border-white/30'
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </div>

                    <p className="text-xs text-[#ffb6c1] mt-1.5 font-light leading-relaxed">
                      {theory.description}
                    </p>

                    <div className="flex gap-1.5 mt-3">
                      {theory.colors.map((c) => (
                        <div
                          key={c}
                          className="h-2 flex-1 rounded-full shadow-inner border border-white/20"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Step 03 Active Composition & Proportions */}
          <div className="lg:col-span-5 bg-[#2a003b] rounded-xl p-5 sm:p-6 border-2 border-[#6a0dad]/50 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#ff1493] font-bold">
                    Composição da Diva
                  </span>
                  <h3 className="font-serif text-2xl text-[#ff2d95] font-semibold">
                    {currentTheory.compositionName}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleSaveCurrentPalette}
                  className="w-9 h-9 rounded-full bg-[#3b0054] hover:bg-[#520075] border border-[#ff1493]/40 flex items-center justify-center text-white hover:text-[#ff1493] transition-colors shadow-md"
                  title="Salvar esta Paleta no Moodboard"
                >
                  <BookmarkPlus className="w-4 h-4" />
                </button>
              </div>

              {/* 60-30-10 Proportional Visual Bar */}
              <div className="w-full h-10 rounded-full overflow-hidden flex shadow-lg mb-6 p-1 bg-[#12001a] border border-[#ff1493]/30">
                <div
                  className="h-full rounded-l-full flex items-center justify-center text-white text-[11px] font-bold tracking-wider transition-all duration-300 drop-shadow"
                  style={{ width: '60%', backgroundColor: currentPigment.hex }}
                >
                  60% Base
                </div>
                <div
                  className="h-full flex items-center justify-center text-white text-[11px] font-bold tracking-wider transition-all duration-300 drop-shadow"
                  style={{ width: '30%', backgroundColor: currentTheory.colors[1] }}
                >
                  30% Corpo
                </div>
                <div
                  className="h-full rounded-r-full flex items-center justify-center text-white text-[11px] font-bold tracking-wider transition-all duration-300 drop-shadow"
                  style={{ width: '10%', backgroundColor: currentTheory.colors[2] }}
                >
                  10%
                </div>
              </div>

              {/* Specification Breakdown Table */}
              <div className="space-y-2.5 mb-6">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#20002d] border border-[#6a0dad]/40">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 rounded-full shadow-inner border border-white/20"
                      style={{ backgroundColor: currentPigment.hex }}
                    />
                    <div>
                      <span className="text-xs font-bold text-white">
                        {currentTheory.base60.name}
                      </span>
                      <p className="text-[11px] text-[#ffb6c1] font-mono">
                        {currentPigment.hex} • {currentPigment.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyHex(currentPigment.hex)}
                      className="text-[#ebb3f9] hover:text-white transition-colors"
                      title="Copiar Código Hex"
                    >
                      {copiedHex === currentPigment.hex ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#3b0054] text-[#ff1493] font-bold border border-[#ff1493]/30">
                      60%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#20002d] border border-[#6a0dad]/40">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 rounded-full shadow-inner border border-white/20"
                      style={{ backgroundColor: currentTheory.colors[1] }}
                    />
                    <div>
                      <span className="text-xs font-bold text-white">
                        {currentTheory.body30.name}
                      </span>
                      <p className="text-[11px] text-[#ffb6c1] font-mono">
                        {currentTheory.colors[1]} • Harmonização Corpo
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyHex(currentTheory.colors[1])}
                      className="text-[#ebb3f9] hover:text-white transition-colors"
                      title="Copiar Código Hex"
                    >
                      {copiedHex === currentTheory.colors[1] ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#3b0054] text-[#ebb3f9] font-bold border border-[#6a0dad]/30">
                      30%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#20002d] border border-[#6a0dad]/40">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 rounded-full shadow-inner border border-white/20"
                      style={{ backgroundColor: currentTheory.colors[2] }}
                    />
                    <div>
                      <span className="text-xs font-bold text-white">
                        {currentTheory.accent10.name}
                      </span>
                      <p className="text-[11px] text-[#ffb6c1] font-mono">
                        {currentTheory.colors[2]} • Detalhe & Roxo Imperial
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyHex(currentTheory.colors[2])}
                      className="text-[#ebb3f9] hover:text-white transition-colors"
                      title="Copiar Código Hex"
                    >
                      {copiedHex === currentTheory.colors[2] ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#3b0054] text-[#ff69b4] font-bold border border-[#ff69b4]/30">
                      10%
                    </span>
                  </div>
                </div>
              </div>

              {/* Stylist Rationale */}
              <div className="p-3.5 rounded-xl bg-[#20002d] border border-[#ff1493]/30 text-[#ffb6c1] mb-5">
                <div className="flex items-center gap-1.5 text-[#ff1493] text-xs uppercase tracking-wider font-bold mb-1">
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Racional da Consultora Fubanga</span>
                </div>
                <p className="text-xs leading-relaxed font-light">
                  {currentTheory.stylistRationale}
                </p>
              </div>

              {/* Tactile Material Resonance */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#ebb3f9] mb-2 font-bold">
                  Ressonância Tátil dos Materiais:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {currentTheory.materials.map((mat) => (
                    <span
                      key={mat}
                      className="px-2.5 py-1 rounded-full bg-[#3b0054] text-[#ffb6c1] text-[10px] uppercase tracking-wider font-bold border border-[#6a0dad]/40"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 mt-6 border-t border-[#6a0dad]/30 flex gap-3">
              <button
                type="button"
                onClick={() => onApplyToFeed(currentPigment.hex)}
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#ff1493] to-[#8a2be2] hover:brightness-110 text-white text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,20,147,0.5)] border border-white/20"
              >
                <span>Aplicar aos Looks de Onça</span>
                <Filter className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleSaveCurrentPalette}
                className="px-4 py-3 rounded-full bg-[#3b0054] hover:bg-[#520075] border border-[#ff1493]/40 text-white hover:text-[#ff1493] transition-colors flex items-center justify-center shadow-md"
                title="Favoritar esta paleta"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#ff1493] text-[#ff1493]' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
