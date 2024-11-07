import { useNavigate } from "react-router-dom";
import { useProveider } from "./context/Context"

function GameOver() {

    const { winnerWord } = useProveider()
    const navigator = useNavigate();

    const goToTryAgain = () => {navigator('/game')}
    return (
        <>

            <section className="endContainer">
                <div className="info">

                    <h1 className="loser">GAME OVER </h1>
                    <p>Rayos viejo, no estaba tan dificil, buena suerte para la proxima :(</p>
                        <img src="media/loser.png" alt="" />
                    <h3>La respuesta correcta era {winnerWord}</h3>

                    <button className="btn" onClick={goToTryAgain}>Reintentar</button>

                </div>



            </section>


        </>
    )
}

export default GameOver