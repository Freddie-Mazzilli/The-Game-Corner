import React, {useEffect, useState} from "react";
import Device from "./Device";

function ManufacturerFocus({focusManufacturer, deviceFocusSelector}) {

    const [filteredDevices, setFilteredDevices] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:7000/devices')
        .then(res => res.json())
        .then(allDevices => {
            let filteredDevices = []
            for (let i = 0; i < allDevices.length; i++) {
                let device = allDevices[i]
                if (device.manufacturer === focusManufacturer) {
                    filteredDevices.push(device)
                }
            }
            setFilteredDevices(filteredDevices)
        })
    }, [])

    const device = filteredDevices.map((device) => {
        return <Device key={device.id} device={device} deviceFocusSelector={deviceFocusSelector}/>
    })

    return(
        <div>
            <h2 className="manufacturer-title">Devices from: {focusManufacturer}</h2>
            <div className="device-grid">
                {device}
            </div>
        </div>
    )
}

export default ManufacturerFocus