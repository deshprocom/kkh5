import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import markdown from 'marked';
import '../css/MarkDown.css';
import {_lodash, postMsg, PostRoute} from '../service/utils';
import 'react-photoswipe/lib/photoswipe.css';
import {PhotoSwipeGallery, PhotoSwipe} from 'react-photoswipe';

let renderer = new markdown.Renderer();
let Web2NativeTag = 'approuter://';

class MarkDown extends Component {

    state = {
        options: {},
        isOpen: false
    };


    handleClose = () => {
        this.setState({
            isOpen: false
        });
    };


    desc = (description) => {

        let des = markdown(description, {renderer: renderer});
        return {__html: des}
    };

    componentWillMount() {
        this.images = [];
    }


    componentDidMount() {

        let imgs = document.getElementById('marked').getElementsByTagName('img');
        _lodash.forEach(imgs, (item, index) => {

            if (item.complete) {

                this.pushImgs(item);
            } else {
                item.onload = () => {

                    this.pushImgs(item);
                };
            }


        });

        //a标签跳转
        let hrefs = document.getElementById('marked').getElementsByTagName('a');

        _lodash.forEach(hrefs, item => {
            const {search} = this.props.location;
            let that = this;
            item.addEventListener('click', function () {
                let fdStart = item.href.indexOf(Web2NativeTag);
                if (fdStart == 0) {
                    if (search.includes('accessToken')) {
                        setTimeout(() => {
                            postMsg(JSON.stringify({route: PostRoute.NATIVE_ROUTE, param: item.href}));
                        }, 300);
                    } else {
                        console.log("that:", that);
                        that.choiceRouter(that, item.href);
                    }

                } else if (fdStart == -1) {
                    return;

                }


            });
        })
    };

    choiceRouter = (that, route) => {

        let lang = that.props.match.params.lang;

        let arr = route.replace(Web2NativeTag, '').split('/');
        let name = arr[0];
        let param = arr[1];
        switch (name) {
            case 'race':
                this.props.history.push(`/race/${param}/${lang}`);
                break;
            case 'mall':
                this.props.history.push(`/products/${param}/${lang}`);
                break;
            case 'news':
                this.props.history.push(`/news/${param}/${lang}`);
                break;
            case 'video':
                this.props.history.push(`/videos/${param}/${lang}`);
                break;
            case 'crowd':
                this.props.history.push(`/crowdfundings/${param}/${lang}`);
                break;

        }
    };


    pushImgs = (item) => {

        this.images.push({
            src: item.src,
            w: item.width,
            h: item.height,
            title: ''

        });
        item.addEventListener('click', () => {
            this.markImageClick(this.images.findIndex(function (img) {
                return img.src === item.src
            }))
        });

    };


    markImageClick = (index) => {

        console.log(index);
        this.setState({
            options: {
                index
            },
            isOpen: true
        })
    };


    renderModel = () => {
        const {options, isOpen} = this.state;
        if (this.images.length > 0)
            return <PhotoSwipe
                isOpen={isOpen}
                items={_lodash.uniqBy(this.images, 'src')}
                options={options}
                onClose={this.handleClose}

            />
    };


    render() {
        const {description} = this.props;
        return (
            <div style={{width: '100%', height: '100%', paddingTop: 10}} className="mark">
                <div id="marked"
                     className="introduceGame" dangerouslySetInnerHTML={this.desc(description)}/>
                <div style={{height: 40}}/>
                {this.renderModel()}
            </div>

        );
    }
}


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'hidden'

    }
}

export default withRouter(MarkDown);