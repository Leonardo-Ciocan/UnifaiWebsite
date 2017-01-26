import {Message} from "./Message"
import {Service} from "./Service"
import * as Mock from "./Mock"

type AuthToken = string
type Username = string
type Nope = ""
export class API {
    static getCurrentUser() : Promise<Username> {
        return new Promise((resolve,reject) => {
            let token = localStorage["user-token"]
            if(token != undefined) {
                $.ajax({
                    url: "http://127.0.0.1:8000/me/",
                    type: "GET",
                    dataType: 'json',
                    beforeSend: (xhr) => xhr.setRequestHeader('Authorization', "Token " + token),
                    success: ({username}) => resolve(username)
                });
            }
            else{
                reject();
            }
        });
    }
    
    static login(username:string, password:string) : Promise<AuthToken> {
        return new Promise((resolve,reject) => {
            $.post(
                "http://127.0.0.1:8000/api-token-auth/",
                 {username, password}
            )
            .done(({token}) => {
                    localStorage["user-token"] = token;
                    resolve(token);
            })
            .fail(() => reject("This username and password do not match"));
        });
    }

    static signup(username:string, email:string, password:string) : Promise<{}> {
        return new Promise((resolve,reject) => {
            $.post(
                "http://127.0.0.1:8000/signup/",
                {
                    username, password, email
                },
                (data) => resolve()
            )
        });
    }

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