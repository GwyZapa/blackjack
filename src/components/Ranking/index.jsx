import './Ranking.css';

function Ranking({ isShowRanking, closeRanking, ranking }) {
    // Processa o ranking: ordena, remove zeros extras e limita a 8 valores
    const sortedRanking = Array.isArray(ranking)
        ? [...ranking]
            .map(Number) // Garante que todos são números
            .sort((a, b) => b - a) // Ordem decrescente
            .filter((value, index, self) => {
                // Mantém apenas UM único zero (se houver)
                return value !== 0 || self.indexOf(0) === index;
            })
            .slice(0, 8) // Limita para os 8 primeiros
        : [];

    return (
        <div className={`modal-ranking ${isShowRanking ? "show" : ""}`}>
            <button className='close-ranking' onClick={closeRanking}>
                <img src='src/assets/delete-sign.png' alt="Fechar" />
            </button>
            <div className='ranking'>
                {sortedRanking.map((rank, index) => (
                    <label key={index}>{rank}</label>
                ))}
            </div>
        </div>
    );
}

export default Ranking;
