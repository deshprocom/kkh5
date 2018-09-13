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

export default class FastBtns extends Component {

    render(){
        return(
            <div style={{
                width: '100%',
                paddingTop: 17,
                paddingBottom: 17,
                marginLeft: 17,
                marginRight: 17,
                backgroundColor: 'white',
                display:'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent:'space-around'
            }}>

                {catalogs.map((item, index) => {
                    return <div
                        key={item.name}
                        onClick={() => {
                            // if (item.type === 'weather')
                            //     router.toWebView('天气', 'http://wx.weather.com.cn/mweather/101330101.shtml#1')
                            // else if (item.type === 'fast_food') {
                            //     global.router.toFastFoodPage('fast_food')
                            // } else if (item.type === 'round_trip') {
                            //     global.router.toRoundTripPage()
                            // } else if (item.type === 'public_service') {
                            //     global.router.toFastFoodPage('public_service')
                            // }
                        }}
                        style={{
                            display:'flex',
                            flexDirection: 'row',
                            alignItems:'center',
                            justifyContent:'center'
                        }}>
                        <img style={item.size}
                               src={item.icon}/>

                        <span style={{
                            fontSize: 14, color: '#444444'
                        }}>{item.name}</span>

                    </div>
                })}

            </div>
        )
    }
}