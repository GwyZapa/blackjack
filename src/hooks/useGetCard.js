import { useState } from 'react';

function useGetCard(deckId) {
    const [cards, setCards] = useState([]); // Armazena todas as cartas puxadas

    const drawCard = () => {
        if (!deckId) return; // Garante que o deckId está disponível
        
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(resp => resp.json())
            .then(data => {
                if (data.success && data.cards.length > 0) {
                    const newCard = data.cards[0]; // Captura a carta puxada

                    // Verifica se a carta já foi puxada antes
                    const alreadyDrawn = cards.some(card => card.code === newCard.code);

                    if (!alreadyDrawn) {
                        setCards(prevCards => [...prevCards, newCard]); // Adiciona ao estado
                    } else {
                        console.warn("Carta já foi puxada! Tentando novamente...");
                        drawCard(); // Tenta puxar outra carta
                    }
                }
            })
            .catch(err => console.error("Erro ao pegar carta:", err));
    };

    return { cards, drawCard }; // Retorna o array de cartas e a função de puxar carta
}

export default useGetCard;
