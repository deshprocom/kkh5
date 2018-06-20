import React, {Component} from 'react';
import {MarkDown, Images,Colors} from '../../component';
import {isEmptyObject} from '../../service/utils';
import propTypes from 'prop-types';

export default class ProductSpec extends Component {

    state = {open: false};
    static propTypes = {
        showSpecInfo: propTypes.func.isRequired
    };

    render() {
        const {product} = this.props;
        if(isEmptyObject(product)){
            return <div style={styles.page}/>
        }
        return (
            <div onClick={()=>{
                this.props.history.push("/loadApp")
            }}>
                <div style={styles.page} onClick={()=>{
                    this.setState({
                        open:!this.state.open
                    })
                }}>
                    <span style={styles.spec}>产品规格</span>
                    <span style={styles.unSelected}>未选</span>
                    {/*<span style={styles.selected}>{I18n.t('selected')}</span>*/}
                    {/*<span style={styles.package}>A{I18n.t('package')}，{product.master.stock}{I18n.t('pieces')}</span>*/}
                    <div style={{display: 'flex', flex: 1}}/>
                    <img style={styles.img} src={Images.is} alt=""/>
                </div>

            </div>

        )
    }
}

const styles = {
    page: {
        marginTop: 7,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 48
    },
    spec: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 17,
        fontWeight: 'bold'
    },
    unSelected: {
        fontSize: 14,
        color: '#AAAAAA',
        marginLeft: 24
    },
    selected: {
        fontSize: 14,
        color: '#AAAAAA',
        marginLeft: 41
    },
    package: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 24,
        fontWeight: 'bold'
    },
    img: {
        width: 8, height: 16,
        marginRight: 16
    },
};