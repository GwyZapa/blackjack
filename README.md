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

