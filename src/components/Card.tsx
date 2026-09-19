import React from 'react';
import { clsx } from 'clsx';
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

const RARITY_LABELS: Record<CardRarity, string> = {
  normal: 'Edição Normal',
  raro: 'Edição Rara',
  'muito raro': 'Edição Lendária',
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
  const fallbackImage = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop&q=80';

  const attrList = [
    {
      id: 'cardAttr1' as const,
      name: 'Poder de Ataque',
      value: Number(cardAttr1) || 0,
      testId: 'attr1-card',
    },
    {
      id: 'cardAttr2' as const,
      name: 'Capacidade de Defesa',
      value: Number(cardAttr2) || 0,
      testId: 'attr2-card',
    },
    {
      id: 'cardAttr3' as const,
      name: 'Agilidade & Velocidade',
      value: Number(cardAttr3) || 0,
      testId: 'attr3-card',
    },
  ];

  return (
    <article
      className={clsx(
        'bg-white border-2 transition-all duration-200 p-5 rounded flex flex-col justify-between w-full max-w-[340px] mx-auto min-h-[500px]',
        cardTrunfo
          ? 'border-black shadow-lg ring-1 ring-black'
          : 'border-[rgba(144,144,144,0.25)] hover:border-[rgba(144,144,144,0.6)]'
      )}
    >
      <div>
        {/* Header da Carta */}
        <div className="border-b border-[rgba(144,144,144,0.25)] pb-3 mb-3">
          <div className="flex items-center justify-between gap-2">
            <span
              data-testid="rare-card"
              className="text-[10px] font-heading font-bold uppercase tracking-widestHeader text-neutral-500"
            >
              {RARITY_LABELS[cardRare as CardRarity] || 'Normal'}
            </span>
            {cardTrunfo && (
              <span
                data-testid="trunfo-card"
                className="badge-trunfo-classic text-[9px]"
              >
                Super Trunfo
              </span>
            )}
          </div>
          <h3
            data-testid="name-card"
            className="font-heading font-bold text-lg text-black uppercase tracking-widestHeader mt-1 truncate"
            title={cardName || 'Nome da Carta'}
          >
            {cardName || 'Nome da Carta'}
          </h3>
        </div>

        {/* Imagem */}
        <div className="relative aspect-[16/11] overflow-hidden rounded-sm bg-[#f2f2f2] border border-[rgba(144,144,144,0.2)] mb-4">
          <img
            src={cardImage || fallbackImage}
            alt={cardName || 'Prévia da carta'}
            data-testid="image-card"
            className="w-full h-full object-cover object-center grayscale contrast-105 hover:grayscale-0 transition-all duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImage;
            }}
          />
        </div>

        {/* Descrição */}
        <p
          data-testid="description-card"
          className="text-xs text-[#666666] leading-relaxed line-clamp-2 italic mb-4 min-h-[38px]"
        >
          {cardDescription || 'Insira uma descrição detalhada para a carta...'}
        </p>
      </div>

      {/* Atributos em Tabela Estilo Paradigm Shift */}
      <div className="mb-4">
        <div className="border-t border-[rgba(144,144,144,0.25)]">
          {attrList.map((attr) => {
            const isSelected = selectedAttr === attr.id;
            return (
              <div
                key={attr.id}
                onClick={() => {
                  if (isInteractive && onSelectAttr && !disabledAttrSelection) {
                    onSelectAttr(attr.id);
                  }
                }}
                className={clsx(
                  'flex items-center justify-between py-2 px-2 border-b border-[rgba(144,144,144,0.15)] text-xs transition-colors',
                  isInteractive && !disabledAttrSelection
                    ? 'cursor-pointer hover:bg-neutral-100'
                    : 'cursor-default',
                  isSelected
                    ? 'bg-black text-white'
                    : 'text-[#333333]'
                )}
              >
                <span className={clsx('font-medium', isSelected ? 'text-white' : 'text-neutral-700')}>
                  {attr.name}
                </span>
                <span
                  data-testid={attr.testId}
                  className={clsx(
                    'font-heading font-bold text-xs tracking-wider',
                    isSelected ? 'text-white' : 'text-black'
                  )}
                >
                  {attr.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ações / Botões */}
      {showDeleteButton && onDelete && (
        <button
          type="button"
          data-testid="delete-button"
          onClick={onDelete}
          className="btn-paradigm w-full text-xs text-neutral-600 hover:text-black mt-1"
        >
          Excluir Carta
        </button>
      )}

      {button}
    </article>
  );
};

export default Card;
