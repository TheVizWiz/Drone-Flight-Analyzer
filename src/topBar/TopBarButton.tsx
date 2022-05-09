import React from "react";
import "../scss/TopBar.scss"


export default class TopBarButton extends React.Component<any, any> {

    render() {
        return (
            <button
                className={"topBarButton"}
                onClick={() => this.props.buttonOnClick(this.props.buttonPosition)}
            >{this.props.buttonText}</button>
        );
    }
}
