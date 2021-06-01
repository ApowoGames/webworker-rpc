import {RPCData} from "../src";

@RPCData()
export class CustomData {
    constructor(private strVal: string,
                private boolVal: boolean,
                private intVal: number) {

    }

    // custom encode / decode
    // static encode(obj: CustomData): string {
    //     return JSON.stringify(obj);
    // }
    //
    // static decode(data: string) {
    //     return JSON.parse(data);
    // }
}
