import React from 'react';
import { clsx } from 'clsx';
import { Swords, Shield, Zap, Sparkles, Trash2 } from 'lucide-react';
import { CardRarity } from '../types/card';

export interface CardProps {
  cardName: string;
  cardDescription: string;
  cardAttr1: string | number;
  cardAttr2: string | number;
  cardAttr3: string | number;
  cardImage: string;
  cardRare: string;
  cardTrunfo: boolean;
  onDelete?: () => void;
  isInteractive?: boolean;
  onSelectAttr?: (attr: 'cardAttr1' | 'cardAttr2' | 'cardAttr3') => void;
  selectedAttr?: 'cardAttr1' | 'cardAttr2' | 'cardAttr3' | null;
  disabledAttrSelection?: boolean;
  showDeleteButton?: boolean;
  button?: React.ReactNode;
}

const RARITY_STYLES: Record<CardRarity, { label: string; badge: string; border: string }> = {
  normal: {
    label: 'Normal',
    badge: 'bg-slate-700/80 text-slate-300 border-slate-600',
    border: 'border-slate-700/70',
  },
  raro: {
    label: 'Raro',
    badge: 'bg-blue-950/80 text-cyan-400 border-cyan-500/40',
    border: 'border-cyan-500/50 shadow-glow-cyan',
  },
  'muito raro': {
    label: 'Muito Raro',
    badge: 'bg-purple-950/80 text-purple-300 border-purple-500/40',
    border: 'border-purple-500/60 shadow-glow-purple',
  },
};

const Card: React.FC<CardProps> = ({
  cardName,
  cardDescription,
  cardAttr1,
  cardAttr2,
  cardAttr3,
  cardImage,
  cardRare,
  cardTrunfo,
  onDelete,
  isInteractive = false,
  onSelectAttr,
  selectedAttr,
  disabledAttrSelection = false,
  showDeleteButton = false,
  button,
}) => {
  const currentRarity = (RARITY_STYLES[cardRare as CardRarity] || RARITY_STYLES.normal);

  const fallbackImage = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop&q=80';

  const attrList = [
    {
      id: 'cardAttr1' as const,
      name: 'Ataque',
      value: Number(cardAttr1) || 0,
      icon: Swords,
      color: 'text-rose-400',
      barColor: 'bg-rose-500',
      testId: 'attr1-card',
    },
    {
      id: 'cardAttr2' as const,
      name: 'Defesa',
      value: Number(cardAttr2) || 0,
      icon: Shield,
      color: 'text-sky-400',
      barColor: 'bg-sky-500',
      testId: 'attr2-card',
    },
    {
      id: 'cardAttr3' as const,
      name: 'Velocidade',
      value: Number(cardAttr3) || 0,
      icon: Zap,
      color: 'text-amber-400',
      barColor: 'bg-amber-500',
      testId: 'attr3-card',
    },
  ];

  return (
    <div
      className={clsx(
        'relative group rounded-2xl p-3 sm:p-4 transition-all duration-300 backdrop-blur-md flex flex-col justify-between w-full max-w-[320px] mx-auto min-h-[460px] select-none',
        'bg-slate-900/90 border',
        cardTrunfo
          ? 'border-yellow-400/80 shadow-glow-gold trunfo-foil ring-2 ring-yellow-400/30'
          : currentRarity.border
      )}
    >
      {/* Super Trunfo Banner / Badge */}
      {cardTrunfo && (
        <div
          data-testid="trunfo-card"
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 text-slate-950 font-display font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1 animate-pulse"
        >
          <Sparkles className="w-3 h-3 fill-slate-950" />
          Super Trunfo
        </div>
      )}

      {/* Header: Nome e Raridade */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2 mt-1">
          <h3
            data-testid="name-card"
            className="font-display font-bold text-lg sm:text-xl text-white tracking-wide truncate flex-1"
            title={cardName || 'Nome da Carta'}
          >
            {cardName || 'Nome da Carta'}
          </h3>
          <span
            data-testid="rare-card"
            className={clsx(
              'px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md border shrink-0',
              currentRarity.badge
            )}
          >
            {cardRare || 'Normal'}
          </span>
        </div>

        {/* Imagem */}
        <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-slate-950/80 border border-slate-800 mb-3 shadow-inner">
          <img
            src={cardImage || fallbackImage}
            alt={cardName || 'Prévia da carta'}
            data-testid="image-card"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImage;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60" />
        </div>

        {/* Descrição */}
        <p
          data-testid="description-card"
          className="text-xs text-slate-400 line-clamp-2 italic mb-3 min-h-[32px]"
        >
          {cardDescription || 'Descrição da carta...'}
        </p>
      </div>

      {/* Lista de Atributos */}
      <div className="space-y-2 mb-3">
        {attrList.map((attr) => {
          const Icon = attr.icon;
          const isSelected = selectedAttr === attr.id;
          const percentage = Math.min(100, Math.max(0, (attr.value / 90) * 100));

          return (
            <div
              key={attr.id}
              onClick={() => {
                if (isInteractive && onSelectAttr && !disabledAttrSelection) {
                  onSelectAttr(attr.id);
                }
              }}
              className={clsx(
                'rounded-lg p-2 transition-all border',
                isInteractive && !disabledAttrSelection
                  ? 'cursor-pointer hover:border-cyan-400/80 hover:bg-slate-800/80 active:scale-[0.98]'
                  : 'cursor-default',
                isSelected
                  ? 'bg-cyan-950/60 border-cyan-400 ring-1 ring-cyan-400 shadow-glow-cyan'
                  : 'bg-slate-950/40 border-slate-800/80'
              )}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Icon className={clsx('w-3.5 h-3.5', attr.color)} />
                  {attr.name}
                </span>
                <span
                  data-testid={attr.testId}
                  className="font-mono font-bold text-white text-xs px-1.5 py-0.5 rounded bg-slate-800/80"
                >
                  {attr.value}
                </span>
              </div>
              {/* Barra de Progresso visual */}
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={clsx('h-full rounded-full transition-all duration-500', attr.barColor)}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Ações / Botão de Excluir */}
      {showDeleteButton && onDelete && (
        <button
          type="button"
          data-testid="delete-button"
          onClick={onDelete}
          className="w-full mt-2 py-1.5 px-3 rounded-lg border border-red-500/30 bg-red-950/30 hover:bg-red-900/50 text-red-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors group-hover:border-red-500/60"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Excluir Carta
        </button>
      )}

      {/* Compatibilidade retroativa para testes com prop 'button' */}
      {button}
    </div>
  );
};

export default Card;
