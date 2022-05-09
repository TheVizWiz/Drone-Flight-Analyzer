import {DroneData, resetData, updateData} from "./DroneData";
import {DataMode, getCurrentMode, setCurrentMode} from "./DataMode";
import {useContext} from "react";

export {}


export function parseInputCSV (text: string) {
	text = text.replace(" ", "");
	setCurrentMode(DataMode.READING_FROM_FILE);
	resetData();
	readDataFromCSV(text);
}

function readDataFromCSV (text: string) {
	resetData();
	let dataByRow = text.split("\n");
	dataByRow.shift()
	for (let i = 0; i < dataByRow.length; i++) {
		let row = dataByRow[i]
		let data = row.split(",");
		let floatData = data.map((i) => parseFloat(i.trim()));
		updateData({
			battery: floatData[0],
			network: floatData[1],
			payload: floatData[2],
			pitch: floatData[3],
			radio: floatData[4],
			roll: floatData[5],
			state: floatData[6],
			time: floatData[7],
			yaw: floatData[8]
		})
	}

}

