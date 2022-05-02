import React, {ReactNode, useContext} from "react";
import "./TopBar.scss"
import TopBarButton from "./TopBarButton";
import {DroneDataContext} from "../data/DroneDataContext";


export default function TopBar (props: any) {

    function handleClick (i: number) {
        props.switchPages(i);
    }

    function createClassButton (i: number, text: string, onClickFunction: (i: number) => void): ReactNode {
        return (
            <TopBarButton
                buttonPosition={i}
                buttonText={text}
                buttonOnClick={onClickFunction}
                key={i}
            />
        );
    }

    let list = [];
    for (let i = 0; i < props.pageNumbers.length; i++) {
        list.push(createClassButton(props.pageNumbers[i], props.pageHeaders[i],
            (i: number) => handleClick(i)));
    }

    return (
        <div className={"topBar"}>
            {list}
        </div>
    );


}

