import * as React from "react";
import { extend } from "jquery"
import {Message, Service, API} from "../model/Unifai"
import {MessageComponent} from "../components/MessageComponent"
import {MessageCreator} from "../components/MessageCreator"

export interface ThreadComponentProps {
    style? : React.HTMLAttributes<HTMLElement>
    threadID : string
}

export interface ThreadComponentState {
    messages : Array<Message>
}

export class ThreadComponent extends React.Component<ThreadComponentProps, ThreadComponentState> {
    
    constructor(props:any) {
        super(props);
        this.state = { messages : [] };
    }
    
    render() {
        let rootStyle = {
            
        };
        let creatorStyle = {
            position:"absolute",
            left:0,bottom:0,right:0
        };
        extend(rootStyle, this.props.style);
        return <div style={rootStyle}>
                {this.state.messages.map( msg => <MessageComponent key={msg.id} message={msg}/>)}
                <MessageCreator style={creatorStyle} shouldSendMessage={this.shouldSendMessage}/>
        </div>;
    }

    shouldSendMessage = (msg:string) => {
        API.sendMessageToThread(msg, this.props.threadID)
        .then(
            () => {
                API.getThread(this.props.threadID).then(
                    (messages) => {
                        console.log(messages);
                        this.setState({messages});
                    }
                );   
            }
        )
        .catch(
            () => console.log("sent not OK")
        );
    }

    componentWillReceiveProps(nextProps:ThreadComponentProps) {
        if(nextProps.threadID == undefined) return;
        API.getThread(nextProps.threadID).then(
            (messages) => {
                console.log(messages);
                this.setState({messages});
            }
        );
    }

}