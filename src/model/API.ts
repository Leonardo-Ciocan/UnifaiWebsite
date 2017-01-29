import {Message} from "./Message"
import {Service} from "./Service"
import {Action} from "./Action"
import * as Mock from "./Mock"
import { CatalogEntry } from './CatalogEntry';

type AuthToken = string
type Username = string

export var services : Service[] = []

export class API {

    
    static createAction(name:string, message:string) : Promise<{}> {
        return new Promise((resolve,reject) => {
            $.ajax({
                    url:"http://127.0.0.1:8000/action/",
                    type: "POST",
                    dataType: 'json',
                    data:{name, message},
                    beforeSend: (xhr) => xhr.setRequestHeader('Authorization', "Token " + localStorage["user-token"]),
                    success: () => resolve(),
                    error: () => reject("")
            }); 
        });
    }

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

    static getServices() : Promise<Service[]>{
        return new Promise((resolve,reject) => {
            if (services.length > 0) resolve(services);
            $.ajax({
                    url: "http://127.0.0.1:8000/services/all/",
                    type: "GET",
                    dataType: 'json',
                    beforeSend: (xhr) => xhr.setRequestHeader('Authorization', "Token " + localStorage["user-token"]),
                    success: (servicesJson) => {
                        services = servicesJson.map((json:any) => Service.fromJson(json));
                        resolve(services);
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

    static async getActions() : Promise<Action[]> {
        let services = await API.getServices();
        return new Promise<Array<Action>>((resolve,reject) => {
            $.ajax({
                    url: "http://127.0.0.1:8000/action/",
                    type: "GET",
                    dataType: 'json',
                    beforeSend: (xhr) => xhr.setRequestHeader('Authorization', "Token " + localStorage["user-token"]),
                    success: (jsonArray) => {
                        resolve(jsonArray.map((json:any) => Action.fromJson(json)))
                    },
                    error: () => reject()
            });
        }); 
    }

    static async getCatalog() : Promise<{ [key:string]:CatalogEntry[]; }> {
        let services = await API.getServices();
        return new Promise<{ [key:string]:CatalogEntry[]; }>((resolve,reject) => {
            $.ajax({
                    url: "http://127.0.0.1:8000/catalog/",
                    type: "GET",
                    dataType: 'json',
                    beforeSend: (xhr) => xhr.setRequestHeader('Authorization', "Token " + localStorage["user-token"]),
                    success: (rawCatalog) => {
                        let services = Object.keys(rawCatalog)
                        var catalog : { [key:string]:CatalogEntry[]; }  = {}
                        services.forEach(
                            service => catalog[service] = rawCatalog[service].map((json:any) => CatalogEntry.fromJson(json))
                        );
                        resolve(catalog);
                    },
                    error: () => reject()
            });
        }); 
    }
}