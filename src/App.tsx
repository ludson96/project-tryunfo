import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Form from './components/Form';
import Card from './components/Card';
import DeckCollection from './components/DeckCollection';
import BattleArena from './components/BattleArena';
import { useDeckStore } from './store/useDeckStore';
import { MAX_INDIVIDUAL_ATTR, MAX_TOTAL_ATTR, MIN_ATTR, CardRarity } from './types/card';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'creator' | 'battle'>('creator');

  // Estados do formulário da nova carta
  const [cardName, setCardName] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  const [cardAttr1, setCardAttr1] = useState('0');
  const [cardAttr2, setCardAttr2] = useState('0');
  const [cardAttr3, setCardAttr3] = useState('0');
  const [cardImage, setCardImage] = useState('');
  const [cardRare, setCardRare] = useState<CardRarity>('normal');
  const [cardTrunfo, setCardTrunfo] = useState(false);

  // Store Zustand
  const { deck, hasTrunfo, addCard } = useDeckStore();
  const deckHasTrunfo = hasTrunfo();

  // Validação do botão de salvar
  const attr1Num = Number(cardAttr1);
  const attr2Num = Number(cardAttr2);
  const attr3Num = Number(cardAttr3);
  const sum = attr1Num + attr2Num + attr3Num;

  const isFormValid =
    cardName.trim() !== '' &&
    cardDescription.trim() !== '' &&
    cardImage.trim() !== '' &&
    cardRare !== undefined &&
    sum <= MAX_TOTAL_ATTR &&
    attr1Num <= MAX_INDIVIDUAL_ATTR &&
    attr2Num <= MAX_INDIVIDUAL_ATTR &&
    attr3Num <= MAX_INDIVIDUAL_ATTR &&
    attr1Num >= MIN_ATTR &&
    attr2Num >= MIN_ATTR &&
    attr3Num >= MIN_ATTR;

  const isSaveButtonDisabled = !isFormValid;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'cardTrunfo') setCardTrunfo(checked);
    } else {
      if (name === 'cardName') setCardName(value);
      if (name === 'cardDescription') setCardDescription(value);
      if (name === 'cardAttr1') setCardAttr1(value);
      if (name === 'cardAttr2') setCardAttr2(value);
      if (name === 'cardAttr3') setCardAttr3(value);
      if (name === 'cardImage') setCardImage(value);
      if (name === 'cardRare') setCardRare(value as CardRarity);
    }
  };

  const handleSaveButton = () => {
    if (isSaveButtonDisabled) return;

    addCard({
      cardName,
      cardDescription,
      cardAttr1: Number(cardAttr1),
      cardAttr2: Number(cardAttr2),
      cardAttr3: Number(cardAttr3),
      cardImage,
      cardRare,
      cardTrunfo: deckHasTrunfo ? false : cardTrunfo,
    });

    // Reset formulário
    setCardName('');
    setCardDescription('');
    setCardImage('');
    setCardAttr1('0');
    setCardAttr2('0');
    setCardAttr3('0');
    setCardRare('normal');
    setCardTrunfo(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cyber-darker text-slate-100">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        deckCount={deck.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'creator' ? (
          <div className="space-y-12">
            {/* Seção Superior: Formulário + Preview em Tempo Real */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Formulário */}
              <div className="lg:col-span-7">
                <Form
                  cardName={cardName}
                  cardDescription={cardDescription}
                  cardAttr1={cardAttr1}
                  cardAttr2={cardAttr2}
                  cardAttr3={cardAttr3}
                  cardImage={cardImage}
                  cardRare={cardRare}
                  cardTrunfo={cardTrunfo}
                  hasTrunfo={deckHasTrunfo}
                  isSaveButtonDisabled={isSaveButtonDisabled}
                  onInputChange={handleInputChange}
                  onSaveButtonClick={handleSaveButton}
                />
              </div>

              {/* Preview Dinâmico */}
              <div className="lg:col-span-5 flex flex-col items-center sticky top-24">
                <div className="text-xs font-display font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Prévia em Tempo Real
                </div>

                <Card
                  cardName={cardName}
                  cardDescription={cardDescription}
                  cardAttr1={cardAttr1}
                  cardAttr2={cardAttr2}
                  cardAttr3={cardAttr3}
                  cardImage={cardImage}
                  cardRare={cardRare}
                  cardTrunfo={deckHasTrunfo ? false : cardTrunfo}
                />
              </div>
            </section>

            {/* Seção Inferior: Coleção e Filtros */}
            <DeckCollection />
          </div>
        ) : (
          /* Aba do Modo Batalha */
          <BattleArena />
        )}
      </main>

      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <p>Tryunfo 2.0 • Desenvolvido com React, TypeScript, Tailwind CSS e Zustand para Portfólio Frontend.</p>
      </footer>
    </div>
  );
};

export default App;
