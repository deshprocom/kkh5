import React, {Component} from 'react';
import {weiXinShare} from '../service/utils';
import '../css/Download.css';
import {Images} from '../component';

export default class LoadApp extends Component {
    state = {
        show: false,
        showAndroid: false
    };

    componentDidMount() {
        document.title = "澳门旅行";
        //微信二次分享
        const message = {
            title: '【澳门旅行APP】下载立送200元优惠卷',
            desc: '在这里，可以随时随地找美食、定酒店！还有家庭旅行订制化服务等你体验！赶紧来下载吧！',//分享描述
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
        window.open('http://cdn-upyun.deshpro.com/deshpro_public/macauhike.apk');
        this.setState({
            showAndroid: true
        });
    };


    render() {
        return (
            <div style={{display: 'flex', flex: 1, width: '100%'}}>
                {this.state.showAndroid ?
                    <img style={{width: '90%', height: 100, alignSelf: 'center'}} src={Images.safari} alt=""/> : null}
                <div className="Download" style={this.state.showAndroid ? {marginTop: 100} : null}>
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