import { useEffect, useState } from "react"
import { questions } from "../information/defaultQuestions"
import { useNavigate } from "react-router-dom";
import { useProveider } from "./context/Context";

function Game() {

    // Para la navegacion
    const navigator = useNavigate();

    // Letras que el usuario tendra disponibles para completar la frase
    const lettersToChoose = "ABCDEFGHIJKLMNÑOPQRSTUVXYZ"
    // Con split estamos poninendo cada letra en una poscion de un array
    const ltcArray = lettersToChoose.split("");

    // Colores de los botones
    const buttonColors = [
        { backgroundColor: 'transparent' }, // dolor default
        { backgroundColor: '#3aab58', color: '#fff' }, //verde
        { backgroundColor: '#eb493b', color: '#fff' } // rojo
    ];

    // Estado random para escoger la pregunta
    const [randomQuestion, setRandomCuestion] = useState(0);

    // Estado para guardar la PALABRA letra por letra 
    const [word, setWord] = useState([]);

    // En este estado se guardaran las letras que vaya adivinando el jugador
    const [foundLetters, setFoundLetters] = useState([]);

    // Estado que almacena la respuesta correcta
    const [rightAnswer, setRightAnswer] = useState([]);

    // Estado que almacena las respuestas incorrectas
    const [wrongAnswer, setWrongAnswer] = useState([]);

    // Estado que controla la imagen del ahorcado
    const [image, setImage] = useState(1);

    // Estado don de se guardara la palabra ganadora
    const { setWinnerWord } = useProveider();


    // Cuando oprima una letra
    const btnClicked = (e) => {

        const letter = e.target.innerHTML; // se accede al texto del boton
        setFoundLetters([...foundLetters, (letter)]) // Le agrega LETRA al array de letras

        // Buscamos la letra pulsada dentro de la respuesta correcta
        if (word.indexOf(letter) >= 0) {
            // Si encuentra la letra, la agrega al array de respuestas correctas
            setRightAnswer([...rightAnswer, (letter)])
        } else {
            // sino encuentra la letra de la palabra, se añade al de respuestas incorrectas
            setWrongAnswer([...wrongAnswer, (letter)])
            setImage(image + 1)
            if (image > 5) {
                navigator('/youlost')
            }
        }
    }

    // UseEffect para que solo sea una vez el numero random
    useEffect(() => {
        setRandomCuestion(Math.floor(Math.random() * questions.length))
        console.log("PEPE " + randomQuestion)
    }, [])


    // const { setWinnerWord } = useProveider();

    useEffect(() => {
        // En el estado 'word' se guarda la respuesta
        setWord(questions[randomQuestion].answer.split("")) //el split guarda letra por letra en las posiciones de un array                
    }, [randomQuestion]) // Se ejecuta este useEffect cuando el numero random tenga un valor


    // Asignamos la respuesta correcta a la palabra ganadora
    useEffect(() => {
        setWinnerWord(word);
    }, [word]);



    useEffect(() => {

        let notLetterFound = 0;

        // Recorremos la palabra correcta
        word.map(w => {
            // Si en las letras encontradas no se encuentra una letra de la correcta
            if (foundLetters.find(f => f === w) === undefined) {
                notLetterFound++;
            }
        })
        if (notLetterFound === 0 && rightAnswer.length > 0) {
            navigator('/youwon')
        }

    }, [rightAnswer]) // se ejecuta este useEffet cuando se modifique el valor del array de respuestas correctas


    return (
        <section className="main-container">

            <section className="cont-draw">

                <div className="question">
                    {/* Aca se mostrara la pregunta */}
                    {questions[randomQuestion].question}
                </div>
                <div className="images">                    
                    <img src={process.env.PUBLIC_URL + `/media/el_ahorcado${image}.png`} alt="Imagen" />
                </div>
            </section>

            <section className="cont-board">


                {ltcArray.map((letter) => (

                    // Si la letra esta dentro del array de respuestas correctas, color verde
                    (rightAnswer.find(e => e === letter)) ?

                        <button style={buttonColors[1]} key={letter}>{letter}</button>

                        :
                        // Sino, si la letra esta dentro del array de resupuestas equivocadas, sera de color rojo
                        (wrongAnswer.find(e => e === letter)) ?

                            <button style={buttonColors[2]} key={letter}>{letter}</button>
                            // Si la letra no esta ni el el array de 'correctas' ni 'incorrectas' entonces pues normal
                            :

                            <button style={buttonColors[0]} key={letter} onClick={btnClicked}>{letter}</button>
                ))}



            </section>

            <section className="cont-answer">
                <div className="word">

                    {/* Buscar dentro de las 'letras encontradas' la letra letra dada por el jugador */}
                    {word.map((letter, index) => (

                        // Si la letra NO esta en 
                        foundLetters.indexOf(letter) === -1 ?

                            <div className="palo" key={index}></div> :

                            <div className="palo" key={index}>

                                {/* Convertimos la letra a mayuscula */}
                                {letter.toUpperCase()}
                            </div>
                    ))}

                </div>

            </section>

        </section>
    )
}

export default Game