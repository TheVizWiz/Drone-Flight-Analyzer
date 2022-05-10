import "scss/Variables.scss";
import {VictoryChart, VictoryLine, VictoryThemeDefinition} from "victory";
import {DataMode, getCurrentMode} from "../../data/DataMode";
import {dataLimits, DroneData} from "../../data/DroneData";


interface ChartPanelProps {
	xData: Array<number>,
	yData: Array<number>,
	yLim?: Array<number>
	xLabel?: string,
	yLabel?: string,
	chartLabel?: string,
}


const textColor = "rgb(255, 255, 255)"


const theme: VictoryThemeDefinition = {
	axis: {
		style: {
			axis: {
				fill: "transparent",
				stroke: textColor,
				strokeWidth: 2,
			},
			grid: {
				stroke: "none",
			},
			ticks: {
				fill: "none"
			},
			tickLabels: {
				fill: textColor
			}
		}
	},
	line: {
		style: {
			data: {
				opacity: 1,
				stroke: textColor,
				strokeWidth: 2
			},
		}
	}
}


export default function ChartPanel (props: ChartPanelProps) {


	let data = props.xData.map((d, i) => ({
		x: d,
		y: props.yData[i]
	}));

	let currentMax = 0;

	props.yData.forEach((i) => {
		if (i > currentMax) currentMax = i;
	})

	let minDomain = {};
	let maxDomain = {};
	if (props.yLim) { // @ts-ignore
		minDomain.y = props.yLim[0];
		// @ts-ignore
		maxDomain.y = props.yLim[1];
	}

	if (getCurrentMode() === DataMode.READING_FROM_FILE) {
		// @ts-ignore
		minDomain.x = DroneData.time[Math.round(dataLimits[0] * DroneData.time.length - 1)];
		// @ts-ignore
		maxDomain.x = DroneData.time[Math.round(dataLimits[1] * DroneData.time.length - 1)];
	}





	return (
		<VictoryChart theme={theme} style={{parent: {height: '100%', width: "100%"}}}
					  minDomain={minDomain}
					  maxDomain={maxDomain}>
			<VictoryLine data={data}/>
		</VictoryChart>
	);
}
