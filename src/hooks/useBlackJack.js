import { useState, useEffect } from 'react';

function useBlackJack() {
    const [deckId, setDeckId] = useState(null);

    useEffect(() => {
        fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            .then(resp => resp.json())
            .then(data => {
                console.log("Deck Criado: ", data);
                setDeckId(data.deck_id);
            })
            .catch(err => console.error("Erro ao buscar baralho:", err));
    }, []); 
    return deckId;
}

export default useBlackJack;


