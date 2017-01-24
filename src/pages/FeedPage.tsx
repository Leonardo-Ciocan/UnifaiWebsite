import * as React from "react";
import {MessageComponent} from "../components/MessageComponent"
import {Message, Service, API} from "../model/Unifai"
import {ThreadComponent} from "../components/ThreadComponent"

export interface FeedPageProps {

}

export interface FeedPageState {
    feed? : Array<Message>
    selectedThread? : string
}

export class FeedPage extends React.Component<FeedPageProps, FeedPageState> {
    constructor(props:any) {
        super(props);
        this.state = { feed : [] };
    }

    render() {
        let rootStyle = {
            height:"100%"
        };
        let feedListStyle = {
            width:"300px", borderRight:"1px solid rgba(0,0,0,0.05)",
            height:"100%"
        };
        let threadStyle = {
            position:"absolute",
            left:"300px",top:0,right:0,bottom:0
        };
        return <div style={rootStyle}>
            <div style={feedListStyle}>
                {this.state.feed.map( msg => <MessageComponent onSelected={this.feedMessageSelected} message={msg}/>)}
            </div>
            <ThreadComponent style={threadStyle} threadID={this.state.selectedThread}/>
        </div>;
    }

    componentDidMount() {
        API.getFeed().then(
            (feed) => this.setState({feed})
        )
    }

    feedMessageSelected = (message:Message) => {
        this.setState({
            selectedThread:""
        })
    }
}