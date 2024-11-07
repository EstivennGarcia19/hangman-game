import { useNavigate } from "react-router-dom"

function StartGame() {

    const navigator = useNavigate();

    const goToPlay = () => { navigator('/game') }

    return (
        <section className="welcome-to-play">
        <h1>BIENVENIDO</h1>
        <button className="btn" onClick={goToPlay}>Jugar</button>
        </section>
    )
}

export default StartGame