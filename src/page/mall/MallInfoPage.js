/**
 * MallInfoPage.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/6/19.
 *
 */
import React, {Component} from 'react';
import ProductInfo from './ProductInfo';
import ProductSpec from './ProductSpec';
import ProductIntro from './ProductIntro';
import ProductBottom from './ProductBottom';
import Tip from './Tip';
import {weiXinShare, isEmptyObject} from '../../service/utils';
import {getProductDetail} from '../../service/InfoDao';
import {Images} from '../../component';
import _ from 'lodash';
import ProductBanner from './ProductBanner';


export default class MallInfoPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            product: {},
            showTip:true,
            specShow:false,
            selectProduct: {}
        };
    }



    componentDidMount() {
        const {id} = this.props.match.params;

        const body = {product_id: id};

        getProductDetail(body, data => {

            console.log("ProductInfo:",data.product)
            this.setState({
                product: data.product
            });
            const {title, icon, description} = data.product;
            document.title = title;

            const message = {
                title: title,
                desc: '澳门旅行',//分享描述
                link: window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
                imgUrl: isEmptyObject(icon) ? Images.default_img : icon, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            };
            const url = {url: window.location.href};
            console.log("message:", message);
            weiXinShare(url, message);
        }, err => {

        });

    };

    _clickTip=()=>{
        this.setState({
            showTip:!this.state.showTip
        })
    };
    showSpecInfo = (temp) => {

        if (isEmptyObject(temp)) {
            this.setState({
                specShow: !this.state.specShow
            })
        } else
            this.setState({
                specShow: !this.state.specShow,
                selectProduct: temp
            })
    };


    render() {
        const {product,specShow,selectProduct} = this.state;

        let {category_id,description,freight_fee,has_variants,icon,images,master,option_types,price,returnable,title,variants} = product;
        images = _.isEmpty(images)?[]:images;//初始化写法

        return (

            <div style={styles.page}>
                <img src={product.icon} style={{display:'none'}}/>
                <div style={styles.container}>

                    {this.state.showTip?<Tip clickTip={this._clickTip} history={this.props.history}/>:null}
                    <div style={{width:'100%',height:362,marginBottom:10}}>
                        <ProductBanner banners={images}/>
                    </div>


                    <ProductInfo product={product} title={title}/>

                    <ProductSpec product={product}
                                 selectProduct={selectProduct}
                                 showSpecInfo={this.showSpecInfo}
                                 history={this.props.history}/>


                    <ProductIntro description={description}/>

                    <div style={{height: 80}}/>
                </div>


                <ProductBottom history={this.props.history}/>

            </div>
        );
    }
}
const styles = {
    page:{
        display: 'flex',
        flex: 1,
        backgroundColor:'#ECECEE'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflowY: 'scroll',
        overflowX:'none'
    }

};
