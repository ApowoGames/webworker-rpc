import { webworker_rpc } from "./lib/protocols";
import { RPCMessage, RPCExecutor, RPCExecutePacket, RPCParam, RPCRegistryPacket } from "./rpc.message";

export const MESSAGEKEY_INIT: string = "init";
export const MESSAGEKEY_ADDREGISTRY: string = "addRegistry";
export const MESSAGEKEY_GOTREGISTRY: string = "gotRegistry";
export const MESSAGEKEY_RUNMETHOD: string = "runMethod";

// decorater
const RPCFunctions: RPCExecutor[] = [];
const RPCContexts: Map<string, any> = new Map();
export function Export(paramTypes?: webworker_rpc.ParamType[]) {
    return (target, name, descriptor) => {
        console.log("Export: ", target, name, descriptor);
        const context = target.constructor.name;
        if (!RPCContexts.has(context)) RPCContexts.set(context, target);

        const params: RPCParam[] = [];
        if (paramTypes) {
            for (const pt of paramTypes) {
                params.push(new RPCParam(pt));
            }
        }
        if (params.length > 0) {
            RPCFunctions.push(new RPCExecutor(name, context, params));
        } else {
            RPCFunctions.push(new RPCExecutor(name, context));
        }
    };
}
const RPCListeners: Map<string, { context: string, event: string, executor: RPCExecutor }[]> = new Map();
export function RemoteListener(worker: string, context: string, event: string, paramTypes?: webworker_rpc.ParamType[]) {
    return (target, name, descriptor) => {
        //-- Export
        const executorContext = target.constructor.name;
        if (!RPCContexts.has(executorContext)) RPCContexts.set(executorContext, target);

        const params: RPCParam[] = [];
        if (paramTypes) {
            for (const pt of paramTypes) {
                params.push(new RPCParam(pt));
            }
        }
        if (params.length > 0) {
            RPCFunctions.push(new RPCExecutor(name, executorContext, params));
        } else {
            RPCFunctions.push(new RPCExecutor(name, executorContext));
        }
        //--

        // const executorContext = target.constructor.name;

        // const params: RPCParam[] = [];
        // if (paramTypes) {
        //     for (const pt of paramTypes) {
        //         params.push(new RPCParam(pt));
        //     }
        // }
        let executor: RPCExecutor = null;
        if (params.length > 0) {
            executor = new RPCExecutor(name, executorContext, params);
        } else {
            executor = new RPCExecutor(name, executorContext);
        }
        if (!RPCListeners.has(worker)) {
            RPCListeners.set(worker, []);
        }
        RPCListeners.get(worker).push({ context, event, executor });
    }
}

export class RPCEmitter {
    protected emitFunctions: Map<string, { worker: string, executor: RPCExecutor }[]>;

    constructor() {
        this.emitFunctions = new Map();

        console.log("Emitter constructor: ", this);
    }

    // @Export([webworker_rpc.ParamType.str, webworker_rpc.ParamType.executor, webworker_rpc.ParamType.str])
    public on(event: string, executor: RPCExecutor, worker: string) {
        console.log("on", event, executor, worker, this);

        if (!this.emitFunctions.has(event)) {
            this.emitFunctions.set(event, []);
        }

        this.emitFunctions.get(event).push({ worker: worker, executor: executor });
    }

    // @Export([webworker_rpc.ParamType.str])
    public off(event: string, executor?: RPCExecutor, worker?: string) {
        if (!this.emitFunctions.has(event)) return;

        if (executor && executor instanceof RPCExecutor && worker && typeof worker === "string") {
            const executors = this.emitFunctions.get(event);
            const idx = executors.findIndex((x) => x.worker === worker && x.executor === executor);
            if (idx > 0) {
                executors.splice(idx, 0);
            }
        } else {
            this.emitFunctions.delete(event);
        }
    }
}

// 各个worker之间通信桥梁
export class RPCPeer extends RPCEmitter {
    ["remote"]: {
        [worker: string]: {
            [context: string]: any
        };
    };// 解决编译时execute报错，并添加提示

    public name: string;

    private worker: Worker;
    private registry: Map<string, webworker_rpc.IExecutor[]>;
    private channels: Map<string, MessagePort>;
    private linkListeners: Map<string, LinkListener>;

    constructor(name: string, w?: Worker) {
        super();
        if (!name) {
            console.error("param <name> error");
            return;
        }

        this.name = name;
        if (w) {
            this.worker = w;
        } else {
            this.worker = self as any;
        }
        this.registry = new Map();
        this.channels = new Map();
        this.linkListeners = new Map();

        this.worker.onmessage = (ev: MessageEvent) => {
            const { key } = ev.data;
            if (key === MESSAGEKEY_INIT) {
                const { workers } = ev.data;
                const ports = ev.ports;
                for (let i = 0; i < ports.length; i++) {
                    const onePort = ports[i];
                    const oneWorker = workers[i];
                    this.addLink(oneWorker, onePort);
                }
            }
        };

        // TODO 使用实例替换RPCContexts中的全部元素
        RPCContexts.set(this.constructor.name, this);
        RPCFunctions.push(new RPCExecutor("on", this.constructor.name,
            [new RPCParam(webworker_rpc.ParamType.str), new RPCParam(webworker_rpc.ParamType.executor), new RPCParam(webworker_rpc.ParamType.str)]));
        RPCFunctions.push(new RPCExecutor("off", this.constructor.name,
            [new RPCParam(webworker_rpc.ParamType.str)]));


        // console.log(name + " RPCFunctions", RPCFunctions);
        // console.log(name + " RPCContexts", RPCContexts);
        // console.log(name + " RPCListeners", RPCListeners);
    }

    public linkTo(workerName: string, workerUrl: string): LinkListener {
        // TODO: 添加重复创建判定

        const worker = new Worker(workerUrl);
        return this.linkToWorker(workerName, worker);
    }
    public linkToWorker(workerName: string, worker: any): LinkListener {
        // console.log(this.name + " linkToWorker", workerName);
        const listener = new LinkListener(this.name, workerName);
        this.linkListeners.set(workerName, listener);

        const channel = new MessageChannel();

        worker.postMessage({ key: MESSAGEKEY_INIT, workers: [this.name] }, [channel.port2]);
        this.addLink(workerName, channel.port1);

        return listener;
    }

    protected emit(event: string, ...args) {
        if (!this.emitFunctions.has(event)) return;

        const funs = this.emitFunctions.get(event);
        for (const fun of funs) {
            if (fun.worker in this.remote) {
                this.remote[fun.worker][fun.executor.context][fun.executor.method](...args);
            }
        }
    }

    // 增加worker之间的通道联系
    private addLink(worker: string, port: MessagePort) {
        if (this.channels.has(worker)) {
            return;
        }
        this.channels.set(worker, port);
        // console.log(this.name + " addLink: ", worker);
        port.onmessage = (ev: MessageEvent) => {
            const { key } = ev.data;
            if (!key) {
                console.warn("<key> not in ev.data");
                return;
            }
            switch (key) {
                case MESSAGEKEY_ADDREGISTRY:
                    this.onMessage_AddRegistry(ev);
                    break;
                case MESSAGEKEY_GOTREGISTRY:
                    this.onMessage_GotRegistry(ev);
                    break;
                case MESSAGEKEY_RUNMETHOD:
                    this.onMessage_RunMethod(ev);
                    break;
                default:
                    console.warn("got message outof control: ", ev.data);
                    break;
            }
        };
        // post registry
        this.postRegistry(worker, new RPCRegistryPacket(this.name, RPCFunctions));
    }

    // worker调用其他worker方法
    private execute(worker: string, packet: RPCExecutePacket) {
        // console.log(this.name + " execute: ", worker, packet);
        if (!this.registry.has(worker)) {
            console.error("worker <" + worker + "> not registed");
            return;
        }
        const executor = this.registry.get(worker).find((x) => x.context === packet.header.remoteExecutor.context &&
            x.method === packet.header.remoteExecutor.method);
        if (!executor) {
            console.error("method <" + packet.header.remoteExecutor.method + "> not registed");
            return;
        }

        const regParams = executor.params;
        const remoteParams = packet.header.remoteExecutor.params;
        if (regParams && regParams.length > 0) {
            if (!remoteParams || remoteParams.length === 0) {
                console.error("execute param error! ", "param.length = 0");
                return;
            }

            if (regParams.length > remoteParams.length) {
                console.error("execute param error! ", "param not enough");
                return;
            }

            for (let i = 0; i < regParams.length; i++) {
                const regP = regParams[i];
                const remoteP = remoteParams[i];
                if (regP.t !== remoteP.t) {
                    console.error("execute param error! ", "type not match, registry: <", regP.t, ">; execute: <", remoteP.t, ">");
                    return;
                }
            }
        }

        const messageData = new RPCMessage(MESSAGEKEY_RUNMETHOD, packet);
        const buf = webworker_rpc.WebWorkerMessage.encode(messageData).finish().buffer;
        if (this.channels.has(worker)) {
            this.channels.get(worker).postMessage(messageData, [].concat(buf.slice(0)));
        }
    }
    // 通知其他worker添加回调注册表
    private postRegistry(worker: string, registry: RPCRegistryPacket) {
        // console.log(this.name + " postRegistry: ", worker, registry);

        const messageData = new RPCMessage(MESSAGEKEY_ADDREGISTRY, registry);
        const buf = webworker_rpc.WebWorkerMessage.encode(messageData).finish().buffer;
        if (this.channels.has(worker)) {
            const port = this.channels.get(worker);
            port.postMessage(messageData, [].concat(buf.slice(0)));
        }
    }
    private onMessage_AddRegistry(ev: MessageEvent) {
        // console.log(this.name + " onMessage_AddRegistry:", ev.data);
        const { dataRegistry } = ev.data;
        if (!dataRegistry) {
            console.warn("<data> not in ev.data");
            return;
        }
        if (!RPCRegistryPacket.checkType(dataRegistry)) {
            console.warn("<data> type error: ", dataRegistry);
            return;
        }
        const packet: RPCRegistryPacket = dataRegistry as RPCRegistryPacket;
        this.registry.set(packet.serviceName, packet.executors);
        this.addRegistryProperty(packet);

        if (this.channels.has(packet.serviceName)) {
            const port = this.channels.get(packet.serviceName);
            port.postMessage({ key: MESSAGEKEY_GOTREGISTRY, worker: this.name });
        }
        if (this.linkListeners.has(packet.serviceName)) {
            this.linkListeners.get(packet.serviceName).setPortReady(this.name);
        }

        if (RPCListeners.has(packet.serviceName)) {
            const listeners = RPCListeners.get(packet.serviceName);
            for (const listener of listeners) {
                // console.log(this.name + " remote on, ", this.remote, packet.serviceName, listener);
                this.remote[packet.serviceName][listener.context].on(listener.event, listener.executor, this.name);
            }
        }
    }
    private onMessage_GotRegistry(ev: MessageEvent) {
        // console.log(this.name + " onMessage_GotRegistry:", ev.data);
        const { worker } = ev.data;
        if (this.linkListeners.has(worker)) {
            this.linkListeners.get(worker).setPortReady(worker);
        }
    }
    private onMessage_RunMethod(ev: MessageEvent) {
        // console.log(this.name + " onMessage_RunMethod:", ev.data);
        const { dataExecute } = ev.data;
        if (!dataExecute) {
            console.warn("<data> not in ev.data");
            return;
        }
        if (!RPCExecutePacket.checkType(dataExecute)) {
            console.warn("<data> type error: ", dataExecute);
            return;
        }
        const packet: RPCExecutePacket = dataExecute as RPCExecutePacket;

        const remoteExecutor = packet.header.remoteExecutor;

        const params = [];
        if (remoteExecutor.params) {
            for (const param of remoteExecutor.params) {
                switch (param.t) {
                    case webworker_rpc.ParamType.boolean:
                        {
                            params.push(param.valBool);
                        }
                        break;
                    case webworker_rpc.ParamType.num:
                        {
                            params.push(param.valNum);
                        }
                        break;
                    case webworker_rpc.ParamType.str:
                        {
                            params.push(param.valStr);
                        }
                        break;
                    case webworker_rpc.ParamType.unit8array:
                        {
                            params.push(param.valBytes);
                        }
                        break;
                    case webworker_rpc.ParamType.executor:
                        {
                            params.push(param.valExecutor);
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        const result = this.executeFunctionByName(remoteExecutor.method, remoteExecutor.context, params);
        if (result && result instanceof Promise) {
            result.then((...args) => {
                const callbackParams: webworker_rpc.Param[] = [];
                for (const arg of args) {
                    const t = RPCParam.typeOf(arg);
                    if (t !== webworker_rpc.ParamType.UNKNOWN) {
                        callbackParams.push(new RPCParam(t, arg));
                    }
                }

                if (packet.header.callbackExecutor) {
                    const callback = packet.header.callbackExecutor;
                    if (callback.params) {
                        if (callbackParams.length < callback.params.length) {
                            console.error(`not enough data from promise`);
                            return;
                        }
                        for (let i = 0; i < callback.params.length; i++) {
                            const p = callback.params[i];
                            const cp = callbackParams[i];
                            if (p.t !== cp.t) {
                                console.error(`param type not match: <${p.t}> <${cp.t}>`);
                                return;
                            }
                        }
                        this.execute(packet.header.serviceName, new RPCExecutePacket(this.name, callback.method, callback.context, callbackParams));
                    } else {
                        this.execute(packet.header.serviceName, new RPCExecutePacket(this.name, callback.method, callback.context));
                    }
                }
            });
        }
    }

    private executeFunctionByName(functionName: string, context: string, args?: any[]) {
        if (!RPCContexts.has(context)) {
            console.error("no context exit: ", context);
            return null;
        }
        const con = RPCContexts.get(context);
        return con[functionName].apply(con, args);
    }

    private addRegistryProperty(packet: RPCRegistryPacket) {
        const service = packet.serviceName;
        const executors = packet.executors;
        const serviceProp = {};
        for (const executor of executors) {
            if (!(executor.context in serviceProp)) {
                addProperty(serviceProp, executor.context, {});
            }

            addProperty(serviceProp[executor.context], executor.method, (...args) => {
                // console.log(this.name + " call property ", service, executor.method, executor.context);
                const params: RPCParam[] = [];
                let callback = null;// TODO add callback from args
                if (args) {
                    for (const arg of args) {
                        const t = RPCParam.typeOf(arg);
                        if (t === webworker_rpc.ParamType.UNKNOWN) {
                            console.warn("unknown param type: ", arg);
                            continue;
                        }
                        params.push(new RPCParam(t, arg));
                    }
                }
                if (callback) {
                    this.execute(service, new RPCExecutePacket(this.name, executor.method, executor.context, params, callback));
                } else {
                    this.execute(service, new RPCExecutePacket(this.name, executor.method, executor.context, params));
                }
            });
        }

        if (!this.remote) this.remote = {};

        addProperty(this.remote, service, serviceProp);

        // Logger.getInstance().log(this.name + "addRegistryProperty", this);
    }
}

export class LinkListener {
    private readyFunc: () => any;
    private port1: string = "";
    private port2: string = "";
    private port1Ready: boolean = false;
    private port2Ready: boolean = false;

    constructor(port1: string, port2: string) {
        this.port1 = port1;
        this.port2 = port2;
    }

    public onReady(f: () => any) {
        this.readyFunc = f;
    }

    public setPortReady(port: string) {
        if (this.port1 !== port && this.port2 !== port) return;

        if (!this.port1Ready) this.port1Ready = this.port1 === port;
        if (!this.port2Ready) this.port2Ready = this.port2 === port;

        if (this.port1Ready && this.port2Ready) {
            if (this.readyFunc) {
                this.readyFunc();
            }
        }
    }
}

function addProperty(obj: any, key: string, val: any) {
    if (key in obj) {
        console.error("key exits, add property failed!", obj, key);
        return obj;
    }
    obj[key] = val;
    return obj;
}
