import { createContext, useContext, useState } from "react";

const Context = createContext();

export const Provider = ({ children }) => {

    // Estado para guardar la palabra correcta y mostrarla desde cualquier lado 
    const [winnerWord, setWinnerWord] = useState("");


    return (
        <Context.Provider value={{ winnerWord, setWinnerWord }}>
            {children}
        </Context.Provider>
    )

}

export const useProveider = () => useContext(Context)

