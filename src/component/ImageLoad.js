/**
 * Created by lorne on 2017/4/21.
 */
import React, {Component} from 'react';
import {Images} from '../component';
import {strNotNull} from '../service/utils'

class ImageLoad extends Component {


    state = {
        isErr: false
    }

    render() {
        const {src} = this.props;
        const {emptyBg} = this.props;

        if (strNotNull(src) && !this.state.isErr)
            return (
                <img
                    {...this.props}
                    src={emptyBg ? emptyBg : Images.empty_image}
                    onError={(event) => {
                        this.setState({
                            isErr: true
                        })
                    }}
                />)
        else
            return <img
                {...this.props}
                src={emptyBg ? emptyBg : Images.empty_image}
            />
    }
}


export default ImageLoad;