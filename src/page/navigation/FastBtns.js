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
import {Link} from 'react-router-dom';

const catalogs = [{
    name: '天气',
    type: 'weather',
    size: {height: 23, width: 23,marginRight:8},
    icon: Images.navigation2.weather
},
    {
        name: '快餐',
        type: 'fast_food',
        size: {height: 22, width: 22,marginRight:8},
        icon: Images.navigation2.fast_food
    },
    {
        name: '往返',
        type: 'round_trip',
        size: {height: 20, width: 20,marginRight:8},
        icon: Images.navigation2.round_trip
    },
    {
        name: '便民',
        type: 'public_service',
        size: {height: 18, width: 18,marginRight:8},
        icon: Images.navigation2.convenient
    }

]

export default class sFastBtns extends Component {

    judgeLink=(item)=>{
        if (item.type === 'weather')
            // router.toWebView('天气', 'http://wx.weather.com.cn/mweather/101330101.shtml#1')
            return ''
        else if (item.type === 'fast_food') {
            return `hotlines`
        } else if (item.type === 'round_trip') {
            return ''
        } else if (item.type === 'public_service') {
            return ''
        }
    }

    render(){
        return(
            <div style={{
                width: '100%',
                paddingTop: 17,
                paddingBottom: 17,
                backgroundColor: 'white',
                display:'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent:'space-around'
            }}>

                {catalogs.map((item, index) => {
                    return <Link
                        key={item.name}
                        to={this.judgeLink(item)}
                        style={{
                            display:'flex',
                            flexDirection: 'row',
                            alignItems:'center',
                            justifyContent:'center',
                            textDecoration:'none'
                        }}>
                        <img style={item.size}
                               src={item.icon}/>

                        <span style={{
                            fontSize: 14, color: '#444444'
                        }}>{item.name}</span>

                    </Link>
                })}

            </div>
        )
    }
}