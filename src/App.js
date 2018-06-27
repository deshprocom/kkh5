import React, {Component} from 'react';
import {Navbar,Footer} from './component';

global.console = {
    info: () => {
    },
    log: () => {
    },
    warn: () => {
    },
    error: () => {
    },
};


class App extends Component {
    render() {
        let layout = this.props.children;
        return (
            <div>

                {layout}
                {/*<Footer/>*/}
            </div>
        );
    }
}

export default App;
