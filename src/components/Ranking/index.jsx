import './Ranking.css'


function Ranking({ isShowRanking, closeRanking }) {


    return (

        <div className={`modal-ranking ${isShowRanking ? "show" : ""}`}>

            <button className='close-ranking' onClick={closeRanking}>
                <img src='src/assets/delete-sign.png'></img>
            </button>
            <div className='ranking'>
                <label className='top'></label>
            </div>
        </div>
    );

}

export default Ranking;