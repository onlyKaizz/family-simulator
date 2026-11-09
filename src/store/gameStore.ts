import { create } from 'zustand';
import type { Character } from '../types/character';
import type { InteractiveDecision } from '../types/event';
import type { CharacterCreationOptions } from '../engine/characterGenerator';
import { generateCharacter } from '../engine/characterGenerator';
import { advanceYear, generateObituary } from '../engine/simulationEngine';
import confetti from 'canvas-confetti';

interface MemorialEntry {
  id: string;
  character: Character;
  obituary: string;
  timestamp: number;
}

interface GameState {
  character: Character | null;
  pendingDecision: InteractiveDecision | null;
  isGameOver: boolean;
  obituary: string | null;
  memorials: MemorialEntry[];
  activeTab: 'timeline' | 'profile' | 'career' | 'assets' | 'memorial';

  // Actions
  startNewLife: (options?: CharacterCreationOptions) => void;
  nextYear: () => void;
  makeChoice: (choiceIndex: number) => void;
  saveToMemorial: () => void;
  setActiveTab: (tab: 'timeline' | 'profile' | 'career' | 'assets' | 'memorial') => void;
}

const LOCAL_STORAGE_KEY = 'kiep_nhan_sinh_memorials';

function loadMemorials(): MemorialEntry[] {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveMemorials(memorials: MemorialEntry[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(memorials));
  } catch (e) {
    console.error('Không thể lưu đài tưởng niệm:', e);
  }
}

export const useGameStore = create<GameState>((set, get) => ({
  character: null,
  pendingDecision: null,
  isGameOver: false,
  obituary: null,
  memorials: loadMemorials(),
  activeTab: 'timeline',

  startNewLife: (options) => {
    const char = generateCharacter(options);
    set({
      character: char,
      pendingDecision: null,
      isGameOver: false,
      obituary: null,
      activeTab: 'timeline',
    });
  },

  nextYear: () => {
    const { character, pendingDecision } = get();
    if (!character || !character.alive || pendingDecision) return;

    const result = advanceYear(character);

    if (result.isDead) {
      const obit = generateObituary(result.character);
      set({
        character: { ...result.character },
        pendingDecision: null,
        isGameOver: true,
        obituary: obit,
      });
      return;
    }

    if (result.pendingDecision) {
      set({
        character: { ...result.character },
        pendingDecision: result.pendingDecision,
      });
      return;
    }

    set({
      character: { ...result.character },
      pendingDecision: null,
    });
  },

  makeChoice: (choiceIndex) => {
    const { character, pendingDecision } = get();
    if (!character || !pendingDecision) return;

    const choice = pendingDecision.choices[choiceIndex];
    if (!choice) return;

    const currentYear = character.birthYear + character.age;
    const effectResult = choice.effect(character);

    if (effectResult.statChanges) {
      const { health, smarts, happiness, looks, karma } = effectResult.statChanges;
      if (health !== undefined) character.stats.health = Math.min(100, Math.max(0, character.stats.health + health));
      if (smarts !== undefined) character.stats.smarts = Math.min(100, Math.max(0, character.stats.smarts + smarts));
      if (happiness !== undefined) character.stats.happiness = Math.min(100, Math.max(0, character.stats.happiness + happiness));
      if (looks !== undefined) character.stats.looks = Math.min(100, Math.max(0, character.stats.looks + looks));
      if (karma !== undefined) character.stats.karma = Math.min(100, Math.max(-100, character.stats.karma + karma));
    }

    if (effectResult.moneyChange) {
      character.finances.cash = Math.max(0, character.finances.cash + effectResult.moneyChange);
    }

    character.logs.push({
      id: `dec_${pendingDecision.id}_${character.age}`,
      age: character.age,
      year: currentYear,
      text: effectResult.logText,
      category: pendingDecision.category === 'moral' ? 'family' : pendingDecision.category,
      statChanges: effectResult.statChanges,
    });

    if (['thi_vao_10', 'nga_re_18_tuoi', 'lap_gia_dinh', 'sinh_con_dau_long'].includes(pendingDecision.id)) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}
    }

    set({
      character: { ...character },
      pendingDecision: null,
    });
  },

  saveToMemorial: () => {
    const { character, obituary, memorials } = get();
    if (!character || !obituary) return;

    const entry: MemorialEntry = {
      id: character.id,
      character: { ...character },
      obituary,
      timestamp: Date.now(),
    };

    const newMemorials = [entry, ...memorials.filter(m => m.id !== character.id)];
    saveMemorials(newMemorials);

    set({ memorials: newMemorials });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
}));
