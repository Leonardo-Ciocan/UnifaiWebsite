import * as React from "react";
import { NavigationBar } from '../components/NavigationBar';
import { Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';
import { API } from '../model/API';
import { Action } from '../model/Action';
import { ActionComponent } from '../components/ActionComponent';

export class CatalogPage extends React.Component<any,any> {

    render() {
        let rootStyle = {
            paddingTop:"60px"
        };
        return <div style={rootStyle}>
            <NavigationBar/>
            
        </div>;
    }

}