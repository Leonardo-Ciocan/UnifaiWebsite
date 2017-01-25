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

    signupUsername : string
    signupEmail : string
    signupPassword : string
}

export class AuthPage extends React.Component<AuthPageProps, AuthPageState> {
    constructor(p:any) {
        super(p);
        this.state = {
            loginUsername : "",
            loginPassword : "",
            signupUsername : "RonaldMD",
            signupEmail : "ronald@mcd.com",
            signupPassword : "cake"
        };
    }

    private toaster: Blueprint.Toaster;
    private refHandlers = {
        toaster: (ref: Blueprint.Toaster) => this.toaster = ref,
    };

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
           <Blueprint.Toaster position={Blueprint.Position.TOP_RIGHT} ref={this.refHandlers.toaster} />
           <div style={innerDivStyle}>
                <img style={logoStyle} src="img/unifai-logo.png"/>
                <Blueprint.Tabs >
                    <Blueprint.TabList className="pt-large">
                        <Blueprint.Tab>Login</Blueprint.Tab>
                        <Blueprint.Tab>Signup</Blueprint.Tab>
                    </Blueprint.TabList>
                    <Blueprint.TabPanel>
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


    componentDidMount() {
        
    }

    signupUsernameChanged = (e:any) => this.setState({signupUsername:e.target.value})
    signupEmailChanged = (e:any) => this.setState({signupUsername:e.target.value})
    signupPasswordChanged = (e:any) => this.setState({signupPassword:e.target.value})
    signupClicked = async () => {
        this.toaster.show({message:"User sucks", intent: Blueprint.Intent.DANGER});
    }

    loginUsernameChanged = (e:any) => this.setState({loginUsername:e.target.value})
    loginPasswordChanged = (e:any) => this.setState({loginPassword:e.target.value})
    loginClicked = async () => {
        console.log("Singing up");
        console.log(await API.login(this.state.loginUsername, this.state.loginPassword));
    }
}