import * as React from "react";
import { SideBar } from "../components/SideBar"
import { FeedPage } from "./FeedPage"
import { ActionsPage } from "./ActionsPage"
import { Router, Route, Link, browserHistory } from 'react-router'

export interface UIRootProps {
}

export class UIRoot extends React.Component<UIRootProps, undefined> {
    render() {
        let rootStyle = {
        };
        let SideBarStyle = {
            position:"fixed",
            left:0,top:0,bottom:0,width:"50px"
        };
        let pageStyle = {
            position:"fixed",
            left:"50px",top:0,right:0,bottom:0
        };
        return <div>
            <SideBar style={SideBarStyle}/>
            <div style={pageStyle}>
                <Router history={browserHistory}>
                    <Route path="feed" component={FeedPage}/>
                    <Route path="actions" component={ActionsPage}/>
                </Router>
            </div>
        </div>;
    }
}