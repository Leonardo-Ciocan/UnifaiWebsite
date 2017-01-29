import * as React from "react";
import { NavigationBar } from '../components/NavigationBar';
import { Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';
import { API } from '../model/API';
import { Action } from '../model/Action';
import { ActionComponent } from '../components/ActionComponent';

export interface ActionsPageProps {

}

export interface ActionsPageState {
    newActionName : string
    newActionMessage : string
    actions : Action[]
}

export class ActionsPage extends React.Component<ActionsPageProps, ActionsPageState> {
    state = {
        newActionName : "",
        newActionMessage : "",
        actions : new Array<Action>()
    }
    render() {
        let rootStyle = {
            paddingTop:"60px"
        };
        let inputStyle = {
            width:"300px"
        };
        let popoverContent = <div>
            <label className="pt-label">
                Action name
                <input onChange={this.newActionNameChanged} className="pt-input" type="text" style={inputStyle}/>
            </label> 

            <label className="pt-label">
                Message
                <input onChange={this.newActionMessageChanged} className="pt-input" type="text" style={inputStyle}/>
            </label>

            <button onClick={this.createAction} className="pt-button pt-minimal pt-fill pt-popover-dismiss">Create action</button>
        </div>;
        return <div style={rootStyle}>
            <NavigationBar/>
            <div style={{padding:"15px"}}>
                <h1 style={{float:"left"}}>Actions</h1>
                <Popover content={popoverContent}
                     interactionKind={PopoverInteractionKind.CLICK}
                     popoverClassName="pt-popover-content-sizing"
                     position={Position.BOTTOM}
                     useSmartPositioning={false}>
                        <button style={{marginLeft:"20px"}} className="pt-button pt-minimal pt-icon-plus">New action</button>
                </Popover>
            </div>
            <div className="action-container" >
                { this.state.actions.map((action) => <ActionComponent name={action.name} message={action.message}/>) }
            </div>
        </div>;
    }

    newActionNameChanged = (e:any) => this.setState({newActionName:e.target.value});
    newActionMessageChanged = (e:any) => this.setState({newActionMessage:e.target.value});

    createAction = (e:any) => {
        API.createAction(this.state.newActionName,this.state.newActionMessage)
        .then(
            () => location.reload()
        ).catch(() => console.log("Couldn't create action"));
    }

    componentDidMount() {
        API.getActions().then(
            (actions) => this.setState({actions})
        ).catch(() => console.log("error"));
    }
}