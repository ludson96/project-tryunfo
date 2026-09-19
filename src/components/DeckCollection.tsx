import React from 'react';
import { CardRarity } from '../types/card';
import Card from './Card';
import { useDeckStore } from '../store/useDeckStore';

const DeckCollection: React.FC = () => {
  const {
    filterName,
    filterRare,
    filterTrunfo,
    setFilterName,
    setFilterRare,
    setFilterTrunfo,
    clearFilters,
    deleteCard,
    resetToDefaultDeck,
    getFilteredDeck,
  } = useDeckStore();

  const filteredCards = getFilteredDeck();

  return (
    <div className="space-y-8">
      {/* Controles e Filtros */}
      <div className="border border-[rgba(144,144,144,0.25)] p-6 rounded bg-[#fafafa]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(144,144,144,0.25)] pb-4 mb-6">
          <div>
            <h3 className="text-sm font-heading font-bold uppercase tracking-widestHeader text-black">
              Filtrar Baralho
            </h3>
            <p className="text-xs text-[#666666] mt-0.5">
              Exibindo <strong>{filteredCards.length}</strong> cartas correspondentes aos critérios.
            </p>
          </div>

          <button
            type="button"
            onClick={resetToDefaultDeck}
            className="btn-paradigm text-xs py-1.5 px-4 h-auto self-start sm:self-auto"
          >
            Restaurar Baralho Padrão
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          {/* Busca por Nome */}
          <div className="sm:col-span-6">
            <input
              type="text"
              name="filterName"
              data-testid="name-filter"
              value={filterName}
              placeholder="Buscar por nome..."
              onChange={(e) => setFilterName(e.target.value)}
              disabled={filterTrunfo}
              className="input-paradigm disabled:opacity-40 disabled:cursor-not-allowed"
            />
          </div>

          {/* Filtro por Raridade */}
          <div className="sm:col-span-3">
            <select
              name="filterRare"
              data-testid="rare-filter"
              value={filterRare}
              onChange={(e) => setFilterRare(e.target.value as 'todas' | CardRarity)}
              disabled={filterTrunfo}
              className="input-paradigm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <option value="todas">Todas as Raridades</option>
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito raro</option>
            </select>
          </div>

          {/* Filtro Super Trunfo */}
          <div className="sm:col-span-3">
            <label
              htmlFor="trunfo-filter"
              className="flex items-center gap-3 p-2.5 border border-[rgba(144,144,144,0.25)] rounded hover:border-black cursor-pointer bg-white transition-colors h-[2.75rem]"
            >
              <input
                type="checkbox"
                id="trunfo-filter"
                name="filterTrunfo"
                data-testid="trunfo-filter"
                checked={filterTrunfo}
                onChange={(e) => setFilterTrunfo(e.target.checked)}
                className="w-4 h-4 rounded border-neutral-400 text-black focus:ring-black cursor-pointer"
              />
              <span className="text-xs font-heading font-bold uppercase tracking-widestHeader text-black truncate">
                Apenas Trunfo
              </span>
            </label>
          </div>
        </div>

        {(filterName || filterRare !== 'todas' || filterTrunfo) && (
          <div className="mt-4 flex items-center justify-between text-xs border-t border-[rgba(144,144,144,0.15)] pt-3">
            <span className="text-neutral-500 italic">Filtros aplicados à visualização</span>
            <button
              type="button"
              onClick={clearFilters}
              className="font-heading font-bold uppercase tracking-wider text-black underline hover:no-underline"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>

      {/* Grid de Cartas */}
      {filteredCards.length === 0 ? (
        <div className="border border-[rgba(144,144,144,0.25)] p-12 text-center rounded bg-[#fafafa]">
          <h4 className="font-heading font-bold text-base text-black uppercase tracking-widestHeader mb-2">
            Nenhuma Carta Encontrada
          </h4>
          <p className="text-xs text-[#666666] max-w-sm mx-auto mb-6">
            Não foram localizadas cartas com os filtros informados ou seu acervo está temporariamente vazio.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="btn-paradigm"
          >
            Limpar Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {filteredCards.map((card) => (
            <Card
              key={card.id}
              cardName={card.cardName}
              cardDescription={card.cardDescription}
              cardAttr1={card.cardAttr1}
              cardAttr2={card.cardAttr2}
              cardAttr3={card.cardAttr3}
              cardImage={card.cardImage}
              cardRare={card.cardRare}
              cardTrunfo={card.cardTrunfo}
              showDeleteButton
              onDelete={() => deleteCard(card.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DeckCollection;
