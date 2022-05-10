import {flagResetLimits} from "./DroneData";


export enum DataMode {
	PLAIN, RECORDING, READING_FROM_FILE
}

let currentMode: DataMode = DataMode.PLAIN;


export function setCurrentMode (newMode: DataMode) {
	currentMode = newMode;
	flagResetLimits();
}

export function getCurrentMode (): DataMode {
	return currentMode;
}


