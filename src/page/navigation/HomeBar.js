/**
 * MallInfoPage.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/6/19.
 *
 */
import React, {Component} from 'react';
import {weiXinShare, isEmptyObject} from '../../service/utils';
import Slider from 'react-slick';
import {Images} from '../../component';
import _ from 'lodash';


export default class HomeBar extends Component {

    render() {
        const {banners} = this.props;

        if (isEmptyObject(banners)) {
            return <div style={styles.banner}/>
        }
        return (
            <Slider
                arrows={false}
                dotsClass="slick-dots dotsClass"
                infinite
                autoplay
                autoplaySpeed={4000}>
                {banners.map((item, index) => {
                    return <div
                        key={`banner${index}`}
                        style={styles.banner}>
                        <img key={`banner${index}`} style={styles.bannerImg} src={item.image}/>
                    </div>
                })}
            </Slider>
        )

    }
}

const styles = {

    banner: {
        height: 164,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    bannerImg: {
        maxWidth: '100%',
        maxHeight: '100%',
        height:164,
        width:'100%'
    }

};