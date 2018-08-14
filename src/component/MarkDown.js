import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import '../css/MarkDown.css';


class MarkDown extends Component {


    render() {
        const {description} = this.props;
        let text = description.replace(/\n/g, "<br/>");
        return (
            <div style={{width: '100%', height: '100%', paddingTop: 10}}>
                <div className="introduceGame" dangerouslySetInnerHTML={{__html: text}}/>

            </div>

        );
    }
}


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'hidden'

    }
}

export default withRouter(MarkDown);