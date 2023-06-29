import React, { useEffect, useState } from "react";
import DeveloperFocusCard from "./DeveloperFocusCard";

function DeveloperFocus({focusDeveloper}) {

    const [selectedDeveloper, setSelectedDeveloper] = useState([])
    
    useEffect(() => {
        fetch(`http://127.0.0.1:7000/developers/${focusDeveloper}`)
        .then(res => res.json())
        .then(selectedDeveloper => setSelectedDeveloper(selectedDeveloper))
      }, [])

    if(!selectedDeveloper.games){
        return(
            <h1>Loading...</h1>
        )
    }

    const focusCard = selectedDeveloper.games.map(game => {
        return <DeveloperFocusCard game={game}/>
    })

    return(
        <div className="device-focus-page">
            <h2>{selectedDeveloper.name}</h2>
            <img src={selectedDeveloper.logo} alt="Hi" />
            <h2>Games by this developer:</h2>
            {focusCard}
        </div>
    )
}

export default DeveloperFocus