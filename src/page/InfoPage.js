import React, {Component} from 'react';
import {MarkDown, Colors, Images} from '../component';
import {strNotNull, weiXinShare, isEmptyObject, getDateDiff} from "../service/utils";
import {getInfos, topics_comments} from '../service/InfoDao';
import '../css/info.css';

let audio = null;

export default class InfoPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            info: {},
            music: true,
            comments: [],
        }
        // this.musicPlay = React.createRef();
    }

    componentDidMount() {

        // audio = document.getElementById('musicPlay');


        const {id} = this.props.match.params;

        getInfos({id: id}, data => {
            console.log("info:", data.info)
            this.setState({
                info: data.info
            });

            const {description, title, image} = data.info;
            document.title = title;

            const message = {
                title: title,
                desc: '澳门旅行',//分享描述
                link: window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
                imgUrl: isEmptyObject(image) ? Images.default_img : image, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            };
            const url = {url: window.location.href};
            console.log("message:", message);
            weiXinShare(url, message);

            setTimeout(() => {
                if(strNotNull(data.info.audio_link)){
                    audio = this.musicPlay;
                    this._audio()
                }
            }, 1000)


        }, err => {

        });

        topics_comments({page: 1, page_size: 20, target_id: id, target_type: 'info'}, data => {
            console.log("comments", data);
            this.setState({
                comments: data.items
            })
        }, err => {
        })

    };

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

    _audio = () => {
        const that = this;
        if (sessionStorage.bgmusic === 'pause') {
            this.playBgMusic(false);
        } else {
            this.playBgMusic(true);
            //----------处理自动播放------------
            //--创建页面监听，等待微信端页面加载完毕 触发音频播放
            document.addEventListener('DOMContentLoaded', function () {
                that.playBgMusic(true);
                document.addEventListener("WeixinJSBridgeReady", function () {
                    that.playBgMusic(true);
                }, false);
                that.audioAutoPlay();
            });
            //--创建触摸监听，当浏览器打开页面时，触摸屏幕触发事件，进行音频播放

            document.addEventListener('touchstart', this.audioAutoPlay);
        }
        //----------处理页面激活------------
        let hiddenProperty = 'hidden' in document ? 'hidden' :
            'webkitHidden' in document ? 'webkitHidden' :
                'mozHidden' in document ? 'mozHidden' :
                    null;
        let visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
        let onVisibilityChange = function () {
            if (!document[hiddenProperty]) {
                if (!sessionStorage.bgmusic || sessionStorage.bgmusic === 'play') {
                    audio.play();
                }
            } else {
                audio.pause();
            }
        };
        document.addEventListener(visibilityChangeEvent, onVisibilityChange);


    };

    audioAutoPlay = () => {
        this.playBgMusic(true);
        document.removeEventListener('touchstart', this.audioAutoPlay);
    };

    playBgMusic = (val) => {
        if (val) {
            audio.play();
            sessionStorage.bgmusic = 'play';
        } else {
            audio.pause();
            sessionStorage.bgmusic = 'pause';
        }
    }

    triggerBgMusic = () => {
        if (!sessionStorage.bgmusic || sessionStorage.bgmusic === 'play') {
            this.playBgMusic(false);
        } else {
            this.playBgMusic(true);
        }
    };

    set_avatar = (avatar) => {
        if (strNotNull(avatar)) {
            return avatar;
        } else {
            return Images.home_avatar
        }
    };

    render() {
        const {music, info,comments} = this.state;
        if (isEmptyObject(info)) {
            return <div style={styles.content}/>
        }
        const {description, title, image, audio_link, exist_coupon,comments_count,total_views,total_likes} = info;

        return (
            <div style={styles.content} id="content">
                {!strNotNull(audio_link)? null:
                    <div style={{
                        width: 40,
                        height: 40,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end', position: 'fixed', right: 17, top: 30
                    }}
                         onClick={() => {
                             this.setState({
                                 music:!this.state.music
                             })
                             this.triggerBgMusic()
                         }}>
                        <img src={this.state.music ? Images.bg_music : Images.bg_music_close}
                             style={{width: 26, height: 26}}
                        />
                        <audio id="musicPlay" ref={ref => {
                            this.musicPlay = ref
                        }} className={'music_play'} src={audio_link}>
                        </audio>

                    </div>}

                {strNotNull(description) ? <MarkDown description={description}/> : null}

                {exist_coupon ? <div style={{position: 'fixed', bottom: 20, right: 17}} onClick={() => {
                    this.props.history.push("/loadApp");
                }}>
                    <img style={{width: 54, height: 54}} src={Images.croup_receive}/>
                </div> : null}


                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems:'center',
                    marginTop: 10,
                    marginLeft: 17,
                    marginRight: 17
                }}>
                    <span style={styles.comment}>{`全部评论(${this.show_count(comments_count)})`}</span>
                    <div style={{flex: 1}}/>
                    <span style={styles.time}>阅读&nbsp;{`(${this.show_count(total_views)})`}</span>
                    <img style={styles.like} src={Images.like_gray}/>
                    <span style={styles.time}>&nbsp;{`(${this.show_count(total_likes)})`}</span>
                </div>
                <div style={{marginTop: 10, width: '100%', height: 1.5, backgroundColor: '#F3F3F3'}}/>
                {comments_count > 0 ? <div>
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
                                            {/*{official ? <span style={[styles.c_tag, {*/}
                                                {/*backgroundColor: '#161718',*/}
                                                {/*color: '#FFE9AD'*/}
                                            {/*}]}>官方</span> : null}*/}

                                            {/*{recommended ? <span style={[styles.c_tag, {*/}
                                                {/*backgroundColor: '#161718',*/}
                                                {/*color: '#FFE9AD'*/}
                                            {/*}]}>精选</span> : null}*/}
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
    c_tag: {
        paddingRight: 7,
        paddingLeft: 7,
        color: 'white',
        fontSize: 10,
        paddingTop: 2,
        paddingBottom: 2,
        marginLeft: 8,
        borderRadius: 2
    },
    content: {
        backgroundColor: '#FFFFFF',
        paddingBottom: 100
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