import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useBattleStore } from '../store/useBattleStore';
import { useDeckStore } from '../store/useDeckStore';
import Card from './Card';
import { CardAttributeKey } from '../types/card';

const BattleArena: React.FC = () => {
  const { deck } = useDeckStore();
  const {
    playerDeck,
    cpuDeck,
    playerScore,
    cpuScore,
    round,
    currentRoundPlayerCard,
    currentRoundCpuCard,
    selectedAttribute,
    roundWinner,
    isRevealed,
    isGameOver,
    gameWinner,
    startBattle,
    playAttribute,
    nextRound,
    resetBattle,
  } = useBattleStore();

  const isStarted = playerDeck.length > 0;

  useEffect(() => {
    if (isGameOver && gameWinner === 'player') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isGameOver, gameWinner]);

  if (deck.length < 2) {
    return (
      <div className="border border-[rgba(144,144,144,0.25)] p-12 text-center rounded max-w-xl mx-auto bg-[#fafafa]">
        <h3 className="text-xl font-heading font-bold uppercase tracking-widestHeader text-black mb-3">
          Cartas Insuficientes
        </h3>
        <p className="text-sm text-[#666666] mb-6">
          É necessário ter no mínimo <strong>2 cartas</strong> cadastradas no baralho para realizar um confronto.
        </p>
      </div>
    );
  }

  if (!isStarted) {
    return (
      <div className="border border-[rgba(144,144,144,0.25)] p-8 sm:p-14 text-center max-w-2xl mx-auto rounded bg-[#fafafa]">
        <span className="badge-trunfo-classic mb-4">
          Confronto de Cartas
        </span>

        <h2 className="text-3xl sm:text-4xl font-heading font-bold uppercase tracking-widestHeader text-black mb-4 mt-2">
          Arena de Duelo
        </h2>

        <p className="text-sm text-[#555555] max-w-md mx-auto mb-8 leading-relaxed">
          O baralho será embaralhado e dividido igualmente entre você e o adversário. A cada rodada, analise sua carta e escolha o atributo com maior probabilidade de vitória.
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-xs text-neutral-600 mb-8 pb-8 border-b border-[rgba(144,144,144,0.25)]">
          <span>Baralho: <strong>{deck.length} cartas</strong></span>
          <span>•</span>
          <span>Regra: <strong>Super Trunfo vence cartas comuns</strong></span>
        </div>

        <button
          type="button"
          onClick={() => startBattle(deck)}
          className="btn-paradigm primary px-8"
        >
          Iniciar Confronto
        </button>
      </div>
    );
  }

  // Fim de jogo
  if (isGameOver) {
    return (
      <div className="border-2 border-black p-8 sm:p-12 text-center max-w-lg mx-auto rounded bg-white shadow-md">
        <span className="badge-trunfo-classic mb-4">
          Resultado Final
        </span>

        <h3 className="text-2xl sm:text-3xl font-heading font-bold uppercase tracking-widestHeader text-black mb-2 mt-3">
          {gameWinner === 'player' && 'Vitória Conquistada'}
          {gameWinner === 'cpu' && 'Derrota em Combate'}
          {gameWinner === 'draw' && 'Empate Registrado'}
        </h3>

        <p className="text-sm text-[#666666] mb-8">
          {gameWinner === 'player' && 'Excelente leitura de jogo e escolha estratégica de atributos.'}
          {gameWinner === 'cpu' && 'O oponente superou as rodadas decisivas nesta partida.'}
          {gameWinner === 'draw' && 'Ambos os competidores empataram em número de rodadas vitoriosas.'}
        </p>

        {/* Placar */}
        <div className="grid grid-cols-2 border border-[rgba(144,144,144,0.25)] rounded p-4 mb-8 bg-[#fafafa]">
          <div className="border-r border-[rgba(144,144,144,0.25)] pr-4">
            <span className="text-xs font-heading uppercase text-neutral-500 block">Jogador</span>
            <span className="text-4xl font-heading font-black text-black">{playerScore}</span>
          </div>
          <div className="pl-4">
            <span className="text-xs font-heading uppercase text-neutral-500 block">Adversário</span>
            <span className="text-4xl font-heading font-black text-black">{cpuScore}</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => startBattle(deck)}
            className="btn-paradigm primary"
          >
            Jogar Novamente
          </button>
          <button
            type="button"
            onClick={resetBattle}
            className="btn-paradigm"
          >
            Encerrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Placar Superior Editorial */}
      <div className="border border-[rgba(144,144,144,0.25)] p-4 sm:px-8 rounded bg-[#fafafa] flex items-center justify-between">
        <div className="text-left">
          <span className="text-[10px] font-heading font-bold uppercase tracking-widestHeader text-neutral-500 block">
            Jogador
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-heading font-black text-black">{playerScore} pts</span>
            <span className="text-xs text-neutral-400">({playerDeck.length} restantes)</span>
          </div>
        </div>

        <div className="text-center px-4 py-1 border border-[rgba(144,144,144,0.25)] rounded bg-white">
          <span className="text-[9px] font-heading font-bold uppercase tracking-widestHeader text-neutral-500 block">
            Rodada
          </span>
          <span className="text-base font-heading font-black text-black">{round}</span>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-heading font-bold uppercase tracking-widestHeader text-neutral-500 block">
            Adversário
          </span>
          <div className="flex items-baseline gap-2 justify-end">
            <span className="text-xs text-neutral-400">({cpuDeck.length} restantes)</span>
            <span className="text-2xl font-heading font-black text-black">{cpuScore} pts</span>
          </div>
        </div>
      </div>

      {/* Duelo de Cartas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-3xl mx-auto">
        {/* Jogador */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-heading font-bold uppercase tracking-widestHeader text-black mb-3">
            Sua Carta (Selecione o Atributo)
          </span>
          {currentRoundPlayerCard && (
            <Card
              cardName={currentRoundPlayerCard.cardName}
              cardDescription={currentRoundPlayerCard.cardDescription}
              cardAttr1={currentRoundPlayerCard.cardAttr1}
              cardAttr2={currentRoundPlayerCard.cardAttr2}
              cardAttr3={currentRoundPlayerCard.cardAttr3}
              cardImage={currentRoundPlayerCard.cardImage}
              cardRare={currentRoundPlayerCard.cardRare}
              cardTrunfo={currentRoundPlayerCard.cardTrunfo}
              isInteractive={!isRevealed}
              disabledAttrSelection={isRevealed}
              selectedAttr={selectedAttribute}
              onSelectAttr={(attr: CardAttributeKey) => playAttribute(attr)}
            />
          )}
        </div>

        {/* CPU */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-heading font-bold uppercase tracking-widestHeader text-neutral-500 mb-3">
            Carta do Oponente {isRevealed ? '(Revelada)' : '(Oculta)'}
          </span>

          {currentRoundCpuCard && (
            <div className="w-full max-w-[340px]">
              {!isRevealed ? (
                <div className="border-2 border-dashed border-[rgba(144,144,144,0.4)] rounded p-8 min-h-[500px] flex flex-col items-center justify-center text-center bg-[#fafafa]">
                  <div className="w-16 h-24 border border-[rgba(144,144,144,0.3)] rounded mb-4 flex items-center justify-center">
                    <span className="font-heading font-bold text-xs text-neutral-400">?</span>
                  </div>
                  <h4 className="font-heading font-bold text-xs uppercase tracking-widestHeader text-black mb-2">
                    Carta Oculta
                  </h4>
                  <p className="text-xs text-[#777777] max-w-[200px]">
                    Escolha um atributo na sua carta para realizar o confronto.
                  </p>
                </div>
              ) : (
                <Card
                  cardName={currentRoundCpuCard.cardName}
                  cardDescription={currentRoundCpuCard.cardDescription}
                  cardAttr1={currentRoundCpuCard.cardAttr1}
                  cardAttr2={currentRoundCpuCard.cardAttr2}
                  cardAttr3={currentRoundCpuCard.cardAttr3}
                  cardImage={currentRoundCpuCard.cardImage}
                  cardRare={currentRoundCpuCard.cardRare}
                  cardTrunfo={currentRoundCpuCard.cardTrunfo}
                  selectedAttr={selectedAttribute}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Conclusão da Rodada */}
      {isRevealed && (
        <div className="border border-black p-5 text-center max-w-sm mx-auto rounded bg-white shadow-sm">
          <div className="text-sm font-heading font-bold uppercase tracking-widestHeader mb-3">
            {roundWinner === 'player' && 'Vitória na Rodada (+1)'}
            {roundWinner === 'cpu' && 'Adversário Venceu (+1)'}
            {roundWinner === 'draw' && 'Empate de Atributos'}
          </div>

          <button
            type="button"
            onClick={nextRound}
            className="btn-paradigm primary w-full text-xs py-3 h-auto"
          >
            Avançar para a Próxima Rodada
          </button>
        </div>
      )}
    </div>
  );
};

export default BattleArena;
