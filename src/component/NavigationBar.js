/**
 * MallInfoPage.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/6/19.
 *
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Images, Colors, ImageLoad} from '../component';
import '../css/info.css';

export default class NavigationBar extends Component {

    render() {
        const {name} = this.props;
        return (
            <div className="nav" style={{height: 65}}>
                <div
                    className="btn_search"
                    onClick={() => {
                        this.props.goBack()
                    }}>

                    <img
                        style={{height: 19, width: 11}}
                        src={Images.sign_return}/>
                </div>
                <div style={{display: 'flex', flex: 1}}/>

                <span style={{fontSize: 18, color: 'white',alignSelf:'center'}}>{name}</span>

                <div style={{display: 'flex', flex: 1}}/>

                <div style={{width: 25,marginRight:17}}/>

            </div>
        )
    }
}