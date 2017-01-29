import { SideBar } from './SideBar';
import * as React from "react"
import { Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';
import { API } from '../model/API';
import { browserHistory } from 'react-router';

export interface NavigationBarProps {

}

export interface NavigationBarState {
    username : string
}

export class NavigationBar extends React.Component<NavigationBarProps,any>{
    state = {
        username : "Loading..."
    };

    render() {
        let popoverContent = (
            <div>
                <button className="pt-button pt-fill pt-minimal pt-popover-dismiss">Settings</button>
                <button className="pt-button pt-fill pt-minimal pt-popover-dismiss">Logout</button>
            </div>
        );
        return <div>
             <nav style={{boxShadow:"none", borderBottom:"1px solid rgba(0,0,0,0.05)"}} className="pt-navbar pt-fixed-top">
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
                    <button className="pt-button pt-minimal pt-icon-home" onClick={this.navigateToHome}>Home</button>
                    <button className="pt-button pt-minimal pt-icon-dashboard">Dashboard</button>
                    <button className="pt-button pt-minimal pt-icon-play" onClick={this.navigateToActions}>Actions</button>
                    <button className="pt-button pt-minimal pt-icon-book" onClick={this.navigateToCatalog}>Catalog</button>
                </div>
                </nav>
        </div>
    }

    componentDidMount() {
        API.getCurrentUser().then(
            (username) => this.setState({username:username})
        )
        .catch(()=> browserHistory.push("/"));
    }

    navigateToHome = () => browserHistory.push("/feed");
    navigateToActions = () => browserHistory.push("/actions");
    navigateToCatalog = () => browserHistory.push("/catalog");
}