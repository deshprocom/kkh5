import React, {Component} from 'react';
import {weiXinShare, checkPhone2, strNotNull, checkPwd, getQueryVariable} from '../service/utils';
import '../css/invite.css';
import {Images} from '../component';
import {postVCode, postVerifyCode, postRegister} from '../service/InfoDao';
import md5 from '../config/md5'

export default class InviteLoad extends Component {
    state = {
        phone: '',
        vcode: '',
        password: '',
        ext: '86',
        show_select: false,
        getCodeDisable: true,
        timer: 60,
        eye_show: false
    };

    componentDidMount() {
        document.title = "澳门旅行";
        console.log("分享用户的ID", getQueryVariable('id'))
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

    _select = () => {
        return (
            <select defaultValue="选择地区" className="input2" style={{
                width: 260,
                height: 41,
                marginLeft: 0,
                marginRight: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1 ? 17 : 0,
                backgroundColor: '#f5f5f5'
            }}
                    name={this.state.ext} value={this.state.ext}
                    onChange={(text) => {
                        let value = text.target.value;
                        this.setState({
                            ext: value
                        })
                    }}>

                <option
                    value="86">&nbsp;&nbsp;&nbsp;&nbsp;大陆&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;86
                </option>
                <option
                    value="852">&nbsp;&nbsp;&nbsp;&nbsp;香港&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;852
                </option>
                <option
                    value="853">&nbsp;&nbsp;&nbsp;&nbsp;澳门&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;853
                </option>
                <option
                    value="886">&nbsp;&nbsp;&nbsp;&nbsp;台湾&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;886
                </option>
            </select>
        )
    };

    _sendCode = () => {
        const {phone, ext} = this.state;
        if (checkPhone2(phone, ext) && strNotNull(ext)) {
            const body = {
                option_type: 'register',
                vcode_type: 'mobile',
                mobile: phone,
                ext: ext
            };

            postVCode(body, ret => {
                this.setState({
                    getCodeDisable: false
                });
                if (body.vcode_type === 'mobile') {
                    this.siv();
                    alert('已发送到手机，注意查看短信');
                }
            }, err => {
                alert(err);
            });


        }
    };

    checkVcode = () => {
        const {phone, vcode, ext, show_select} = this.state;
        if (checkPhone2(phone, ext)) {
            let body = {
                option_type: 'register',
                vcode_type: 'mobile',
                account: phone,
                vcode: vcode,
                ext: ext
            };
            postVerifyCode(body, (ret) => {
                this._register()
            }, (err) => {
                console.log("验证码错误", err);
                alert(err)
            })
        }
    };

    _register = () => {
        const {phone, password, vcode, ext, show_select} = this.state;
        let pwd = md5.hex_md5(password);
        let body = {
            vcode: vcode,
            password: pwd,
            type: 'mobile',
            mobile: phone,
            ext: ext,
            invite_code: getQueryVariable("id")
        };
        postRegister(body, data => {
            // this._toHome(data);
            alert("注册成功");
            this.props.history.push("/loadApp");
            window.location.reload();
        }, err => {
            console.log(err)
        })

    };

    siv = () => {
        let crowdown = 60;
        setInterval(() => {
            if (crowdown === 0) {
                this.setState({getCodeDisable: true})
            } else {
                crowdown = crowdown - 1;
                this.setState({timer: crowdown, getCodeDisable: false});
            }

        }, 1000);
    };


    render() {

        const {phone, password, vcode, ext, show_select, getCodeDisable, timer, eye_show} = this.state;

        return (
            <div className="invite_page"
                 style={{display: 'flex', flex: 1, width: '100%', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{
                    paddingTop: 22,
                    paddingLeft: 12,
                    paddingRight: 12,
                    paddingBottom: 19,
                    marginTop: 220,
                    backgroundColor: 'white',
                    borderRadius: 3,
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginRight: 22,
                    marginLeft: 22
                }}>
                    <div className="view view2" style={{display: 'flex', flexDirection: 'row'}} onClick={() => {
                        this.setState({
                            show_select: !show_select
                        })
                    }}>
                        {this._select()}
                    </div>

                    <div className="view view2">
                        <input  className="input" type="text" name={this.state.phone} id={`input${this.state.phone}`}
                               placeholder="输入手机号" onChange={(input) => {

                            this.setState({
                                phone: input.target.value
                            })
                        }}/>
                    </div>
                    <div className="view view2" style={{marginBottom: 2}}>
                        <input className="password" type={eye_show ? "text" : "password"} name={this.state.password}
                               id={`password${this.state.password}`}
                               placeholder="输入密码" onChange={(input) => {
                            this.setState({
                                password: input.target.value
                            })
                        }}/>
                        <div style={{flex: 1}}/>
                        <div style={{marginRight: 17}} onClick={() => {
                            this.setState({
                                eye_show: !this.state.eye_show
                            })
                        }}>
                            <img style={{width: 18, height: 9}}
                                 src={eye_show ? Images.sign_eye_open : Images.sign_eye}/>
                        </div>
                    </div>
                    <span style={{
                        display: 'block', marginBottom: 10, marginLeft: 22, alignSelf: 'center',
                        color: '#AAAAAA', fontSize: 12
                    }}>密码由6-20位英文字母+数字组成，如dzpk123</span>


                    <div className="view" style={{
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <div style={{width: 140, height: 41, backgroundColor: '#f5f5f5'}}>
                            <input className="text" type="text" name={this.state.vcode} id="" onChange={(input) => {
                                this.setState({
                                    vcode: input.target.value
                                })
                            }}/>
                        </div>
                        <div style={{width: 20, height: 41, backgroundColor: 'white'}}/>
                        <div style={{
                            width: 100,
                            height: 41,
                            backgroundColor: getCodeDisable ? '#e54a2e' : '#747474',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 3
                        }} onClick={() => {
                            if (checkPhone2(phone, ext) && getCodeDisable) {
                                this._sendCode();
                            }
                        }}>
                            <span style={{
                                color: getCodeDisable ? 'white' : "#BBBBBB",
                                fontSize: 14
                            }}>{getCodeDisable ? '获取验证码' : `${timer}s`}</span>

                        </div>
                    </div>
                    <div className="view complete" onClick={() => {
                        if (checkPhone2(phone, ext) && checkPwd(password)) {
                            this.checkVcode();
                        }
                    }}>
                        <span style={{color: "white", fontSize: 16}}>完成</span>
                    </div>
                </div>
            </div>

        )
    }

    _can_get_code = () => {
        console.log('_can_get_code')
        this.setState({
            getCodeDisable: false
        });
    };
}