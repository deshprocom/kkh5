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
import {Colors} from '../../component';


export default class Catalog extends Component {

    state = {
        catalogs: [
            [{
                name: '汇率',
                type: 'exchange_rate',
                size: {height: 34, width: 30},
                icon: Images.macau.rate_exchange
            },
                {
                    name: '娱乐',
                    type: 'recreation',
                    size: {height: 34, width: 36},
                    icon: Images.macau.entertainment
                }
            ],
            [
                {
                    name: '酒店',
                    type: 'hotel',
                    size: {height: 32, width: 35},
                    icon: Images.macau.hotel
                },
                {
                    name: '景点',
                    type: 'scenic',
                    size: {height: 34, width: 36},
                    icon: Images.macau.viewpoint
                }
            ],
            [
                {
                    name: '美食',
                    type: 'cate',
                    size: {height: 35, width: 34},
                    icon: Images.macau.food
                },

                {
                    name: '人闻',
                    type: 'humanities',
                    size: {height: 34, width: 30},
                    icon: Images.macau.book
                }
            ],
            [
                {
                    name: '出入境',
                    type: 'entry_exit',
                    size: {height: 29, width: 31},
                    icon: Images.out_exit
                },
                {
                    name: '商城',
                    type: 'mall',
                    size: {height: 29, width: 31},
                    icon: Images.macau.store
                }
            ]


        ]
    };
    catalogView = (catalogs) => {

        return catalogs.map((items, index) => <div
            key={'catalog' + index}>
            {items.map((item, count) => {
                return <div
                    key={item.name}
                    onClick={() => {
                        // if (item.type === 'mall')
                        //     this.props.history.push("/mall_page");
                        // else if (item.type === 'hotel') {
                        //     router.toSelectTimePage();
                        // } else if (item.type === 'exchange_rate') {
                        //     router.toRatePage();
                        // } else if (item.type === 'entry_exit') {
                        //     router.toWebView('出入境', 'http://www.fsm.gov.mo/psp/pspmonitor/mobile/PortasdoCerco.aspx')
                        // }  else
                        //     router.toHotelSearch(item)
                    }}
                    style={{
                        display:'flex',
                        flexDirection:'column',
                        alignItems: 'center',
                        paddingLeft: 15,
                        paddingRight: 15,
                        paddingTop: count === 1 ? 15 : 0
                    }}>
                    <div style={{
                        height: 35, width: 35,
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        <img style={item.size}
                             src={item.icon}/>
                    </div>

                    <span style={{
                        fontSize: 14, color: Colors._666,
                        marginTop: 5
                    }}>{item.name}</span>

                </div>
            })}
        </div>)

    };

    render(){
        const {catalogs} = this.state;
        return(
            <div style={{
                height: 160, paddingTop:10, width: '100%', backgroundColor: 'white',display:"flex",flexDirection:'column',
                justifyContent: 'center'
            }}>

                <div style={{display:"flex",flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                    {this.catalogView(catalogs)}
                </div>

            </div>
        )
    }


}