<div align="center">
  <h1>🎴 TRYUNFO 2.0</h1>
  <p><strong>Deck Builder & Super Trunfo Battle Arena</strong></p>
  <p>Aplicação moderna desenvolvida em React, TypeScript, Tailwind CSS e Zustand para criação de cartas colecionáveis e duelos estratégicos contra a CPU.</p>

  <p>
    <a href="#-funcionalidades-em-destaque">Funcionalidades</a> •
    <a href="#-tecnologias-utilizadas">Tecnologias</a> •
    <a href="#-arquitetura-e-padroes">Arquitetura</a> •
    <a href="#-como-executar-o-projeto">Como Executar</a> •
    <a href="#-testes-automatizados">Testes</a>
  </p>
</div>

---

## 🚀 Funcionalidades em Destaque

### 🎨 1. Criador de Cartas (Deck Builder)
- **Validação de Atributos em Tempo Real**: Sistema de pontuação balanceado (máximo de 90 por atributo e teto somado de 210 pontos).
- **Controle de Super Trunfo**: Regra que assegura apenas 1 carta lendária "Super Trunfo" por baralho.
- **Preview Dinâmico**: Renderização instantânea da carta com estilos diferenciados por raridade (*Normal*, *Raro*, *Muito Raro*).
- **Efeitos Holográficos (Card Foil)**: Animação e brilho neon para cartas com Super Trunfo ativado.

### ⚔️ 2. Arena de Duelo (Modo Batalha PvCPU)
- **Embaralhamento e Divisão**: O baralho é distribuído igualmente entre o Jogador e a CPU.
- **Duelos por Atributo**: O jogador escolhe o atributo (Ataque, Defesa ou Velocidade) da sua carta da rodada contra a carta oculta do oponente.
- **Regra Clássica de Trunfo**: Cartas Super Trunfo derrotam qualquer carta comum.
- **Placar Interativo & Vitória**: Registro de pontuação rodada a rodada e celebração com confetes dinâmicos em caso de vitória.

### 📦 3. Persistência & Baralho Inicial
- **Sincronização com LocalStorage**: Todas as cartas criadas ou excluídas são salvas automaticamente no navegador via middleware do Zustand.
- **Deck Inicial Pré-Carregado**: O projeto já inicia com 6 cartas balanceadas prontas para demonstração e jogo imediato.
- **Filtros Avançados**: Busca combinada por nome, filtro por raridade e alternador para cartas Super Trunfo.

---

## 🛠️ Tecnologias Utilizadas

- **Core**: [React 18](https://react.dev/) com Functional Components e Hooks.
- **Linguagem**: [TypeScript 5](https://www.typescriptlang.org/) com tipagem estrita para todas as entidades e stores.
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) com paleta cyberpunk/dark mode, efeitos glassmorphism e animações personalizadas.
- **Gerenciamento de Estado**: [Zustand](https://zustand-demo.pmnd.rs/) com persistência automática no `localStorage`.
- **Tooling & Build**: [Vite 6](https://vitejs.dev/) para compilação ultrarrápida.
- **Testes Automatizados**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) com cobertura para stores e componentes.
- **Ícones**: [Lucide React](https://lucide.dev/).
- **Efeitos Visuais**: [Canvas Confetti](https://github.com/catdad/canvas-confetti).

---

## 🏛️ Arquitetura e Padrões

```text
src/
├── components/
│   ├── __tests__/          # Testes unitários de componentes
│   ├── BattleArena.tsx      # Arena interativa de combate contra CPU
│   ├── Card.tsx             # Card com efeitos de borda, badges e progress bars
│   ├── DeckCollection.tsx   # Grid responsivo e barra de filtros
│   ├── Form.tsx             # Formulário reativo com cálculo de pontos
│   └── Navbar.tsx           # Navegação principal e alternância de abas
├── data/
│   └── defaultDeck.ts       # Cartas padrão balanceadas
├── store/
│   ├── __tests__/          # Testes unitários dos stores Zustand
│   ├── useBattleStore.ts    # Máquina de estados do combate
│   └── useDeckStore.ts      # Store central de cartas com persistência
├── test/
│   └── setup.ts             # Configuração do Vitest e Jest DOM
├── types/
│   └── card.ts              # Definições de tipos e interfaces TypeScript
├── App.tsx                  # Componente raiz da aplicação
├── index.css                # Diretivas Tailwind e estilizações holográficas
└── index.tsx                # Ponto de entrada React 18
```

---

## 💻 Como Executar o Projeto

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/project-tryunfo.git

# 2. Acesse a pasta do projeto
cd project-tryunfo

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Abra `http://localhost:5173` no seu navegador.

---

## 🧪 Testes Automatizados

O projeto conta com suite de testes usando **Vitest** e **React Testing Library**:

```bash
# Executar todos os testes
npm run test

# Executar testes em modo watch
npm run test:watch
```

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).
