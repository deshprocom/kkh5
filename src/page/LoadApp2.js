import React, {Component} from 'react';
import {weiXinShare} from '../service/utils';
import '../css/Download.css';
import {Images} from '../component';
import {getUpdate} from '../service/InfoDao'

export default class LoadApp2 extends Component {
    state = {
        show: false,
        showAndroid: false,
        ios_version: '',
        android_version: ''
    };

    componentDidMount() {
        getUpdate(data => {
            const {android_platform, ios_platform} = data;
            console.log("更新提示", data)
            this.setState({
                ios_version: ios_platform.version,
                android_version: android_platform.version
            })

        }, err => {
            console.log("err", err)
        });

        document.title = "澳门旅行";
        //微信二次分享
        const message = {
            title: '【澳门旅行APP】下载后免费抽奖，最高可获得iPhone XS！',
            desc: '在这里，可以随时随地找美食、定酒店！更有幸运大转盘——百万大奖等你拿！',//分享描述
            link: window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
            imgUrl: Images.default_img, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接`，默认为空
        };
        const url = {url: window.location.href};
        weiXinShare(url, message);
    };

    toIosApp = () => {
        this.setState({
            show: true
        });
        window.open('https://itunes.apple.com/cn/app/macauhike/id1381273877?mt=8');

    };
    toAndroidApp = () => {
        console.log("android_version", this.state.android_version)

        let plat = navigator.userAgent;
        if (plat.indexOf('Android') > -1 || plat.indexOf('Adr') > -1) {
            let ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                this.setState({
                    showAndroid: true
                });
            } else {

                this.open_android(`http://cdn-upyun.deshpro.com/deshpro_public/macauhike.apk?version=${this.state.android_version}`);
            }


        }

    };

    open_android = (url) => {
        let a = document.getElementById("android_load");
        a.setAttribute("href", url);
        a.setAttribute("target", "_blank");
        a.click();
    }


    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
                {this.state.showAndroid ? <div style={{
                    width: '100%',
                    height: 70,
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    backgroundColor: '#444444'
                }}>
                    <img style={{width: '70%', height: 70, marginRight: 23}} src={Images.safari} alt=""/>
                </div> : null}

                <div className="Download2" style={this.state.showAndroid ? {marginTop: 70} : null}>
                    <div className="black">
                    </div>
                    <div style={{
                        width:'100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent:'space-between',
                        alignItems: 'center',
                        position:'absolute',
                        bottom:60
                    }}>
                        <a className="ios_app_a" onClick={this.toIosApp} style={{marginLeft:17}}>
                            <img className="iosDownloadImg2" src={Images.iphoneload} alt=""/>
                        </a>

                        <a id='android_load' className="android_app_a" onClick={this.toAndroidApp}  style={{marginRight:17}}>
                            <img className="andoridDownloadImg2" src={Images.androidload} alt=""/>
                        </a>
                    </div>

                </div>
            </div>

        )
    }
}