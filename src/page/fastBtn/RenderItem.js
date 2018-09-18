import React, {Component} from 'react';
import {Colors, Images} from '../../component';
import {} from "../../service/utils";
import '../../css/fastBtn.css';

export default class RenderItem extends Component {

    render() {
        const {item} = this.props;
        return (
            <div style={{
                display:'flex',
                flexDirection: 'row',
                paddingTop: 20,
                paddingBottom: 20,
                alignItems: 'center',
                backgroundColor: 'white',paddingLeft:17,paddingRight:20
            }}>
                <div style={{display:'flex',flexDirection: 'column', width: '80%'}}>
                    <span className="txt2">{item.title}</span>
                    <span className="txt2" style={{marginTop: 6}}>{item.telephone}</span>
                </div>
                <div style={{display:'flex',flex: 1}}/>
                <div onClick={() => {

                }}>
                    <img style={{width:24,height:24}} src={Images.navigation2.hotline}/>
                </div>
            </div>
        )
    }
}