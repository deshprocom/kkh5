/**
 * InfoDao.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/6/19.
 *
 */

import api from '../config/api';
import {get,post} from '../config/fetch'

export function recommends(resolve, reject) {

    get(api.recommends, {page:0,page_size:20}, data => {
        resolve(data)
    }, reject)
}


export function getProductDetail(body,resolve, reject) {
    get(api.products(body.product_id), {},  ret => {
        resolve(ret.data);
    }, reject);
}

export function getWeiXinSign(payload, resolve, reject) {
    post(api.weixin_js_sign, payload, ret => {
        resolve(ret.data);
    }, reject)
}



