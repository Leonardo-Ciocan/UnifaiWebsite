import {Message} from "./Message"
import {Service} from "./Service"
import * as Mock from "./Mock"
export class API {
    static getServices() : Promise<Array<Service>>{
        return new Promise((resolve,reject) => {
            resolve([
                new Service("Github","github","0, 96, 165"),
                new Service("News","news","165, 0, 0")
            ]);
        });
    }

    static async getFeed() : Promise<Array<Message>> {
        let services = await API.getServices();
        return new Promise<Array<Message>>((resolve,reject) => {
            resolve([
                new Message(services[0], "First message goes right here."),
                new Message(services[1], "Second message goes right here.")
            ]);
        }); 
    }

    static async getThread(id:string) : Promise<Array<Message>> {
        let services = await API.getServices();
        let messages = await Mock.getMessages(Math.floor(30 * Math.random()));
        return new Promise<Array<Message>>((resolve,reject) => {
            resolve(messages);
        }); 
    }

    static getUser() {}
    static getActions() {}
    static getDashboard() {}
    static getCatalog() {}
}