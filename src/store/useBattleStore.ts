import { create } from 'zustand';
import { CardData, CardAttributeKey } from '../types/card';

export type RoundWinner = 'player' | 'cpu' | 'draw' | null;

interface BattleState {
  playerDeck: CardData[];
  cpuDeck: CardData[];
  playerScore: number;
  cpuScore: number;
  round: number;
  currentRoundPlayerCard: CardData | null;
  currentRoundCpuCard: CardData | null;
  selectedAttribute: CardAttributeKey | null;
  roundWinner: RoundWinner;
  isRevealed: boolean;
  isGameOver: boolean;
  gameWinner: 'player' | 'cpu' | 'draw' | null;

  // Actions
  startBattle: (deck: CardData[]) => void;
  playAttribute: (attr: CardAttributeKey) => void;
  nextRound: () => void;
  resetBattle: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const useBattleStore = create<BattleState>((set, get) => ({
  playerDeck: [],
  cpuDeck: [],
  playerScore: 0,
  cpuScore: 0,
  round: 1,
  currentRoundPlayerCard: null,
  currentRoundCpuCard: null,
  selectedAttribute: null,
  roundWinner: null,
  isRevealed: false,
  isGameOver: false,
  gameWinner: null,

  startBattle: (fullDeck: CardData[]) => {
    if (fullDeck.length < 2) return;

    const shuffled = shuffleArray(fullDeck);
    const half = Math.ceil(shuffled.length / 2);
    const playerDeck = shuffled.slice(0, half);
    const cpuDeck = shuffled.slice(half);

    const playerCard = playerDeck[0] || null;
    const cpuCard = cpuDeck[0] || null;

    set({
      playerDeck,
      cpuDeck,
      playerScore: 0,
      cpuScore: 0,
      round: 1,
      currentRoundPlayerCard: playerCard,
      currentRoundCpuCard: cpuCard,
      selectedAttribute: null,
      roundWinner: null,
      isRevealed: false,
      isGameOver: false,
      gameWinner: null,
    });
  },

  playAttribute: (attr: CardAttributeKey) => {
    const { currentRoundPlayerCard, currentRoundCpuCard, playerScore, cpuScore } = get();
    if (!currentRoundPlayerCard || !currentRoundCpuCard || get().isRevealed) return;

    const playerVal = Number(currentRoundPlayerCard[attr]);
    const cpuVal = Number(currentRoundCpuCard[attr]);

    let roundWinner: RoundWinner = 'draw';
    let newPlayerScore = playerScore;
    let newCpuScore = cpuScore;

    // Regra clássica de Super Trunfo: Carta Trunfo ganha de qualquer carta normal,
    // exceto se a outra carta for Rara nível 'A' (ou aqui, se ambas forem trunfo).
    if (currentRoundPlayerCard.cardTrunfo && !currentRoundCpuCard.cardTrunfo) {
      roundWinner = 'player';
      newPlayerScore += 1;
    } else if (currentRoundCpuCard.cardTrunfo && !currentRoundPlayerCard.cardTrunfo) {
      roundWinner = 'cpu';
      newCpuScore += 1;
    } else {
      if (playerVal > cpuVal) {
        roundWinner = 'player';
        newPlayerScore += 1;
      } else if (cpuVal > playerVal) {
        roundWinner = 'cpu';
        newCpuScore += 1;
      } else {
        roundWinner = 'draw';
      }
    }

    set({
      selectedAttribute: attr,
      roundWinner,
      isRevealed: true,
      playerScore: newPlayerScore,
      cpuScore: newCpuScore,
    });
  },

  nextRound: () => {
    const { playerDeck, cpuDeck, round, playerScore, cpuScore } = get();

    const remainingPlayerCards = playerDeck.slice(1);
    const remainingCpuCards = cpuDeck.slice(1);

    if (remainingPlayerCards.length === 0 || remainingCpuCards.length === 0) {
      let gameWinner: 'player' | 'cpu' | 'draw' = 'draw';
      if (playerScore > cpuScore) gameWinner = 'player';
      else if (cpuScore > playerScore) gameWinner = 'cpu';

      set({
        isGameOver: true,
        gameWinner,
      });
      return;
    }

    set({
      playerDeck: remainingPlayerCards,
      cpuDeck: remainingCpuCards,
      round: round + 1,
      currentRoundPlayerCard: remainingPlayerCards[0],
      currentRoundCpuCard: remainingCpuCards[0],
      selectedAttribute: null,
      roundWinner: null,
      isRevealed: false,
    });
  },

  resetBattle: () => {
    set({
      playerDeck: [],
      cpuDeck: [],
      playerScore: 0,
      cpuScore: 0,
      round: 1,
      currentRoundPlayerCard: null,
      currentRoundCpuCard: null,
      selectedAttribute: null,
      roundWinner: null,
      isRevealed: false,
      isGameOver: false,
      gameWinner: null,
    });
  },
}));
