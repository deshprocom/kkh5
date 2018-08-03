import React, {Component} from 'react';
import {MarkDown, Colors, Images} from '../component';
import {strNotNull, weiXinShare, isEmptyObject} from "../service/utils";
import {getInfos} from '../service/InfoDao';
import '../css/info.css'

export default class InfoPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            info: {}
        };
    }

    componentDidMount() {
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
        }, err => {

        });

        this._audio()

    };

    _audio=()=>{
        const that = this;
        let audio = document.getElementById("\bmusic_play");
        console.log("dshjds",audio)
        if(sessionStorage.bgmusic === 'pause'){
            this.playBgMusic(false);
        }else{
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
        let onVisibilityChange = function(){
            if (!document[hiddenProperty]) {
                if(!sessionStorage.bgmusic||sessionStorage.bgmusic ==='play'){
                    audio.play();
                }
            }else{
                audio.pause();
            }
        };
        document.addEventListener(visibilityChangeEvent, onVisibilityChange);


    };

    audioAutoPlay=()=> {
        this.playBgMusic(true);
        document.removeEventListener('touchstart',this.audioAutoPlay);
    };

    playBgMusic=(val)=>{
        let audio = document.getElementById("\bmusic_play");
        if(val){
            audio.play();
            sessionStorage.bgmusic='play';
        }else{
            audio.pause();
            sessionStorage.bgmusic='pause';
        }
    }

    triggerBgMusic=()=>{
        if(!sessionStorage.bgmusic||sessionStorage.bgmusic ==='play'){
            this.playBgMusic(false);
        }else{
            this.playBgMusic(true);
        }
    }

    render() {
        const {description, title, image} = this.state.info;
        return (
            <div style={styles.content}>
                <div style={{
                    marginLeft: 17,
                    marginRight: 17,
                    marginTop: 5,
                    backgroundColor: '#F3F3F3',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <div style={{
                        backgroundColor: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                         className='music_stop'
                         onClick={() => {
                             this.triggerBgMusic()
                         }}>
                        <img
                            src="//res.wx.qq.com/mmbizwap/zh_CN/htmledition/images/icon/appmsg/qqmusic/icon_qqmusic_default.2x26f1f1.png"
                            alt="" className="pic_qqmusic_default"/>
                        <img src="http://singerimg.kugou.com/uploadpic/softhead/400/20160606/20160606112714240238.jpg"
                             data-autourl="http://fs.open.kugou.com/fcdae995f3dc8e0ba071a55c5514fdec/5b6004b9/G050/M05/13/07/0oYBAFb07cmAe7xdADEVEatVgrM250.mp3"
                             data-musicid="20899231" className="qqmusic_thumb" alt=""/>
                        <audio id="music_play" src='http://go.163.com/2018/0209/mengniu/audio/bgm.mp3'>
                            Your browser does not support the audio tag
                        </audio>
                    </div>
                </div>

                {strNotNull(description) ? <MarkDown description={description}/> : null}

                <div style={{position: 'fixed', bottom: 20, right: 17}} onClick={() => {
                    this.props.history.push("/loadApp");
                }}>
                    <img style={{width: 54, height: 54}} src={Images.croup_receive}/>
                </div>
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