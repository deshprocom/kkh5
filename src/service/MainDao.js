import api from '../config/api';
import {get, post} from '../config/fetch'

export function getMainBanners(resolve, reject) {
    get(api.banners, {}, ret => {
        resolve(ret.data)
    }, reject)
}
