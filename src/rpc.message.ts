import {webworker_rpc} from "./protocols";

export class RPCParam {
    static createByValue(val): RPCParam {
        if (val === null || val === undefined) {
            return new RPCParam({t: webworker_rpc.ParamType.custom, className: val === null ? "null": "undefined"});
        } else if (typeof val === "string") {
            return new RPCParam({t: webworker_rpc.ParamType.str, valStr: val});
        } else if (typeof val === "boolean") {
            return new RPCParam({t: webworker_rpc.ParamType.boolean, valBool: val});
        } else if (typeof val === "number") {
            return new RPCParam({t: webworker_rpc.ParamType.num, valNum: val});
        } else if (val.constructor === Uint8Array) {
            return new RPCParam({t: webworker_rpc.ParamType.unit8array, valBytes: val});
        } else if (val instanceof webworker_rpc.Executor) {
            return new RPCParam({t: webworker_rpc.ParamType.executor, valExecutor: val});
        }

        const customData = val as IRPCCustomData;
        const bytes = customData.encode();
        return new RPCParam({t: webworker_rpc.ParamType.custom, valBytes: bytes, className: val.constructor.name});
    }

    public data: webworker_rpc.Param;

    constructor(properties: webworker_rpc.IParam) {
        this.data = new webworker_rpc.Param(properties);
    }

    public getValue() {
        switch (this.data.t) {
            case webworker_rpc.ParamType.custom: {
                if (this.data.className === "null") {
                    return null;
                }
                if (this.data.className === "undefined") {
                    return undefined;
                }
                if (!RPCCustomClasses.has(this.data.className)) {
                    console.error(this.data.className + " not recorded");
                    return null;
                }
                const customClass = RPCCustomClasses.get(this.data.className);
                return customClass.decode(this.data.valBytes);
            }
            default: {
                return this.data[this.data.val];
            }
        }
    }
}

const RPCCustomClasses: Map<string, RPCCustomData> = new Map();

export function RecordCustomClass() {
    return (target, name, descriptor) => {
        RPCCustomClasses.set(target.constructor.name, target);
        return target;
    }
}

interface IRPCCustomData {
    encode(): Uint8Array;

    decode(data: Uint8Array): IRPCCustomData;
}

export class RPCCustomData implements IRPCCustomData {

    @RecordCustomClass()
    public encode(): Uint8Array {
        return null;
    }

    public decode(data: Uint8Array): RPCCustomData {
        return this;
    }
}
