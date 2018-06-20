import React, {Component} from 'react';
import {MarkDown,Colors} from '../../component';
import {isEmptyObject} from '../../service/utils';
import '../../css/mall.css';

export default class ProductInfo extends Component {

    render() {
        const {master} = this.props.product;
        if(isEmptyObject(master)){
            return <div style={styles.page}/>
        }
        return <div style={styles.page}>
            <span style={styles.title}>{this.props.title}</span>
            <div style={styles.viewPrice}>
                <span style={styles.price1}>¥</span>
                <span style={styles.price2}>{master.price}</span>

                <span style={styles.price3} className="price3">{master.original_price}</span>

                {/*<span style={styles.price4}>{isEmptyObject(master.sku)?0:master.sku}{I18n.t('discount')}</span>*/}
            </div>

            <div style={styles.viewLogistics}>
                <span style={styles.logistics1}>7天退换</span>

                <span style={styles.logistics2}>运费：¥{this.props.product.freight_fee}</span>
                <div style={{flex: 1}}/>
                <span style={styles.logistics3}>{master.origin_point}</span>

            </div>

        </div>
    }
}

const styles = {
    page: {
        display: 'flex',
        paddingLeft: 17,
        paddingRight: 17,
        paddingTop: 14,
        paddingBottom: 22,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: Colors._333
    },
    viewPrice: {
        display: 'flex',
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'flex-end'
    },
    price1: {
        fontSize: 18,
        color: '#F34A4A',
        marginBottom: 2
    },
    price2: {
        fontSize: 24,
        color: '#F34A4A',
        marginLeft: 5
    },
    price3: {
        fontSize: 14,
        color: Colors._CCC,
        marginLeft: 10,
        textDecorationLine: 'line-through',

        marginBottom: 3
    },
    price4: {
        fontSize: 14,
        color: Colors._CCC,
        marginLeft: 10,
        marginBottom: 3
    },
    viewLogistics: {
        display: 'flex',
        alignItems: 'center'
    },
    logistics1: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 2,
        backgroundColor: '#FF6C6C',
        borderRadius: 2,
        color: 'white',
        fontSize: 12
    },
    logistics2: {
        fontSize: 14,
        color: Colors._CCC,
        marginLeft: 13
    },
    logistics3: {
        fontSize: 14,
        color: Colors._666,
    },
};