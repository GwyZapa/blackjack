import './Ranking.css'


function Ranking({ isShowRanking }) {


    return (

        <div className='modal-ranking'
            style={{ visibility: isShowRanking ? "visible" : "hidden" }}
        >
            <div className='ranking'>
                <label className='top'></label>
            </div>
        </div>
    );

}

export default Ranking;