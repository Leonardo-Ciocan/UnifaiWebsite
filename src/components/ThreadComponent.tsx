import * as React from "react";
import { extend } from "jquery"
import {Message, Service, API} from "../model/Unifai"
import {MessageComponent} from "../components/MessageComponent"

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
        extend(rootStyle, this.props.style);
        return <div style={rootStyle}>
                {this.state.messages.map( msg => <MessageComponent message={msg}/>)}
        </div>;
    }

    componentWillReceiveProps(nextProps:ThreadComponentProps) {
        API.getThread(nextProps.threadID).then(
            (messages) => this.setState({messages})
        );
    }

}