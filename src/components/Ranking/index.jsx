import './Ranking.css';

function Ranking({ isShowRanking, closeRanking, ranking }) {
    // Processa o ranking: ordena, remove zeros extras e limita a 8 valores
    const sortedRanking = Array.isArray(ranking)
        ? [...ranking]
            .map(Number)
            .sort((a, b) => b - a)
            .filter((value, index, self) => {
                return value !== 0 || self.indexOf(0) === index;
            })
            .slice(0, 8)
        : [];

    return (
        <div className={`modal-ranking ${isShowRanking ? "show" : ""}`}>
            <div className='header-ranking'>
                <h2 className='title-ranking'>Ranking de pontos!</h2>
                <button className='close-ranking' onClick={closeRanking}>
                    <img src='src/assets/delete-sign.png' alt="Fechar" />
                </button>
            </div>
            <div className='ranking'>
                {sortedRanking.map((rank, index) => (
                    <div key={index} className="ranking-item">
                        <label className="ranking-position">{index + 1}#</label>
                        <label className="ranking-score">{rank}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Ranking;
