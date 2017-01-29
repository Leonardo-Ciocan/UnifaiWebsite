export class Action {
    constructor(public id:string, public name:string, public message:string) {}

    static fromJson(json:any) : Action {
        return new this(
            json.id,
            json.name,
            json.message
        );
    }
}