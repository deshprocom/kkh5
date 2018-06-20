import {getWeiXinSign} from './InfoDao';
import moment from 'moment';



//WEB和NATIVE通行标签
export class PostRoute {
    static NewsInfo = 'NewsInfo';//资讯详情
    static CommentList = 'comments';
    static RepliesComment = 'replies';
    static ClickAvatar = 'ClickAvatar';//点击评论头像
    static SCROLL_COMMENT_TOP = 'SCROLL_COMMENT_TOP';//资讯滚动顶部
    static NATIVE_ROUTE = 'NATIVE_ROUTE';//App内跳转
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
        result = "" + parseInt(monthC) + I18n.t('time_month');
    }
    else if (weekC >= 1) {
        result = "" + parseInt(weekC) + I18n.t('time_week');
    }
    else if (dayC >= 1) {
        result = "" + parseInt(dayC) + I18n.t('time_day');
    }
    else if (hourC >= 1) {
        result = "" + parseInt(hourC) + I18n.t('time_hour');
    }
    else if (minC >= 1) {
        result = "" + parseInt(minC) + I18n.t('time_min');
    } else
        result = I18n.t('time_moment');
    return result;
}


/*显示轻提示*/
export function showToast(msg) {
    Toast.info(msg, 2)
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
