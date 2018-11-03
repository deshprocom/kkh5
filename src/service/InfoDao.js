/**
 * InfoDao.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/6/19.
 *
 */

import api from '../config/api';
import {get, post} from '../config/fetch'


export function info_types(body, resolve, reject) {
    get(api.info_types(body), body, ret => {
        resolve(ret.data)
    }, err => {
        reject(err)
    })
}

export function topics_comments(params, resolve, reject) {
    get(api.comments, params, ret => {
        resolve(ret.data)
    }, err => {
        reject
    })
}


export function topics_details(topic_id, resolve, reject) {
    get(api.topics_detail(topic_id), {}, ret => {
        resolve(ret.data)
    }, err => {
        reject(err)
    })
}
export function getActivityInfo(body, resolve, reject) {
    get(api.activityInfo(body), ret => {
        resolve(ret.data)
    }, reject)
}

export function getInfos(body, resolve, reject) {
    get(api.infos(body.id), {}, ret => {
        resolve(ret.data)
    }, reject)
}

export function getUpdate(resolve, reject) {
    get(api.app_versions, {}, ret => {
        resolve(ret.data)
    }, reject)
}

/*注册*/
export function postRegister(body, resolve, reject) {
    post(api.register, body, (ret) => {
        // setLoginData(ret.data);

        resolve(ret.data);
    }, reject);
}

/*检验验证码是否正确*/
export function postVerifyCode(body, resolve, reject) {
    post(api.account_verify, body, resolve, reject);
}


export function postVCode(body, resolve, reject) {
    post(api.v_codes, body, (ret) => {
        resolve(ret.data);
    }, reject);
}

export function recommends(resolve, reject) {

    get(api.recommends, {page: 0, page_size: 20}, data => {
        resolve(data)
    }, reject)
}


export function getProductDetail(body, resolve, reject) {
    get(api.products(body.product_id), {}, ret => {
        resolve(ret.data);
    }, reject);
}

export function getWeiXinSign(payload, resolve, reject) {
    post(api.weixin_js_sign, payload, ret => {
        resolve(ret.data);
    }, reject)
}



