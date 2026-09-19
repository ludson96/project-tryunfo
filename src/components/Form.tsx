import React from 'react';
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
      className="space-y-6"
    >
      <div className="border-b border-[rgba(144,144,144,0.25)] pb-3">
        <h3 className="text-sm font-heading font-bold uppercase tracking-widestHeader text-black">
          Configuração da Carta
        </h3>
        <p className="text-xs text-[#666666] mt-1">
          Preencha os campos abaixo de acordo com as especificações do baralho.
        </p>
      </div>

      {/* Nome */}
      <div>
        <label htmlFor="nome" className="block text-xs font-heading font-bold uppercase tracking-widestHeader text-black mb-2">
          Nome da Carta
        </label>
        <input
          type="text"
          name="cardName"
          id="nome"
          data-testid="name-input"
          value={cardName}
          onChange={onInputChange}
          placeholder="Ex: Explorador Solitário"
          className="input-paradigm"
        />
      </div>

      {/* Descrição */}
      <div>
        <label htmlFor="descricao" className="block text-xs font-heading font-bold uppercase tracking-widestHeader text-black mb-2">
          Descrição & Biografia
        </label>
        <textarea
          name="cardDescription"
          id="descricao"
          data-testid="description-input"
          value={cardDescription}
          onChange={onInputChange}
          rows={3}
          placeholder="Breve contextualização narrativa sobre a carta..."
          className="textarea-paradigm"
        />
      </div>

      {/* URL da Imagem */}
      <div>
        <label htmlFor="img" className="block text-xs font-heading font-bold uppercase tracking-widestHeader text-black mb-2">
          URL da Fotografia / Ilustração
        </label>
        <input
          type="text"
          name="cardImage"
          id="img"
          data-testid="image-input"
          value={cardImage}
          onChange={onInputChange}
          placeholder="https://exemplo.com/foto.jpg"
          className="input-paradigm"
        />
      </div>

      {/* Atributos Numéricos */}
      <div className="border border-[rgba(144,144,144,0.25)] rounded p-4 bg-[#fafafa]">
        <div className="flex items-center justify-between border-b border-[rgba(144,144,144,0.25)] pb-2 mb-4">
          <span className="text-xs font-heading font-bold uppercase tracking-widestHeader text-black">
            Distribuição de Atributos
          </span>
          <span
            className={`text-xs font-heading font-bold uppercase tracking-widestHeader ${
              isExceededTotal
                ? 'text-red-700'
                : remainingPoints === 0
                ? 'text-neutral-900 font-black'
                : 'text-neutral-600'
            }`}
          >
            {remainingPoints >= 0 ? `${remainingPoints} pts restantes` : `Excedeu ${Math.abs(remainingPoints)} pts`}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="cardAttr1" className="block text-[11px] font-heading font-semibold uppercase tracking-wider text-neutral-600 mb-1">
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
              className="input-paradigm text-center font-bold"
            />
          </div>

          <div>
            <label htmlFor="cardAttr2" className="block text-[11px] font-heading font-semibold uppercase tracking-wider text-neutral-600 mb-1">
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
              className="input-paradigm text-center font-bold"
            />
          </div>

          <div>
            <label htmlFor="cardAttr3" className="block text-[11px] font-heading font-semibold uppercase tracking-wider text-neutral-600 mb-1">
              3. Agilidade (0-{MAX_INDIVIDUAL_ATTR})
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
              className="input-paradigm text-center font-bold"
            />
          </div>
        </div>

        {(isExceededTotal || isAnyAttrInvalid) && (
          <p className="text-[11px] text-red-600 font-medium mt-3">
            * O valor individual não pode superar 90 e a soma de todos os atributos não pode ultrapassar 210.
          </p>
        )}
      </div>

      {/* Raridade */}
      <div>
        <label htmlFor="raridade" className="block text-xs font-heading font-bold uppercase tracking-widestHeader text-black mb-2">
          Classificação de Raridade
        </label>
        <select
          name="cardRare"
          id="raridade"
          data-testid="rare-input"
          value={cardRare}
          onChange={onInputChange}
          className="input-paradigm cursor-pointer"
        >
          <option value="normal">Edição Normal</option>
          <option value="raro">Edição Rara</option>
          <option value="muito raro">Edição Lendária</option>
        </select>
      </div>

      {/* Super Trunfo */}
      <div>
        {hasTrunfo ? (
          <div className="p-3 border border-[rgba(144,144,144,0.25)] rounded bg-[#fafafa] text-xs text-neutral-600">
            Você já tem um Super Trunfo em seu baralho.
          </div>
        ) : (
          <label
            htmlFor="trunfo"
            className="flex items-center gap-3 p-3 border border-[rgba(144,144,144,0.25)] rounded hover:border-black cursor-pointer transition-colors bg-white"
          >
            <input
              type="checkbox"
              name="cardTrunfo"
              id="trunfo"
              data-testid="trunfo-input"
              checked={cardTrunfo}
              onChange={onInputChange}
              className="w-4 h-4 rounded border-neutral-400 text-black focus:ring-black cursor-pointer"
            />
            <span className="text-xs font-heading font-bold uppercase tracking-widestHeader text-black">
              Definir como Super Trunfo
            </span>
          </label>
        )}
      </div>

      {/* Botão de Salvar */}
      <div className="pt-2">
        <button
          type="button"
          data-testid="save-button"
          disabled={isSaveButtonDisabled}
          onClick={onSaveButtonClick}
          className="btn-paradigm primary w-full"
        >
          Salvar no Baralho
        </button>
      </div>
    </form>
  );
};

export default Form;
