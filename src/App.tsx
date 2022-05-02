import React, {ReactNode, useEffect, useState} from 'react';
import TopBar from "./topBar/TopBar";
import NetworkPage from "./pages/NetworkPage/NetworkPage";
import OverviewPage from "./pages/OverviewPage/OverviewPage";
import GraphPage from "./pages/GraphPage/GraphPage";
import GPSPage from "./pages/GPSPage/GPSPage";
import "scss/Variables.scss"
import {DroneDataContext, DroneData, updateData} from "./data/DroneDataContext";
import {fdatasync} from "fs";
import {randFloat} from "three/src/math/MathUtils";


export default function App (props: any) {
    let [currentPage, setCurrentPage] = useState(0);
    let pageNumbers = [0, 1, 2, 3, 4];
    let pageHeaders = ["Overview", "Graphs", "Network Diagnostics", "GPS Tracking (beta)"];
    let pages = [<OverviewPage/>, <GraphPage/>, <NetworkPage/>, <GPSPage/>];

    let [count, setCount] = useState(0);

    useEffect(() => {
        setInterval(() => {
            // console.log(DroneData)
            updateData({
                time: DroneData.time[DroneData.time.length - 1] + 0.05,
                battery: randFloat(90, 100),
                network: randFloat(90, 100),
                payload: randFloat(90, 100),
                pitch: randFloat(90, 100),
                radio: randFloat(90, 100),
                roll: randFloat(90, 100),
                state: randFloat(90, 100),
                yaw: randFloat(90, 100)
            });
            setCount(count => count + 1);
        }, 50)
    }, [])



    return (
        <DroneDataContext.Provider value={count}>
            <div className={"app"}>
                <TopBar pageNumbers={pageNumbers}
                        pageHeaders={pageHeaders}
                        currentPage={currentPage}
                        switchPages={(i: number) => setCurrentPage(i)}/>
                {pages[currentPage]}
            </div>
        </DroneDataContext.Provider>
    );
}




