export class Interact {
    static AddPeekEntryByModel(model: string | string[] | number[], data: any, options: any) {
        global.exports["vrp-interact"].AddPeekEntryByModel(model, data, options);
    }
    static AddPeekEntryByPolyTarget(event: string, data: any, options: any) {
        global.exports["vrp-interact"].AddPeekEntryByPolyTarget(event, data, options);
    }
}