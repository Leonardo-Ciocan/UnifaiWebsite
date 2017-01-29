import { API, services } from './API';
export class Service {
    constructor(public id : string,
                public name:String,
                public color:String) {}
    
    static fromJson(json:any) : Service {
        return new this(
            json.id, json.name, json.colour
        );
    }

    static getWithName(name:string) : Service {
        let fservices = services.filter((s) => s.name == name)
        if(fservices.length > 0) {
            return fservices[0]
        }
        else {
            return new this("-1", "You", "0,0,0")
        }
    }
}