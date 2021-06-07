import {ValueResolver} from "./promise";
import {webworker_rpc} from "./protocols";
import {
    RPCParam,
} from "./rpc.message";
import {MANAGERWORKERSPRITE} from "./manager.worker";
import {Writer} from "protobufjs";

// decorator
const ExportedFunctions: Map<string, webworker_rpc.IExecutor[]> = new Map();
const ExportedContexts: Map<string, any> = new Map();
const ExportedClasses: string[] = [];// 等待link之后，递归注册其所有function
const ExportedAttributes: Map<string, string[]> = new Map();// 等待link之后，注册其所有function
const ExportFunction = (target, name, descriptor, paramTypes?: webworker_rpc.ParamType[]) => {
    const context = typeof target === "function" ? target.name + ".constructor" : target.constructor.name;
    const params: webworker_rpc.Param[] = [];
    if (paramTypes !== undefined && paramTypes !== null) {
        for (const pt of paramTypes) {
            params.push(new RPCParam({t: pt}).data);
        }
    }
    AddRPCFunction({method: name, context, params});

    // if (!RPCContexts.has(context)) RPCContexts.set(context, target);
};
const ExportAttribute = (target, name) => {
    const context = typeof target === "function" ? target.name + ".constructor" : target.constructor.name;
    // console.log("webworker-rpc: ExportAttribute: ", context, name, target);

    if (!ExportedAttributes.has(context)) {
        ExportedAttributes.set(context, []);
    }

    ExportedAttributes.get(context).push(name);
}
const ExportClass = (target) => {
    ExportedClasses.push(target.name);
    return target;
}
const AddRPCFunction = (executor: webworker_rpc.IExecutor) => {
    if (!ExportedFunctions.has(executor.context)) {
        ExportedFunctions.set(executor.context, []);
    }
    const arr = ExportedFunctions.get(executor.context);
    const idx = arr.findIndex((x) => x.method === executor.method);
    if (idx < 0) {
        arr.push(executor);
        return true;
    }
    return false;
}

export function Export(paramTypes?: webworker_rpc.ParamType[]) {
    return (target, name?, descriptor?) => {
        if (descriptor !== undefined && descriptor !== null)
            ExportFunction(target, name, descriptor, paramTypes);
        else if (name !== undefined && name !== null)
            ExportAttribute(target, name);
        else
            ExportClass(target);
    }
}

const RPCListeners: Map<string, { context: string, event: string, executor: webworker_rpc.IExecutor }[]> = new Map();

export function RemoteListener(worker: string, context: string, event: string, paramTypes?: webworker_rpc.ParamType[]) {
    return (target, name, descriptor) => {
        ExportFunction(target, name, descriptor, paramTypes);

        const executorContext = typeof target === "function" ? target.name + ".constructor" : target.constructor.name;
        const params: webworker_rpc.Param[] = [];
        if (paramTypes !== undefined && paramTypes !== null) {
            for (const pt of paramTypes) {
                params.push(new RPCParam({t: pt}).data);
            }
        }

        let executor: webworker_rpc.IExecutor = null;
        if (params.length > 0) {
            executor = new webworker_rpc.Executor({method: name, context: executorContext, params});
        } else {
            executor = new webworker_rpc.Executor({method: name, context: executorContext});
        }
        if (!RPCListeners.has(worker)) {
            RPCListeners.set(worker, []);
        }
        RPCListeners.get(worker).push({context, event, executor});
    }
}

const MANAGER_WORKER_NAME: string = "__MANAGER";
const EXCLUDE_PROPERTIES: string[] = ["prototype", "__proto__", "self", "worker", "remote", "getInstance", "_instance"];
const INCLUDE_PROPERTIES: string[] = ["destroy"];

function ExceptClassProperties() {
    return (target, name, descriptor) => {
        for (const key in target) {
            if (!EXCLUDE_PROPERTIES.includes(key)) {
                EXCLUDE_PROPERTIES.push(key);
                // console.log("webworker-rpc: ExceptProperty: ", key);
            }
        }
        for (const key of target.constructor) {
            if (!EXCLUDE_PROPERTIES.includes(key)) {
                EXCLUDE_PROPERTIES.push(key);
                // console.log("webworker-rpc: ExceptProperty: ", key);
            }
        }
    }
}

export class RPCEmitter {
    private emitFunctions: Map<string, { worker: string, executor: webworker_rpc.IExecutor }[]>;

    constructor() {
        this.emitFunctions = new Map();

        // console.log("webworker-rpc: Emitter constructor: ", this);

        ExportedContexts.set(this.constructor.name, this);
        this.checkSuperExport();
    }

    @Export([webworker_rpc.ParamType.str, webworker_rpc.ParamType.executor, webworker_rpc.ParamType.str])
    @ExceptClassProperties()
    public on(event: string, executor: webworker_rpc.IExecutor, worker: string) {
        // console.log("webworker-rpc: on", event, executor, worker, this);

        if (!this.emitFunctions.has(event)) {
            this.emitFunctions.set(event, []);
        }

        this.emitFunctions.get(event).push({worker: worker, executor: executor});
    }

    @Export([webworker_rpc.ParamType.str])
    public off(event: string, executor?: webworker_rpc.IExecutor, worker?: string) {
        if (!this.emitFunctions.has(event)) return;

        if (executor && worker && typeof worker === "string") {
            const executors = this.emitFunctions.get(event);
            const idx = executors.findIndex((x) => x.worker === worker && x.executor === executor);
            if (idx > 0) {
                executors.splice(idx, 0);
            }
        } else {
            this.emitFunctions.delete(event);
        }
    }

    public emit(event: string, ...args) {
        if (!this.emitFunctions.has(event)) return;
        if (!RPCPeer.getInstance()) {
            console.error("webworker-rpc: no peer created");
            return;
        }

        const funs = this.emitFunctions.get(event);
        for (const fun of funs) {
            if (fun.worker in RPCPeer.getInstance().remote) {
                RPCPeer.getInstance().remote[fun.worker][fun.executor.context][fun.executor.method](...args);
            }
        }
    }

    // 父类暴露方法放回子类
    private checkSuperExport() {
        const mClassName = this.constructor.name;
        const mStaticName = mClassName + ".constructor";
        let superObj = Object.getPrototypeOf(this);
        let superClassName = Object.getPrototypeOf(superObj).constructor.name;
        let superStaticName = superClassName + ".constructor";
        while (superClassName !== "Object") {
            // functions
            if (ExportedFunctions.has(superClassName)) {
                const exe = ExportedFunctions.get(superClassName);
                for (const oneExe of exe) {
                    oneExe.context = mClassName;
                }
                ExportedFunctions.delete(superClassName);
                const preExes = ExportedFunctions.get(mClassName) || [];
                ExportedFunctions.set(mClassName, preExes.concat(exe));
            }
            if (ExportedFunctions.has(superStaticName)) {
                const exe = ExportedFunctions.get(superStaticName);
                for (const oneExe of exe) {
                    oneExe.context = mStaticName;
                }
                ExportedFunctions.delete(superStaticName);
                const preExes = ExportedFunctions.get(mStaticName) || [];
                ExportedFunctions.set(mStaticName, preExes.concat(exe));
            }
            // attributes
            if (ExportedAttributes.has(superClassName)) {
                const attrs = ExportedAttributes.get(superClassName);
                ExportedAttributes.delete(superClassName);
                const preAttrs = ExportedAttributes.get(mClassName) || [];
                ExportedAttributes.set(mClassName, preAttrs.concat(attrs));
            }
            if (ExportedAttributes.has(superStaticName)) {
                const attrs = ExportedAttributes.get(superStaticName);
                ExportedAttributes.delete(superStaticName);
                const preAttrs = ExportedAttributes.get(mStaticName) || [];
                ExportedAttributes.set(mStaticName, preAttrs.concat(attrs));
            }
            // classes
            const classIdx = ExportedClasses.indexOf(superClassName);
            if (classIdx >= 0) {
                ExportedClasses.splice(classIdx, 1);
                ExportedClasses.push(mClassName);
            }
            const staticIdx = ExportedClasses.indexOf(superStaticName);
            if (staticIdx >= 0) {
                ExportedClasses.splice(staticIdx, 1);
                ExportedClasses.push(mStaticName);
            }

            superObj = Object.getPrototypeOf(superObj);
            superClassName = Object.getPrototypeOf(superObj).constructor.name;
            superStaticName = superClassName + ".constructor";
        }
    }
}

// 消息传输方式
export enum MsgTransType {
    Obj,
    Transferable,
    SharedArrayBuffer = 2
}

// 各个worker之间通信桥梁
export class RPCPeer extends RPCEmitter {
    ["remote"]: {
        [worker: string]: {
            [context: string]: any
        };
    };// 解决编译时execute报错，并添加提示

    public name: string;

    public static msgTransType: MsgTransType = MsgTransType.Obj;
    private static _instance: RPCPeer;

    private readonly MESSAGEKEY_LINK: string = "link"; // TODO: define type of data
    private readonly MESSAGEKEY_REQUEST_LINK: string = "requestLink"; // TODO: define type of data
    private readonly MESSAGEKEY_PROXY_CREATE_WORKER: string = "proxyCreateWorker";
    private readonly MESSAGEKEY_ADD_REGISTRY: string = "addRegistry";
    private readonly MESSAGEKEY_GOT_REGISTRY: string = "gotRegistry";
    private readonly MESSAGEKEY_EXECUTE: string = "execute";
    private readonly MESSAGEKEY_RESPOND: string = "respond";
    private readonly MESSAGEKEY_UNLINK: string = "unlink";
    private readonly MESSAGEKEY_DESTROY_MANAGER: string = "destroyManager";

    private worker: Worker;
    private registry: Map<string, webworker_rpc.IExecutor[]>;
    private channels: Map<string, MessagePort>;
    private linkListeners: Map<string, LinkListener>;
    private linkTasks: { workerName: string, workerUrl?: string }[];
    private exported: boolean = false;
    private resolvers: Map<number, ValueResolver<any>>;
    private registryPackID: number;
    private resolverID: number;
    private syncRegistryListeners: Map<number, SyncRegistryListener>;

    static create(name: string): RPCPeer {
        RPCPeer._instance = new RPCPeer(name);
        return RPCPeer._instance;
    }

    static getInstance() {
        return RPCPeer._instance;
    }

    static attach(workerName: string, workerUrl?: string, onlyOneWorker?: boolean): LinkListener {
        if (!RPCPeer._instance) {
            console.error("webworker-rpc: RPCPeer not created");
            return null;
        }
        return RPCPeer._instance.attach(workerName, workerUrl, onlyOneWorker);
    }

    static get remote() {
        if (!RPCPeer._instance) {
            console.error("webworker-rpc: RPCPeer not created");
            return null;
        }
        return RPCPeer._instance.remote;
    }

    static exportProperty(attr: any, context: any, attrName?: string): SyncRegistryListener {
        if (!RPCPeer._instance) {
            console.error("webworker-rpc: RPCPeer not created");
            return null;
        }
        return RPCPeer._instance.exportProperty(attr, context, attrName);
    }

    static destroy() {
        if (!RPCPeer._instance) {
            console.error("webworker-rpc: RPCPeer not created");
            return null;
        }
        return RPCPeer._instance.destroy();
    }

    static destroyManagerWorker() {
        if (!RPCPeer._instance) {
            console.error("webworker-rpc: RPCPeer not created");
            return null;
        }
        return RPCPeer._instance.destroyManagerWorker();
    }

    constructor(name: string) {
        super();
        if (typeof MessageChannel === "undefined") {
            console.error("webworker-rpc: MessageChannel undefined");
            return;
        }

        if (typeof SharedArrayBuffer === "undefined") {
            console.warn("webworker-rpc: SharedArrayBuffer is undefined, use ArrayBuffer instead");
            if (RPCPeer.msgTransType === MsgTransType.SharedArrayBuffer) {
                RPCPeer.msgTransType = MsgTransType.Obj;
            }
        }

        if (name === undefined || name === null) {
            console.error("webworker-rpc: param [name] error");
            return;
        }

        if (RPCPeer._instance) {
            console.error(`webworker-rpc: duplicate RPCPeer created: ${name} & ${RPCPeer._instance.name}`);
            return;
        }
        RPCPeer._instance = this;
        console.log("webworker-rpc: new peer: ", name);

        this.name = name;
        this.worker = self as any;
        this.registry = new Map();
        this.channels = new Map();
        this.linkListeners = new Map();
        this.linkTasks = [];
        this.resolvers = new Map();
        this.registryPackID = 0;
        this.resolverID = 0;
        this.syncRegistryListeners = new Map();

        this.worker.addEventListener("message", (ev: MessageEvent) => {
            let data: webworker_rpc.IWebWorkerMessage;
            if ((RPCPeer.msgTransType === MsgTransType.SharedArrayBuffer && ev.data instanceof SharedArrayBuffer) ||
                (RPCPeer.msgTransType === MsgTransType.Transferable && ev.data instanceof ArrayBuffer)) {
                data = webworker_rpc.WebWorkerMessage.decode(new Uint8Array(ev.data));
            } else {
                data = ev.data;
            }
            const {key} = data;
            if (key !== undefined && key === this.MESSAGEKEY_LINK) {// 由父节点发送的消息，除了起始节点，其他的父节点都是ManagerWorker
                this.onMessage_Link(data.dataLink, [].concat(ev.ports));
            }
        });
    }

    @ExceptClassProperties()
    public attach(workerName: string, workerUrl?: string, onlyOneWorker?: boolean): LinkListener {
        if (onlyOneWorker === undefined) {
            onlyOneWorker = false;
        }
        if (this.linkListeners.has(workerName)) {
            console.warn("webworker-rpc: already requested link to " + workerName);
            return this.linkListeners.get(workerName);
        }
        const listener = new LinkListener(this.name, workerName);

        if (onlyOneWorker) {
            if (this.channels.has(workerName)) {
                console.error("webworker-rpc: ONLY_ONE_WORKER mode, already linked " + workerName + ".");
                return listener;
            }
            if (this.channels.size > 0) {
                console.error("webworker-rpc: ONLY_ONE_WORKER mode cannot create another worker. ", this.channels);
                return listener;
            }
            if (typeof Worker === "undefined") {
                console.error("webworker-rpc: " + this.name + " cannot create worker.");
                return listener;
            }
            if (workerUrl === undefined || workerUrl.length === 0) {
                console.error("webworker-rpc: ONLY_ONE_WORKER mode not support undefined workerUrl (besides windows).");
                return listener;
            }
            this.linkListeners.set(workerName, listener);

            const newWorker = new Worker(workerUrl);
            const newChannel = new MessageChannel();

            const linkMsg = new webworker_rpc.WebWorkerMessage({
                key: this.MESSAGEKEY_LINK,
                dataLink: new webworker_rpc.LinkPacket({
                    workers: [this.name]
                })
            });
            this.__send(linkMsg, newWorker, true, [newChannel.port2]);
            this.addChannel(workerName, newChannel.port1);
        } else {
            this.linkListeners.set(workerName, listener);

            if (!this.channels.has(MANAGER_WORKER_NAME)) {
                const selfName = this.worker["name"];
                if (selfName !== undefined && selfName === this.name) {
                    // 这是由ManagerWorker创建的worker，需要等待和ManagerWorker连接完成后再进行linkTo操作
                    this.linkTasks.push({workerName, workerUrl});
                    return listener;
                }

                if (typeof Worker === "undefined") {
                    console.error("webworker-rpc: Worker undefined! can not create manager worker.");
                    return;
                }
                const managerWorkerURL = this.getManagerWorkerURL();
                // console.log("webworker-rpc: " + this.name + " new worker: ", managerWorkerURL, this.MANAGERWORKERNAME);
                const managerWorker = new Worker(managerWorkerURL);
                const managerChannel = new MessageChannel();

                const linkMsg = new webworker_rpc.WebWorkerMessage({
                    key: this.MESSAGEKEY_LINK,
                    dataLink: new webworker_rpc.LinkPacket({
                        workers: [this.name]
                    })
                });
                this.__send(linkMsg, managerWorker, false, [managerChannel.port2]);
                this.addChannel(MANAGER_WORKER_NAME, managerChannel.port1);
            }

            const requestMsg = new webworker_rpc.WebWorkerMessage({
                key: this.MESSAGEKEY_REQUEST_LINK,
                dataRequestLink: new webworker_rpc.RequestLinkPacket({
                    serviceName: this.name,
                    workerName,
                    workerUrl
                })
            });
            this.__send(requestMsg, MANAGER_WORKER_NAME, false);
        }

        return listener;
    }

    public destroyManagerWorker() {
        if (!this.channels.has(MANAGER_WORKER_NAME)) return;
        const msgData = new webworker_rpc.WebWorkerMessage({
            key: this.MESSAGEKEY_DESTROY_MANAGER,
            dataDestroyManager: new webworker_rpc.DestroyManagerPacket({
                serviceName: this.name
            })
        });
        this.__send(msgData, MANAGER_WORKER_NAME, false);
    }

    @Export()
    public destroy() {
        const linkedNames = Array.from(this.channels.keys());
        for (const oneName of linkedNames) {
            // remove listeners
            if (RPCListeners.has(oneName)) {
                const listeners = RPCListeners.get(oneName);
                for (const listener of listeners) {
                    this.remote[oneName][listener.context].off(listener.event, listener.executor, this.name);
                }
            }

            // unlink: remove channel, remove registry
            const messageData = new webworker_rpc.WebWorkerMessage({
                key: this.MESSAGEKEY_UNLINK,
                dataUnlink: new webworker_rpc.UnlinkPacket({
                    serviceName: this.name
                })
            });
            this.__send(messageData, oneName, oneName !== MANAGER_WORKER_NAME);
        }

        if (RPCPeer._instance !== undefined && RPCPeer._instance !== null) RPCPeer._instance = null;

        console.log("webworker-rpc: " + this.name + " closed");
        self.close();
    }

    // 动态暴露属性 注意：若使用了自定义属性名attrName，需要自行管理暴露属性的内存释放(delete context[attrName])
    public exportProperty(attr: any, context: any, attrName?: string): SyncRegistryListener {
        // console.log("webworker-rpc: " + this.name + " export: ", attr, context);
        if (attrName === undefined || attrName === null) {
            for (const key in context) {
                if (Object.prototype.hasOwnProperty.call(context, key)) {
                    const element = context[key];
                    if (element === attr) {
                        attrName = key;
                        // console.log("webworker-rpc: attrName: ", attrName);
                    }
                }
            }
        }
        if (attrName.length === 0) {
            console.error(`webworker-rpc: ${attr} is not in ${context}`);
            return;
        }

        if (context[attrName] !== attr) {
            if (context[attrName] !== undefined && context[attrName] !== null) {
                console.warn(`webworker-rpc: ${attrName} exist, replaced`);
            }

            // TODO: 此处添加了引用，但是没有做释放相关操作
            context[attrName] = attr;
        }

        let existConName = "";
        const existConNames = Array.from(ExportedContexts.keys());
        for (const oneName of existConNames) {
            const oneCon = ExportedContexts.get(oneName);
            if (oneCon === context) {
                existConName = oneName;
                break;
            }
        }

        let conName = existConName;
        if (existConName.length === 0) {
            conName = context.constructor.name;
            if (ExportedContexts.has(conName)) {
                console.error(`webworker-rpc: context name <${conName}> exist`);
                return;
            }
            ExportedContexts.set(conName, context);
        }

        const addExecutors = this.exportObject(attr, conName + "." + attrName, false);
        const linkedNames = Array.from(this.channels.keys());
        this.registryPackID++;
        const listener = new SyncRegistryListener(this.registryPackID, linkedNames);
        this.syncRegistryListeners.set(this.registryPackID, listener);
        for (const oneName of linkedNames) {
            this.postRegistry(oneName, new webworker_rpc.AddRegistryPacket({
                id: this.registryPackID,
                serviceName: this.name,
                executors: addExecutors
            }));
        }
        return listener;
    }

    protected onWorkerUnlinked(worker: string) {
        console.log("webworker-rpc: " + this.name + " onWorkerUnlinked: ", worker);
    }

    // 封装postMessage
    private __send(msg: webworker_rpc.IWebWorkerMessage, target: string | Worker, encode: boolean, ports?: MessagePort[]) {
        let message: any = msg;
        let transferable: Transferable[] = ports === undefined ? [] : ports;
        // let preTime = new Date().getTime();
        if (encode) {
            // console.log("webworker-rpc: Start encode...");

            switch (RPCPeer.msgTransType) {
                case MsgTransType.SharedArrayBuffer: {
                    const u8a = webworker_rpc.WebWorkerMessage.encode(msg).finish();
                    // console.log("webworker-rpc: encode(msg).finish() cost " + (new Date().getTime() - preTime) + "ms.");
                    // preTime = new Date().getTime();
                    const sab = new SharedArrayBuffer(u8a.byteLength);
                    // console.log("webworker-rpc: new SharedArrayBuffer cost " + (new Date().getTime() - preTime) + "ms.");
                    // preTime = new Date().getTime();
                    const u8a_sab = new Uint8Array(sab);
                    // console.log("webworker-rpc: new Uint8Array cost " + (new Date().getTime() - preTime) + "ms.");
                    // preTime = new Date().getTime();
                    u8a_sab.set(u8a, 0);
                    // console.log("webworker-rpc: set(u8a, 0) cost " + (new Date().getTime() - preTime) + "ms.");
                    // preTime = new Date().getTime();
                    message = sab;
                }
                    break;

                case MsgTransType.Transferable: {
                    const u8a = webworker_rpc.WebWorkerMessage.encode(msg).finish();
                    // console.log("webworker-rpc: encode(msg).finish() cost " + (new Date().getTime() - preTime) + "ms.");
                    // preTime = new Date().getTime();
                    const ab = u8a.buffer.slice(u8a.byteOffset, u8a.byteLength + u8a.byteOffset);
                    // console.log("webworker-rpc: u8a.buffer.slice cost " + (new Date().getTime() - preTime) + "ms.");
                    // preTime = new Date().getTime();
                    message = ab;
                    transferable = transferable.concat(ab);
                    // console.log("webworker-rpc: transferable.concat(ab) cost " + (new Date().getTime() - preTime) + "ms.");
                    // preTime = new Date().getTime();
                }
                    break;

                default:
                    break;
            }
        }

        if (typeof target === "string") {
            if (this.channels.has(target)) {
                this.channels.get(target).postMessage(message, transferable);
                // console.log("webworker-rpc: PostMessage completed in " + (new Date().getTime() - preTime) + "ms.");
            }
        } else {
            target.postMessage(message, transferable);
        }
    }

    // 增加worker之间的通道联系
    private addChannel(worker: string, port: MessagePort) {
        if (this.channels.has(worker)) {
            if (this.registry.has(worker)) {
                this.updateLinkState(worker);
            }
            return;
        }
        this.channels.set(worker, port);
        // console.log("webworker-rpc: " + this.name + " addLink: ", worker);
        port.onmessage = (ev: MessageEvent) => {
            let data: webworker_rpc.IWebWorkerMessage;
            if ((RPCPeer.msgTransType === MsgTransType.SharedArrayBuffer && ev.data instanceof SharedArrayBuffer) ||
                (RPCPeer.msgTransType === MsgTransType.Transferable && ev.data instanceof ArrayBuffer)) {
                // console.log("webworker-rpc: Start decode...");
                // const startTime = new Date().getTime();
                data = webworker_rpc.WebWorkerMessage.decode(new Uint8Array(ev.data));
                // const timeTaken = new Date().getTime() - startTime;
                // console.log("webworker-rpc: Decode completed in " + timeTaken + "ms.");
            } else {
                data = ev.data;
            }
            const {key} = data;
            if (key === undefined || key === null) {
                // console.warn("webworker-rpc: <key> not in ev.data");
                return;
            }
            // TODO 使用map结构
            switch (key) {
                case this.MESSAGEKEY_LINK:// 通过port接收到的信息，即ManagerWorker发送的消息
                    this.onMessage_Link(data.dataLink, [].concat(ev.ports));
                    break;
                case this.MESSAGEKEY_ADD_REGISTRY:
                    this.onMessage_AddRegistry(data.dataAddRegistry);
                    break;
                case this.MESSAGEKEY_GOT_REGISTRY:
                    this.onMessage_GotRegistry(data.dataGotRegistry);
                    break;
                case this.MESSAGEKEY_EXECUTE:
                    this.onMessage_Execute(data.dataExecute);
                    break;
                case this.MESSAGEKEY_RESPOND:
                    this.onMessage_Respond(data.dataResponse);
                    break;
                case this.MESSAGEKEY_UNLINK:
                    this.onMessage_Unlink(data.dataUnlink);
                    break;
                case this.MESSAGEKEY_PROXY_CREATE_WORKER:
                    this.onMessage_ProxyCreateWorker(data.dataProxyCreateWorker, [].concat(ev.ports));
                    break;
                default:
                    // console.warn("webworker-rpc: got message outof control: ", ev.data);
                    break;
            }
        };
        // check export all
        this.updateRegistry();

        // post registry
        let allRegistry: webworker_rpc.IExecutor[] = [];
        ExportedFunctions.forEach((exe, con) => {
            for (const rpcExecutor of exe) {
                allRegistry.push(rpcExecutor);
            }
        })
        this.postRegistry(worker, new webworker_rpc.AddRegistryPacket({
            id: this.registryPackID,
            serviceName: this.name,
            executors: allRegistry
        }));

        if (worker === MANAGER_WORKER_NAME) {
            // 执行未进行的attach task
            const taskNum = this.linkTasks.length;
            for (let i = 0; i < taskNum; i++) {
                const task = this.linkTasks.pop();
                const requestMsg = new webworker_rpc.WebWorkerMessage({
                    key: this.MESSAGEKEY_REQUEST_LINK,
                    dataRequestLink: new webworker_rpc.RequestLinkPacket({
                        serviceName: this.name,
                        workerName: task.workerName,
                        workerUrl: task.workerUrl
                    })
                });
                this.__send(requestMsg, MANAGER_WORKER_NAME, false);
            }
        }
    }

    // worker调用其他worker方法
    private execute(worker: string, method: string, context: string, params?: RPCParam[]): Promise<any> {
        // console.log("webworker-rpc: " + this.name + " execute: ", worker, method, context, params);
        if (!this.registry.has(worker)) {
            console.error("webworker-rpc: worker <" + worker + "> not registed");
            return;
        }
        // console.log(this.name + " registry: ", this.registry);
        const executor = this.registry.get(worker).find((x) => x.context === context &&
            x.method === method);
        if (executor === undefined || executor === null) {
            console.error("webworker-rpc: method <" + method + "> not registed");
            return;
        }

        const regParams = executor.params;
        if (regParams && regParams.length > 0) {
            if (!params || params.length === 0) {
                console.error("webworker-rpc: method <" + method + "> execute error! ", "param.length = 0");
                return;
            }

            if (regParams.length > params.length) {
                console.error("webworker-rpc: method <" + method + "> execute error! ", "param not enough");
                return;
            }

            for (let i = 0; i < regParams.length; i++) {
                const regP = regParams[i];
                const remoteP = params[i];
                if (regP.t !== remoteP.data.t) {
                    console.error("webworker-rpc: method <" + method + "> execute error! ", "param type not match, registry: <", webworker_rpc.ParamType[regP.t], ">; execute: <", webworker_rpc.ParamType[remoteP.data.t], ">");
                    return;
                }
            }
        }

        const id = this.resolverID++;
        const holder = new ValueResolver<any>();
        this.resolvers.set(id, holder);
        const paramsData: webworker_rpc.Param[] = [];
        for (const param of params) {
            paramsData.push(param.data);
        }
        return holder.promise(() => {
            const messageData = new webworker_rpc.WebWorkerMessage({
                key: this.MESSAGEKEY_EXECUTE,
                dataExecute: new webworker_rpc.ExecutePacket({
                    id,
                    header: new webworker_rpc.Header({
                        serviceName: this.name,
                        remoteExecutor: new webworker_rpc.Executor({method, context, params: paramsData})
                    })
                })
            });

            this.__send(messageData, worker, true);
        });
    }

    private respond(worker: string, id: number, val?: RPCParam, err?: string) {
        const messageData = new webworker_rpc.WebWorkerMessage({
            key: this.MESSAGEKEY_RESPOND,
            dataResponse: new webworker_rpc.ResponsePacket({id, val: val.data, err})
        });
        this.__send(messageData, worker, true);
    }

    private updateRegistry() {
        if (this.exported) return;
        this.exported = true;
        for (const context of ExportedClasses) {
            if (!ExportedContexts.has(context)) {
                console.error("webworker-rpc: Export only decorate Emitter!");
                continue;
            }

            this.exportObject(ExportedContexts.get(context), context);
        }

        const attributeKeys = Array.from(ExportedAttributes.keys());
        for (const oneKey of attributeKeys) {
            const keyPath = oneKey.split(".");
            const contextStr = keyPath[0];
            if (!ExportedContexts.has(contextStr)) {
                console.error("webworker-rpc: Export only decorate Emitter!");
                continue;
            }
            for (const attr of ExportedAttributes.get(oneKey)) {
                let conObj = ExportedContexts.get(contextStr);
                for (let i = 1; i < keyPath.length; i++) {
                    const p = keyPath[i];
                    conObj = conObj[p];
                }
                if (!(attr in conObj)) {
                    console.error(`webworker-rpc: ${attr} not in `, conObj);
                    continue;
                }
                this.exportObject(conObj[attr], oneKey + "." + attr, false);
            }
        }
    }

    // 通知其他worker添加回调注册表
    private postRegistry(worker: string, registry: webworker_rpc.IAddRegistryPacket) {
        // console.log("webworker-rpc: " + this.name + " postRegistry: ", worker, registry);
        if (worker === MANAGER_WORKER_NAME) return;

        const messageData = new webworker_rpc.WebWorkerMessage({
            key: this.MESSAGEKEY_ADD_REGISTRY,
            dataAddRegistry: registry
        });
        this.__send(messageData, worker, true);
    }

    private onMessage_Link(packet: webworker_rpc.ILinkPacket, ports: MessagePort[]) {
        // console.log("webworker-rpc: " + this.name + " onMessage_Link: ", ev);
        const {workers} = packet;
        for (let i = 0; i < ports.length; i++) {
            const onePort = ports[i];
            const oneWorker = workers[i];
            this.addChannel(oneWorker, onePort);
        }
    }

    private onMessage_AddRegistry(packet: webworker_rpc.IAddRegistryPacket) {
        // console.log("webworker-rpc: " + this.name + " onMessage_AddRegistry:", ev.data);
        const {id, serviceName, executors} = packet;

        if (!this.registry.has(serviceName)) {
            this.registry.set(serviceName, []);
        }
        const newRegistries = this.registry.get(serviceName).concat(executors);
        this.registry.set(serviceName, newRegistries);
        this.addRegistryProperty(packet);

        // send GOT message
        const messageData = new webworker_rpc.WebWorkerMessage({
            key: this.MESSAGEKEY_GOT_REGISTRY,
            dataGotRegistry: new webworker_rpc.GotRegistryPacket({id: id, serviceName: this.name})
        });
        this.__send(messageData, serviceName, true);

        this.updateLinkState(serviceName);

        // add listeners while got registry firstly
        if (RPCListeners.has(serviceName)) {
            const listeners = RPCListeners.get(serviceName);
            for (const listener of listeners) {
                // console.log("webworker-rpc: " + this.name + " remote on, ", this.remote, serviceName, listener);
                this.remote[serviceName][listener.context].on(listener.event, listener.executor, this.name);
            }
            RPCListeners.delete(serviceName);
        }
    }

    private onMessage_GotRegistry(packet: webworker_rpc.IGotRegistryPacket) {
        // console.log("webworker-rpc: " + this.name + " onMessage_GotRegistry:", ev.data);
        const {id, serviceName} = packet;

        if (this.linkListeners.has(serviceName)) {
            const allReady = this.linkListeners.get(serviceName).setPortReady(serviceName);
            if (allReady) {
                this.linkListeners.delete(serviceName);
            }
        }
        if (this.syncRegistryListeners.has(id)) {
            this.syncRegistryListeners.get(id).workerGotRegistry(serviceName);
        }
    }

    private onMessage_Execute(packet: webworker_rpc.IExecutePacket) {
        // console.log("webworker-rpc: " + this.name + " onMessage_Execute:", ev.data);
        const {id, header} = packet;
        const {serviceName, remoteExecutor} = header;

        const params = [];
        if (remoteExecutor.params !== undefined && remoteExecutor.params !== null) {
            for (const param of remoteExecutor.params) {
                const v = new RPCParam(param).getValue();
                // console.log("webworker-rpc: RPCParam.getValue: ", param, v);
                // 参数支持0 undefined
                params.push(v);
            }
        }
        const result = this.executeFunctionByName(remoteExecutor.method, remoteExecutor.context, params);
        if (result instanceof Promise) {
            result.then((val) => {
                this.handlerExcuteResult(serviceName, id, val);
            });
        } else {
            this.handlerExcuteResult(serviceName, id, result);
        }
    }

    private onMessage_Respond(packet: webworker_rpc.IResponsePacket) {
        // console.log("webworker-rpc: " + this.name + " onMessage_Respond:", ev.data);
        const {id, val} = packet;

        if (!this.resolvers.has(id)) {
            console.error("webworker-rpc: response.id undefined: ", id);
            return;
        }

        const resolver = this.resolvers.get(id);
        this.resolvers.delete(id);
        if (packet.hasOwnProperty("err") && packet.err !== undefined && packet.err !== null) {
            console.error("webworker-rpc: get error response: ", packet.err);
            resolver.reject(packet.err);
            return;
        }

        if (val === undefined || val === null) {
            resolver.resolve();
        } else {
            resolver.resolve(new RPCParam(val).getValue());
        }
    }

    private onMessage_Unlink(packet: webworker_rpc.IUnlinkPacket) {
        // console.log("webworker-rpc: " + this.name + " onMessage_Unlink:", ev.data);
        const {serviceName} = packet;

        if (this.channels.has(serviceName)) {
            this.channels.delete(serviceName);
        }
        if (this.registry.has(serviceName)) {
            this.registry.delete(serviceName);
        }
        if (this.remote !== undefined && this.remote !== null && (serviceName in this.remote)) {
            delete this.remote[serviceName];
        }

        this.onWorkerUnlinked(serviceName);
    }

    private onMessage_ProxyCreateWorker(packet: webworker_rpc.IProxyCreateWorkerPacket, ports: MessagePort[]) {
        const {workerName, workerUrl, msg} = packet;

        if (typeof Worker === "undefined") {
            console.error("webworker-rpc: Worker undefined! can not create worker");
            return;
        }

        const path = workerUrl;
        const newWorker = new Worker(path, {name: workerName});
        console.log("webworker-rpc: " + this.name + " create worker: ", path, workerName);
        this.__send(msg, newWorker, true, [].concat(ports));
    }

    private exportObject(obj: any, rootContext: string, recursion = true): webworker_rpc.Executor[] {
        // console.log("webworker-rpc: " + this.name + " exportObject: " + rootContext, obj);
        let addExecutors: webworker_rpc.Executor[] = [];

        for (const key in obj) {
            if (EXCLUDE_PROPERTIES.includes(key) && !INCLUDE_PROPERTIES.includes(key)) continue;

            const element = obj[key];
            // console.log("webworker-rpc: " + this.name + " exportKey: " + key, element);
            if (typeof element === "function") {
                const newExecutor = new webworker_rpc.Executor({method: key, context: rootContext});
                if (AddRPCFunction(newExecutor)) addExecutors.push(newExecutor);
            } else if (recursion && element instanceof Object) {
                const cStr = rootContext.concat(".", key);
                addExecutors = addExecutors.concat(this.exportObject(element, cStr));
            }
        }

        // 静态属性/方法注册
        const rootPath = rootContext.split(".");
        if (rootPath[rootPath.length - 1] !== "constructor") {
            const objCons = obj.constructor;
            const constructorExportResult = this.exportObject(objCons, rootContext + ".constructor", recursion);
            addExecutors = addExecutors.concat(constructorExportResult);
        }

        return addExecutors;
    }

    private executeFunctionByName(functionName: string, context: string, args?: any[]) {
        const con = this.getContext(context);
        if (con === undefined || con === null) {
            console.warn(`webworker-rpc: excute function <${functionName}> error, no context <${context}> exist`);
            return null;
        }
        return con[functionName].apply(con, args);
    }

    private getContext(path: string): any {
        const contexts = path.split(".");
        if (!ExportedContexts.has(contexts[0])) {
            console.error("webworker-rpc: no context exist: ", contexts[0]);
            return null;
        }

        let resultCon = ExportedContexts.get(contexts[0]);
        for (let i = 1; i < contexts.length; i++) {
            const context = contexts[i];
            if (!(context in resultCon)) {
                console.warn(`webworker-rpc: ${context} is undefined in `, resultCon);
                return null;
            }
            resultCon = resultCon[context];
        }
        return resultCon;
    }

    private addRegistryProperty(packet: webworker_rpc.IAddRegistryPacket) {
        if (this.remote === undefined || this.remote === null) this.remote = {};

        const {serviceName, executors} = packet;

        let serviceProp = {};
        if (serviceName in this.remote) {
            serviceProp = this.remote[serviceName];
        } else {
            addProperty(this.remote, serviceName, serviceProp);
        }

        for (const executor of executors) {
            const contexts = executor.context.split(".");
            let methodCon = serviceProp;
            for (const context of contexts) {
                if (context === "constructor") {
                    continue;
                }
                if (!(context in methodCon)) {
                    addProperty(methodCon, context, {});
                }
                methodCon = methodCon[context];
            }

            addProperty(methodCon, executor.method, (...args) => {
                // console.log("webworker-rpc: " + this.name + " call property ", service, executor.method, executor.context);
                const params: RPCParam[] = [];
                if (args !== undefined && args !== null) {
                    for (const arg of args) {
                        params.push(RPCParam.createByValue(arg));
                    }
                }
                // 此处不检测params，检测在typescript层执行
                return this.execute(serviceName, executor.method, executor.context, params);
            });
        }
    }

    private getManagerWorkerURL(): string {
        const resolveString = MANAGERWORKERSPRITE.toString();
        const webWorkerTemplate = `
            self.addEventListener('message', function(e) {
                ((${resolveString})(e));
            });
        `;
        const blob = new Blob([webWorkerTemplate], {type: 'text/javascript'});
        return URL.createObjectURL(blob);
    }

    private updateLinkState(worker: string) {
        if (this.linkListeners.has(worker)) {
            const allReady = this.linkListeners.get(worker).setPortReady(this.name);
            if (allReady) {
                this.linkListeners.delete(worker);
            }
        }
    }

    private handlerExcuteResult(service: string, id: number, result?: any) {
        this.respond(service, id, RPCParam.createByValue(result));
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

    // 仅执行一次
    public onceReady(f: () => any) {
        this.readyFunc = f;
    }

    // TODO: 对外隐藏
    public setPortReady(port: string): boolean {
        if (this.port1 !== port && this.port2 !== port) return false;

        if (!this.port1Ready) this.port1Ready = this.port1 === port;
        if (!this.port2Ready) this.port2Ready = this.port2 === port;

        if (this.port1Ready && this.port2Ready) {
            if (this.readyFunc) {
                this.readyFunc();
                this.readyFunc = null;
            }
            return true;
        }

        return false;
    }
}

export class SyncRegistryListener {
    private readyFunc: () => any;
    private workersState: Map<string, boolean>;

    constructor(private id: number, workers: string[]) {
        this.workersState = new Map();
        for (const w of workers) {
            if (w === MANAGER_WORKER_NAME) {
                continue;
            }
            this.workersState.set(w, false);
        }
    }

    // 仅执行一次
    public onceReady(f: () => any) {
        this.readyFunc = f;
    }

    // TODO: 对外隐藏
    public workerGotRegistry(worker: string) {
        if (!this.workersState.has(worker)) {
            return;
        }

        this.workersState.set(worker, true);

        let allReady = true;
        const workers = Array.from(this.workersState.keys());
        for (const w of workers) {
            if (!this.workersState.get(w)) {
                allReady = false;
                break;
            }
        }

        if (allReady) {
            if (this.readyFunc) {
                this.readyFunc();
                this.readyFunc = null;
            }
        }
    }
}

function addProperty(obj: any, key: string, val: any) {
    if (key in obj) {
        console.warn("webworker-rpc: key exist, add property failed!", obj, key);
        return obj;
    }
    obj[key] = val;
    return obj;
}
