export class CatalogEntry {
    constructor(public name:string, public message:string, public description:string) {}

    static fromJson(json:any) : CatalogEntry {
        return new this(
            json.name, json.message, json.description
        );
    }
}