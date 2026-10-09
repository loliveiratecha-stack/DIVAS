'use client';

import React from 'react';
import { Flame } from 'lucide-react';

export function Footer() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 w-full bg-gradient-to-b from-[#1c0026] via-[#100017] to-[#08000c] pt-16 pb-12 border-t-2 border-[#6a0dad]/40 shadow-[0_-20px_50px_rgba(46,0,62,0.9)]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#6a0dad]/30">
          {/* Brand & Manifesto Column (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex flex-col">
                <span className="font-serif text-3xl tracking-tight text-[#ff2d95] font-bold drop-shadow-[0_0_12px_rgba(255,45,149,0.5)]">
                  Divas dress well.
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#ebb3f9] font-bold -mt-0.5 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-[#ff1493]" />
                  Edição Panthera Onça & Fubanga Glam
                </span>
              </div>

              <p className="font-serif text-base sm:text-lg italic text-[#ffb6c1] max-w-md font-light leading-snug">
                “O santuário da onça-pintada, do pink choque e do roxo imperial para divas que nasceram para ser o centro das atenções.”
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {[
                'Panthera Onça',
                'Diva Fubanga',
                'Pink Choque',
                'Roxo Imperial',
                'Perua Magnata',
                'Y2K Funk Chic',
                'Regra 60-30-10',
              ].map((style) => (
                <span
                  key={style}
                  className="px-3 py-1 rounded-full bg-[#2e003e] text-[#ff69b4] text-[10px] uppercase tracking-wider border border-[#6a0dad]/40 font-bold"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>

          {/* Links Columns (7 cols) */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Espaços da Diva */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-[#ff1493] font-bold">
                Espaços da Diva
              </h4>
              <ul className="space-y-2 text-xs text-[#ffb6c1]">
                <li>
                  <button
                    onClick={() => scrollToSection('hero')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Início Oncinha
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('atelier')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Ateliê Onça & Cores
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('feed')}
                    className="hover:text-white transition-colors text-left font-bold text-[#ff69b4]"
                  >
                    Todas as Roupas do Feed
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('seasonal')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Cápsula Especial 2025
                  </button>
                </li>
              </ul>
            </div>

            {/* Teoria Cromática */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-[#ebb3f9] font-bold">
                Química Fubanga
              </h4>
              <ul className="space-y-2 text-xs text-[#ffb6c1]">
                <li>
                  <button
                    onClick={() => scrollToSection('atelier')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Onça com Pink Neon
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('atelier')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Harmonização Roxo Escuro
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('combiner')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Pele de Onça & Plumas
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('combiner')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Combinador de Texturas
                  </button>
                </li>
              </ul>
            </div>

            {/* Editorial & Luxo */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-[#ff69b4] font-bold">
                Passarela Selvagem
              </h4>
              <ul className="space-y-2 text-xs text-[#ffb6c1]">
                <li>
                  <button
                    onClick={() => scrollToSection('feed')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Lookbook de Onça
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('feed')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Proporção Áurea 60-30-10
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('hero')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Manifesto Fubanga
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#ebb3f9]">
          <p className="uppercase tracking-widest text-center sm:text-left font-medium">
            © 2025 Divas dress well. Todos os direitos reservados. 100% Panthera Onça, Pink Choque & Detalhes em Roxo.
          </p>

          <div className="flex items-center gap-3 uppercase tracking-wider font-bold text-[#ff1493]">
            <span>Rio de Janeiro</span>
            <span className="w-1 h-1 rounded-full bg-[#ebb3f9]" />
            <span>São Paulo</span>
            <span className="w-1 h-1 rounded-full bg-[#ebb3f9]" />
            <span>Milão</span>
            <span className="w-1 h-1 rounded-full bg-[#ebb3f9]" />
            <span>Paris</span>
            <span className="w-1 h-1 rounded-full bg-[#ebb3f9]" />
            <span>Miami</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
