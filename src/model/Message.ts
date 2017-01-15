import { Service } from './Service';
export class Message{
    constructor(public sender:Service,
                public body:String){}

    public get image() : string {
        return "img/" + this.sender.username + ".png";
    }
}