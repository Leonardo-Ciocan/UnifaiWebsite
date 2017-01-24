import * as React from "react";
import { extend } from "jquery"
import { Message } from "../model/Unifai"

export interface MessageComponentProps {
}

export interface MessageComponentState {
}

export class MessageCreator extends React.Component<any, any> {
    constructor(p:any) { super(p); this.state={hovering:false}}

    render() {
        let rootStyle = {
            padding:"25px",
            marginRight:"0px",
            position:"relative",
            display:"block",
            cursor:"pointer",
            background:`rgba(0,0,0,${this.state.hovering ? "0.05" : "0"})`
        };
        let serviceNameStyle = {
            display:"inline-block",
            fontFamily:"Helvetica",
            marginBottom:"5px",
            marginLeft:"50px",
            fontWeight:400,
            fontSize:"11pt"
        };
        let bodyStyle = {
            display:"block",
            fontFamily:"Helvetica",
            marginLeft:"50px",
            fontWeight:200,
            fontSize:"10pt",
            marginTop:"3px",
            color:"#737f8d"
        };
        let iconStyle = {
            position:"absolute",
            width:"40px",height:"40px",
            left:"20px",top:"25px", borderRadius:"100%",
            background:`rgb(${this.props.message.sender.color})`
        };
        let timestampStyle = {
            display:"inline-block",
            color:"#99aab5",
            fontFamily:"Helvetica", fontWeight:200,
            fontSize:"9pt", marginLeft:"10px"
        };
        return <div onClick={this.mouseClick} style={rootStyle} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseExit}>
            <div>
                <span style={serviceNameStyle}>{this.props.message.sender.name}</span>
                <span style={timestampStyle}>Today at 13:45</span>            
            </div>
            <span style={bodyStyle}>{this.props.message.body}</span>
            <img style={iconStyle} src={this.props.message.image}/>
        </div>
    }

    mouseEnter = () => this.setState({hovering:true});
    mouseExit = () => this.setState({hovering:false});
    mouseClick = () => this.props.onSelected(this.props.message);
}