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
                <div style={{paddingTop:22,paddingLeft:12,paddingRight:12,paddingBottom:19,marginTop:230,
                    backgroundColor:'white',borderRadius:3,flexDirection:'column',alignItems:'center',marginRight:22,marginLeft:22
                }}>
                    <div className="view view2" style={{display:'flex',flexDirection:'row'}}>
                        <input className="input"  type="text" name={this.state.phone} id="" placeholder="选择地区"/>
                        <div style={{display:'flex',flex:1}}/>
                        <img  style={{width:13,height:9,marginRight:17}} src={Images.bottomarea}/>
                    </div>

                    <div className="view view2">
                        <input className="input"  type="text" name={this.state.phone} id="" placeholder="输入手机号"/>
                    </div>
                    <div className="view view2">
                        <input  className="input" type="text" name={this.state.password} id="" placeholder="输入密码" />
                    </div>
                    <div className="view" style={{backgroundColor:'white',display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <div style={{width:140,height:41,backgroundColor:'#f5f5f5'}}>
                            <input  className="input" type="text" name={this.state.vcode} id="" />
                        </div>
                        <div style={{width:20,height:41,backgroundColor:'white'}}/>
                        <div style={{width:100,height:41,backgroundColor:'#e54a2e',display:'flex',
                            alignItems:'center',justifyContent:'center',borderRadius:3}}>
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