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

class Home extends Component {

    componentDidMount() {
        recommends(data => {
            console.log('推荐数据', data)
        }, err => {
            console.log(err)
        })
    }


    render() {
        return (
            <div className="home">
                <h1>正文内容区</h1>
                <Link to={'/info'}>跳转路由</Link>

            </div>
        );
    }
}


export default Home;
