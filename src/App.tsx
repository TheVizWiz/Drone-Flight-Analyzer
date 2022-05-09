import {ReactElement, useEffect, useState} from "react";
import 'scss/Variables.scss';
import {DroneData, DroneDataContext, UPDATE_TIME,} from './data/DroneData';
import OverviewPage from "./pages/OverviewPage/OverviewPage";
import GraphPage from "./pages/GraphPage/GraphPage";
import NetworkPage from "./pages/NetworkPage/NetworkPage";
import GPSPage from "./pages/GPSPage/GPSPage";
import TopBar from "./topBar/TopBar";
import {isConnected, reconnect, updateDataFromNetwork} from "./data/NetworkController";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import {DataMode, getCurrentMode} from "./data/DataMode";


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
				{settingsIsShown ? <SettingsPage/> : pages[currentPage]}
			</div>
		</DroneDataContext.Provider>
	);
}
