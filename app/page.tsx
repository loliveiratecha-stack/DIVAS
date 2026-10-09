'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ChromaticAtelier } from '@/components/ChromaticAtelier';
import { TextureCombiner } from '@/components/TextureCombiner';
import { FeedGrid } from '@/components/FeedGrid';
import { SeasonalCapsules } from '@/components/SeasonalCapsules';
import { Footer } from '@/components/Footer';
import { LookDetailModal } from '@/components/LookDetailModal';
import { SavedMoodboardDrawer } from '@/components/SavedMoodboardDrawer';
import { CURATED_OUTFITS, HARMONIC_BASES, OutfitItem } from '@/lib/fashion-data';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBaseId, setSelectedBaseId] = useState('all');
  const [selectedAesthetic, setSelectedAesthetic] = useState('all');
  const [activeFilterType, setActiveFilterType] = useState('all');
  const [selectedLookForModal, setSelectedLookForModal] = useState<OutfitItem | null>(null);
  const [savedLookIds, setSavedLookIds] = useState<string[]>([]);
  const [savedPalettes, setSavedPalettes] = useState<{ name: string; colors: string[] }[]>([]);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Load saved items from localStorage after initial render via microtask/event or lazy check
  useEffect(() => {
    try {
      const storedLooks = localStorage.getItem('divas_saved_looks');
      const storedPalettes = localStorage.getItem('divas_saved_palettes');
      if (storedLooks || storedPalettes) {
        // Schedule in microtask to decouple from initial render effect cycle
        queueMicrotask(() => {
          if (storedLooks) setSavedLookIds(JSON.parse(storedLooks));
          if (storedPalettes) setSavedPalettes(JSON.parse(storedPalettes));
        });
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  const handleToggleSaveLook = (id: string) => {
    setSavedLookIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('divas_saved_looks', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleSavePalette = (palette: { name: string; colors: string[] }) => {
    setSavedPalettes((prev) => {
      const next = [palette, ...prev];
      try {
        localStorage.setItem('divas_saved_palettes', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleRemovePalette = (index: number) => {
    setSavedPalettes((prev) => {
      const next = prev.filter((_, i) => i !== index);
      try {
        localStorage.setItem('divas_saved_palettes', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Filter outfits reactively
  const filteredOutfits = useMemo(() => {
    return CURATED_OUTFITS.filter((item) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesAesthetic = item.aesthetic.toLowerCase().includes(q);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(q));
        const matchesOccasion = item.occasion.toLowerCase().includes(q);
        const matchesResonance = item.tactileResonance.some((r) => r.toLowerCase().includes(q));
        const matchesPalette = item.palette.some(
          (p) => p.name.toLowerCase().includes(q) || p.hex.toLowerCase().includes(q)
        );

        if (
          !matchesTitle &&
          !matchesDesc &&
          !matchesAesthetic &&
          !matchesTags &&
          !matchesOccasion &&
          !matchesResonance &&
          !matchesPalette
        ) {
          return false;
        }
      }

      // 2. Base Color Swatch Filter
      if (selectedBaseId !== 'all') {
        const baseObj = HARMONIC_BASES.find((b) => b.id === selectedBaseId);
        if (baseObj) {
          const hasColor = item.palette.some(
            (p) => p.hex.toLowerCase() === baseObj.hex.toLowerCase()
          );
          const hasTagName = item.tags.some((t) =>
            t.toLowerCase().includes(baseObj.name.toLowerCase())
          );
          if (!hasColor && !hasTagName) {
            return false;
          }
        }
      }

      // 3. Aesthetic Filter
      if (selectedAesthetic !== 'all') {
        const aestheticMap: Record<string, string> = {
          'fubanga-glam': 'Diva Fubanga Chic',
          'onca-print': 'Panthera Onça Glam',
          'perua-luxo': 'Perua Magnata',
          goth: 'Gótico Chic',
          'old-money': 'Old Money Haute',
          y2k: 'Y2K Avant-Garde',
          minimal: 'Cyber Minimalista',
          baroque: 'Barroco Romântico',
          tailoring: 'Alta Alfaiataria',
        };
        const expected = aestheticMap[selectedAesthetic];
        if (expected) {
          const matchesExact = item.aesthetic === expected;
          const matchesTag = item.tags.some((t) => t.toLowerCase() === expected.toLowerCase());
          if (!matchesExact && !matchesTag) {
            return false;
          }
        }
      }

      return true;
    });
  }, [searchQuery, selectedBaseId, selectedAesthetic]);

  const savedOutfitsList = useMemo(() => {
    return CURATED_OUTFITS.filter((item) => savedLookIds.includes(item.id));
  }, [savedLookIds]);

  // Handler from Atelier to Feed
  const handleApplyToFeed = (colorHex: string) => {
    const base = HARMONIC_BASES.find(
      (b) => b.hex.toLowerCase() === colorHex.toLowerCase()
    );
    if (base) {
      setSelectedBaseId(base.id);
    } else {
      setSearchQuery(colorHex);
    }
    const feedElem = document.getElementById('feed');
    if (feedElem) {
      feedElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handler from Combiner to Feed
  const handleFindMatchingLooks = (colorHex: string, textureName: string) => {
    setSearchQuery(textureName);
    const feedElem = document.getElementById('feed');
    if (feedElem) {
      feedElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-panthera-onca text-[#ffb6c1] overflow-x-hidden selection:bg-[#ff1493] selection:text-white">
      {/* Ambient Radial Mesh Aura Backgrounds in Pink and Roxo */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-[#8a2be2]/30 blur-[150px] animate-glow-pulse" />
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#ff1493]/35 blur-[160px] animate-glow-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#3b0054]/30 blur-[180px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ff149310_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-60" />
      </div>

      {/* Main Top Navigation Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        savedCount={savedLookIds.length + savedPalettes.length}
        onOpenSavedModal={() => setIsSavedDrawerOpen(true)}
        onOpenAtelier={() => {
          const el = document.getElementById('atelier');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        activeFilterType={activeFilterType}
        onSelectFilterType={(type) => {
          setActiveFilterType(type);
          if (type === 'Onça') {
            setSelectedAesthetic('onca-print');
          } else if (type === 'Rosa') {
            setSelectedBaseId('hot-pink');
          } else if (type === 'Roxo') {
            setSelectedBaseId('royal-violet');
          } else if (type === 'Fubanga') {
            setSelectedAesthetic('fubanga-glam');
          } else if (type === 'Estilo') {
            setSelectedAesthetic('perua-luxo');
          } else {
            setSelectedBaseId('all');
            setSelectedAesthetic('all');
          }
        }}
      />

      {/* Main Content Body */}
      <main className="relative z-10 w-full">
        {/* 1. Hero Section */}
        <Hero
          selectedBaseId={selectedBaseId}
          onSelectBase={setSelectedBaseId}
          selectedAesthetic={selectedAesthetic}
          onSelectAesthetic={setSelectedAesthetic}
          matchingOutfitsCount={filteredOutfits.length}
        />

        {/* 2. Interactive Atelier Section */}
        <ChromaticAtelier
          onApplyToFeed={handleApplyToFeed}
          onSavePalette={handleSavePalette}
        />

        {/* 3. Interactive Color & Texture Combiner */}
        <TextureCombiner onFindMatchingLooks={handleFindMatchingLooks} />

        {/* 4. Curated Discovery Feed Grid */}
        <FeedGrid
          outfits={filteredOutfits}
          onOpenLookModal={setSelectedLookForModal}
          savedLookIds={savedLookIds}
          onToggleSaveLook={handleToggleSaveLook}
          onSelectColor={(hex) => {
            const base = HARMONIC_BASES.find((b) => b.hex.toLowerCase() === hex.toLowerCase());
            if (base) setSelectedBaseId(base.id);
            else setSearchQuery(hex);
          }}
          onSelectTag={(tag) => setSearchQuery(tag)}
        />

        {/* 5. Seasonal Capsules Forecast 2025 */}
        <SeasonalCapsules
          onSelectCapsulePalette={(hex) => {
            handleApplyToFeed(hex);
          }}
        />
      </main>

      {/* 6. Portuguese Luxury Footer */}
      <Footer />

      {/* Modal for Look Details */}
      <LookDetailModal
        outfit={selectedLookForModal}
        onClose={() => setSelectedLookForModal(null)}
        isSaved={selectedLookForModal ? savedLookIds.includes(selectedLookForModal.id) : false}
        onToggleSave={handleToggleSaveLook}
      />

      {/* Saved Moodboard Slide-over Drawer */}
      <SavedMoodboardDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedOutfits={savedOutfitsList}
        savedPalettes={savedPalettes}
        onRemoveLook={handleToggleSaveLook}
        onRemovePalette={handleRemovePalette}
        onSelectLook={(outfit) => setSelectedLookForModal(outfit)}
      />
    </div>
  );
}
