import React, {ReactNode} from 'react';
import TopBar from "./topBar/TopBar";
import NetworkPage from "./pages/NetworkPage/NetworkPage";
import OverView from "./pages/OverviewPage/OverView";
import GraphPage from "./pages/GraphPage/GraphPage";
import GPSPage from "./pages/GPSPage/GPSPage";


class App extends React.Component<any,
    {
        currentPage: number,
        pageNumbers: Array<number>,
        pageHeaders: Array<string>
        pages: Array<ReactNode>
    }> {

    constructor (props: object) {
        super(props);
        this.state = {
            currentPage: 0,
            pageNumbers: [0, 1, 2, 3, 4],
            pageHeaders: ["OverView", "Graphs", "Network Diagnostics", "GPS Tracking (beta)"],
            pages: [<OverView/>, <GraphPage/>, <NetworkPage/>, <GPSPage/>]
        };
    }

    render () {
        let currentPage = this.state.pages[this.state.currentPage];

        return (
            <div>
                <TopBar pageNumbers={this.state.pageNumbers}
                        pageHeaders={this.state.pageHeaders}
                        switchPages={(i: number) => this.switchPages(i)}/>
                {currentPage}
            </div>
        )
            ;
    }

    switchPages (i: number) {
        this.setState({
            currentPage: i
        });
    }
}

export default App;
