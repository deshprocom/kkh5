import React, {Component} from 'react';
import {MarkDown, Colors, Images} from '../component';
import {strNotNull, weiXinShare, isEmptyObject, getDateDiff} from "../service/utils";
import {
    topics_details, topics_comments
} from '../service/InfoDao';
import '../css/info.css'

export default class ArticlePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            article: {},
            comments: [],
            max: false,
            index: 0
        };
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        topics_details(id, data => {
            console.log("article", data)
            this.setState({
                article: data
            })
            const {cover_link, body_type, image, title} = data;
            document.title = body_type === 'short' ? '说说' : '长帖';

            const message = {
                title: body_type === 'short' ? '说说' : '长帖',
                desc: '澳门旅行',//分享描述
                link: window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
                imgUrl: isEmptyObject(cover_link) ? Images.default_img : cover_link, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            };
            const url = {url: window.location.href};
            console.log("message:", message);
            weiXinShare(url, message);
        }, err => {
        });

        topics_comments({page: 1, page_size: 20, target_id: id, target_type: 'topic'}, data => {
            console.log("comments", data);
            this.setState({
                comments: data.items
            })
        }, err => {
        })


    };

    set_avatar = (avatar) => {
        if (strNotNull(avatar)) {
            return avatar;
        } else {
            return Images.home_avatar
        }
    }

    render() {
        const {article} = this.state;
        if (isEmptyObject(article)) {
            return <div/>
        }
        const {id, images, total_likes, title, user, cover_link, current_user_liked, body, body_type, official, recommended, total_comments, total_views} = article;
        const {avatar, created_at, followers_count, following_count, nick_name, signature, user_id} = user;
        const {comments} = this.state;
        return (
            <div style={styles.content} className='article'>
                <div style={styles.top}>
                    <img style={styles.c_avatar} src={this.set_avatar(avatar)}/>

                    <div style={{display: 'flex', flexDirection: 'column', marginLeft: 10}}>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <span style={{fontSize: 12, color: '#444444'}}>{nick_name}</span>
                            {official ? <span style={[styles.c_tag, {
                                backgroundColor: '#161718',
                                color: '#FFE9AD'
                            }]}>官方</span> : null}

                            {recommended ? <span style={[styles.c_tag, {
                                backgroundColor: '#161718',
                                color: '#FFE9AD'
                            }]}>精选</span> : null}
                        </div>
                        <span style={styles.c_time}>{getDateDiff(created_at)}</span>
                    </div>
                </div>

                {strNotNull(body) ? <MarkDown description={body}/> : null}

                {!isEmptyObject(images) ? <div style={{
                    marginBottom: 10,
                    marginLeft: 17,
                    marginRight: 17,
                }}>
                    {images.map((item, index) => {
                        return <img onClick={() => {
                            this.setState({
                                max: true,
                                index: index
                            })
                        }} key={index} className='min'
                                    style={{marginRight: 8, marginBottom: 8}}
                                    src={item.url}/>

                    })} </div> : null}


                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 10,
                    marginLeft: 17,
                    marginRight: 17
                }}>
                    <span style={styles.comment}>{`全部评论(${total_comments})`}</span>
                    <div style={{flex: 1}}/>
                    <span style={styles.time}>阅读&nbsp;{`(${total_views})`}</span>
                    <img style={styles.like} src={Images.like_gray}/>
                    <span style={styles.time}>&nbsp;{`(${total_likes})`}</span>
                </div>
                <div style={{marginTop: 10, width: '100%', height: 1.5, backgroundColor: '#F3F3F3'}}/>

                {total_comments > 0 ? <div>
                    {comments.map((item, index) => {
                        const {user} = item;
                        return (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginLeft: 17,
                                borderBottomWidth: 1,
                                borderBottomColor: '#F3F3F3'
                            }}
                                 key={`commtens+${index}`}>
                                <div style={{marginTop: 17, display: 'flex', marginRight: 17, flexDirection: 'row'}}>
                                    <img style={styles.c_avatar} src={this.set_avatar(user.avatar)}/>

                                    <div style={{display: 'flex', flexDirection: 'column', marginLeft: 8}}>
                                        <div style={{display: 'flex', flexDirection: 'row'}}>
                                            <span style={styles.c_nick}>{user.nick_name}</span>
                                            {official ? <span style={[styles.c_tag, {
                                                backgroundColor: '#161718',
                                                color: '#FFE9AD'
                                            }]}>官方</span> : null}

                                            {recommended ? <span style={[styles.c_tag, {
                                                backgroundColor: '#161718',
                                                color: '#FFE9AD'
                                            }]}>精选</span> : null}
                                        </div>
                                        <span style={styles.c_time}>{getDateDiff(user.created_at)}</span>
                                    </div>

                                    <div style={{flex: 1}}/>
                                    <img style={{height: 18, width: 20}} onClick={() => {
                                        this.props.history.push("/loadApp");
                                    }} src={Images.reply}/>
                                </div>
                                <span style={styles.c_body}>
                                        {item.body}
                                </span>

                                {strNotNull(item.total_replies) && item.total_replies > 0 ?
                                    <div style={styles.replies} onClick={() => {
                                        this.props.history.push("/loadApp");
                                    }}>
                                        <span style={styles.c_nick2}>查看{item.total_replies}条回复</span>
                                    </div> : null}
                                <div style={{marginTop: 10, width: '100%', height: 1.5, backgroundColor: '#F3F3F3'}}/>
                            </div>

                        )
                    })}
                </div> : null}

                {this.state.max ? <div style={{
                    backgroundColor: 'rgb(20,20,20)',
                    position: 'fixed',
                    zIndex:999,
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    textAlign:'center',
                    display:'flex'

                }}
                                       onClick={() => {
                                           this.setState({
                                               max: false
                                           })
                                       }}>
                    <img className='max' style={{alignSelf:'center'}}  src={images[this.state.index].url}/>
                </div> : null}
            </div>
        )
    }


}

const styles = {
    c_nick2: {
        display: 'block',
        color: '#4A90E2',
        fontSize: 12,
        marginLeft: 6
    },
    replies: {
        height: 20,
        backgroundColor: '#ECECEE',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginTop: 8,
        marginRight: 17
    },
    like: {
        height: 15,
        width: 15,
        marginLeft: 6
    },
    time: {
        fontSize: 12,
        color: Colors._AAA
    },
    content: {
        backgroundColor: '#FFFFFF',
        paddingBottom: 100
    },
    top: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 17,
        marginRight: 17,
        marginTop: 17
    },
    c_avatar: {
        height: 38,
        width: 38,
        borderRadius: 19
    },
    c_nick: {
        color: '#4A90E2',
        fontSize: 12
    },
    c_time: {
        color: Colors._CCC,
        fontSize: 10
    },
    c_body: {
        fontSize: 16,
        color: Colors.txt_444,
        marginLeft: 17,
        display: 'block',
        marginTop: 10
    },
    comment: {
        fontSize: 14,
        color: Colors._AAA
    },
};