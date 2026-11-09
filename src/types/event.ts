import type { Character, Stats, Traits } from './character';

export interface DecisionChoice {
  text: string;
  description?: string;
  effect: (char: Character) => {
    statChanges?: Partial<Stats>;
    traitChanges?: Partial<Traits>;
    moneyChange?: number;
    logText: string;
    customAction?: () => void;
  };
}

export interface InteractiveDecision {
  id: string;
  title: string;
  description: string;
  category: 'school' | 'career' | 'romance' | 'moral' | 'life' | 'finance' | 'family';
  minAge: number;
  maxAge: number;
  condition?: (char: Character) => boolean;
  choices: DecisionChoice[];
}

export interface RandomAnnualEvent {
  id: string;
  minAge: number;
  maxAge: number;
  weight: number; // Tần suất xuất hiện
  condition?: (char: Character) => boolean;
  execute: (char: Character) => {
    text: string;
    category: 'childhood' | 'school' | 'career' | 'romance' | 'finance' | 'health' | 'family' | 'senior' | 'life';
    statChanges?: Partial<Stats>;
    moneyChange?: number;
  };
}
