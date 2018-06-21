/**
 * Home.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/6/19.
 *
 */

import React, {Component} from 'react';
import '../css/Home.css'
import {Link} from 'react-router-dom'
import {recommends} from '../service/InfoDao'
import LoadApp from "./LoadApp";

class Home extends Component {

    render() {
        return (
            <div className="home">
                <LoadApp/>

            </div>
        );
    }
}


export default Home;
