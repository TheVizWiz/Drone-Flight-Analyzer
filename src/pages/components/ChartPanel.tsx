import "scss/Variables.scss";
import {VictoryChart, VictoryLabel, VictoryLine, VictoryTheme, VictoryThemeDefinition} from "victory";


interface ChartPanelProps {
    xData: Array<number>,
    yData: Array<number>,
    xLabel?: string,
    yLabel?: string,
    chartLabel?: string,
}


const textColor= "rgb(255, 255, 255)"


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
        y: props.yData[i] / 1000
    }));

    let currentMax = 0;

    props.yData.forEach((i) => {
        if (i > currentMax) currentMax = i;
    })


    return (
        <VictoryChart theme={theme} style={{parent: {height: '100%', width: "100%"}}}>
            <VictoryLine data={data}/>
        </VictoryChart>
    );
}
