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
    recommends:'recommends',//首页推荐
    products:products,//产品详情
    weixin_js_sign: 'weixin/js_sign'
}


function products(id) {
    return `shop/products/${id}`
}


