import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CardData, CardRarity } from '../types/card';
import { DEFAULT_DECK } from '../data/defaultDeck';

interface DeckState {
  deck: CardData[];
  filterName: string;
  filterRare: 'todas' | CardRarity;
  filterTrunfo: boolean;

  // Actions
  addCard: (card: Omit<CardData, 'id'>) => void;
  deleteCard: (id: string) => void;
  resetToDefaultDeck: () => void;
  setFilterName: (name: string) => void;
  setFilterRare: (rare: 'todas' | CardRarity) => void;
  setFilterTrunfo: (onlyTrunfo: boolean) => void;
  clearFilters: () => void;

  // Computed / Selectors
  hasTrunfo: () => boolean;
  getFilteredDeck: () => CardData[];
}

export const useDeckStore = create<DeckState>()(
  persist(
    (set, get) => ({
      deck: DEFAULT_DECK,
      filterName: '',
      filterRare: 'todas',
      filterTrunfo: false,

      hasTrunfo: () => {
        return get().deck.some((card) => card.cardTrunfo);
      },

      addCard: (newCardData) => {
        const id = `card-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        const cardTrunfo = get().hasTrunfo() ? false : Boolean(newCardData.cardTrunfo);

        set((state) => ({
          deck: [
            ...state.deck,
            {
              ...newCardData,
              id,
              cardTrunfo,
            },
          ],
        }));
      },

      deleteCard: (id) => {
        set((state) => ({
          deck: state.deck.filter((card) => card.id !== id),
        }));
      },

      resetToDefaultDeck: () => {
        set({
          deck: DEFAULT_DECK,
          filterName: '',
          filterRare: 'todas',
          filterTrunfo: false,
        });
      },

      setFilterName: (name) => set({ filterName: name }),
      setFilterRare: (rare) => set({ filterRare: rare }),
      setFilterTrunfo: (filterTrunfo) => set({ filterTrunfo }),

      clearFilters: () => set({
        filterName: '',
        filterRare: 'todas',
        filterTrunfo: false,
      }),

      getFilteredDeck: () => {
        const { deck, filterName, filterRare, filterTrunfo } = get();

        return deck.filter((card) => {
          if (filterTrunfo) {
            return card.cardTrunfo;
          }

          const matchName = card.cardName.toLowerCase().includes(filterName.toLowerCase().trim());
          const matchRare = filterRare === 'todas' || card.cardRare === filterRare;

          return matchName && matchRare;
        });
      },
    }),
    {
      name: 'tryunfo-deck-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ deck: state.deck }),
    }
  )
);
