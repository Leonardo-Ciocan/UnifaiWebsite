import * as React from "react";
import { SideBar } from "../components/SideBar"
import { FeedPage } from "./FeedPage"
import { ActionsPage } from "./ActionsPage"
import { Router, Route, Link, browserHistory } from 'react-router'
import * as Blueprint from "@blueprintjs/core";
import { API } from "../model/Unifai"

export interface AuthPageProps {

}

export interface AuthPageState {
    loginUsername : string
    loginPassword : string
    loginDidFail : boolean

    signupUsername : string
    signupEmail : string
    signupPassword : string
    signupDidFail : boolean
}

export class AuthPage extends React.Component<AuthPageProps, AuthPageState> {
    constructor(p:any) {
        super(p);
        this.state = {
            loginUsername : "",
            loginPassword : "",
            loginDidFail: false,
            signupUsername : "RonaldMD",
            signupEmail : "ronald@mcd.com",
            signupPassword : "cake",
            signupDidFail: false
        };
    }


    render() {
        let rootStyle : React.CSSProperties = {
            background:"#f9f9f9",
            position:"fixed",
            top:0, left:0, right:0, bottom:0,
            display:"flex", alignItems:"top", justifyContent:"center"
        };
        let innerDivStyle = {
            width:"500px", height:"500px", border:"0px solid lightgray",
            padding:"10px"
        };
        let inputStyle = { marginLeft:"-10px", width:"500px", padding:"10px"};
        let logoStyle = {width:"250px", height:"250px",marginLeft:"100px"};
        return <div style={rootStyle}>
           <div style={innerDivStyle}>
                <img style={logoStyle} src="img/unifai-logo.png"/>
                <Blueprint.Tabs >
                    <Blueprint.TabList className="pt-large">
                        <Blueprint.Tab>Login</Blueprint.Tab>
                        <Blueprint.Tab>Signup</Blueprint.Tab>
                    </Blueprint.TabList>
                    <Blueprint.TabPanel>
                        <div style={{display: this.state.loginDidFail ? "block": "none"}} className="pt-callout pt-intent-danger">
                            <h5>Cannot login</h5>
                            The username and apssword don't match
                        </div>
                        <label className="pt-label">
                            Username
                            <input onChange={this.loginUsernameChanged} className="pt-input" type="text" style={inputStyle}/>
                        </label>          
                        <label className="pt-label">
                            Password
                            <input onChange={this.loginPasswordChanged} className="pt-input" type="password" style={inputStyle}/>
                        </label>   
                        <Blueprint.Button onClick={this.loginClicked} style={{marginTop:"10px"}} className="pt-fill">Login</Blueprint.Button>
                    </Blueprint.TabPanel>
                    <Blueprint.TabPanel>
                        <label className="pt-label">
                            Username
                            <input onChange={this.signupUsernameChanged} className="pt-input" type="text" style={inputStyle}/>
                        </label>  
                        <label className="pt-label">
                            Email
                            <input onChange={this.signupEmailChanged} className="pt-input" type="text" style={inputStyle}/>
                        </label>           
                        <label className="pt-label">
                            Password
                            <input onChange={this.signupPasswordChanged} className="pt-input" type="password" style={inputStyle}/>
                        </label>   
                        <Blueprint.Button onClick={this.signupClicked} style={{marginTop:"10px"}} className="pt-fill">Sign up</Blueprint.Button>
                    </Blueprint.TabPanel>
                </Blueprint.Tabs>
           </div>
        </div>;
    }


    async componentDidMount() {
        API.getCurrentUser().then(
            () => browserHistory.push('/feed')
        );
    }

    signupUsernameChanged = (e:any) => this.setState({signupUsername:e.target.value})
    signupEmailChanged = (e:any) => this.setState({signupUsername:e.target.value})
    signupPasswordChanged = (e:any) => this.setState({signupPassword:e.target.value})
    signupClicked = async () => {
        API.signup(this.state.signupUsername, this.state.signupEmail, this.state.loginPassword)
        .then(
            (t) => console.log(t)
        )
        .catch((reason) => this.setState({loginDidFail:true}))
    }

    loginUsernameChanged = (e:any) => this.setState({loginUsername:e.target.value})
    loginPasswordChanged = (e:any) => this.setState({loginPassword:e.target.value})
    loginClicked = async () => {
        API.login(this.state.loginUsername, this.state.loginPassword)
        .then(
            (t) => browserHistory.push('/feed')
        )
        .catch((reason) => this.setState({loginDidFail:true}))
    }
}