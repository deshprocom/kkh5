/**
 * MallInfoPage.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/6/19.
 *
 */
import React, {Component} from 'react';
import {weiXinShare, isEmptyObject, strNotNull,isEmptyImg} from '../../service/utils';
import {Images, Colors, ImageLoad} from '../../component';
import _ from 'lodash';
import '../../css/Home.css';

export default class Information extends Component {

    state = {
        hot_infos: []
    };

    refresh = (infos) => {
        console.log('hot_infos', infos);
        this.setState({hot_infos: infos})
    };

    setInfos = (infos) => {
        console.log('hot_infos', infos);
        let {hot_infos} = this.state;

        this.setState({hot_infos: hot_infos.concat(infos)})
    };

    _renderItem = (item) => {
        switch (item.source_type) {
            case 'hotel':
                return <ItemHotel
                    hotel={item.hotel}/>
            case 'info':
                return <ItemInfo
                    info={item.info}/>
        }


    };

    render() {
        const {hot_infos} = this.state;
        if (isEmptyObject(hot_infos)) {
            return <div/>
        }
        return (
            <div style={{backgroundColor: 'white', marginTop: 8}}>

                <span style={styles.hot_info}>热门推荐</span>

                <div style={{height: 0.5, marginLeft: 17, marginRight: 17, backgroundColor: '#ECECEE'}}/>

                {hot_infos.map((item, index) => {
                    return (
                        <div key={index} style={{marginLeft: 17, marginRight: 17}}>
                            {this._renderItem(item)}
                            <div style={{
                                height: 0.5,
                                marginLeft: 17,
                                marginRight: 17,
                                backgroundColor: '#ECECEE',
                                marginBottom: 5
                            }}/>
                        </div>
                    )
                })}


            </div>
        )
    }
}

class ItemHotel extends Component {


    render() {
        const {title, id, location, logo, type} = this.props.hotel;

        return <div
            onClick={() => {
                // router.toHotelDetail({id})
                // router.toHotelRoomListPage(this.props.hotel, {
                //     begin_date: moment().format('YYYY-MM-DD'),
                //     end_date: moment().add('hours', 24).format('YYYY-MM-DD'),
                //     counts: 1
                // })
            }}
            className= "item_hotel">

            <div style={{width: '70%',height: 75}}>
                <div className="row">
                    <span
                        style={{maxWidth: window.screen.width - 85}} className="hotel_title">{title}</span>
                    <span className="hotel" style={{color: '#E54A2E',borderColor:'#E54A2E'}}>酒店</span>
                </div>

                <span className="hotel_location">{location}</span>

            </div>

            <img
                src={isEmptyImg(logo)}
                style={{height: 75, width: 122}}/>
        </div>
    }
}

class ItemInfo extends Component {

    show_count = (item) => {
        if (strNotNull(item)) {
            if (item >= 1000 || item.length > 3) {
                return '999+'
            } else {
                return item
            }
        } else {
            return 0
        }
    };

    render() {
        const {title, id, date, image, type, likes_count, comments_count, total_views} = this.props.info;
        return <div
            onClick={() => {
                // router.toInfoPage({id})
            }}
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
            <div style={{width: window.screen.width - 34}}
                 className="row_center">
                <span
                    style={{maxWidth: window.screen.width - 85}} className="hotel_title">{title}</span>
                <div style={{display: 'flex', flex: 1}}/>

                <span className="hotel">{type.name}</span>

            </div>

            <img
                src={isEmptyImg(image)}
                style={{height: 164, width: '100%'}}/>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 10
            }}>
                    <span style={{fontSize: 12, color: Colors._AAA}}>阅读</span>
                    <span style={{
                        fontSize: 12,
                        color: Colors._AAA,
                        marginLeft: 4
                    }}>{total_views}</span>
                    <div style={{display: 'flex', flex: 1}}/>
                    <img
                        style={{height: 12, width: 12}}
                        src={Images.social.like_gray}/>
                    <span style={{
                        fontSize: 12,
                        color: Colors._AAA,
                        marginRight: 20,
                        marginLeft: 4
                    }}>{this.show_count(likes_count)}</span>

                    <img
                        style={{height: 12, width: 12}}
                        src={Images.social.reply}/>
                    <span style={{
                        fontSize: 12,
                        color: Colors._AAA,
                        marginLeft: 4
                    }}>{this.show_count(comments_count)}</span>

            </div>

        </div>
    }
}


const styles = {
    hot_info: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.txt_444,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 17,
        display: 'block',
        paddingTop: 3
    }
}