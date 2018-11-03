/**
 * api.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/6/1.
 *
 */


export default {
    //内部测试
    dev: 'http://192.168.2.93:3000/v1/',
    //test分支用来发布版本  test_ci_at用来跑自动化测试
    test: 'http://test.kkapi.deshpro.com/v1/',
    //production 用来发布正式生产环境
    production: 'https://kkapi.deshpro.com/v1/',
    recommends: 'recommends',//首页推荐
    products: products,//产品详情
    weixin_js_sign: 'weixin/js_sign',
    v_codes: 'account/v_codes',
    account_verify: 'account/verify_vcode',
    register: 'account/register',
    app_versions: 'app_versions',
    infos: infos,//获取资讯详情
    topics_detail:topics_detail,
    comments: 'comments',//获取说说长帖评论列表,
    banners: 'banners',//获取首页banner,
    activityPush: 'activities/pushed',
    info_types:info_types,
    hotlines:'hotlines',//服务热线电话列表
    activityInfo:activityInfo(),//活动详情
}

export function activityInfo(body) {
    const {id} = body;
    return 'activities/' + id;
}


function products(id) {
    return `shop/products/${id}`
}

function infos(id) {
    return `infos/${id}`
}

function topics_detail(topic_id) {
    return `topics/${topic_id}`
}

function info_types(body) {
    const {type} = body;
    return `info_types/${type}/infos`
}
