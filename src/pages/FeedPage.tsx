import * as React from "react";
import {MessageComponent} from "../components/MessageComponent"
import {Message, Service, API} from "../model/Unifai"
import {ThreadComponent} from "../components/ThreadComponent"
import {MessageCreator} from "../components/MessageCreator"
import {Popover, PopoverInteractionKind, Position, Menu, MenuItem} from "@blueprintjs/core"
import {browserHistory} from "react-router"
import { NavigationBar } from '../components/NavigationBar';

export interface FeedPageProps {

}

export interface FeedPageState {
    feed? : Array<Message>
    selectedThread? : string
    username : string
}

export class FeedPage extends React.Component<FeedPageProps, FeedPageState> {
    constructor(props:any) {
        super(props);
        this.state = { feed : [], username:"Loading..." };
    }
    
    render() {
        let rootStyle = {
            height:"100%"
        };
        let feedListStyle = {
            width:"400px", borderRight:"1px solid rgba(0,0,0,0.05)",
            position:"fixed",left:0,bottom:0,top:"50px",
            overflowY:"scroll",
            overflowX:"hidden"
        };
        let threadStyle = {
            position:"fixed",
            left:"400px",top:"50px",right:0,bottom:0,
            overflowY:"scroll",
            overflowX:"hidden"
        };
        
        return <div style={rootStyle}>
            <NavigationBar/>
            <div style={feedListStyle}>
                <MessageCreator shouldSendMessage={this.shouldSendMessage}/>
                {this.state.feed.map( msg => <MessageComponent key={msg.id} onSelected={this.feedMessageSelected} message={msg}/>)}
            </div>
            <ThreadComponent style={threadStyle} threadID={this.state.selectedThread}/>
        </div>;
    }

    shouldSendMessage = (msg:string) => {
        API.sendMessage(msg)
        .then(
            () => {
                this.getFeed()    
            }
        )
        .catch(
            () => console.log("sent not OK")
        );
    }

    getFeed() {
        API.getFeed().then(
            (feed) => {
                console.log(API.services);
                console.log(feed);
                this.setState({feed})
            }
        );
    }

    componentDidMount() {
        this.getFeed();
    }

    feedMessageSelected = (message:Message) => {
        this.setState({
            selectedThread:message.threadID
        })
    }
}