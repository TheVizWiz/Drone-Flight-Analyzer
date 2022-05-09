import React, {useContext} from "react";
import Panel from "../components/Panel";
import Drone3D from "./Drone3D";
import "scss/OverviewPage.scss"
import ChartPanel from "../components/ChartPanel";
import {DroneData, DroneDataContext} from "data/DroneData";


interface OverviewProps {

}


export default function OverviewPage (props: OverviewProps) {

	let x = useContext(DroneDataContext);
	// console.log(x);

	let panels = [
		<Panel title={"Current Direction"} content={<Drone3D/>} dim={[1, 7, 4, 10]}/>,
		//left panel
		<Panel title={"Roll"} dim={[1, 5, 1, 4]}
			   content={<ChartPanel xData={DroneData.time} yData={DroneData.roll} yLim={[-2, 2]}/>}/>,
		<Panel title={"Pitch"} dim={[5, 9, 1, 4]}
			   content={<ChartPanel xData={DroneData.time} yData={DroneData.pitch}/>}/>,
		<Panel title={"Yaw"} dim={[9, 13, 1, 4]} content={<ChartPanel xData={DroneData.time} yData={DroneData.yaw}/>}/>,
		// right panel
		<Panel title={"Network"} dim={[1, 5, 10, 13]}
			   content={<ChartPanel xData={DroneData.time} yData={DroneData.network}/>}/>,
		<Panel title={"Radio"} dim={[5, 9, 10, 13]}
			   content={<ChartPanel xData={DroneData.time} yData={DroneData.radio}/>}/>,
		<Panel title={"Battery"} dim={[9, 13, 10, 13]}
			   content={<ChartPanel xData={DroneData.time} yData={DroneData.battery}/>}/>,

		// bottom middle
		<Panel title={"State"} dim={[7, 10, 4, 7]}/>,
		<Panel title={"Velocity"} dim={[7, 10, 7, 10]}/>,
		<Panel title={"Payload"} dim={[10, 13, 4, 7]}/>,
		<Panel title={"Extras"} dim={[10, 13, 7, 10]}/>,
	];

	return (

		<div className={"page"}>
			<div className={"overviewGrid"}>
				{panels}
			</div>
		</div>
	)

}
