import React, { useEffect, useState } from "react";

function GameFocus({focusGame}) {

    const [selectedGame, setSelectedGame] = useState([])
    const [gameDevices, setGameDevices] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:7000/games/${focusGame}`)
        .then(res => res.json())
        .then(selectedGame => setSelectedGame(selectedGame), setGameDevices(selectedGame.devices))
    }, [])

    if(!selectedGame.devices){
        return(
            <h1>Loading...</h1>
        )
    }

    const devices = selectedGame.devices.map(device => {
        return (
            <div className="device-focus-card">
                <img src={device.image} alt={device.id} />
                <p>{device.name}</p>
            </div>
        )
    })

    console.log(selectedGame.devices)

    return(
        <div className="game-focus">
            <h2>{selectedGame.name}</h2>
            <img className="game-focus-img" src={selectedGame.image} alt="hi" />
            <p>{selectedGame.description}</p>
            <p>Players: {selectedGame.number_of_players}</p>
            <h2>Developers:</h2>
            <div className="device-focus-card">
                <img src={selectedGame.developers[0].logo}/>
                <p>{selectedGame.developers[0].name}</p>
            </div>
            <h2>This game is available on:</h2>
            {devices}
        </div>
    )
}

export default GameFocus