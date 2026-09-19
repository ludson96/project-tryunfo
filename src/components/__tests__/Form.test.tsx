import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Form from '../Form';

describe('Componente Form', () => {
  const defaultProps = {
    cardName: 'Guerreiro Teste',
    cardDescription: 'Descrição de teste',
    cardAttr1: '50',
    cardAttr2: '50',
    cardAttr3: '50',
    cardImage: 'https://exemplo.com/foto.jpg',
    cardRare: 'normal',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: false,
    onInputChange: vi.fn(),
    onSaveButtonClick: vi.fn(),
  };

  it('deve renderizar todos os campos com data-testid corretos para compatibilidade', () => {
    render(<Form {...defaultProps} />);

    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('description-input')).toBeInTheDocument();
    expect(screen.getByTestId('attr1-input')).toBeInTheDocument();
    expect(screen.getByTestId('attr2-input')).toBeInTheDocument();
    expect(screen.getByTestId('attr3-input')).toBeInTheDocument();
    expect(screen.getByTestId('image-input')).toBeInTheDocument();
    expect(screen.getByTestId('rare-input')).toBeInTheDocument();
    expect(screen.getByTestId('save-button')).toBeInTheDocument();
  });

  it('deve desabilitar o botão de salvar quando isSaveButtonDisabled for true', () => {
    render(<Form {...defaultProps} isSaveButtonDisabled={true} />);
    const button = screen.getByTestId('save-button');
    expect(button).toBeDisabled();
  });

  it('deve exibir mensagem avisando que já existe um Super Trunfo no baralho', () => {
    render(<Form {...defaultProps} hasTrunfo={true} />);
    expect(screen.getByText('Você já tem um Super Trunfo em seu baralho.')).toBeInTheDocument();
    expect(screen.queryByTestId('trunfo-input')).not.toBeInTheDocument();
  });
});
