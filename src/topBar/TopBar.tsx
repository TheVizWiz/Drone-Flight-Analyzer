import React, {ReactNode} from "react";
import "../scss/TopBar.scss";
import TopBarButton from "./TopBarButton";
import {isRecording, recordButton, resetData, startRecording, stopRecording} from "../data/DroneData";
import {parseInputCSV} from "../data/FileController";
import {resetNetworkConnection} from "../data/NetworkController";
import {DataMode, getCurrentMode, setCurrentMode} from "../data/DataMode";


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
			<div className={"topBarPageElements"}>
				{list}
			</div>
			<div className="topBarPlaybackElements">
				<TopRightButton imgFile={recordButton}
								altString={(isRecording ? "start" : "stop") + "recording"} handleClick={
					() => isRecording ? stopRecording() : startRecording()
				}/>
				<TopRightButton imgFile={"reload-icon.png"} altString={"reload data"} handleClick={
					() => {
						resetData();
						if (getCurrentMode() === DataMode.READING_FROM_FILE)
							setCurrentMode(DataMode.PLAIN);
					}
				}/>

				<TopRightButton imgFile={"wifi-icon.png"} altString={"Reconnect"} handleClick={
					() => {
						resetNetworkConnection();
					}
				}/>

				<input id={"fileInputID"} type={"file"} onChange={(e) => {
					if (!e.target || !e.target.files || !e.target.files[0]) {
						return;
					}
					e.target.files[0].text().then(text => {
						parseInputCSV(text);
					})
				}} hidden={true}/>
				<TopRightButton imgFile={"upload-icon.png"} altString={"upload file"} handleClick={
					() => {
						// @ts-ignore
						document.getElementById("fileInputID").click();
					}
				}/>


				<TopRightButton imgFile={"settings-icon.png"} altString={"settings"} handleClick={
					() => {
						props.openSettingsPage();
					}
				}/>

			</div>
		</div>
	);

}


function TopRightButton (props: {
	handleClick: () => void;
	imgFile: string,
	altString: string
}) {

	return (
		<div className={"topBarButton topBarPlaybackElement"} onClick={() => props.handleClick()}>
			<img src={require("images/" + props.imgFile)} alt={props.altString}/>
		</div>
	);
}

