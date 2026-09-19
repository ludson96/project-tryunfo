import { describe, it, expect, beforeEach } from 'vitest';
import { useDeckStore } from '../useDeckStore';
import { DEFAULT_DECK } from '../../data/defaultDeck';

describe('useDeckStore', () => {
  beforeEach(() => {
    useDeckStore.setState({
      deck: [...DEFAULT_DECK],
      filterName: '',
      filterRare: 'todas',
      filterTrunfo: false,
    });
  });

  it('deve inicializar com o baralho padrão', () => {
    const { deck } = useDeckStore.getState();
    expect(deck.length).toBe(DEFAULT_DECK.length);
  });

  it('deve identificar se já possui uma carta Super Trunfo no deck', () => {
    const { hasTrunfo } = useDeckStore.getState();
    expect(hasTrunfo()).toBe(true);
  });

  it('deve adicionar uma nova carta respeitando o ID gerado', () => {
    const { addCard } = useDeckStore.getState();
    addCard({
      cardName: 'Nova Carta Teste',
      cardDescription: 'Teste de descrição',
      cardAttr1: 50,
      cardAttr2: 50,
      cardAttr3: 50,
      cardImage: 'https://exemplo.com/teste.jpg',
      cardRare: 'normal',
      cardTrunfo: false,
    });

    const { deck } = useDeckStore.getState();
    expect(deck.length).toBe(DEFAULT_DECK.length + 1);
    expect(deck[deck.length - 1].cardName).toBe('Nova Carta Teste');
  });

  it('não deve permitir adicionar outro Super Trunfo se o deck já possui um', () => {
    const { addCard } = useDeckStore.getState();
    addCard({
      cardName: 'Tentativa Trunfo Duplicado',
      cardDescription: 'Descrição',
      cardAttr1: 30,
      cardAttr2: 30,
      cardAttr3: 30,
      cardImage: 'https://exemplo.com/teste.jpg',
      cardRare: 'muito raro',
      cardTrunfo: true,
    });

    const { deck } = useDeckStore.getState();
    const novaCarta = deck[deck.length - 1];
    expect(novaCarta.cardTrunfo).toBe(false);
  });

  it('deve excluir uma carta pelo ID', () => {
    const { deleteCard, deck } = useDeckStore.getState();
    const idParaDeletar = deck[0].id;

    deleteCard(idParaDeletar);

    const novoDeck = useDeckStore.getState().deck;
    expect(novoDeck.some((c) => c.id === idParaDeletar)).toBe(false);
    expect(novoDeck.length).toBe(DEFAULT_DECK.length - 1);
  });

  it('deve filtrar cartas por nome corretamente', () => {
    const { setFilterName, getFilteredDeck } = useDeckStore.getState();
    setFilterName('Dragon');

    const filtradas = getFilteredDeck();
    expect(filtradas.length).toBe(1);
    expect(filtradas[0].cardName).toContain('Cyber Dragon Prime');
  });

  it('deve filtrar apenas cartas Super Trunfo quando o filtro estiver ativo', () => {
    const { setFilterTrunfo, getFilteredDeck } = useDeckStore.getState();
    setFilterTrunfo(true);

    const filtradas = getFilteredDeck();
    expect(filtradas.every((c) => c.cardTrunfo)).toBe(true);
    expect(filtradas.length).toBe(1);
  });
});
