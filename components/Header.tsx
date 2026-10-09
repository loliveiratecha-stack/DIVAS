'use client';

import React, { useState } from 'react';
import { Search, Bookmark, Palette, Menu, X, ArrowUpRight, Flame, Sparkles } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  savedCount: number;
  onOpenSavedModal: () => void;
  onOpenAtelier: () => void;
  activeFilterType: string;
  onSelectFilterType: (type: string) => void;
}

export function Header({
  searchQuery,
  onSearchChange,
  savedCount,
  onOpenSavedModal,
  onOpenAtelier,
  activeFilterType,
  onSelectFilterType,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#160021]/85 backdrop-blur-2xl border-b border-[#6a0dad]/40 shadow-[0_4px_30px_rgba(46,0,62,0.8)] transition-all">
      <div className="h-20 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Zone: Pink Letters & Roxo Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex flex-col text-left"
          >
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl lg:text-3xl tracking-tight text-[#ff2d95] group-hover:text-[#ff69b4] transition-colors font-semibold drop-shadow-[0_0_12px_rgba(255,45,149,0.5)]">
                Divas dress well.
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3b0054] text-[#ffb0ca] border border-[#ff1493]/40 font-bold uppercase tracking-wider hidden sm:inline-flex items-center gap-1">
                <Flame className="w-3 h-3 text-[#ff1493]" />
                Fubanga Onça Glam
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#ebb3f9] -mt-1 font-semibold">
              Edição Panthera Onça • Letras Rosa & Detalhes em Roxo
            </span>
          </a>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-6 shrink-0">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-xs uppercase tracking-wider text-[#ff69b4] hover:text-white transition-colors font-semibold"
          >
            Início
          </button>
          <button
            onClick={() => scrollToSection('atelier')}
            className="text-xs uppercase tracking-wider text-[#ebb3f9] hover:text-[#ff1493] transition-colors font-medium flex items-center gap-1"
          >
            <span>Ateliê Onça & Cores</span>
          </button>
          <button
            onClick={() => scrollToSection('combiner')}
            className="text-xs uppercase tracking-wider text-[#ebb3f9] hover:text-[#ff1493] transition-colors font-medium"
          >
            Combinador de Texturas
          </button>
          <button
            onClick={() => scrollToSection('feed')}
            className="text-xs uppercase tracking-wider text-[#ffb0ca] hover:text-white transition-colors font-semibold"
          >
            Looks de Oncinha & Divas
          </button>
          <button
            onClick={() => scrollToSection('seasonal')}
            className="text-xs uppercase tracking-wider text-[#ebb3f9] hover:text-[#ff1493] transition-colors font-medium"
          >
            Cápsulas 2025
          </button>
        </nav>

        {/* Search Bar & Quick Filters (Desktop/Tablet) */}
        <div className="hidden md:flex flex-1 max-w-lg items-center bg-[#280238]/80 backdrop-blur-md rounded-full px-4 py-1.5 border border-[#8a2be2]/40 gap-2 shadow-inner">
          <Search className="w-4 h-4 text-[#ff69b4] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar oncinha, pink choque, roxo, perua, bota..."
            className="bg-transparent w-full text-sm text-[#ffb6c1] placeholder:text-[#ebb3f9]/60 focus:outline-none"
          />
          <div className="flex items-center gap-1 shrink-0">
            {['Onça', 'Rosa', 'Roxo', 'Fubanga', 'Estilo'].map((filter) => {
              const isActive = activeFilterType === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => onSelectFilterType(isActive ? 'all' : filter)}
                  className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold transition-all ${
                    isActive
                      ? 'bg-[#ff1493] text-white shadow-[0_0_10px_rgba(255,20,147,0.6)]'
                      : 'bg-[#3b0054] hover:bg-[#520075] text-[#ebb3f9] hover:text-white border border-[#6a0dad]/50'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions Zone */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenSavedModal}
            className="relative w-10 h-10 rounded-full flex items-center justify-center bg-[#2e003e] text-[#ff69b4] hover:text-white hover:bg-[#4a0e4e] transition-colors border border-[#ff1493]/40 shadow-md"
            title="Abrir Moodboard de Looks Salvos"
            aria-label="Looks salvos"
          >
            <Bookmark className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#ff1493] text-white text-[10px] font-bold flex items-center justify-center shadow-lg animate-bounce">
                {savedCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenAtelier}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#2e003e] text-[#ebb3f9] hover:text-[#ff1493] hover:bg-[#4a0e4e] transition-colors border border-[#8a2be2]/40"
            title="Ir para Ateliê Cromático"
            aria-label="Ateliê Cromático"
          >
            <Palette className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('feed')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#ff1493] to-[#9d00ff] hover:brightness-110 text-white text-xs uppercase tracking-wider font-bold shadow-[0_4px_20px_rgba(255,20,147,0.5)] transition-all hover:scale-105 border border-[#ffb0ca]/30"
          >
            <span>Mais Roupas de Onça</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-10 h-10 rounded-full flex items-center justify-center bg-[#2e003e] text-[#ff69b4] hover:text-white border border-[#8a2be2]/40"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search & Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#1a0026] border-b border-[#6a0dad] px-4 py-5 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center bg-[#280238] rounded-full px-3.5 py-2 border border-[#8a2be2]/40 gap-2">
            <Search className="w-4 h-4 text-[#ff69b4]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar oncinha, pink, roxo, diva..."
              className="bg-transparent w-full text-xs text-[#ffb6c1] placeholder:text-[#ebb3f9]/60 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {['Onça', 'Rosa', 'Roxo', 'Fubanga', 'Estilo'].map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => onSelectFilterType(activeFilterType === filter ? 'all' : filter)}
                className={`px-3 py-1 rounded-full text-xs uppercase font-bold ${
                  activeFilterType === filter
                    ? 'bg-[#ff1493] text-white'
                    : 'bg-[#3b0054] text-[#ebb3f9] border border-[#6a0dad]/40'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#6a0dad]/30">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-left py-2 px-3 rounded-lg text-sm text-[#ff69b4] hover:text-white hover:bg-white/5 font-semibold"
            >
              Início Oncinha
            </button>
            <button
              onClick={() => scrollToSection('atelier')}
              className="text-left py-2 px-3 rounded-lg text-sm text-[#ebb3f9] hover:text-[#ff1493] hover:bg-white/5"
            >
              Ateliê Onça & Pink
            </button>
            <button
              onClick={() => scrollToSection('combiner')}
              className="text-left py-2 px-3 rounded-lg text-sm text-[#ebb3f9] hover:text-[#ff1493] hover:bg-white/5"
            >
              Combinador de Texturas
            </button>
            <button
              onClick={() => scrollToSection('feed')}
              className="text-left py-2 px-3 rounded-lg text-sm text-[#ffb0ca] hover:text-white hover:bg-white/5 font-semibold"
            >
              Todas as Seleções de Roupas
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
