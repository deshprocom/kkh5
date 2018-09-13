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
import {getMainBanners} from '../service/MainDao';
import {home_recommends} from '../service/MacauDao';
import {getActivityPush} from '../service/AccountDao';
import LoadApp from "./LoadApp";
import {Images,Colors} from "../component";
import {getCurrentDate} from "../service/utils";
import StorageKey from '../config/StorageKey';
import HomeBar from './navigation/HomeBar';
import Catalog from './navigation/Catalog';
import Information from './navigation/Information';
import FastBtns from './navigation/FastBtns';

class Home extends Component {

    state = {
        listRace: [],
        raceTickets: [],
        banners: [],
        bgColor: 'transparent',
        opacity: 0,
        headlines: [],
        next_id: '0',
        keyword: '',
        informationY: 0,
        isRefreshing: false,
        info_page: 1,
        load_more: ''
    };

    componentDidMount() {

        document.title = '澳门旅行';
        setTimeout(this._getData, 300)
    }

    _getData = () => {
        this.setState({
            load_more: 'loading'
        });
        // this._getPushActivity();
        getMainBanners(data => {
            console.log("首页banner",data)
            this.setState({
                banners: data.items
            });

        }, err => {
            console.log("banner_err",err)
        });


        home_recommends(data => {
            console.log("推荐",data)
            if (data.items.length > 0) {

                this.setState({
                    info_page: 2,
                    load_more: 'success'
                });
                this.infosView && this.infosView.refresh(data.items);
                this.infosView && this.infosView.setInfos(data.items)
            } else {
                this.setState({
                    load_more: 'load_all'
                });
            }


        }, err => {
            console.log('错误回调', err)
            this.setState({
                load_more: 'fail'
            });
        }, {page: 1, page_size: 20})
    };

    _setActivity = (activity) => {
        let today = getCurrentDate().format('YYYY-MM-DD');
        // if (this.activityModel)
        //     this.activityModel.setData(activity);
        activity.today = today;
        localStorage.setItem({
            key: StorageKey.Activity,
            rawData: activity
        });
    };

    _getPushActivity = () => {
        let today = getCurrentDate().format('YYYY-MM-DD');
        localStorage.setItem({key: StorageKey.Activity})
            .then(ret => {
                getActivityPush(data => {

                    const {activity} = data;

                    if (ret.id !== activity.id
                        && activity.push_type === 'once') {

                        this._setActivity(activity)
                    }
                    if (activity.push_type === 'once_a_day'
                        && ret.today !== today) {

                        this._setActivity(activity)
                    }


                }, err => {

                })

            }).catch(err => {
            getActivityPush(data => {
                this._setActivity(data.activity)
            }, err => {

            })
        })

    };

    render() {
        const {banners,load_more} = this.state;
        return (
            <div className="home">
                <div style={{width: '100%', height: 164}}>
                    <HomeBar banners={banners}/>
                </div>

                <Catalog />

                <div style={{width:'90%',height:1.6,backgroundColor:'#F3F3F3'}}/>

                <FastBtns/>

                <Information
                    ref={ref => this.infosView = ref}
                />

                {load_more === 'loading' ? <div style={{
                    height: 48, alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    <span>{'加载中...'}</span>
                </div> : null}

                {load_more === 'load_all' ? <div style={{
                    height: 48, alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    <span style={{color: Colors._AAA}}>{'已经没有啦！'}</span>
                </div> : null}



            </div>
        );
    }
}


export default Home;
