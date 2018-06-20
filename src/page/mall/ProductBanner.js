import React, {Component} from 'react';
import Slider from 'react-slick';
import {getProductDetail} from '../../service/infoDao';
import {isEmptyObject} from '../../service/utils';
import {Images,Colors} from '../../component';

export default class ProductBanner extends Component {


    render() {
        const {banners} = this.props;

        if (isEmptyObject(banners)) {
            return <div style={styles.banner}></div>
        }
        return (
            <div>
                <Slider
                    arrows={false}
                    dotsClass="slick-dots dotsClass"
                    dots
                    infinite
                    autoplay
                    autoplaySpeed={4000}>
                    {banners.map((item, index) => {
                        return <div
                            key={`banner${index}`}
                            style={styles.banner}>
                            <img key={`banner${index}`} style={styles.bannerImg} src={item.large}/>
                        </div>
                    })}
                </Slider>
            </div>
        )

    }
}


const styles = {

    banner: {
        height: 362,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999

    },
    bannerImg: {
        maxWidth: '100%',
        maxHeight: '100%'
    }

};