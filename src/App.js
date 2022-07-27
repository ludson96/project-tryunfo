import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cardName: '',
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
    };

    this.handleChangeGeneric = this.handleChangeGeneric.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
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

  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardImage,
      cardRare, cardTrunfo, isSaveButtonDisabled, saveArray, hasTrunfo } = this.state;

    const teste = saveArray.map((e) => (<Card
      key={ e.cadName }
      cardName={ e.cardName }
      cardDescription={ e.cardDescription }
      cardImage={ e.cardImage }
      cardAttr1={ e.cardAttr1 }
      cardAttr2={ e.cardAttr2 }
      cardAttr3={ e.cardAttr3 }
      cardRare={ e.cardRare }
      cardTrunfo={ e.cardTrunfo }
    />
    ));

    return (
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
        <p>{ teste }</p>
      </div>
    );
  }
}

export default App;
