import { Route, Routes } from "react-router-dom"
import StartGame from "./componets/StartGame"
import Winner from "./componets/Winner"
import GameOver from "./componets/GameOver"
import Game from "./componets/Game"
import { Provider } from "./componets/context/Context"

const App = () => {

	return (

		<Provider>
			<Routes>
				<Route path="/" element={<StartGame />}></Route>
				<Route path="/start" element={<StartGame />}></Route>
				<Route path="/game" element={<Game />}></Route>
				<Route path="/youwon" element={<Winner />}></Route>
				<Route path="/youlost" element={<GameOver />}></Route>
			</Routes>
		</Provider>
	)
}

export default App