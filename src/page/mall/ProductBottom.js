import React, {Component} from 'react';
import {Images,Colors} from '../../component';

export default class ProductBottom extends Component {

    render() {
        return (
            <div style={styles.page}>
                <div style={styles.bottom}>
                    <div style={styles.bottomLeftView}>
                        <div  style={styles.bottomLeft}
                              onClick={() => {
                                  this.props.history.push("/loadApp")
                              }}
                        >
                            <img style={styles.bottomLeftImg} src={Images.cart}/>
                        </div>
                    </div>

                    <div style={{display: 'flex', flex: 1}}/>

                    <div
                        style={styles.bottomRight}
                        onClick={() => {
                            this.props.history.push("/loadApp")
                        }}
                    >
                        <span style={styles.bottomRightTxt}>添加购物车</span>
                    </div>
                </div>
            </div>

        )
    }
}

const styles = {
    page: {
        width: '100%',
        height: 54,
        backgroundColor: '#FFFFFF',
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 999,
    },
    bottom: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 54
    },
    bottomLeftView:{
        width: '31%',
        height: 40,
        marginLeft: 17,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#CCCCCC',
        borderRadius: 3,
    },
    bottomLeft: {
        width: '98%',
        height: 38,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#FFFFFF',
        borderWidth: 1,
        borderRadius: 3,
    },
    bottomLeftImg: {
        width: 24,
        height: 24,
    },
    bottomRight: {
        width: '55%',
        height: 40,
        borderRadius: 3,
        marginRight: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        backgroundColor:'#F34A4A'
    },
    bottomRightTxt: {
        fontSize: 18,
        color: 'white'
    }

};