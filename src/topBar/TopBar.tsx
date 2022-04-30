import React, {ReactNode} from "react";
import "./TopBar.scss"
import TopBarButton from "./TopBarButton";

export default class TopBar extends React.Component<any, any> {

    constructor (props: object) {
        super(props);
    }

    render () {
        let list = [];
        for (let i = 0; i < this.props.pageNumbers.length; i++) {
            list.push(this.createClassButton(this.props.pageNumbers[i], this.props.pageHeaders[i],
                (i: number) => this.handleClick(i)));
        }

        return (
            <div className={"topBar"}>
                {list}
            </div>
        );
    }


    createClassButton (i: number, text: string, onClickFunction: (i: number) => void): ReactNode {
        return (
            <TopBarButton
                buttonPosition={i}
                buttonText={text}
                buttonOnClick={onClickFunction}
                key={i}
            />
        );
    }

    handleClick (i: number) {
        this.props.switchPages(i);
    }
}
