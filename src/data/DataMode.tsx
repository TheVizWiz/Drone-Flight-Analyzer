

export enum DataMode {
	PLAIN, RECORDING, READING_FROM_FILE
}

let currentMode : DataMode = DataMode.PLAIN;


export function setCurrentMode (mode: DataMode) {
	currentMode = mode;
}

export function getCurrentMode (): DataMode {
	return currentMode;
}


