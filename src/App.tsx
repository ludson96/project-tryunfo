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

  // Validação do formulário
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

    // Reset
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
    <div className="min-h-screen bg-white text-[#444444] flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        deckCount={deck.length}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'creator' ? (
          <div className="space-y-16">
            {/* Intro Section - Estilo Paradigm Shift */}
            <div className="border-b border-[rgba(144,144,144,0.25)] pb-10 mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <h1 className="text-4xl sm:text-5xl font-bold text-black tracking-tight mb-4">
                    Tryunfo.
                  </h1>
                  <p className="text-lg text-[#555555] font-light leading-relaxed max-w-2xl">
                    Um sistema de criação de cartas personalizadas e simulação de partidas estratégicas baseado no clássico jogo de cartas Super Trunfo.
                  </p>
                </div>
              </div>
            </div>

            {/* Seção 1: Criação e Prévia com layout clássico de duas colunas (Header + Content) */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Coluna Esquerda: Header Editorial da Seção */}
              <div className="lg:col-span-4 lg:sticky lg:top-28">
                <header>
                  <span className="text-xs font-heading font-bold uppercase tracking-widestHeader text-neutral-400 block mb-1">
                    Passo 01
                  </span>
                  <h2 className="text-xl font-heading font-bold text-black uppercase tracking-widestHeader mb-4">
                    Nova Carta
                  </h2>
                  <p className="text-sm text-[#666666] leading-relaxed mb-6">
                    Configure os parâmetros da sua carta balanceando os valores de Ataque, Defesa e Agilidade.
                  </p>
                </header>

                <div className="border border-[rgba(144,144,144,0.25)] p-5 rounded bg-[#fafafa]">
                  <span className="text-[11px] font-heading font-bold uppercase tracking-widestHeader text-neutral-500 block mb-2">
                    Regras de Balanceamento
                  </span>
                  <ul className="text-xs text-[#666666] space-y-2 list-disc list-inside">
                    <li>Atributo individual: entre 0 e 90.</li>
                    <li>Soma dos 3 atributos: limite de 210.</li>
                    <li>Apenas 1 Super Trunfo por baralho.</li>
                  </ul>
                </div>
              </div>

              {/* Coluna Direita: Formulário e Prévia lado a lado */}
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-7">
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

                <div className="md:col-span-5 flex flex-col items-center">
                  <span className="text-xs font-heading font-bold uppercase tracking-widestHeader text-neutral-500 mb-3 block">
                    Prévia em Tempo Real
                  </span>
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
              </div>
            </section>

            <hr />

            {/* Seção 2: O Baralho Completo */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-3 lg:sticky lg:top-28">
                <header>
                  <span className="text-xs font-heading font-bold uppercase tracking-widestHeader text-neutral-400 block mb-1">
                    Passo 02
                  </span>
                  <h2 className="text-xl font-heading font-bold text-black uppercase tracking-widestHeader mb-4">
                    Baralho Ativo
                  </h2>
                  <p className="text-sm text-[#666666] leading-relaxed">
                    Navegue pelas cartas já adicionadas, utilize os filtros de busca ou exclua cartas do seu acervo.
                  </p>
                </header>
              </div>

              <div className="lg:col-span-9">
                <DeckCollection />
              </div>
            </section>
          </div>
        ) : (
          /* Modo Batalha */
          <BattleArena />
        )}
      </main>

      {/* Rodapé Editorial */}
      <footer className="border-t border-[rgba(144,144,144,0.25)] bg-[#fafafa] py-6 text-center text-xs text-[#777777]">
        <div className="max-w-6xl mx-auto px-4">
          <p className="font-heading uppercase tracking-widestHeader text-black font-bold mb-2">
            Tryunfo — Edição Paradigm
          </p>
          <p>
            Desenvolvido em React, TypeScript e Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
