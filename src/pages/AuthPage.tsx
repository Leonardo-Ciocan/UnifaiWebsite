import * as React from "react";
import { SideBar } from "../components/SideBar"
import { FeedPage } from "./FeedPage"
import { ActionsPage } from "./ActionsPage"
import { Router, Route, Link, browserHistory } from 'react-router'
import * as Granim from "granim"
import * as Blueprint from "@blueprintjs/core";

export interface AuthPageProps {

}

export class AuthPage extends React.Component<AuthPageProps, undefined> {
    render() {
        let rootStyle = {
            background:"#f9f9f9",
            position:"fixed",
            top:0, left:0, right:0, bottom:0
        };
        return <div style={rootStyle}>
           <h1> Login </h1>
           
           <Blueprint.Dialog isOpen={true}>
                <div>
                <Blueprint.Button>Hello world</Blueprint.Button>
                        <Blueprint.Spinner intent={Blueprint.Intent.PRIMARY}/>                               
                </div>
           </Blueprint.Dialog>
        </div>;
    }

    componentDidMount() {
        
    }
}