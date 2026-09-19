import React from 'react';
import { Search, Sparkles, RefreshCw, Filter, Layers } from 'lucide-react';
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
    <section className="space-y-6">
      {/* Header e Filtros */}
      <div className="bg-slate-900/80 border border-slate-800 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-purple-400" />
            <div>
              <h2 className="text-xl font-display font-bold text-white">Meu Baralho</h2>
              <p className="text-xs text-slate-400">
                Total de cartas: <span className="text-cyan-400 font-bold">{filteredCards.length}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={resetToDefaultDeck}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 px-3 py-1.5 rounded-lg w-fit"
            title="Restaura as cartas de exemplo"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Restaurar Baralho Padrão
          </button>
        </div>

        {/* Filtros em Barra */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          {/* Busca por Nome */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              name="filterName"
              data-testid="name-filter"
              value={filterName}
              placeholder="Filtrar por nome da carta..."
              onChange={(e) => setFilterName(e.target.value)}
              disabled={filterTrunfo}
              className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {/* Filtro por Raridade */}
          <div className="sm:col-span-3">
            <div className="relative">
              <select
                name="filterRare"
                data-testid="rare-filter"
                value={filterRare}
                onChange={(e) => setFilterRare(e.target.value as 'todas' | CardRarity)}
                disabled={filterTrunfo}
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <option value="todas">Todas as Raridades</option>
                <option value="normal">Normal</option>
                <option value="raro">Raro</option>
                <option value="muito raro">Muito raro</option>
              </select>
            </div>
          </div>

          {/* Filtro Super Trunfo */}
          <div className="sm:col-span-3 flex items-center">
            <label
              htmlFor="trunfo-filter"
              className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-slate-950/40 border border-slate-800 hover:border-amber-500/40 w-full transition-all"
            >
              <input
                type="checkbox"
                id="trunfo-filter"
                name="filterTrunfo"
                data-testid="trunfo-filter"
                checked={filterTrunfo}
                onChange={(e) => setFilterTrunfo(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-400 cursor-pointer"
              />
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Apenas Super Trunfo
              </span>
            </label>
          </div>
        </div>

        {(filterName || filterRare !== 'todas' || filterTrunfo) && (
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Filter className="w-3 h-3 text-cyan-400" />
              Filtro ativo
            </span>
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs text-cyan-400 hover:underline cursor-pointer"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>

      {/* Grid de Cartas */}
      {filteredCards.length === 0 ? (
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-12 text-center">
          <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-display font-bold text-slate-300 mb-1">Nenhuma carta encontrada</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            Não há cartas cadastradas com os critérios selecionados ou seu baralho está vazio.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
          >
            Redefinir Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    </section>
  );
};

export default DeckCollection;
