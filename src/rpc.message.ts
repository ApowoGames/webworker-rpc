import { webworker_rpc } from "./protocols";

export class RPCMessage extends webworker_rpc.WebWorkerMessage {
    public encodeable = true;

    constructor(key: string, data: RPCRegistryPacket | RPCExecutePacket | RPCResponsePacket) {
        super();

        this.key = key;
        if (data instanceof RPCRegistryPacket) {
            this.dataRegistry = data;
        } else if (data instanceof RPCExecutePacket) {
            this.dataExecute = data;
            const executor = data.header.remoteExecutor as RPCExecutor;
            if (executor.hasUnknownParam) this.encodeable = false;
        } else if (data instanceof RPCResponsePacket) {
            this.dataResponse = data;
            if (data.hasUnknownParam) this.encodeable = false;
        }
    }
}

export class RPCRegistryPacket extends webworker_rpc.RegistryPacket {
    static checkType(obj) {
        if (!obj) return false;
        if (!("id" in obj)) return false;
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

    constructor(id: number, service: string, executors: webworker_rpc.Executor[]) {
        super();
        this.id = id;
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

    constructor(id: number, service: string, method: string, context: string, params?: RPCParam[]) {
        super();

        this.id = id;
        this.header = new webworker_rpc.Header();
        this.header.serviceName = service;
        this.header.remoteExecutor = new RPCExecutor(method, context, params);
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

    public hasUnknownParam: boolean = false;

    constructor(method: string, context: string, params?: RPCParam[]) {
        super();

        this.method = method;
        if (context) this.context = context;

        if (params) {
            for (const p of params) {
                if (p.t === webworker_rpc.ParamType.UNKNOWN) {
                    this.hasUnknownParam = true;
                    break;
                }
            }

            this.params = params;
        }
    }
}

export class RPCParam extends webworker_rpc.Param {
    static checkType(obj) {
        if (!obj) return false;
        if (!("t" in obj)) return false;

        return true;
    }

    static getValue(param: RPCParam): any | undefined | null {
        switch (param.t) {
            case webworker_rpc.ParamType.UNKNOWN:
                return param.valUnknown;
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

    static createByValue(val): RPCParam {
        if (val === null || val === undefined) {
            return new RPCParam(webworker_rpc.ParamType.UNKNOWN, val);
        } else if (typeof val === "string") {
            return new RPCParam(webworker_rpc.ParamType.str, val);
        } else if (typeof val === "boolean") {
            return new RPCParam(webworker_rpc.ParamType.boolean, val);
        } else if (typeof val === "number") {
            return new RPCParam(webworker_rpc.ParamType.num, val);
        } else if (val.constructor === Uint8Array) {
            return new RPCParam(webworker_rpc.ParamType.unit8array, val);
        } else if (val instanceof webworker_rpc.Executor) {
            return new RPCParam(webworker_rpc.ParamType.executor, val);
        }

        return new RPCParam(webworker_rpc.ParamType.UNKNOWN, val);
    }

    private valUnknown: any;

    constructor(t: webworker_rpc.ParamType, val?: any) {
        super();

        this.t = t;
        switch (t) {
            case webworker_rpc.ParamType.UNKNOWN:
                this.valUnknown = val;
                break;
            case webworker_rpc.ParamType.str:
                this.valStr = val;
                break;
            case webworker_rpc.ParamType.boolean:
                this.valBool = val;
                break;
            case webworker_rpc.ParamType.num:
                this.valNum = val;
                break;
            case webworker_rpc.ParamType.unit8array:
                this.valBytes = val;
                break;
            case webworker_rpc.ParamType.executor:
                this.valExecutor = val;
                break;
            default:
                console.error("unkonw type : ", t);
                break;
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

    public hasUnknownParam: boolean = false;

    constructor(id: number, val?: RPCParam, err?: string) {
        super();

        this.id = id;
        if (val) {
            this.val = val;
            if (val.t === webworker_rpc.ParamType.UNKNOWN) {
                this.hasUnknownParam = true;
            }
        }
        if (err) this.err = err;
    }
}