import React from "react";

function Relationship({relationship}) {

    return(
        <>
        <div className="device-card">
            <h2>{relationship.game.name}</h2>
            <img src={relationship.game.image} />
        </div>
        <div className="device-card">
            <h2>{relationship.device.name}</h2>
            <img src={relationship.device.image} />
        </div>
        </>
    )
}

export default Relationship