import { API } from './API';
import { Service } from './Service';
export class Message{
    constructor(public id : string,
                public threadID : string,
                public sender:Service,
                public content:string){}

    public get image() : string {
        return "img/" + this.sender.name.toLowerCase() + "@3x.png";
    }

    static fromJson(json:any) : Message {
        return new this(
            json.id,
            json.thread_id,
            Service.getWithName(json.service_id),
            json.content
        );
    }
}