import React, {ReactElement, useEffect, useState} from "react";
import 'scss/Variables.scss';
import {dataLimits, DroneData, DroneDataContext, needToResetLimits, resetLimits, UPDATE_TIME,} from './data/DroneData';
import OverviewPage from "./pages/OverviewPage/OverviewPage";
import GraphPage from "./pages/GraphPage/GraphPage";
import NetworkPage from "./pages/NetworkPage/NetworkPage";
import GPSPage from "./pages/GPSPage/GPSPage";
import TopBar from "./topBar/TopBar";
import {isConnected, reconnect, updateDataFromNetwork} from "./data/NetworkController";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import {DataMode, getCurrentMode} from "./data/DataMode";
import {Box, Slider} from "@mui/material";


export default function App (): ReactElement {

	let [settingsIsShown, setSettingsVisibility] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const pageNumbers = [0, 1, 2, 3, 4];
	const pageHeaders = [
		'Overview',
		'Graphs',
		'Network Diagnostics',
		'GPS Tracking (beta)',
	];
	const pages = [<OverviewPage/>, <GraphPage/>, <NetworkPage/>, <GPSPage/>];

	const [count, setCount] = useState(0);

	if (!isConnected) {
		reconnect();
	}


	useEffect(() => {
		setInterval(() => {
			if (getCurrentMode() === DataMode.PLAIN || getCurrentMode() === DataMode.RECORDING)
				updateDataFromNetwork();
			// else
			// 	console.log(DroneData);
			setCount(count => count + 1);
		}, UPDATE_TIME);
	}, []);

	const [value, setValue] = useState<number[]>([0, 1.0]);

	const handleChange = (event: Event, newValue: number | number[]) => {
		setValue(newValue as number[]);
	};

	if (needToResetLimits()) {
		setValue([0, 1]);
		resetLimits();
	}

	let timeLimitSliders =
		<Box>
			<Slider
				value={value}
				onChange={handleChange}
				onChangeCommitted={() => {
					dataLimits[0] = value[0];
					dataLimits[1] = value[1];
				}}
				valueLabelDisplay="off"
				getAriaValueText={decorateSlider}
				valueLabelFormat={decorateSlider}
				min={0}
				max={1}
				step={0.000001}
			/>
		</Box>;


	return (
		<DroneDataContext.Provider value={count}>
			<div className="app">
				<TopBar
					pageNumbers={pageNumbers}
					pageHeaders={pageHeaders}
					currentPage={currentPage}
					switchPages={(i: number) => {
						setCurrentPage(i);
						setSettingsVisibility(false);
					}}
					openSettingsPage={() => {
						setSettingsVisibility(settings => !settings);
					}}
				/>
				{
					(getCurrentMode() !== DataMode.READING_FROM_FILE) ? <></> :
						<div className="sliderContainer">
							<div className={"sliderValues"}>
								{decorateSlider(value[0])}
							</div>
							{timeLimitSliders}
							<div className={"sliderValues"}>
								{decorateSlider(value[1])}
							</div>
						</div>
				}

				{settingsIsShown ? <SettingsPage/> : pages[currentPage]}
			</div>
		</DroneDataContext.Provider>
	);
}

function decorateSlider (value: number) {
	return (DroneData.time[DroneData.time.length - 1] * value).toFixed(2) + "s";
}
