import React, { useEffect, useState } from "react";
import DeviceFocusCard from "./DeviceFocusCard";

function DeviceFocus({focusDevice}) {

    const [selectedDevice, setSelectedDevice] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:7000/devices/${focusDevice}`)
        .then(res => res.json())
        .then(selectedDevice => setSelectedDevice(selectedDevice))
      }, [])

    if(!selectedDevice.games){
        return(
            <h1>Loading...</h1>
        )
    }

    const focusCard = selectedDevice.games.map(game => {
        return <DeviceFocusCard key={game.id} game={game}/>
    })

    return(
        <div className="device-focus-page">
            <h2>{selectedDevice.name}</h2>
            <img src={selectedDevice.image} alt="Hi" />
            <h2>These games are available:</h2>
            {focusCard}
        </div>
    )
}

export default DeviceFocus