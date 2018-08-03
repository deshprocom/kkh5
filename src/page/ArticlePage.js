import React, {Component} from 'react';
import {MarkDown, Colors, Images} from '../component';
import {strNotNull, weiXinShare, isEmptyObject, getDateDiff} from "../service/utils";
import {
    topics_details, topics_comments
} from '../service/InfoDao';

export default class ArticlePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            article: {},
            comments: []
        };
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        topics_details(id, data => {
            console.log("article", data)
            this.setState({
                article: data
            })
            const {cover_link, body_type, image} = data;
            document.title = body_type === 'short' ? '说说' : '长帖';

            const message = {
                title: body_type === 'short' ? '说说' : '长帖',
                desc: '澳门旅行',//分享描述
                link: window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
                imgUrl: isEmptyObject(cover_link) ? Images.default_img : cover_link, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            };
            const url = {url: window.location.href};
            console.log("message:", message);
            weiXinShare(url, message);
        }, err => {
        });

        topics_comments({page: 1, page_size: 20, target_id: id, target_type: 'topic'}, data => {
            console.log("comments", data);
            this.setState({
                comments: data.items
            })
        }, err => {
        })
    };

    render() {
        const {article} = this.state;
        if (isEmptyObject(article)) {
            return <div/>
        }
        const {id, images, total_likes, title, user, cover_link, current_user_liked, body, body_type, official, recommended, total_comments, total_views} = article;
        const {avatar, created_at, followers_count, following_count, nick_name, signature, user_id} = user;
        const {comments} = this.state;
        return (
            <div style={styles.content}>
                <div style={styles.top}>
                    <img style={styles.c_avatar} src={avatar}/>

                    <div style={{display: 'flex', flexDirection: 'column', marginLeft: 10}}>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <span style={styles.c_nick}>{nick_name}</span>
                            {official ? <span style={[styles.c_tag, {
                                backgroundColor: '#161718',
                                color: '#FFE9AD'
                            }]}>官方</span> : null}

                            {recommended ? <span style={[styles.c_tag, {
                                backgroundColor: '#161718',
                                color: '#FFE9AD'
                            }]}>精选</span> : null}
                        </div>
                        <span style={styles.c_time}>{getDateDiff(created_at)}</span>
                    </div>
                </div>
                <span style={styles.c_body}>
                        {body}
                 </span>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 10,
                    marginLeft: 17,
                    marginRight: 17
                }}>
                    <span style={styles.comment}>{`全部评论(${total_comments})`}</span>
                    <div style={{flex: 1}}/>
                    <span style={styles.time}>阅读&nbsp;{`(${total_views})`}</span>
                    <img style={styles.like} src={Images.like_gray}/>
                    <span style={styles.time}>&nbsp;{`(${total_likes})`}</span>
                </div>
                <div style={{marginTop: 10, width: '100%', height: 1.5, backgroundColor: '#F3F3F3'}}/>

                {total_comments > 0 ? <div>

                </div> : null}
            </div>
        )
    }


}

const styles = {
    like: {
        height: 15,
        width: 15,
        marginLeft: 6
    },
    time: {
        fontSize: 12,
        color: Colors._AAA
    },
    content: {
        backgroundColor: '#FFFFFF',
        paddingBottom: 100
    },
    top: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 17,
        marginRight: 17,
        marginTop: 17
    },
    c_avatar: {
        height: 38,
        width: 38,
        borderRadius: 19
    },
    c_nick: {
        color: '#4A90E2',
        fontSize: 12
    },
    c_time: {
        color: Colors._CCC,
        fontSize: 10
    },
    c_body: {
        fontSize: 16,
        color: Colors.txt_444,
        marginLeft: 17,
        display: 'block',
        marginTop: 10
    },
    comment: {
        fontSize: 14,
        color: Colors._AAA
    },
};