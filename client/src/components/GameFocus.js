import React, { useEffect, useState } from "react";

function GameFocus({focusGame}) {

    const [selectedGame, setSelectedGame] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:7000/games/${focusGame}`)
        .then(res => res.json())
        .then(selectedGame => setSelectedGame(selectedGame))
    }, [])

    if(!selectedGame.devices){
        return(
            <h1>Loading...</h1>
        )
    }

    return(
        <div className="game-focus">
            <h2>{selectedGame.name}</h2>
            <img src={selectedGame.image} alt="hi" />
            <p>{selectedGame.description}</p>
            <h2>{selectedGame.devices.name}</h2>
        </div>
    )
}

export default GameFocus