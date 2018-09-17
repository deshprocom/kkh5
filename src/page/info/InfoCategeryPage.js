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
import {weiXinShare, isEmptyObject, strNotNull, isEmptyImg} from '../../service/utils';
import {Images, Colors, ImageLoad} from '../../component';
import '../../css/info.css';
import {info_types} from '../../service/InfoDao';

export default class InfoCategeryPage extends Component {

    state = {
        search: false,
        info_list: []
    };

    componentDidMount() {
        const {type} = this.props.match.params;
        try {
            info_types({page: 1, page_size: 20, keyword: this.keyword, type},
                data => {
                console.log("info_list",data)
                    this.setState({
                        info_list: data.items
                    })
                }, err => {
                    console.log("reject:", err)
                    this.setState({
                        reject_problem: err.problem
                    })

                })

        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const {type} = this.props.match.params;
        const {info_list} = this.state;
        return (
            <div className="bgContainer">
                <div className="nav" style={{height: 68}}>
                    <div
                        className="btn_search"
                        onClick={() => {
                            this.props.history.goBack()
                        }}>

                        <img
                            style={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                            src={Images.sign_return}/>

                    </div>
                    <div style={{display: 'flex', flex: 1}}/>
                    {/*{this.state.search ? <SearchBar*/}
                    {/*keyword={keyword => {*/}
                    {/*this.keyword = keyword;*/}
                    {/*this.listView && this.listView.refresh()*/}

                    {/*}}/> : <span style={styles.title}>{name}</span>}*/}
                    <div style={{display: 'flex', flex: 1}}/>


                    {type === 'exchange_rate' ? <div style={{width: 40}}/> : <div
                        className="btn_search"
                        onClick={() => {
                            this.setState({
                                search: !this.state.search
                            })
                            this.keyword = undefined;
                            // this.listView && this.listView.refresh()
                        }}>
                        {this.state.search ? <span style={{fontSize: 14, color: "white"}}>取消</span> : <img
                            className="img_search"
                            src={Images.macau.search}/>}

                    </div>}

                </div>
                {this.separator()}

                {info_list.map((item, index) => {
                    const {title, read, like, image, date, total_views, likes_count} = item;
                    return (
                        <div key={index} style={{width:'100%',display:'flex',flexDirection:'column',backgroundColor:'white'}}>
                            <Link
                                to={{pathname: '/infos/' + item.id}}
                                style={{
                                    height: 102,
                                    backgroundColor: Colors.white,
                                    display:'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginLeft:17,
                                    marginRight:17,
                                    textDecoration:'none'

                                }}>

                                <div style={{display:'flex',flexDirection:'column', height: 80,width:'70%'}}>
                                    <span
                                        className="infoSpan"
                                        style={{fontSize: 16, color: Colors.txt_444, marginTop: 5}}>{title}</span>

                                    <div style={{display:'flex',flex:1}}/>


                                    <div style={{display:'flex',alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <span
                                            className="infoSpan"
                                            style={{fontSize: 12, color: Colors._AAA}}>{date}</span>

                                        <div style={{
                                            display:'flex',
                                            flexDirection: 'row-reverse',
                                            alignItems: 'flex-start',
                                            marginTop: 10,
                                            marginBottom: 10,
                                            marginRight: 17
                                        }}>


                                            <div
                                                style={{display:'flex',flexDirection: 'row', alignItems: 'center'}}>
                                                <span style={{fontSize: 12, color: Colors._AAA}}>阅读</span>
                                                <span style={{
                                                    fontSize: 12,
                                                    color: Colors._AAA,
                                                    marginLeft: 2,
                                                    marginRight: 8
                                                }}>{total_views}</span>

                                                <img
                                                    style={{height: 12, width: 12}}
                                                    src={Images.social.like_gray}/>
                                                <span style={{
                                                    fontSize: 12,
                                                    color: Colors._AAA,
                                                    marginRight: 8,
                                                    marginLeft: 2
                                                }}>{this.show_count(likes_count)}</span>

                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div style={{display:'flex',flex:1}}/>
                                <img
                                    src={image}
                                    style={{width: 122, height: 74, marginLeft: 16}}/>

                            </Link>
                            <div style={{height:3,width:window.screen.width,backgroundColor:'#F3F3F3'}}/>
                        </div>

                    )
                })}
            </div>
        )
    }


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
    }


    separator = () => {
        const {type} = this.props.match.params;
        if (type !== 'exchange_rate')
            return <div style={{height: 5}}/>
        else
            return null
    }
}