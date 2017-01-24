import { API } from './API';
import { Message } from './Message';
import * as words from "random-words"

export async function getMessages(amount:number) : Promise<Array<Message>> {
    let services = await API.getServices();
    let messages = [...Array(amount).keys()].map(
        n => new Message(services[
            Math.floor(Math.random() * services.length)
        ], words({min: 8, max: 15}).join(" "))
    );
    return new Promise<Array<Message>>((resolve,reject) => {
            resolve(messages);
    }); 
}