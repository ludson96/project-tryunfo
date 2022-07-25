import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <form action="">

        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            id="nome"
            data-testid="name-input"
          />
        </label>

        <textarea data-testid="description-input" />

        <label htmlFor="atributo">
          Primeiro atributo:
          <input type="number" data-testid="attr1-input" name="" id="atributo" />
        </label>

        <label htmlFor="atributo">
          Segundo atributo:
          <input type="number" data-testid="attr2-input" name="" id="atributo" />
        </label>

        <label htmlFor="atributo">
          Terceiro atributo:
          <input type="number" data-testid="attr3-input" name="" id="atributo" />
        </label>

        <label htmlFor="img">
          <input type="text" data-testid="image-input" id="img" />
        </label>

        <label htmlFor="raridade">
          Raridade:
          <select id="raridade" data-testid="rare-input">
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito raro</option>
          </select>
        </label>

        <label htmlFor="trunfo">
          Super Trunfo:
          <input type="checkbox" data-testid="trunfo-input" id="trunfo" />
        </label>

        <button type="button" data-testid="save-button">Salvar</button>
      </form>
    );
  }
}

export default Form;
