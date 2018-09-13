import api from '../config/api';
import {get, post} from '../config/fetch'

export function getActivityPush(resolve, reject) {
    get(api.activityPush, ret => {
        resolve(ret.data)
    }, reject)
}
