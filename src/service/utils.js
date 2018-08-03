import {getWeiXinSign} from './InfoDao';
import moment from 'moment';
import _ from 'lodash';

export const _lodash = _;


//WEB和NATIVE通行标签
export class PostRoute {
    static NewsInfo = 'NewsInfo';//资讯详情
    static CommentList = 'comments';
    static RepliesComment = 'replies';
    static ClickAvatar = 'ClickAvatar';//点击评论头像
    static SCROLL_COMMENT_TOP = 'SCROLL_COMMENT_TOP';//资讯滚动顶部
    static NATIVE_ROUTE = 'NATIVE_ROUTE';//App内跳转
}


export function getURLParamKey(name, search) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = search.substr(1).match(reg);
    if (r !== null) return unescape(r[2]);
    return null;

}

export function convertDate(date, formate) {
    if (strNotNull(date)) {
        return moment(date).format(formate)
    }
}

export function utcDate(utc, formate) {
    return moment.unix(utc).format(formate)
}

export function getGetOrdinal(n) {
    let s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/*金额千分转换*/
export function moneyFormat(num) {
    var num = (num || 0).toString(), result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    console.log(result)
    return result;
}

/*对象是否为空对象*/
export function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}

export function strNotNull(str) {
    if (str === undefined || str === null || str.length === 0 || str === 'undefined') {
        return false;
    }
    else {
        return true;
    }
}

/*判断是否为Null*/

var myreg = /^\d{5,20}$/;

var myreg2 = /^1(3|4|5|7|8)\d{9}$/;

//检查手机和地区
export function checkPhone2(phone, ext) {
    console.log("phone:",phone);
    console.log("ext:",ext);
    if (!strNotNull(ext)) {
        alert("请选择区号")
    } else if (phone != null && phone != undefined) {
        if (ext === '86' && !myreg2.test(phone.trim())) {
            alert("请输入正确的手机号");
            return false;
        } else if (!myreg.test(phone.trim())) {
            alert("请输入正确的手机号");
            return false;
        }
        return true;
    }
}

//检查验证码
var myreg3 = /^\d{4,6}$/;

export function checkVcode(vcode) {
    if (!myreg3.test(vcode.trim())) {
        alert("请输入正确的验证码");
        return false;
    } else {
        return true;
    }
}

//检查密码
/*有效的密码格式满足的条件
     1, 长度必须6 - 20位
     2, 必须是 数字+字母 或 数字 + 特殊字符 或 字母+特殊字符 或 数字 + 字母 + 特殊字符的组合*/
var PWD_VALID_FORMAT_REGEX = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;

export function checkPwd(password) {
    if (PWD_VALID_FORMAT_REGEX.test(password))
        return true;
    else {
        alert('密码格式不正确');
        return false;
    }
}

//微信二次分享
export function weiXinShare(url, message) {
    getWeiXinSign(url, data => {
        console.log('WeiXinSignInfo', data)
        window.wx.ready(() => {
            window.wx.onMenuShareTimeline(message);//分享朋友圈
            window.wx.onMenuShareAppMessage(message);//分享给朋友
            window.wx.onMenuShareQQ(message);//分享到QQ
            window.wx.onMenuShareWeibo(message);//分享到腾讯微博
            window.wx.onMenuShareQZone(message);//分享到QQ空间
        });

        window.wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', "onMenuShareQZone"]
        });

    }, err => {

    });
}


export function postMsg(msg) {
    if (window.originalPostMessage) {
        let random = Math.random().toString().slice(-6);
        window.postMessage(random + msg);
    } else {
        // alert('请前往扑客APP查看');
    }
}

export function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

/*时间 1小时前*/
export function getDateDiff(dateTimeStamp) {

    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();

    var diffValue = now - dateTimeStamp * 1000;
    if (diffValue < 0) {
        return;
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    let result = '';
    if (monthC >= 1) {
        result = "" + parseInt(monthC) + '月前';
    }
    else if (weekC >= 1) {
        result = "" + parseInt(weekC) + '周前';
    }
    else if (dayC >= 1) {
        result = "" + parseInt(dayC) + '天前';
    }
    else if (hourC >= 1) {
        result = "" + parseInt(hourC) + '小时前';
    }
    else if (minC >= 1) {
        result = "" + parseInt(minC) + '分钟前';
    } else
        result = '刚刚';
    return result;
}
