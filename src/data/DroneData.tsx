import React from "react";
import {saveAs} from 'file-saver';
import {DataMode, setCurrentMode} from "./DataMode";


export const DroneDataContext = React.createContext(0);
export const UPDATE_TIME_TO_KEEP = 20; // seconds
export const NUM_UPDATES_PER_SECOND = 30;
export const NUM_UPDATES_TO_KEEP = UPDATE_TIME_TO_KEEP * NUM_UPDATES_PER_SECOND;
export const UPDATE_TIME = 1000 / NUM_UPDATES_PER_SECOND;

export let isRecording: boolean = false;
export let recordButton: string = "record-icon.png";
let currentRecording = "";

export const DroneData = {
	battery: [0],
	network: [0],
	payload: [0],
	pitch: [0],
	radio: [0],
	roll: [0],
	state: [0],
	time: [0],
	yaw: [0],
	startTime: Date.now() / 1000
};

export const BATTERY = 0, NETWORK = 1, PAYLOAD = 2, PITCH = 3, RADIO = 4, ROLL = 5, STATE = 6, TIME = 7, YAW = 8;

export type DroneDataUpdate = {
	battery: number,
	network: number,
	payload: number,
	pitch: number,
	radio: number,
	roll: number,
	state: number,
	time: number,
	yaw: number
};


export function updateData (data: DroneDataUpdate) {
	DroneData.time.push(data.time);
	DroneData.pitch.push(data.pitch);
	DroneData.roll.push(data.roll);
	DroneData.yaw.push(data.yaw);
	DroneData.battery.push(data.battery);
	DroneData.network.push(data.network);
	DroneData.radio.push(data.radio);
	DroneData.payload.push(data.payload);
	DroneData.state.push(data.state);

	if (isRecording) {
		let recordedData = [
			data.battery,
			data.network,
			data.payload,
			data.pitch,
			data.radio,
			data.roll,
			data.state,
			data.time,
			data.yaw
		];
		currentRecording += "\n" + dataToCSV(recordedData);
	}
}

export function startRecording () {
	resetData();
	setCurrentMode(DataMode.RECORDING);
	currentRecording = "";
	isRecording = true;
	recordButton = "stop-icon.png";
	let keys = Object.keys(DroneData);
	keys.pop();
	currentRecording += dataToCSV(keys);
}

export function stopRecording () {
	setCurrentMode(DataMode.PLAIN);
	let blob = new Blob([currentRecording], {type: "text/plain;charset=utf-8"});
	saveAs(blob, getFileName());
	isRecording = false;
	recordButton = "record-icon.png";
}

export function resetData () {

	for (let key in DroneData) {
		// @ts-ignore
		DroneData[key] = [0];
	}
	DroneData.startTime = Date.now() / 1000;

}

export function checkDataLength () {
	if (DroneData.time.length <= NUM_UPDATES_TO_KEEP) return;
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


function dataToCSV (input: Array<any>): string {
	let s = "";
	input.forEach((i) => s = s + i + ", ");
	return s.substring(0, s.length - 2);
}

function getFileName (): string {
	let d = Date.now();
	let ye = new Intl.DateTimeFormat("en", {year: "numeric"}).format(d);
	let mo = new Intl.DateTimeFormat("en", {month: "2-digit"}).format(d);
	let da = new Intl.DateTimeFormat("en", {day: "2-digit"}).format(d);
	let ho = new Intl.DateTimeFormat("en", {hour: "2-digit", hour12: false}).format(d);
	let min = new Intl.DateTimeFormat("en", {minute: "2-digit"}).format(d);
	let sec = new Intl.DateTimeFormat("en", {second: "2-digit"}).format(d);

	return `DroneData-${ye}-${mo}-${da}-${ho}-${min}-${sec}.csv`;
}
