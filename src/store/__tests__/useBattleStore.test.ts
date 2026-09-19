import { describe, it, expect, beforeEach } from 'vitest';
import { useBattleStore } from '../useBattleStore';
import { DEFAULT_DECK } from '../../data/defaultDeck';

describe('useBattleStore', () => {
  beforeEach(() => {
    useBattleStore.getState().resetBattle();
  });

  it('deve inicializar e dividir o baralho entre Jogador e CPU', () => {
    const { startBattle } = useBattleStore.getState();
    startBattle(DEFAULT_DECK);

    const state = useBattleStore.getState();
    expect(state.playerDeck.length).toBeGreaterThan(0);
    expect(state.cpuDeck.length).toBeGreaterThan(0);
    expect(state.currentRoundPlayerCard).not.toBeNull();
    expect(state.currentRoundCpuCard).not.toBeNull();
  });

  it('deve processar o combate quando um atributo é jogado', () => {
    const { startBattle, playAttribute } = useBattleStore.getState();
    startBattle(DEFAULT_DECK);

    playAttribute('cardAttr1');

    const state = useBattleStore.getState();
    expect(state.isRevealed).toBe(true);
    expect(state.roundWinner).not.toBeNull();
  });
});
