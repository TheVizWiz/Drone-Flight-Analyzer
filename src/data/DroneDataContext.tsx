import React from "react";
import {randFloat} from "three/src/math/MathUtils";


export const DroneDataContext = React.createContext(0);

export let DroneData = {
    time: [randFloat(90, 100)],
    pitch: [randFloat(90, 100)],
    roll: [randFloat(90, 100)],
    yaw: [randFloat(90, 100)],
    battery: [randFloat(90, 100)],
    network: [randFloat(90, 100)],
    radio: [randFloat(90, 100)],
    payload: [randFloat(90, 100)],
    state: [randFloat(90, 100)]
}

export type DroneDataUpdate = {
    time: number,
    pitch: number,
    roll: number,
    yaw: number,
    battery: number,
    network: number,
    radio: number,
    payload: number,
    state: number
}


export function updateData (data: DroneDataUpdate) {
    DroneData.time.push(data.time)
    DroneData.pitch.push(data.pitch)
    DroneData.roll.push(data.roll)
    DroneData.yaw.push(data.yaw)
    DroneData.battery.push(data.battery)
    DroneData.network.push(data.network)
    DroneData.radio.push(data.radio)
    DroneData.payload.push(data.payload)
    DroneData.state.push(data.state)


    if (DroneData.time.length <= 1000) {
        return;
    }

    DroneData.time.shift();
    DroneData.pitch.shift();
    DroneData.roll.shift();
    DroneData.yaw.shift();
    DroneData.battery.shift();
    DroneData.network.shift();
    DroneData.radio.shift();
    DroneData.payload.shift();
    DroneData.state.shift();

}




