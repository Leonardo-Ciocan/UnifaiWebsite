import * as React from "react";
import { extend } from "jquery"
import { Message } from "../model/Unifai"
import {Popover, PopoverInteractionKind, Position, Menu, MenuItem} from "@blueprintjs/core"

interface MessageCreatorProps {
    shouldSendMessage : (message:String) => void
    style? : React.HTMLAttributes<HTMLElement>
}

export class MessageCreator extends React.Component<MessageCreatorProps, any> {
    constructor(p:any) { super(p); this.state={hovering:false}}

    render() {
        let rootStyle = {
            padding:"15px",
            borderBottom:"1px solid rgba(0,0,0,0.05)"
        };
        let textBoxStyle = {
            marginBottom:"5px"
        };
        let popoverContent = <div style={{width:"300px", height:"600px"}}>
            <h4>Catalog</h4>
        </div>;
        extend(rootStyle, this.props.style);
        return <div style={rootStyle}>
            <input onKeyPress={this.keyPress} style={textBoxStyle} className="pt-input pt-fill" placeholder="Ask us anything"/>
             <Popover content={popoverContent}
                     interactionKind={PopoverInteractionKind.CLICK}
                     popoverClassName="pt-popover-content-sizing"
                     position={Position.RIGHT_TOP}
                     useSmartPositioning={false}>
            <button type="button" className="pt-button pt-minimal pt-icon-refresh pt-icon-book"></button>
                     </Popover>
        </div>
    }

    keyPress = (e:any) => {
        if(e.key == "Enter") {
            let tokens = this.getTokens(e.target.value);
            if(tokens.length > 0){
                let first = "<" + tokens[0] + ">";
                let firstPos = e.target.value.indexOf(first);
                e.target.setSelectionRange(firstPos, firstPos + first.length);
            }
            else {
                this.props.shouldSendMessage(e.target.value);
            }
        }
    }

    getTokens(str:string) : string[] {
        var results : string[] = []
        let tokenRegex = /<([^><]+)>/g;
        var match = tokenRegex.exec(str)
        while(match != undefined) {
            for(var i = 1; i < match.length;i ++) {
                results.push(match[i]);
            }
            match = tokenRegex.exec(str);
        }
        return results;
    }
}