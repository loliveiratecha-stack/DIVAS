'use client';

import React, { useState } from 'react';
import { Layers, ArrowRight, Check, Compass, Sparkles, Flame } from 'lucide-react';
import { HARMONIC_BASES, FABRICS_LIST, OCCASIONS_LIST } from '@/lib/fashion-data';

interface TextureCombinerProps {
  onFindMatchingLooks: (colorHex: string, textureName: string) => void;
}

export function TextureCombiner({ onFindMatchingLooks }: TextureCombinerProps) {
  const [selectedColor, setSelectedColor] = useState(HARMONIC_BASES[0]);
  const [selectedFabric, setSelectedFabric] = useState(FABRICS_LIST[0]);
  const [selectedOccasion, setSelectedOccasion] = useState(OCCASIONS_LIST[0]);

  // Dynamic fashion generator computation with Fubanga flair
  const getCombinationResult = () => {
    let outerwear = 'Casaco maxi felpudo de onça com lapela generosa';
    let mainPiece = 'Vestido tubinho de cetim pink neon com decote coração';
    let bottom = 'Calça flare de veludo roxo com fendas laterais';
    let shoes = 'Bota over-the-knee roxa de salto agulha 12cm';
    let metal = 'Argolas douradas gigantescas e correntaria pesada com pingente de pantera';
    let rationale =
      'A síntese máxima da diva fubanga de respeito: o casaco de onça comanda a presença de longe, o vestido pink emana poder feminino e as botas roxas fecham com ostentação aristocrática.';

    if (selectedFabric.id === 'plumas') {
      outerwear = 'Estola teatral de plumas rosa choque esvoaçantes';
      mainPiece = 'Macacão catsuit colado ao corpo em malha de onça reluzente';
      bottom = 'Cinto largo de strass roxo marcando a cintura';
      shoes = 'Scarpin laqueado noir com salto metalizado';
      metal = 'Braceletes duplos dourados e maxibrincos cascata de cristal';
      rationale =
        'As plumas conferem movimento hipnótico ao andar, transformando qualquer corredor ou salão na sua própria passarela pessoal.';
    } else if (selectedFabric.id === 'veludo') {
      outerwear = 'Sobretudo acinturado em veludo molhado roxo berinjela';
      mainPiece = 'Corset com barbatanas aparentes em jacquard de onça';
      bottom = 'Saia lápis de vinil pink com fenda profunda';
      shoes = 'Sandália meia-pata com tiras finas e strass';
      metal = 'Choker rígida dourada e anéis em formato de tigre';
      rationale =
        'O veludo molhado roxo traz a imponência noturna, enquanto o corset felino modela a silhueta com sensualidade irresistível.';
    } else if (selectedFabric.id === 'cetim-pink') {
      outerwear = 'Jaqueta bomber cropped em pelo de oncinha macio';
      mainPiece = 'Slip dress fluido em cetim rosa chiclete com renda no decote';
      bottom = 'Minissaia drapeada em cetim pink com nós laterais';
      shoes = 'Bota de cano médio em verniz roxo espelhado';
      metal = 'Colar gravatinha de strass e óculos escuros de gatinha';
      rationale =
        'O cetim rosa choque reflete as luzes da festa com um glow incomparável que grita autoconfiança e atitude de protagonista.';
    } else if (selectedFabric.id === 'couro') {
      outerwear = 'Trench coat estruturado em couro de vinil roxo brilhante';
      mainPiece = 'Body decotado em tule com estampa de onça';
      bottom = 'Calça skinny em vinil com zíperes dourados';
      shoes = 'Bota tratorada plataforma com fivelas de ouro';
      metal = 'Brincos de raio em metal roxo e relógio dourado giga';
      rationale =
        'O vinil roxo transmite atitude dominadora e futurista, equilibrando perfeitamente a selva urbana da estampa de onça.';
    }

    return { outerwear, mainPiece, bottom, shoes, metal, rationale };
  };

  const result = getCombinationResult();

  return (
    <section id="combiner" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="rounded-2xl bg-[#1d0029]/95 border-2 border-[#6a0dad]/60 p-6 lg:p-10 shadow-[0_10px_40px_rgba(46,0,62,0.8)] relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 bg-[#ff1493]/20 blur-[130px] rounded-full" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 bg-[#6a0dad]/30 blur-[140px] rounded-full" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#6a0dad]/40">
          <div>
            <div className="flex items-center gap-2 text-[#ff1493] text-xs uppercase tracking-widest font-bold mb-1.5">
              <Compass className="w-4 h-4 text-[#ff2d95]" />
              <span>Ferramenta Fubanga de Lookbuilding</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#ff2d95] font-semibold drop-shadow-[0_2px_15px_rgba(255,45,149,0.4)]">
              Combinador de Cores & Texturas Selvagens
            </h2>
            <p className="text-sm sm:text-base text-[#ffb6c1] mt-1 font-light">
              Escolha sua cor base e textura favorita (onça, veludo roxo, plumas, cetim pink) para gerar a fórmula perfeita da sua ocasião.
            </p>
          </div>
          <span className="text-xs uppercase tracking-widest text-[#ebb3f9] font-bold bg-[#3b0054] px-4 py-1.5 rounded-full border border-[#ff1493]/40 self-start md:self-auto flex items-center gap-1 shadow-md">
            <Flame className="w-3.5 h-3.5 text-[#ff1493]" />
            Diva Alquimista
          </span>
        </div>

        {/* Interactive Controls Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Selectors (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Escolha a Cor Base */}
            <div className="bg-[#2a003b] p-5 rounded-xl border border-[#6a0dad]/50 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#ff69b4] font-bold">
                  1. Selecione a Cor da Diva
                </span>
                <span className="text-xs text-[#ff1493] font-bold font-mono">
                  {selectedColor.name} ({selectedColor.hex})
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {HARMONIC_BASES.map((color) => {
                  const isSelected = selectedColor.id === color.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'bg-[#43005b] border-[#ff1493] shadow-[0_0_12px_rgba(255,20,147,0.5)] scale-[1.02]'
                          : 'bg-[#20002d] border-[#6a0dad]/40 hover:border-[#ff69b4]/50 text-[#ffb6c1]'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full shrink-0 shadow-inner border border-white/20"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-xs font-bold text-white truncate">
                        {color.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Escolha a Textura Tátil */}
            <div className="bg-[#2a003b] p-5 rounded-xl border border-[#6a0dad]/50 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#ff69b4] font-bold">
                  2. Selecione a Textura (Onça, Plumas, Veludo...)
                </span>
                <span className="text-xs text-[#ebb3f9] font-bold">
                  {selectedFabric.name}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {FABRICS_LIST.map((fabric) => {
                  const isSelected = selectedFabric.id === fabric.id;
                  return (
                    <button
                      key={fabric.id}
                      type="button"
                      onClick={() => setSelectedFabric(fabric)}
                      className={`p-2.5 rounded-lg border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#4a0e4e] border-[#ff1493] shadow-[0_0_12px_rgba(255,20,147,0.5)] scale-[1.02]'
                          : 'bg-[#20002d] border-[#6a0dad]/40 hover:border-[#ff69b4]/50 text-[#ffb6c1]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">
                          {fabric.name}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#ff1493]" />}
                      </div>
                      <span className="text-[10px] text-[#ebb3f9] font-light truncate">
                        {fabric.luster}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Escolha a Ocasião */}
            <div className="bg-[#2a003b] p-5 rounded-xl border border-[#6a0dad]/50 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#ff69b4] font-bold">
                  3. Selecione a Ocasião de Diva
                </span>
                <span className="text-xs text-[#ebb3f9] font-bold">
                  {selectedOccasion}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {OCCASIONS_LIST.map((occ) => {
                  const isSelected = selectedOccasion === occ;
                  return (
                    <button
                      key={occ}
                      type="button"
                      onClick={() => setSelectedOccasion(occ)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-all font-bold ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#ff1493] to-[#8a2be2] text-white shadow-[0_0_12px_rgba(255,20,147,0.5)] border border-white/20'
                          : 'bg-[#20002d] hover:bg-[#340049] text-[#ffb6c1] border border-[#6a0dad]/40'
                      }`}
                    >
                      {occ}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Synthesis Outcome Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#2a003b] rounded-xl p-6 border-2 border-[#6a0dad]/60 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#6a0dad]/40 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#ff1493] font-bold">
                  Fórmula Sintetizada de Diva
                </span>
                <h3 className="font-serif text-2xl text-[#ff2d95] font-semibold">
                  {selectedFabric.name} com {selectedColor.name}
                </h3>
                <p className="text-xs text-[#ffb6c1] mt-0.5">
                  Perfeito para {selectedOccasion}
                </p>
              </div>
              <span
                className="w-10 h-10 rounded-full shadow-inner border-2 border-white/30 shrink-0"
                style={{ backgroundColor: selectedColor.hex }}
              />
            </div>

            {/* Fabric specs banner */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[#20002d] border border-[#6a0dad]/40">
                <span className="text-[10px] uppercase tracking-wider text-[#ebb3f9] font-bold block">
                  Caimento (Drape)
                </span>
                <span className="font-semibold text-white">{selectedFabric.drape}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#20002d] border border-[#6a0dad]/40">
                <span className="text-[10px] uppercase tracking-wider text-[#ebb3f9] font-bold block">
                  Presença Visual
                </span>
                <span className="font-semibold text-[#ff1493] truncate block">
                  {selectedFabric.luster}
                </span>
              </div>
            </div>

            {/* Pieces breakdown list */}
            <div className="space-y-2.5">
              <span className="text-[10px] uppercase tracking-widest text-[#ff69b4] font-bold block">
                Composição Completa da Roupa:
              </span>
              <div className="p-2.5 rounded-lg bg-[#20002d] border border-[#ff1493]/30 space-y-1">
                <span className="text-[10px] uppercase text-[#ff1493] font-bold">
                  Sobretudo / Terceira Peça
                </span>
                <p className="text-xs text-white font-medium">{result.outerwear}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#20002d] border border-[#ff1493]/30 space-y-1">
                <span className="text-[10px] uppercase text-[#ff69b4] font-bold">
                  Peça Principal
                </span>
                <p className="text-xs text-white font-medium">{result.mainPiece}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#20002d] border border-[#ff1493]/30 space-y-1">
                <span className="text-[10px] uppercase text-[#ebb3f9] font-bold">
                  Parte Inferior / Calçado
                </span>
                <p className="text-xs text-white font-medium">{result.bottom} • {result.shoes}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#20002d] border border-[#ff1493]/30 space-y-1">
                <span className="text-[10px] uppercase text-[#debec7] font-bold">
                  Metais & Jóias
                </span>
                <p className="text-xs text-[#ffb6c1]">{result.metal}</p>
              </div>
            </div>

            {/* Stylist insight */}
            <div className="p-3.5 rounded-lg bg-[#20002d] border border-[#ff1493]/30 text-xs text-[#ffb6c1] font-light leading-relaxed">
              <p className="italic">“{result.rationale}”</p>
            </div>

            {/* Action button */}
            <button
              type="button"
              onClick={() => onFindMatchingLooks(selectedColor.hex, selectedFabric.name)}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#ff1493] to-[#8a2be2] hover:brightness-110 text-white text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,20,147,0.5)] border border-white/20"
            >
              <span>Ver Seleções Reais no Feed</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
