import {checkDataLength, DroneData, DroneDataUpdate, UPDATE_TIME, updateData} from "./DroneData";
import {Simulate} from "react-dom/test-utils";


export let isConnected: boolean = false;


let hasUpdate: boolean = false;
let gateway;
let socket: WebSocket;
let receivedData: DroneDataUpdate;
let isConnecting: boolean = false;

export function reconnect () {
	if (isConnecting) return;
	try {
		gateway = 'ws://192.168.4.1/ws';
		socket = new WebSocket(gateway);
		socket.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);
				receivedData = {
					battery: 0,
					network: 0,
					payload: 0,
					pitch: 0,
					radio: 0,
					roll: data.roll,
					state: 0,
					time: Date.now() / 1000 - DroneData.startTime,
					yaw: 0,
				};
				hasUpdate = true;
			} catch (e) {
				console.log(`error: ${e}`);
			}
		};

		isConnecting = true;
		socket.onopen = () => {
			isConnected = true;
			isConnecting = false;
		}

		socket.onclose = () => {
			isConnecting = false;
			isConnected = false;
		}
		socket.onerror = () => {
			isConnecting = false;
			isConnected = false;
		};
	} catch (e) {
		console.log('error');
	}
}

export function updateDataFromNetwork () {
	if (hasUpdate) {
		receivedData.time = Date.now() / 1000 - DroneData.startTime;
		updateData(receivedData);
	} else {
		updateData({
			battery: DroneData.battery.slice(-1)[0],
			network: DroneData.network.slice(-1)[0],
			payload: DroneData.payload.slice(-1)[0],
			pitch: DroneData.pitch.slice(-1)[0],
			radio: DroneData.radio.slice(-1)[0],
			roll: DroneData.roll.slice(-1)[0],
			state: DroneData.state.slice(-1)[0],
			time: Date.now() / 1000 - DroneData.startTime,
			yaw: DroneData.yaw.slice(-1)[0],
		});
	}

	checkDataLength();
	hasUpdate = false;
}

export function resetNetworkConnection () {
	isConnected = false;
	isConnecting = false;
	reconnect();
}
