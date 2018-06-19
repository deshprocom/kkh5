/**
 * InfoDao.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/6/19.
 *
 */

import api from '../config/api';
import {get} from '../config/fetch'

export function recommends(resolve, reject) {

    get(api.recommends, {page:0,page_size:20}, data => {
        resolve(data)
    }, reject)
}