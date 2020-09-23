import { webworker_rpc } from "./protocols";
export declare class RPCMessage extends webworker_rpc.WebWorkerMessage {
    constructor(key: string, data: webworker_rpc.ExecutePacket | webworker_rpc.RegistryPacket);
}
export declare class RPCRegistryPacket extends webworker_rpc.RegistryPacket {
    static checkType(obj: any): boolean;
    constructor(service: string, executors: webworker_rpc.Executor[]);
}
export declare class RPCExecutePacket extends webworker_rpc.ExecutePacket {
    static checkType(obj: any): boolean;
    constructor(service: string, method: string, context?: string, params?: webworker_rpc.Param[], callback?: webworker_rpc.Executor);
}
export declare class RPCExecutor extends webworker_rpc.Executor {
    static checkType(obj: any): boolean;
    constructor(method: string, context: string, params?: webworker_rpc.Param[]);
}
export declare class RPCParam extends webworker_rpc.Param {
    static checkType(obj: any): boolean;
    static typeOf(val: any): webworker_rpc.ParamType;
    constructor(t: webworker_rpc.ParamType, val?: any);
}
