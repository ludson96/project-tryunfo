import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();

    this.state = { cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      saveArray: [],
      hasTrunfo: false,
      filterName: '',
      filterRaridade: 'todas',
    };

    this.handleChangeGeneric = this.handleChangeGeneric.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.handleDeleteCard = this.handleDeleteCard.bind(this);
  }

  handleChangeGeneric({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(({ [name]: value }), this.handleDisabled);
  }

  handleDisabled() {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;

    const soma = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
    const limite = 210;
    const max = 90;
    const negativo = 0;
    if (cardName && cardDescription && cardImage
        && cardRare && soma <= limite && Number(cardAttr1) <= max
        && Number(cardAttr2) <= max && Number(cardAttr3) <= max
        && Number(cardAttr1) >= negativo && Number(cardAttr2) >= negativo
        && Number(cardAttr3) >= negativo) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  handleSaveButton() {
    this.setState((prevState) => {
      const {
        cardName,
        cardDescription,
        cardImage,
        cardRare,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardTrunfo,
      } = this.state;

      const meuObjeto = {
        cardName,
        cardDescription,
        cardImage,
        cardRare,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardTrunfo,
      };

      if (cardTrunfo) {
        this.setState({ hasTrunfo: true });
      } else {
        this.setState({ hasTrunfo: false });
      }

      return {
        saveArray: [...prevState.saveArray, meuObjeto],
      };
    });

    this.setState({
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardRare: 'normal',
    });
  }

  handleDeleteCard({ target }) {
    const {
      cardTrunfo,
    } = this.state;

    target.parentNode.remove();

    if (cardTrunfo) {
      this.setState({ hasTrunfo: false });
    }
  }

  handleFilterName = ({ target }) => this.setState({ filterName: target.value });

  handleFilterRaridade = ({ target }) => this.setState({ filterRaridade: target.value });

  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardImage,
      cardRare, cardTrunfo, isSaveButtonDisabled, saveArray, hasTrunfo,
      filterName, filterRaridade } = this.state;

    const arrayFilterName = saveArray.filter((e) => {
      let retornoName = '';
      if ((e.cardRare === filterRaridade || filterRaridade === 'todas')
      && e.cardName.includes(filterName)) {
        retornoName = e;
      }
      return retornoName;
    });

    const button = (
      <button
        type="button"
        data-testid="delete-button"
        onClick={ this.handleDeleteCard }
      >
        Excluir

      </button>
    );

    const teste = arrayFilterName.map((e) => (<Card
      key={ e.cadName }
      cardName={ e.cardName }
      cardDescription={ e.cardDescription }
      cardImage={ e.cardImage }
      cardAttr1={ e.cardAttr1 }
      cardAttr2={ e.cardAttr2 }
      cardAttr3={ e.cardAttr3 }
      cardRare={ e.cardRare }
      cardTrunfo={ e.cardTrunfo }
      button={ button }
    />
    ));

    return (
      <main>
        <div>
          <h1>Tryunfo</h1>
          <Form
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            isSaveButtonDisabled={ isSaveButtonDisabled }
            onInputChange={ this.handleChangeGeneric }
            onSaveButtonClick={ this.handleSaveButton }
            hasTrunfo={ hasTrunfo }
          />
          <Card
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardImage={ cardImage }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
          />
          <div>{ teste }</div>
        </div>
        <div>
          <label htmlFor="filterName">
            Filtro de busca
            <input
              type="text"
              name="filterName"
              data-testid="name-filter"
              placeholder="Nome da carta"
              onChange={ this.handleFilterName }
            />
            <select
              name="filterRare"
              data-testid="rare-filter"
              onChange={ this.handleFilterRaridade }
            >
              <option value="todas">Todas</option>
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito raro</option>
            </select>
          </label>
        </div>
      </main>
    );
  }
}

export default App;
