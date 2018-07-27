import React, {Component} from 'react';
import {weiXinShare} from '../service/utils';
import '../css/Download.css';
import {Images} from '../component';
import {getUpdate} from '../service/InfoDao'

export default class LoadApp extends Component {
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
            title: '【澳门旅行APP】下载立送200元优惠卷',
            desc: '在这里，可以随时随地找美食、定酒店！还有家庭旅行订制化服务等你体验！',//分享描述
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
        let plat = navigator.userAgent;
        if(plat.indexOf('Android') > -1 || plat.indexOf('Adr') > -1){
            window.open(`http://cdn-upyun.deshpro.com/deshpro_public/macauhike.apk?version=${this.state.android_version}`);
            let ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                this.setState({
                    showAndroid: true
                });
            }
        }

    };


    render() {
        return (
            <div style={{display: 'flex',flexDirection:'column',alignItems:'center', width: '100%'}}>
                {this.state.showAndroid ? <div style={{width:'100%',height:70,display:'flex',flexDirection:'row-reverse',backgroundColor: '#444444'}}>
                    <img style={{width: '70%', height: 70,marginRight: 23}} src={Images.safari} alt=""/>
                </div> : null}

                <div className="Download" style={this.state.showAndroid ? {marginTop: 70} : null}>
                    <div className="black">
                    </div>
                    <a className="ios_app_a" onClick={this.toIosApp}>
                        <img className="iosDownloadImg" src={Images.iPhone} alt=""/>
                    </a>

                    <a className="android_app_a" onClick={this.toAndroidApp}>
                        <img className="andoridDownloadImg" src={Images.Android} alt=""/>
                    </a>

                </div>
            </div>

        )
    }
}