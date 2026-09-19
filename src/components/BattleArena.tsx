import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Swords, Trophy, RotateCcw, ArrowRight, ShieldAlert, Zap, Award } from 'lucide-react';
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
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  }, [isGameOver, gameWinner]);

  if (deck.length < 2) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center max-w-xl mx-auto backdrop-blur-md">
        <ShieldAlert className="w-16 h-16 text-amber-400 mx-auto mb-4 animate-bounce" />
        <h2 className="text-2xl font-display font-bold text-white mb-2">Baralho Insuficiente</h2>
        <p className="text-sm text-slate-400 mb-6">
          Você precisa de pelo menos <strong className="text-cyan-400">2 cartas</strong> no seu baralho para iniciar uma batalha contra a máquina.
        </p>
      </div>
    );
  }

  if (!isStarted) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-12 text-center max-w-2xl mx-auto backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-6">
            <Swords className="w-12 h-12 text-cyan-400" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-3">
            Arena de Duelo Super Trunfo
          </h2>

          <p className="text-sm text-slate-300 max-w-md mx-auto mb-8 leading-relaxed">
            Seu baralho será embaralhado e dividido entre você e a CPU. A cada rodada, escolha seu atributo mais forte para superar a carta oculta do oponente!
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-slate-400 mb-8">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> Total no Deck: {deck.length} cartas
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Super Trunfo vence cartas comuns
            </div>
          </div>

          <button
            type="button"
            onClick={() => startBattle(deck)}
            className="px-8 py-3.5 rounded-xl font-display font-bold text-base tracking-wider uppercase bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-glow-cyan transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            Iniciar Duelo Agora
          </button>
        </div>
      </div>
    );
  }

  // Fim de jogo
  if (isGameOver) {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto backdrop-blur-md shadow-2xl">
        <div className="mb-4">
          {gameWinner === 'player' ? (
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto animate-pulse" />
          ) : gameWinner === 'cpu' ? (
            <ShieldAlert className="w-16 h-16 text-rose-500 mx-auto" />
          ) : (
            <Award className="w-16 h-16 text-cyan-400 mx-auto" />
          )}
        </div>

        <h2 className="text-3xl font-display font-extrabold text-white mb-2">
          {gameWinner === 'player' && 'Vitória Lendária!'}
          {gameWinner === 'cpu' && 'Derrota em Combate!'}
          {gameWinner === 'draw' && 'Empate Eletrizante!'}
        </h2>

        <p className="text-sm text-slate-300 mb-6">
          {gameWinner === 'player' && 'Você superou a CPU com maestria estratégica e dominou a arena!'}
          {gameWinner === 'cpu' && 'A CPU levou a melhor desta vez. Ajuste seus atributos e tente novamente.'}
          {gameWinner === 'draw' && 'Um duelo equilibradíssimo até o último segundo.'}
        </p>

        {/* Placar Final */}
        <div className="flex justify-center items-center gap-6 mb-8 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 max-w-xs mx-auto">
          <div className="text-center">
            <span className="text-xs text-slate-400 font-semibold block">Você</span>
            <span className="text-3xl font-display font-black text-cyan-400">{playerScore}</span>
          </div>
          <span className="text-xl font-bold text-slate-600">VS</span>
          <div className="text-center">
            <span className="text-xs text-slate-400 font-semibold block">CPU</span>
            <span className="text-3xl font-display font-black text-rose-400">{cpuScore}</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => startBattle(deck)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-display font-bold text-sm bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-glow-cyan cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Jogar Novamente
          </button>
          <button
            type="button"
            onClick={resetBattle}
            className="px-6 py-2.5 rounded-xl font-display font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
          >
            Voltar ao Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Placar Superior */}
      <div className="bg-slate-900/80 border border-slate-800 backdrop-blur-md rounded-2xl p-4 sm:px-6 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">Jogador</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-display font-black text-white">{playerScore}</span>
              <span className="text-xs text-slate-400">({playerDeck.length} cartas)</span>
            </div>
          </div>
        </div>

        <div className="text-center px-4 py-1 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Rodada</span>
          <span className="text-lg font-display font-extrabold text-amber-400">{round}</span>
        </div>

        <div className="flex items-center gap-4 text-right">
          <div>
            <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">CPU Oponente</span>
            <div className="flex items-baseline gap-1 justify-end">
              <span className="text-xs text-slate-400">({cpuDeck.length} cartas)</span>
              <span className="text-2xl font-display font-black text-white">{cpuScore}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Arena de Duelo (Cartas Frente a Frente) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-center max-w-4xl mx-auto">
        {/* Carta do Jogador */}
        <div className="flex flex-col items-center">
          <div className="text-xs font-display font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" /> Sua Carta (Escolha um Atributo)
          </div>
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

        {/* Carta da CPU */}
        <div className="flex flex-col items-center">
          <div className="text-xs font-display font-bold uppercase tracking-wider text-rose-400 mb-2">
            Carta da CPU {isRevealed ? '(Revelada)' : '(Oculta)'}
          </div>

          {currentRoundCpuCard && (
            <div className="relative w-full max-w-[320px]">
              {/* Se não foi revelada, exibe o verso da carta */}
              {!isRevealed ? (
                <div className="rounded-2xl p-6 transition-all duration-300 backdrop-blur-md flex flex-col items-center justify-center w-full min-h-[460px] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-slate-800 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
                  <div className="w-24 h-32 rounded-xl border-2 border-dashed border-slate-700/80 flex items-center justify-center mb-4">
                    <Swords className="w-10 h-10 text-slate-600 animate-pulse" />
                  </div>
                  <h4 className="font-display font-bold text-slate-400 text-base mb-1">Carta Oculta</h4>
                  <p className="text-xs text-slate-600 text-center max-w-[200px]">
                    Clique em um atributo na sua carta para revelar o confronto!
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

      {/* Banner de Resultado da Rodada e Próxima Rodada */}
      {isRevealed && (
        <div className="bg-slate-900/90 border border-slate-700 backdrop-blur-md rounded-2xl p-5 text-center max-w-md mx-auto shadow-2xl animate-fade-in">
          <div className="text-lg font-display font-bold mb-1">
            {roundWinner === 'player' && (
              <span className="text-cyan-400 flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5" /> Você venceu a rodada! (+1 ponto)
              </span>
            )}
            {roundWinner === 'cpu' && (
              <span className="text-rose-400 flex items-center justify-center gap-2">
                A CPU venceu a rodada! (+1 ponto para CPU)
              </span>
            )}
            {roundWinner === 'draw' && (
              <span className="text-amber-400 flex items-center justify-center gap-2">
                Empate de atributos! (Sem pontos)
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={nextRound}
            className="mt-3 px-6 py-2 rounded-xl font-display font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-glow-cyan flex items-center gap-2 mx-auto cursor-pointer"
          >
            Próxima Rodada <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default BattleArena;
