import {ReactNode} from "react";
import "scss/Panel.scss"


interface PanelProps {
    title: string,
    content?: ReactNode,
    dim: Array<number>
}


export default function Panel (props: PanelProps) {

    return (
        <div className={"panel"} style={{
            gridRowStart: props.dim[0],
            gridRowEnd: props.dim[1],
            gridColumnStart: props.dim[2],
            gridColumnEnd: props.dim[3],
        }}>
            <div className={"titleText"}>{props.title}</div>
            {props.content}

        </div>
    );
}

