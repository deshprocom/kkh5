import api from '../config/api';
import {get, post} from '../config/fetch'

export function home_recommends(resolve,reject, params) {
    get(api.recommends, params, ret => {
        resolve(ret.data)
    }, err => {
        reject
    })
}