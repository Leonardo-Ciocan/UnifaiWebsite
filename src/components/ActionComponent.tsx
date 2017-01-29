import * as React from "react";
import { extend } from "jquery"
import { Message } from "../model/Unifai"
import { Utils } from '../model/Utils';
import { API } from '../model/API';
import { browserHistory } from 'react-router';

export interface ActionComponentProps {
    name:string
    message:string
}

export class ActionComponent extends React.Component<ActionComponentProps,any> {

    render() {
        let rootStyle = {
            width:"250px",height:"100px",
            background:"rgb("+Utils.extractServiceFromMessage(this.props.message).color+")",margin:"10px",
            borderRadius:"10px", padding:"10px", display:"inline-block",
            cursor:"pointer"
        };
        let titleColor = {
            color:"white", fontWeight:400, fontSize:"14pt",
            borderBottom:"1px solid rgba(0,0,0,0.04)",
            paddingBottom:"10px", textAlign:"center",textWrap:"none"
        };
        let textColor = {fontSize:"11pt",color:"rgba(255,255,255,0.8)", fontWeight:200};
        return <div onClick={this.runAction} className="action" style={rootStyle}>
            <h4 style={titleColor}>{this.props.name}</h4>
            <h5 style={textColor}>{this.props.message}</h5>
        </div>
    }

    runAction = () => {
        API.sendMessage(this.props.message).then(
            () => browserHistory.push("/feed")
        );
    }

}