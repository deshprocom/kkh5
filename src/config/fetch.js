/**
 * fetch.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/6/1.
 *
 */

import {create, SERVER_ERROR, TIMEOUT_ERROR, NETWORK_ERROR} from 'apisauce';
import api from './api'

let TAG = 'Http:';

function basic_api() {
    const api_env = process.env.REACT_APP_KKAPI_ENV
    if (api_env === 'dev') return api.dev

    if (api_env === 'test') return api.test

    return api.production
}


// define the api
const client = create({
    baseURL: basic_api(),
    timeout: 20000,
});

if(process.env.NODE_ENV === 'development')
client.addMonitor(response => {
    const {url} = response.config;
    console.log('响应' + url, response)
})

client.addRequestTransform(request => {
    console.log(TAG + request.url, request)
})

export function setToken(access_token) {
    client.setHeader('x-access-token', access_token)
}


export function get(url, body, resolve, reject) {
    client.get(url, body).then(res => {
        handle(res, resolve, reject)
    }).catch(err => {
        errReject(err)
    })
}

export function put(url, body, resolve, reject) {
    client.put(url, body).then(res => {
        handle(res, resolve, reject)
    }).catch(err => {
        errReject(err)
    })
}

export function del(url, body, resolve, reject) {
    client.delete(url, body).then(res => {
        handle(res, resolve, reject)
    }).catch(err => {
        errReject(err)
    })
}


export function post(url, body, resolve, reject) {
    client.post(url, body).then(res => {
        handle(res, resolve, reject)
    }).catch(err => {
        errReject(err)
    })
}

function handle(res, resolve, reject) {
    const {ok, status, data} = res;
    if (ok && status === 200 && data.code === 0) {
        resolve && resolve(data)
    } else {

        reject && reject(data);
        errReject(res)
    }
}


function errReject(err) {
    console.log(err)
}



