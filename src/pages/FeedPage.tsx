import * as React from "react";
import {MessageComponent} from "../components/MessageComponent"
import {Message, Service, API} from "../model/Unifai"
import {ThreadComponent} from "../components/ThreadComponent"
import {Popover, PopoverInteractionKind, Position, Menu, MenuItem} from "@blueprintjs/core"
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
            width:"300px", borderRight:"1px solid rgba(0,0,0,0.05)",
            position:"fixed",left:0,bottom:0,top:"50px"
        };
        let threadStyle = {
            position:"fixed",
            left:"300px",top:"50px",right:0,bottom:0,
            overflowY:"scroll",
            overflowX:"hidden"
        };
        let popoverContent = (
            <div>
                <button className="pt-button pt-fill pt-minimal ">Settings</button>
                <button className="pt-button pt-fill pt-minimal ">Logout</button>
            </div>
        );
        return <div style={rootStyle}>
            <nav className="pt-navbar pt-fixed-top">
                <div className="pt-navbar-group pt-align-right">
                     <Popover content={popoverContent}
                     interactionKind={PopoverInteractionKind.CLICK}
                     popoverClassName="pt-popover-content-sizing"
                     position={Position.BOTTOM_RIGHT}
                     useSmartPositioning={false}>
                    <button className="pt-button pt-minimal pt-icon-user">{this.state.username}</button>
                     </Popover>
                </div>
                <div className="pt-navbar-group pt-align-left">
                    <div className="pt-navbar-heading">Unifai</div>
                    <span className="pt-navbar-divider"></span>
                    <button className="pt-button pt-minimal pt-icon-home">Home</button>
                    <button className="pt-button pt-minimal pt-icon-dashboard">Dashboard</button>
                    <button className="pt-button pt-minimal pt-icon-play">Actions</button>
                    <button className="pt-button pt-minimal pt-icon-book">Catalog</button>
                </div>
                </nav>
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
        API.getCurrentUser().then(
            (username) => this.setState({username:username})
        );
    }

    feedMessageSelected = (message:Message) => {
        this.setState({
            selectedThread:""
        })
    }
}