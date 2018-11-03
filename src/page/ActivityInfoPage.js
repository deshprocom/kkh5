import React, {Component} from 'react';
import {MarkDown, Colors, Images} from '../component';
import {strNotNull, weiXinShare, isEmptyObject, getDateDiff} from "../service/utils";
import {getActivityInfo, topics_comments} from '../service/InfoDao';
import '../css/info.css';

let audio = null;

export default class ActivityInfoPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            info: {}
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;

        getActivityInfo({id: id}, data => {
            console.log("activity_info:", data)
            this.setState({
                info: data
            });

            const {title,description,banner,id} = data;
            document.title = title;

            const message = {
                title: title,
                desc: '澳门旅行',//分享描述
                link: window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
                imgUrl: isEmptyObject(banner) ? Images.default_img : banner, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            };
            const url = {url: window.location.href};
            console.log("message:", message);
            weiXinShare(url, message);

        }, err => {

        });

    };

    render() {
        const {info} = this.state;
        if (isEmptyObject(info)) {
            return <div style={styles.content}/>
        }
        const {description} = info;
        return (
            <div style={styles.content} id="content">

                {strNotNull(description) ? <MarkDown description={description}/> : null}

            </div>
        )
    }
}


const styles = {
    content: {
        backgroundColor: '#FFFFFF',
        paddingBottom: 100
    }
}