export type CardRarity = 'normal' | 'raro' | 'muito raro';

export interface CardData {
  id: string;
  cardName: string;
  cardDescription: string;
  cardAttr1: number;
  cardAttr2: number;
  cardAttr3: number;
  cardImage: string;
  cardRare: CardRarity;
  cardTrunfo: boolean;
}

export type CardAttributeKey = 'cardAttr1' | 'cardAttr2' | 'cardAttr3';

export interface AttributeConfig {
  key: CardAttributeKey;
  label: string;
  shortLabel: string;
  iconName: 'sword' | 'shield' | 'zap';
  color: string;
}

export const ATTRIBUTE_CONFIGS: AttributeConfig[] = [
  { key: 'cardAttr1', label: 'Poder de Ataque', shortLabel: 'ATK', iconName: 'sword', color: 'from-rose-500 to-red-600' },
  { key: 'cardAttr2', label: 'Escudo / Defesa', shortLabel: 'DEF', iconName: 'shield', color: 'from-blue-500 to-indigo-600' },
  { key: 'cardAttr3', label: 'Agilidade / Energia', shortLabel: 'VEL', iconName: 'zap', color: 'from-amber-400 to-yellow-500' },
];

export const MAX_INDIVIDUAL_ATTR = 90;
export const MAX_TOTAL_ATTR = 210;
export const MIN_ATTR = 0;
