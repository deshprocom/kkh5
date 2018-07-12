import React, {Component} from 'react';
import {weiXinShare} from '../service/utils';
import '../css/invite.css';
import {Images} from '../component';

export default class InviteLoad extends Component {
    state = {
        phone:'',
        vcode:'',
        password:''
    };

    componentDidMount() {
        document.title = "澳门旅行";
        //微信二次分享
        const message = {
            title: 'MacauHike',
            desc: '澳门旅行下载',//分享描述
            link: window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
            imgUrl: Images.default_img, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接`，默认为空
        };
        const url = {url: window.location.href};
        weiXinShare(url, message);
    };



    render() {
        return (
            <div className="invite_page" style={{display: 'flex', flex: 1, width: '100%',flexDirection:'column',alignItems:'center'}}>
                <div style={{paddingTop:22,paddingLeft:22,paddingRight:22,paddingBottom:19,marginTop:250,
                    backgroundColor:'white',borderRadius:3,flexDirection:'column',alignItems:'center',marginRight:22,marginLeft:22
                }}>
                    <div className="view view2">

                    </div>
                    <div className="view view2">

                    </div>
                    <div className="view" style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <div style={{width:150,height:41,backgroundColor:'#f5f5f5'}}>

                        </div>
                        <div style={{marginLeft:10,width:100,height:41,backgroundColor:'#e54a2e',display:'flex',alignItems:'center',justifyContent:'center'}}>
                            <span style={{color:"white",fontSize:14}}>获取验证码</span>
                        </div>
                    </div>
                    <div className="view complete">
                        <span style={{color:"white",fontSize:16}}>完成</span>
                    </div>
                </div>
            </div>

        )
    }
}