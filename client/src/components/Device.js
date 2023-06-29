import React from "react";

function Device({device, deviceFocusSelector}) {

    return(
        <div className="device-card">
            <h2>{device.name}</h2>
            <img onClick={deviceFocusSelector} src={device.image} alt={device.id} />
            <p>{device.type}</p>
        </div>
    )
}

export default Device