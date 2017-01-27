import { API } from './API';
import {Message} from "./Message"
import {Service} from "./Service"
import * as Mock from "./Mock"

type AuthToken = string
type Username = string
type Nope = ""
export class API {

    static sendMessage(message:string) : Promise<{}> {
        return new Promise((resolve,reject) => {
            $.ajax({
                    url:"http://127.0.0.1:8000/message/",
                    type: "POST",
                    dataType: 'json',
                    data:{content:message},
                    beforeSend: (xhr) => xhr.setRequestHeader('Authorization', "Token " + localStorage["user-token"]),
                    success: ({username}) => resolve(username),
                    error: () => reject("")
                });
        });
    }

    static sendMessageToThread(message:string, threadID:string) : Promise<{}> {
        return new Promise((resolve,reject) => {
            $.ajax({
                    url:"http://127.0.0.1:8000/message/",
                    type: "POST",
                    dataType: 'json',
                    data:{content:message,thread_id:threadID},
                    beforeSend: (xhr) => xhr.setRequestHeader('Authorization', "Token " + localStorage["user-token"]),
                    success: ({username}) => resolve(username),
                    error: () => reject("")
                });
        });
    }

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

    static services : Service[] = []
    static getServices() : Promise<Service[]>{
        return new Promise((resolve,reject) => {
            if (API.services.length > 0) resolve(API.services);
            $.ajax({
                    url: "http://127.0.0.1:8000/services/all/",
                    type: "GET",
                    dataType: 'json',
                    beforeSend: (xhr) => xhr.setRequestHeader('Authorization', "Token " + localStorage["user-token"]),
                    success: (servicesJson) => {
                        API.services = servicesJson.map((json:any) => Service.fromJson(json));
                        resolve(API.services);
                    },
                    error: () => reject()
            });
        });
    }

    static async getFeed() : Promise<Array<Message>> {
        let services = await API.getServices();

        return new Promise<Array<Message>>((resolve,reject) => {
            $.ajax({
                    url: "http://127.0.0.1:8000/feed/",
                    type: "GET",
                    dataType: 'json',
                    beforeSend: (xhr) => xhr.setRequestHeader('Authorization', "Token " + localStorage["user-token"]),
                    success: (feedJson) => {
                        resolve(feedJson.map((json:any) => Message.fromJson(json)))
                    },
                    error: () => reject()
            });
        }); 
    }

    static async getThread(id:string) : Promise<Message[]> {
        let services = await API.getServices();
        return new Promise<Array<Message>>((resolve,reject) => {
            $.ajax({
                    url: "http://127.0.0.1:8000/thread/" + id,
                    type: "GET",
                    dataType: 'json',
                    beforeSend: (xhr) => xhr.setRequestHeader('Authorization', "Token " + localStorage["user-token"]),
                    success: (feedJson) => {
                        resolve(feedJson.map((json:any) => Message.fromJson(json)))
                    },
                    error: () => reject()
            });
        }); 
    }

    static getUser() {}
    static getActions() {}
    static getDashboard() {}
    static getCatalog() {}
}