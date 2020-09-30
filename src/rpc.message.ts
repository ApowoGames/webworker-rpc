import { webworker_rpc } from "./protocols";

export class RPCMessage extends webworker_rpc.WebWorkerMessage {
    constructor(key: string, data: webworker_rpc.ExecutePacket | webworker_rpc.RegistryPacket | webworker_rpc.ResponesPacket) {
        super();

        this.key = key;
        if (data instanceof webworker_rpc.RegistryPacket) {
            this.dataRegistry = data;
        } else if (data instanceof webworker_rpc.ExecutePacket) {
            this.dataExecute = data;
        } else if (data instanceof webworker_rpc.ResponesPacket) {
            this.dataResponse = data;
        }
    }
}

export class RPCRegistryPacket extends webworker_rpc.RegistryPacket {
    static checkType(obj) {
        if (!obj) return false;
        if (!("serviceName" in obj)) return false;
        if ("executors" in obj) {
            if (!Array.isArray(obj["executors"])) return false;
            if (obj["executors"].length > 0) {
                for (const one of obj["executors"]) {
                    if (!RPCExecutor.checkType(one)) return false;
                }
            }
        }

        return true;
    }

    constructor(service: string, executors: webworker_rpc.Executor[]) {
        super();
        this.serviceName = service;
        this.executors = executors;
    }
}

// worker调用其他worker方法的数据结构
export class RPCExecutePacket extends webworker_rpc.ExecutePacket {
    static checkType(obj) {
        if (!obj) return false;
        if (!("id" in obj)) return false;
        if (!("header" in obj)) return false;
        const header = obj["header"];
        if (!("serviceName" in header)) return false;
        if (!("remoteExecutor" in header)) return false;
        const remoteExecutor = header["remoteExecutor"];
        if (!RPCExecutor.checkType(remoteExecutor)) return false;

        return true;
    }

    constructor(id: number, service: string, method: string, context: string, params?: webworker_rpc.Param[]) {
        super();

        this.id = id;
        this.header = new webworker_rpc.Header();
        this.header.serviceName = service;
        this.header.remoteExecutor = new webworker_rpc.Executor();
        this.header.remoteExecutor.method = method;
        this.header.remoteExecutor.context = context;
        if (params) this.header.remoteExecutor.params = params;
    }
}

// worker更新方法注册表后通知其他worker的数据结构
export class RPCExecutor extends webworker_rpc.Executor {
    static checkType(obj) {
        if (!obj) return false;
        if (!("method" in obj)) return false;
        if ("params" in obj) {
            if (!Array.isArray(obj["params"])) return false;
            if (obj["params"].length > 0) {
                for (const one of obj["params"]) {
                    if (!RPCParam.checkType(one)) return false;
                }
            }
        }

        return true;
    }

    constructor(method: string, context: string, params?: webworker_rpc.Param[]) {
        super();

        this.method = method;
        if (context) this.context = context;
        if (params) this.params = params;
    }
}

export class RPCParam extends webworker_rpc.Param {
    static checkType(obj) {
        if (!obj) return false;
        if (!("t" in obj)) return false;

        return true;
    }

    static typeOf(val): webworker_rpc.ParamType {
        if (typeof val === "string") {
            return webworker_rpc.ParamType.str;
        } else if (typeof val === "boolean") {
            return webworker_rpc.ParamType.boolean;
        } else if (typeof val === "number") {
            return webworker_rpc.ParamType.num;
        } else if (val.constructor === Uint8Array) {
            return webworker_rpc.ParamType.unit8array;
        } else if (val instanceof webworker_rpc.Executor) {
            return webworker_rpc.ParamType.executor;
        }

        return webworker_rpc.ParamType.UNKNOWN;
    }

    static getValue(param: webworker_rpc.IParam): null | undefined | boolean | number | string | Uint8Array | webworker_rpc.IExecutor {
        switch (param.t) {
            case webworker_rpc.ParamType.boolean:
                return param.valBool;
            case webworker_rpc.ParamType.num:
                return param.valNum;
            case webworker_rpc.ParamType.str:
                return param.valStr;
            case webworker_rpc.ParamType.unit8array:
                return param.valBytes;
            case webworker_rpc.ParamType.executor:
                return param.valExecutor;
            default:
                return null;
        }
    }

    constructor(t: webworker_rpc.ParamType, val?: any) {
        super();

        this.t = t;
        if (val) {
            switch (t) {
                case webworker_rpc.ParamType.str:
                    if (typeof val !== "string") {
                        console.error(`${val} is not type of string`);
                        return;
                    }
                    this.valStr = val;
                    break;
                case webworker_rpc.ParamType.boolean:
                    if (typeof val !== "boolean") {
                        console.error(`${val} is not type of boolean`);
                        return;
                    }
                    this.valBool = val;
                    break;
                case webworker_rpc.ParamType.num:
                    if (typeof val !== "number") {
                        console.error(`${val} is not type of number`);
                        return;
                    }
                    this.valNum = val;
                    break;
                case webworker_rpc.ParamType.unit8array:
                    if (val.constructor !== Uint8Array) {
                        console.error(`${val} is not type of Uint8Array`);
                        return;
                    }
                    this.valBytes = val;
                    break;
                case webworker_rpc.ParamType.executor:
                    if (!(val instanceof webworker_rpc.Executor)) {
                        console.error(`${val} is not type of Executor`);
                        return;
                    }
                    this.valExecutor = val;
                    break;
                default:
                    console.error("unkonw type : ", t);
                    break;
            }
        }
    }
}

export class RPCResponsePacket extends webworker_rpc.ResponesPacket {
    static checkType(obj) {
        if (!obj) return false;
        if (!("id" in obj)) return false;
        if ("vals" in obj) {
            if (!Array.isArray(obj["vals"])) return false;
            if (obj["vals"].length > 0) {
                for (const one of obj["vals"]) {
                    if (!RPCParam.checkType(one)) return false;
                }
            }
        }

        return true;
    }

    constructor(id: number, vals?: webworker_rpc.Param[], err?: string) {
        super();

        this.id = id;
        if (vals) this.vals = vals;
        if (err) this.err = err;
    }
}