import React from 'react';
import { Sparkles, PlusCircle, AlertCircle } from 'lucide-react';
import { MAX_INDIVIDUAL_ATTR, MAX_TOTAL_ATTR } from '../types/card';

export interface FormProps {
  cardName: string;
  cardDescription: string;
  cardAttr1: string;
  cardAttr2: string;
  cardAttr3: string;
  cardImage: string;
  cardRare: string;
  cardTrunfo: boolean;
  hasTrunfo: boolean;
  isSaveButtonDisabled: boolean;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSaveButtonClick: () => void;
}

const Form: React.FC<FormProps> = ({
  cardName,
  cardDescription,
  cardAttr1,
  cardAttr2,
  cardAttr3,
  cardImage,
  cardRare,
  cardTrunfo,
  hasTrunfo,
  isSaveButtonDisabled,
  onInputChange,
  onSaveButtonClick,
}) => {
  const attr1Num = Number(cardAttr1) || 0;
  const attr2Num = Number(cardAttr2) || 0;
  const attr3Num = Number(cardAttr3) || 0;
  const totalSum = attr1Num + attr2Num + attr3Num;
  const remainingPoints = MAX_TOTAL_ATTR - totalSum;

  const isExceededTotal = totalSum > MAX_TOTAL_ATTR;
  const isAnyAttrInvalid =
    attr1Num < 0 || attr1Num > MAX_INDIVIDUAL_ATTR ||
    attr2Num < 0 || attr2Num > MAX_INDIVIDUAL_ATTR ||
    attr3Num < 0 || attr3Num > MAX_INDIVIDUAL_ATTR;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!isSaveButtonDisabled) onSaveButtonClick();
      }}
      className="bg-slate-900/80 border border-slate-800 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-xl space-y-4"
    >
      <div className="border-b border-slate-800 pb-3">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-cyan-400" />
          Adicionar Nova Carta
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Defina os detalhes e equilibre os atributos para criar uma carta competitiva.
        </p>
      </div>

      {/* Nome */}
      <div>
        <label htmlFor="nome" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Nome da Carta
        </label>
        <input
          type="text"
          name="cardName"
          id="nome"
          data-testid="name-input"
          value={cardName}
          onChange={onInputChange}
          placeholder="Ex: Cyber Samurai"
          className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
        />
      </div>

      {/* Descrição */}
      <div>
        <label htmlFor="descricao" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Descrição da Carta
        </label>
        <textarea
          name="cardDescription"
          id="descricao"
          data-testid="description-input"
          value={cardDescription}
          onChange={onInputChange}
          rows={2}
          placeholder="Conte a história ou habilidade desta carta..."
          className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all resize-none"
        />
      </div>

      {/* URL da Imagem */}
      <div>
        <label htmlFor="img" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          URL da Imagem
        </label>
        <input
          type="text"
          name="cardImage"
          id="img"
          data-testid="image-input"
          value={cardImage}
          onChange={onInputChange}
          placeholder="https://exemplo.com/imagem.png"
          className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
        />
      </div>

      {/* Atributos com Indicador de Pontos Restantes */}
      <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300">Distribuição de Pontos</span>
          <span
            className={`font-mono font-bold px-2 py-0.5 rounded ${
              isExceededTotal
                ? 'bg-rose-950 text-rose-400 border border-rose-800'
                : remainingPoints === 0
                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
            }`}
          >
            {remainingPoints >= 0 ? `${remainingPoints} pts restantes` : `Excedeu ${Math.abs(remainingPoints)} pts!`}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div>
            <label htmlFor="cardAttr1" className="block text-[11px] font-medium text-rose-400 mb-1 truncate">
              1. Ataque (0-{MAX_INDIVIDUAL_ATTR})
            </label>
            <input
              type="number"
              name="cardAttr1"
              id="cardAttr1"
              data-testid="attr1-input"
              value={cardAttr1}
              onChange={onInputChange}
              min="0"
              max={MAX_INDIVIDUAL_ATTR}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm text-white font-mono text-center focus:ring-1 focus:ring-rose-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="cardAttr2" className="block text-[11px] font-medium text-sky-400 mb-1 truncate">
              2. Defesa (0-{MAX_INDIVIDUAL_ATTR})
            </label>
            <input
              type="number"
              name="cardAttr2"
              id="cardAttr2"
              data-testid="attr2-input"
              value={cardAttr2}
              onChange={onInputChange}
              min="0"
              max={MAX_INDIVIDUAL_ATTR}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm text-white font-mono text-center focus:ring-1 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="cardAttr3" className="block text-[11px] font-medium text-amber-400 mb-1 truncate">
              3. Vel (0-{MAX_INDIVIDUAL_ATTR})
            </label>
            <input
              type="number"
              name="cardAttr3"
              id="cardAttr3"
              data-testid="attr3-input"
              value={cardAttr3}
              onChange={onInputChange}
              min="0"
              max={MAX_INDIVIDUAL_ATTR}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm text-white font-mono text-center focus:ring-1 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {(isExceededTotal || isAnyAttrInvalid) && (
          <div className="flex items-center gap-1.5 text-[11px] text-rose-400 font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Máximo de 90 por atributo e total somado não pode passar de 210.</span>
          </div>
        )}
      </div>

      {/* Raridade */}
      <div>
        <label htmlFor="raridade" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Raridade
        </label>
        <select
          name="cardRare"
          id="raridade"
          data-testid="rare-input"
          value={cardRare}
          onChange={onInputChange}
          className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all cursor-pointer"
        >
          <option value="normal" className="bg-slate-900 text-white">Normal</option>
          <option value="raro" className="bg-slate-900 text-cyan-300">Raro</option>
          <option value="muito raro" className="bg-slate-900 text-purple-300">Muito raro</option>
        </select>
      </div>

      {/* Super Trunfo Checkbox ou Aviso */}
      <div className="pt-1">
        {hasTrunfo ? (
          <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-950/30 border border-amber-900/50 p-2.5 rounded-xl">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Você já tem um Super Trunfo em seu baralho.</span>
          </div>
        ) : (
          <label
            htmlFor="trunfo"
            className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/40 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all group"
          >
            <input
              type="checkbox"
              name="cardTrunfo"
              id="trunfo"
              data-testid="trunfo-input"
              checked={cardTrunfo}
              onChange={onInputChange}
              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-400 cursor-pointer"
            />
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 group-hover:text-amber-300 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Super Trunfo (Carta Lendária)
            </div>
          </label>
        )}
      </div>

      {/* Botão de Salvar */}
      <button
        type="button"
        data-testid="save-button"
        disabled={isSaveButtonDisabled}
        onClick={onSaveButtonClick}
        className={`w-full py-2.5 px-4 rounded-xl font-display font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 ${
          isSaveButtonDisabled
            ? 'bg-slate-800/60 text-slate-500 cursor-not-allowed border border-slate-800'
            : 'bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-glow-cyan active:scale-[0.99] cursor-pointer'
        }`}
      >
        Salvar Carta no Baralho
      </button>
    </form>
  );
};

export default Form;
