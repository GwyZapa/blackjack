# 🃏 Blackjack em React

Um projeto completo de **Blackjack (21)** desenvolvido com **React.js**, integrando chamadas à API externa [Deck of Cards API](https://deckofcardsapi.com/), lógica de jogo para o jogador e dealer, ranking com `localStorage` e uma interface moderna e responsiva.

---

## 🎮 Sobre o Jogo

Neste jogo, o jogador compete contra o **dealer**. O objetivo é chegar o mais próximo possível de 21 sem ultrapassar, enquanto o dealer segue regras automáticas (para ao atingir 17 ou mais pontos). O jogo é jogado por **10 rodadas**, ao final das quais o **ranking é exibido**.

---

## 🚀 Funcionalidades

- 🔁 Compra de cartas via **API externa**
- 🧠 Lógica automática do dealer (para com 17+)
- 🃏 Cálculo inteligente de ases (1 ou 11)
- 🧮 Pontuação dinâmica a cada rodada
- 💾 **Ranking com `localStorage`**
- 📊 Histórico de vitórias, derrotas e empates
- 🧼 Botão de reinício (visível ao fim da rodada)
- 🎯 Interface limpa, modular e intuitiva

---

## 🧠 O que eu aprendi com este projeto

Durante o desenvolvimento, aprendi e pratiquei:

- **Hooks do React**:
  - `useState` para controle de estados (pontuações, cartas, status)
  - `useEffect` para sincronizar efeitos colaterais
  - `useRef` para valores persistentes fora do fluxo de renderização

- **Hooks personalizados**:
  - `useBlackJack` → cria e controla o baralho
  - `useGetCard` → gerencia a lógica de compra de cartas

- **Manipulação de arrays**:
  - Soma de pontos com ases ajustáveis
  - Atualização do ranking
  - Contagem e reinício de rodadas

- **LocalStorage**:
  - Armazenamento e recuperação de dados persistentes
  - Exibição do ranking ao final de 10 rodadas

- **Componentização**:
  - Separação de responsabilidades por componente
  - Comunicação via props
  - Modularização dos estilos com `.css`

---

## 🧩 Estrutura de Componentes


src/
├── components/
│   ├── GameBoard/
│   │   ├── index.jsx            # Componente principal do tabuleiro (cartas do jogador e dealer)
│   │   └── Gameboard.css
│   │
│   ├── GameControls/
│   │   ├── index.jsx            # Botões e interações (comprar, parar, reiniciar)
│   │   └── GameControls.css
│   │
│   ├── Header/
│   │   ├── index.jsx            # Status do jogo, pontuação, botão de restart
│   │   └── Header.css
│   │
│   ├── PointArea/
│   │   ├── index.jsx            # Pontuação atual do jogador e do dealer
│   │   └── PointArea.css
│   │
│   └── Ranking/
│       ├── index.jsx            # Modal de ranking exibido pelo botão
│       └── Ranking.css
│
├── hooks/
│   ├── useBlackJack.js          # Hook que gera e retorna o deckId
│   └── useGetCard.js            # Hook que faz a compra de cartas via API
│
├── App.jsx                      # Componente principal que controla toda a lógica do jogo
├── index.jsx                    # Ponto de entrada da aplicação React
└── index.css                    # Estilos globais


---

## 🛠️ Tecnologias Utilizadas

- [React](https://reactjs.org/)
  - `useState`, `useEffect`, `useRef`
- Hooks personalizados
- [Deck of Cards API](https://deckofcardsapi.com/)
- `localStorage`
- CSS puro para estilos
- [Vite](https://vitejs.dev/) para build e dev server

---

## 💡 Melhorias Futuras

- 🕒 Adicionar **data e hora** no ranking
- 📱 Melhor responsividade para dispositivos móveis
- 🌐 Suporte a múltiplos idiomas (PT-BR/EN)
- 🧪 Adição de testes unitários

---

## 📸 Preview do Projeto

> *(Você pode adicionar uma captura de tela do jogo abaixo)*
>  
> `![preview](./src/assets/BLACKjacklogo.png)`

---

Feito com ❤️ por [Seu Nome]
