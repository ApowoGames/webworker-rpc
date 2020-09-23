import { webworker_rpc } from "./protocols";
import { RPCExecutor } from "./rpc.message";
export declare function Export(paramTypes?: webworker_rpc.ParamType[]): (target: any, name: any, descriptor: any) => void;
export declare function RemoteListener(worker: string, context: string, event: string, paramTypes?: webworker_rpc.ParamType[]): (target: any, name: any, descriptor: any) => void;
export declare class RPCEmitter {
    private emitFunctions;
    constructor();
    on(event: string, executor: RPCExecutor, worker: string): void;
    off(event: string, executor?: RPCExecutor, worker?: string): void;
    protected emit(event: string, ...args: any[]): void;
}
export declare class RPCPeer extends RPCEmitter {
    ["remote"]: {
        [worker: string]: {
            [context: string]: any;
        };
    };
    name: string;
    private static _instance;
    private readonly MESSAGEKEY_LINK;
    private readonly MESSAGEKEY_REQUESTLINK;
    private readonly MESSAGEKEY_ADDREGISTRY;
    private readonly MESSAGEKEY_GOTREGISTRY;
    private readonly MESSAGEKEY_RUNMETHOD;
    private readonly MESSAGEKEY_Terminate;
    private readonly MANAGERWORKERNAME;
    private worker;
    private registry;
    private channels;
    private linkListeners;
    private linkTasks;
    static getInstance(): RPCPeer;
    constructor(name: string, w?: Worker);
    linkTo(workerName: string, workerUrl?: string): LinkListener;
    linkFinished(): void;
    private linkToWorker;
    private addLink;
    private execute;
    private postRegistry;
    private onMessage_Link;
    private onMessage_AddRegistry;
    private onMessage_GotRegistry;
    private onMessage_RunMethod;
    private executeFunctionByName;
    private addRegistryProperty;
    private getManagerWorkerURL;
}
export declare class LinkListener {
    private readyFunc;
    private port1;
    private port2;
    private port1Ready;
    private port2Ready;
    constructor(port1: string, port2: string);
    onReady(f: () => any): void;
    setPortReady(port: string): void;
}
