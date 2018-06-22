import React, {Component} from 'react';
import {Navbar,Footer} from './component'

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
