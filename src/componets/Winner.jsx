import { useNavigate } from "react-router-dom";

function Winner() {


    const navigator = useNavigate();
    const goToTryAgain = () => {navigator('/game')}

    return (
        <>
            <section className="endContainer">
                <div className="info">
                    <h1 className="winner">Felicidades</h1>
                    <p>Demostraste tus habilidades, muy bien hecho</p>
                    <img src="media/winner.jpeg" alt="" /> <br />
                    <button className="btn win" onClick={goToTryAgain}>Otra vez</button>
                </div>
            </section>
        </>
    )
}

export default Winner