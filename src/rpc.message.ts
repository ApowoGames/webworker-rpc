import {webworker_rpc} from "./protocols";

export class RPCParam {
    static createByValue(val): RPCParam {
        if (val === null || val === undefined) {
            return new RPCParam({t: webworker_rpc.ParamType.custom, className: val === null ? "null" : "undefined"});
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

        const constructorName = val.constructor.name;
        if (!CustomDataClasses.has(constructorName)) {
            console.error(constructorName + " not use @RPCData");
            return new RPCParam({t: webworker_rpc.ParamType.custom, className: "null"});
        }
        const customClass = CustomDataClasses.get(constructorName);
        const str = customClass.encode(val);
        return new RPCParam({t: webworker_rpc.ParamType.custom, valStr: str, className: constructorName});
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
                if (!CustomDataClasses.has(this.data.className)) {
                    console.error(this.data.className + " not use @RPCData");
                    return null;
                }
                const customClass = CustomDataClasses.get(this.data.className);
                return customClass.decode(this.data.valStr);
            }
            default: {
                return this.data[this.data.val];
            }
        }
    }
}

const CustomDataClasses: Map<string, any> = new Map();

/*
    装饰自定义传输数据类型。
    使用**静态**encode/decode方法（可覆写）序列化/反序列化数据。
*/
export function RPCData() {
    return (target) => {
        if (!target.encode) {
            target.encode = TemplateData.encode;
        }
        if (!target.decode) {
            target.decode = TemplateData.decode;
        }
        CustomDataClasses.set(target.name, target);
        return target;
    }
}

class TemplateData {
    static encode(obj: TemplateData): string {
        return JSON.stringify(obj);
    }

    static decode(data: string) {
        return JSON.parse(data);
    }
}
