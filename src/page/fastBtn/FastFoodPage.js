/**
 * MallInfoPage.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/6/19.
 *
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {weiXinShare, isEmptyObject, strNotNull, isEmptyImg} from '../../service/utils';
import {Images, Colors, NavigationBar} from '../../component';
import '../../css/fastBtn.css';
import {getHotlines} from '../../service/MacauDao';
import RenderItem from "./RenderItem";

export default class FastFoodPage extends Component {

    state = {
        hotlines: []
    }

    goBack = () => {
        this.props.history.goBack()
    };

    componentDidMount(){
        this.refresh();
    }

    refresh = () => {
        getHotlines({page: 1, page_size: 20, line_type: 'fast_food'}, data => {
            console.log("Hotlines:", data);
            this.setState({
                hotlines: data.items
            })
        }, err => {
            console.log("err", err)
        })
    };

    render() {
        const {hotlines} = this.state;
        return (
            <div className="bgContainer">
                <NavigationBar name={'快餐热线'} goBack={this.goBack}/>
                {hotlines.map((item,index)=>{
                    return (
                        <div key={index} >
                            <RenderItem item={item}/>
                            <div style={{height:1,backgroundColor:'#F3F3F3',width:window.screen.width}}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}