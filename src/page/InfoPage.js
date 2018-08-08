import React, {Component} from 'react';
import {MarkDown, Colors, Images} from '../component';
import {strNotNull, weiXinShare, isEmptyObject} from "../service/utils";
import {getInfos} from '../service/InfoDao';
import '../css/info.css';

let audio = null;

export default class InfoPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            info: {},
            music: true,

        };
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


    };

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
    }

    render() {
        const {music, info} = this.state;
        if (isEmptyObject(info)) {
            return <div style={styles.content}/>
        }
        const {description, title, image, audio_link, exist_coupon} = info;

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
            </div>
        )
    }
}

const styles = {
    content: {
        backgroundColor: '#FFFFFF',
        paddingBottom: 100
    },


};