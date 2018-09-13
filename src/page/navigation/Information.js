/**
 * MallInfoPage.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/6/19.
 *
 */
import React, {Component} from 'react';
import {weiXinShare, isEmptyObject} from '../../service/utils';
import {Images} from '../../component';
import _ from 'lodash';


export default class Information extends Component {

    state = {
        hot_infos: [{type: 'hotel'}, {type: 'info'}]
    };

    refresh = (infos) => {
        console.log('hot_infos', infos);
        this.setState({hot_infos: infos})
    }

    setInfos = (infos) => {
        console.log('hot_infos', infos);
        let {hot_infos} = this.state;

        this.setState({hot_infos: hot_infos.concat(infos)})
    };

    render(){
        return(
            <div>

            </div>
        )
    }
}