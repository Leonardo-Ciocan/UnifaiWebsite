import * as React from "react";
import { extend } from "jquery"

export interface SideBarProps {
    style? : React.HTMLAttributes<HTMLElement>
}

export class SideBar extends React.Component<SideBarProps, undefined> {
    render() {
        let rootStyle = {
            background:"rgb(49, 50, 51)"
        };
        extend(rootStyle, this.props.style);
        return <div style={rootStyle}>
        
        </div>;
    }
}