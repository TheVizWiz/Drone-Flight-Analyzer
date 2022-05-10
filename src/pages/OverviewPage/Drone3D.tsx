import React, {useRef, useState} from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import "scss/Drone3D.scss";
import {dataLimits, DroneData} from "../../data/DroneData";
import {DataMode, getCurrentMode} from "../../data/DataMode";

export default function Drone3D (props: any) {

	let currentFrame = (getCurrentMode() === DataMode.READING_FROM_FILE)
		? Math.floor(DroneData.time.length * dataLimits[1] - 1)
		: DroneData.time.length - 1;


	return (
		<Canvas>
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			<Box position={[-1.2, 0, 0]} rotation={DroneData.roll[currentFrame]} />
			<Box position={[1.2, 0, 0]} rotation={-DroneData.roll[currentFrame]} />
		</Canvas>
	);
}

function Box (props: any) {
	const ref = useRef<THREE.Mesh>(null!);
	const [hovered, hover] = useState(false);
	const [clicked, click] = useState(false);
	useFrame((state, delta) => {
		(ref.current.rotation.z = props.rotation * Math.PI);
	});
	return (
		<mesh position={props.position}
			ref={ref}
			scale={clicked ? 1.5 : 1}
			onClick={(event) => {
				click(!clicked);
			}}
			onPointerOver={(event) => hover(true)}
			onPointerOut={(event) => hover(false)}>
			<boxGeometry args={[1, 2, 1]} />
			<meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
		</mesh>
	);
}
