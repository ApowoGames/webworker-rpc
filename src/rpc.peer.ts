import {ValueResolver} from "./promise";
import {webworker_rpc} from "./protocols";
import {RPCMessage, RPCExecutor, RPCExecutePacket, RPCParam, RPCRegistryPacket, RPCResponsePacket} from "./rpc.message";

// decorator
const RPCFunctions: RPCExecutor[] = [];
const RPCContexts: Map<string, any> = new Map();
const RPCClasses: string[] = [];// 等待link之后，递归注册其所有function
const RPCAttributes: Map<string, string[]> = new Map();// 等待link之后，注册其所有function
const ExportFunction = (target, name, descriptor, paramTypes?: webworker_rpc.ParamType[]) => {
    const context = typeof target === "function" ? target.name + ".constructor" : target.constructor.name;
    const params: RPCParam[] = [];
    if (paramTypes !== undefined && paramTypes !== null) {
        for (const pt of paramTypes) {
            params.push(new RPCParam(pt));
        }
    }
    AddRPCFunction(new RPCExecutor(name, context, params));

    // if (!RPCContexts.has(context)) RPCContexts.set(context, target);
};
const ExportAttribute = (target, name) => {
    const context = typeof target === "function" ? target.name + ".constructor" : target.constructor.name;
    // console.log("ExportAttribute: ", context, name, target);

    if (!RPCAttributes.has(context)) {
        RPCAttributes.set(context, []);
    }

    RPCAttributes.get(context).push(name);
}
const AddRPCFunction = (executor: RPCExecutor) => {
    // TODO: 优化push效率
    const idx = RPCFunctions.findIndex((x) => x.method === executor.method && x.context === executor.context);
    if (idx < 0) {
        RPCFunctions.push(executor);
        // console.log("AddRPCFunction", executor);
        return true;
    }
    return false;
}

export function ExportAll() {
    return (target) => {
        RPCClasses.push(target.name);
        return target;
    }
}

export function Export(paramTypes?: webworker_rpc.ParamType[]) {
    return (target, name, descriptor?) => {
        if (descriptor !== undefined && descriptor !== null)
            ExportFunction(target, name, descriptor, paramTypes);
        else
            ExportAttribute(target, name);
    }
}

const RPCListeners: Map<string, { context: string, event: string, executor: RPCExecutor }[]> = new Map();

export function RemoteListener(worker: string, context: string, event: string, paramTypes?: webworker_rpc.ParamType[]) {
    return (target, name, descriptor) => {
        ExportFunction(target, name, descriptor, paramTypes);

        const executorContext = typeof target === "function" ? target.name + ".constructor" : target.constructor.name;
        const params: RPCParam[] = [];
        if (paramTypes !== undefined && paramTypes !== null) {
            for (const pt of paramTypes) {
                params.push(new RPCParam(pt));
            }
        }

        let executor: RPCExecutor = null;
        if (params.length > 0) {
            executor = new RPCExecutor(name, executorContext, params);
        } else {
            executor = new RPCExecutor(name, executorContext);
        }
        if (!RPCListeners.has(worker)) {
            RPCListeners.set(worker, []);
        }
        RPCListeners.get(worker).push({context, event, executor});
    }
}

const MANAGERWORKERNAME: string = "__MANAGER";
// manager worker sprite
const MANAGERWORKERSPRITE = (ev) => {
    if (typeof MessageChannel === "undefined") {
        console.error("MessageChannel undefined");
        return;
    }

    const MESSAGEKEY_LINK: string = "link";
    const MESSAGEKEY_REQUESTLINK: string = "requestLink";
    const MESSAGEKEY_PROXYCREATEWORKER: string = "proxyCreateWorker";
    const MESSAGEKEY_UNLINK: string = "unlink";
    const MESSAGEKEY_DESTROYMANAGER: string = "destroyManager";
    const MANAGERWORKERNAME: string = "__MANAGER";

    const channels: Map<string, MessagePort> = new Map();
    let windowsPort: MessagePort = null;

    const addLink = (worker: string, port: MessagePort) => {
        if (channels.has(worker)) {
            return;
        }
        if (channels.size === 0) {
            // 建立的第一个连接 必然是Windows发来的
            windowsPort = port;
        }
        channels.set(worker, port);
        port.onmessage = (ev: MessageEvent) => {
            const {key} = ev.data;
            if (key === undefined || key === null) {
                return;
            }
            // TODO 使用map结构
            switch (key) {
                case MESSAGEKEY_REQUESTLINK:
                    onMessage_RequestLink(ev);
                    break;
                case MESSAGEKEY_UNLINK:
                    onMessage_Unlink(ev);
                    break;
                case MESSAGEKEY_DESTROYMANAGER:
                    onMessage_Destroy(ev);
                    break;
                default:
                    break;
            }
        };
    }

    const onMessage_Link = (_ev: MessageEvent) => {
        const {workers} = _ev.data;
        const ports = _ev.ports;
        for (let i = 0; i < ports.length; i++) {
            const onePort = ports[i];
            const oneWorker = workers[i];
            addLink(oneWorker, onePort);
        }
    }

    const onMessage_RequestLink = (_ev: MessageEvent) => {
        // console.log("onMessage_RequestLink ", _ev.data);
        const {serviceName, workerName, workerUrl} = _ev.data;
        const service2TarChannel = new MessageChannel();

        if (!channels.has(serviceName)) {
            console.error(MANAGERWORKERNAME + " not yet link to " + serviceName);
            return;
        }
        channels.get(serviceName).postMessage({
            key: MESSAGEKEY_LINK,
            workers: [workerName]
        }, [service2TarChannel.port1]);

        if (channels.has(workerName)) {
            channels.get(workerName).postMessage({
                key: MESSAGEKEY_LINK,
                workers: [serviceName]
            }, [service2TarChannel.port2]);
        } else {
            if (workerUrl === undefined || workerUrl === null) {
                console.error("worker url undefined");
                return;
            }

            const manager2TarChannel = new MessageChannel();
            // if (typeof Worker === "undefined") {
            // ios worker中不能创建worker，转交Windows创建
            if (windowsPort === undefined || windowsPort === null) return;

            windowsPort.postMessage({
                key: MESSAGEKEY_PROXYCREATEWORKER,
                workerName: workerName,
                workerUrl: workerUrl,
                msg: {key: MESSAGEKEY_LINK, workers: [MANAGERWORKERNAME, serviceName]}
            }, [manager2TarChannel.port2, service2TarChannel.port2]);
            // } else {
            //     const tarWorker = new Worker(location.origin + workerUrl, { name: workerName });
            //     console.log(MANAGERWORKERNAME + " new worker: ", location.origin + workerUrl, workerName);

            //     tarWorker.postMessage({ key: MESSAGEKEY_LINK, workers: [MANAGERWORKERNAME, serviceName] }, [manager2TarChannel.port2, service2TarChannel.port2]);
            // }
            addLink(workerName, manager2TarChannel.port1);
        }
    }

    const onMessage_Unlink = (_ev: MessageEvent) => {
        const {worker} = _ev.data;
        if (channels.has(worker)) {
            channels.delete(worker);
        }

        // console.log(MANAGERWORKERNAME + " unlink: ", channels);
    }

    const onMessage_Destroy = (_ev: MessageEvent) => {
        const linkedNames = Array.from(channels.keys());
        for (const oneName of linkedNames) {
            const w = channels.get(oneName);
            w.postMessage({key: MESSAGEKEY_UNLINK, worker: MANAGERWORKERNAME});
        }
        self.close();
    }

    const {key} = ev.data;
    switch (key) {
        case MESSAGEKEY_LINK:
            onMessage_Link(ev);
            break;

        default:
            break;
    }
}

const EXCLUDEPROPERTIES: string[] = ["prototype", "__proto__", "self", "worker", "remote", "getInstance", "_instance"];
const INCLUDEPROPERTIES: string[] = ["destroy"];

function ExceptClassProperties() {
    return (target, name, descriptor) => {
        for (const key in target) {
            if (!EXCLUDEPROPERTIES.includes(key)) {
                EXCLUDEPROPERTIES.push(key);
                // console.log("ExceptProperty: ", key);
            }
        }
        for (const key of target.constructor) {
            if (!EXCLUDEPROPERTIES.includes(key)) {
                EXCLUDEPROPERTIES.push(key);
                // console.log("ExceptProperty: ", key);
            }
        }
    }
}

export class RPCEmitter {
    private emitFunctions: Map<string, { worker: string, executor: RPCExecutor }[]>;

    constructor() {
        this.emitFunctions = new Map();

        // console.log("Emitter constructor: ", this);

        RPCContexts.set(this.constructor.name, this);
        this.exportFunction("on",
            [new RPCParam(webworker_rpc.ParamType.str), new RPCParam(webworker_rpc.ParamType.executor), new RPCParam(webworker_rpc.ParamType.str)]);
        this.exportFunction("off",
            [new RPCParam(webworker_rpc.ParamType.str)]);
    }

    // @Export([webworker_rpc.ParamType.str, webworker_rpc.ParamType.executor, webworker_rpc.ParamType.str])
    @ExceptClassProperties()
    public on(event: string, executor: RPCExecutor, worker: string) {
        // console.log("on", event, executor, worker, this);

        if (!this.emitFunctions.has(event)) {
            this.emitFunctions.set(event, []);
        }

        this.emitFunctions.get(event).push({worker: worker, executor: executor});
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

    public emit(event: string, ...args) {
        if (!this.emitFunctions.has(event)) return;
        if (!RPCPeer.getInstance()) {
            console.error("no peer created");
            return;
        }

        const funs = this.emitFunctions.get(event);
        for (const fun of funs) {
            if (fun.worker in RPCPeer.getInstance().remote) {
                RPCPeer.getInstance().remote[fun.worker][fun.executor.context][fun.executor.method](...args);
            }
        }
    }

    // 用于基类构造中暴露方法
    protected exportFunction(funcName: string, params?: RPCParam[]): boolean {
        return AddRPCFunction(new RPCExecutor(funcName, this.constructor.name, params));
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

    private static _instance: RPCPeer;

    private readonly MESSAGEKEY_LINK: string = "link"; // TODO: define type of data
    private readonly MESSAGEKEY_REQUESTLINK: string = "requestLink"; // TODO: define type of data
    private readonly MESSAGEKEY_ADDREGISTRY: string = "addRegistry";
    private readonly MESSAGEKEY_GOTREGISTRY: string = "gotRegistry";
    private readonly MESSAGEKEY_EXECUTE: string = "execute";
    private readonly MESSAGEKEY_RESPOND: string = "respond";
    private readonly MESSAGEKEY_UNLINK: string = "unlink";
    private readonly MESSAGEKEY_PROXYCREATEWORKER: string = "proxyCreateWorker";
    private readonly MESSAGEKEY_DESTROYMANAGER: string = "destroyManager";

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

    static getInstance() {
        return RPCPeer._instance;
    }

    constructor(name: string) {
        super();
        if (typeof MessageChannel === "undefined") {
            console.error("MessageChannel undefined");
            return;
        }

        if (name === undefined || name === null) {
            console.error("param <name> error");
            return;
        }

        if (RPCPeer._instance) {
            console.error(`duplicate RPCPeer created: ${name} & ${RPCPeer._instance.name}`);
            return;
        }
        RPCPeer._instance = this;
        console.log("webworker-rpc: new peer: ", name);

        this.exportFunction("destroy");

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
            const {key} = ev.data;
            if (key !== undefined && key === this.MESSAGEKEY_LINK) {// 由父节点发送的消息，除了起始节点，其他的父节点都是ManagerWorker
                this.onMessage_Link(ev);
            }
        });
    }

    @ExceptClassProperties()
    public linkTo(workerName: string, workerUrl?: string): LinkListener {
        if (this.linkListeners.has(workerName)) {
            console.warn("already requested link to " + workerName);
            return this.linkListeners.get(workerName);
        }

        const listener = new LinkListener(this.name, workerName);
        this.linkListeners.set(workerName, listener);

        if (!this.channels.has(MANAGERWORKERNAME)) {
            const selfName = this.worker["name"];
            if (selfName !== undefined && selfName === this.name) {
                // 这是由ManagerWorker创建的worker，需要等待和ManagerWorker连接完成后再进行linkTo操作
                this.linkTasks.push({workerName, workerUrl});
                return listener;
            }

            if (typeof Worker === "undefined") {
                console.error("Worker undefined! can not create manager worker.");
                return;
            }
            const managerWorkerURL = this.getManagerWorkerURL();
            // console.log(this.name + " new worker: ", managerWorkerURL, this.MANAGERWORKERNAME);
            const managerWorker = new Worker(managerWorkerURL);
            const managerChannel = new MessageChannel();

            managerWorker.postMessage({key: this.MESSAGEKEY_LINK, workers: [this.name]}, [managerChannel.port2]);
            this.addLink(MANAGERWORKERNAME, managerChannel.port1);
        }

        this.channels.get(MANAGERWORKERNAME).postMessage({
            key: this.MESSAGEKEY_REQUESTLINK,
            serviceName: this.name,
            workerName,
            workerUrl
        });

        return listener;
    }

    public destroyManagerWorker() {
        if (!this.channels.has(MANAGERWORKERNAME)) return;
        const w = this.channels.get(MANAGERWORKERNAME);
        w.postMessage({key: this.MESSAGEKEY_DESTROYMANAGER});
    }

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
            const w = this.channels.get(oneName);
            w.postMessage({key: this.MESSAGEKEY_UNLINK, worker: this.name});
        }

        if (RPCPeer._instance !== undefined && RPCPeer._instance !== null) RPCPeer._instance = null;
        self.close();
    }

    // 动态暴露属性 注意：若使用了自定义属性名attrName，需要自行管理暴露属性的内存释放(delete context[attrName])
    public exportProperty(attr: any, context: any, attrName?: string): SyncRegistryListener {
        // console.log(this.name + " export: ", attr, context);
        if (attrName === undefined || attrName === null) {
            for (const key in context) {
                if (Object.prototype.hasOwnProperty.call(context, key)) {
                    const element = context[key];
                    if (element === attr) {
                        attrName = key;
                        // console.log("attrName: ", attrName);
                    }
                }
            }
        }
        if (attrName.length === 0) {
            console.error(`${attr} is not in ${context}`);
            return;
        }

        if (context[attrName] !== attr) {
            if (context[attrName] !== undefined && context[attrName] !== null) {
                console.warn(`${attrName} exist, replaced`);
            }

            // TODO: 此处添加了引用，但是没有做释放相关操作
            context[attrName] = attr;
        }

        let existConName = "";
        const existConNames = Array.from(RPCContexts.keys());
        for (const oneName of existConNames) {
            const oneCon = RPCContexts.get(oneName);
            if (oneCon === context) {
                existConName = oneName;
                break;
            }
        }

        let conName = existConName;
        if (existConName.length === 0) {
            conName = context.constructor.name;
            if (RPCContexts.has(conName)) {
                console.error(`context name <${conName}> exist`);
                return;
            }
            RPCContexts.set(conName, context);
        }

        const addExecutors = this.exportObject(attr, conName + "." + attrName, false);
        const linkedNames = Array.from(this.channels.keys());
        this.registryPackID++;
        const listener = new SyncRegistryListener(this.registryPackID, linkedNames);
        this.syncRegistryListeners.set(this.registryPackID, listener);
        for (const oneName of linkedNames) {
            this.postRegistry(oneName, new RPCRegistryPacket(this.registryPackID, this.name, addExecutors));
        }
        return listener;
    }

    // 增加worker之间的通道联系
    private addLink(worker: string, port: MessagePort) {
        if (this.channels.has(worker)) {
            if (this.registry.has(worker)) {
                this.updateLinkState(worker);
            }
            return;
        }
        this.channels.set(worker, port);
        // console.log(this.name + " addLink: ", worker);
        port.onmessage = (ev: MessageEvent) => {
            const {key} = ev.data;
            if (key === undefined || key === null) {
                // console.warn("<key> not in ev.data");
                return;
            }
            // TODO 使用map结构
            switch (key) {
                case this.MESSAGEKEY_LINK:// 通过port接收到的信息，即ManagerWorker发送的消息
                    this.onMessage_Link(ev);
                    break;
                case this.MESSAGEKEY_ADDREGISTRY:
                    this.onMessage_AddRegistry(ev);
                    break;
                case this.MESSAGEKEY_GOTREGISTRY:
                    this.onMessage_GotRegistry(ev);
                    break;
                case this.MESSAGEKEY_EXECUTE:
                    this.onMessage_Execute(ev);
                    break;
                case this.MESSAGEKEY_RESPOND:
                    this.onMessage_Respond(ev);
                    break;
                case this.MESSAGEKEY_UNLINK:
                    this.onMessage_Unlink(ev);
                    break;
                case this.MESSAGEKEY_PROXYCREATEWORKER:
                    this.onMessage_ProxyCreateWorker(ev);
                    break;
                default:
                    // console.warn("got message outof control: ", ev.data);
                    break;
            }
        };
        // check export all
        this.updateRegistry();

        // post registry
        this.postRegistry(worker, new RPCRegistryPacket(this.registryPackID, this.name, RPCFunctions));

        if (worker === MANAGERWORKERNAME) {
            // 执行未进行的linkTo task
            const taskNum = this.linkTasks.length;
            for (let i = 0; i < taskNum; i++) {
                const task = this.linkTasks.pop();
                this.channels.get(MANAGERWORKERNAME).postMessage({
                    key: this.MESSAGEKEY_REQUESTLINK,
                    serviceName: this.name,
                    workerName: task.workerName,
                    workerUrl: task.workerUrl
                });
            }
        }
    }

    // worker调用其他worker方法
    private execute(worker: string, method: string, context: string, params?: RPCParam[]): Promise<any> {
        // console.log(this.name + " execute: ", worker, method, context, params);
        if (!this.registry.has(worker)) {
            console.error("worker <" + worker + "> not registed");
            return;
        }
        // console.log(this.name + " registry: ", this.registry);
        const executor = this.registry.get(worker).find((x) => x.context === context &&
            x.method === method);
        if (executor === undefined || executor === null) {
            console.error("method <" + method + "> not registed");
            return;
        }

        const regParams = executor.params;
        if (regParams && regParams.length > 0) {
            if (!params || params.length === 0) {
                console.error("method <" + method + "> execute error! ", "param.length = 0");
                return;
            }

            if (regParams.length > params.length) {
                console.error("method <" + method + "> execute error! ", "param not enough");
                return;
            }

            for (let i = 0; i < regParams.length; i++) {
                const regP = regParams[i];
                const remoteP = params[i];
                if (regP.t !== remoteP.t) {
                    console.error("method <" + method + "> execute error! ", "param type not match, registry: <", webworker_rpc.ParamType[regP.t], ">; execute: <", webworker_rpc.ParamType[remoteP.t], ">");
                    return;
                }
            }
        }

        const id = this.resolverID++;
        const holder = new ValueResolver<any>();
        this.resolvers.set(id, holder);
        return holder.promise(() => {
            const messageData = new RPCMessage(this.MESSAGEKEY_EXECUTE, new RPCExecutePacket(id, this.name, method, context, params));
            if (messageData.encodeable) {
                const buf = webworker_rpc.WebWorkerMessage.encode(messageData).finish().buffer;
                if (this.channels.has(worker)) {
                    this.channels.get(worker).postMessage(messageData, [].concat(buf.slice(0)));
                }
            } else {
                if (this.channels.has(worker)) {
                    this.channels.get(worker).postMessage(messageData);
                }
            }
        });
    }

    private respond(worker: string, id: number, val?: RPCParam, err?: string) {
        const messageData = new RPCMessage(this.MESSAGEKEY_RESPOND, new RPCResponsePacket(id, val, err));
        if (messageData.encodeable) {
            const buf = webworker_rpc.WebWorkerMessage.encode(messageData).finish().buffer;
            if (this.channels.has(worker)) {
                this.channels.get(worker).postMessage(messageData, [].concat(buf.slice(0)));
            }
        } else {
            if (this.channels.has(worker)) {
                this.channels.get(worker).postMessage(messageData);
            }
        }
    }

    private updateRegistry() {
        if (this.exported) return;
        this.exported = true;
        // console.log(this.name + " checkedExportAll");
        for (const context of RPCClasses) {
            if (!RPCContexts.has(context)) {
                console.error("ExportAll only decorate Emitter!");
                continue;
            }

            this.exportObject(RPCContexts.get(context), context);
        }

        const attributeKeys = Array.from(RPCAttributes.keys());
        for (const oneKey of attributeKeys) {
            const keyPath = oneKey.split(".");
            const contextStr = keyPath[0];
            if (!RPCContexts.has(contextStr)) {
                console.error("Export only decorate Emitter!");
                continue;
            }
            for (const attr of RPCAttributes.get(oneKey)) {
                let conObj = RPCContexts.get(contextStr);
                for (let i = 1; i < keyPath.length; i++) {
                    const p = keyPath[i];
                    conObj = conObj[p];
                }
                if (!(attr in conObj)) {
                    console.error(`${attr} not in `, conObj);
                    continue;
                }
                this.exportObject(conObj[attr], oneKey + "." + attr, false);
            }
        }
    }

    // 通知其他worker添加回调注册表
    private postRegistry(worker: string, registry: RPCRegistryPacket) {
        // console.log(this.name + " postRegistry: ", worker, registry);
        if (worker === MANAGERWORKERNAME) return;

        const messageData = new RPCMessage(this.MESSAGEKEY_ADDREGISTRY, registry);
        const buf = webworker_rpc.WebWorkerMessage.encode(messageData).finish().buffer;
        if (this.channels.has(worker)) {
            const port = this.channels.get(worker);
            port.postMessage(messageData, [].concat(buf.slice(0)));
        }
    }

    private onMessage_Link(ev: MessageEvent) {
        // console.log(this.name + " onMessage_Link: ", ev);
        const {workers} = ev.data;
        const ports = ev.ports;
        for (let i = 0; i < ports.length; i++) {
            const onePort = ports[i];
            const oneWorker = workers[i];
            this.addLink(oneWorker, onePort);
        }
    }

    private onMessage_AddRegistry(ev: MessageEvent) {
        // console.log(this.name + " onMessage_AddRegistry:", ev.data);
        const {dataRegistry} = ev.data;
        if (dataRegistry === undefined || dataRegistry === null) {
            console.warn("<data> not in ev.data");
            return;
        }
        if (!RPCRegistryPacket.checkType(dataRegistry)) {
            console.warn("<data> type error: ", dataRegistry);
            return;
        }
        const packet: RPCRegistryPacket = dataRegistry as RPCRegistryPacket;
        if (!this.registry.has(packet.serviceName)) {
            this.registry.set(packet.serviceName, []);
        }
        const newRegistries = this.registry.get(packet.serviceName).concat(packet.executors);
        this.registry.set(packet.serviceName, newRegistries);
        this.addRegistryProperty(packet);

        // send GOT message
        if (this.channels.has(packet.serviceName)) {
            const port = this.channels.get(packet.serviceName);
            port.postMessage({key: this.MESSAGEKEY_GOTREGISTRY, worker: this.name, id: packet.id});
        }

        this.updateLinkState(packet.serviceName);

        // add listeners while got registry firstly
        if (RPCListeners.has(packet.serviceName)) {
            const listeners = RPCListeners.get(packet.serviceName);
            for (const listener of listeners) {
                // console.log(this.name + " remote on, ", this.remote, packet.serviceName, listener);
                this.remote[packet.serviceName][listener.context].on(listener.event, listener.executor, this.name);
            }
            RPCListeners.delete(packet.serviceName);
        }
    }

    private onMessage_GotRegistry(ev: MessageEvent) {
        // console.log(this.name + " onMessage_GotRegistry:", ev.data, this.syncRegistryListeners);
        const {worker, id} = ev.data;
        if (this.linkListeners.has(worker)) {
            this.linkListeners.get(worker).setPortReady(worker);
        }
        if (this.syncRegistryListeners.has(id)) {
            this.syncRegistryListeners.get(id).workerGotRegistry(worker);
        }
    }

    private onMessage_Execute(ev: MessageEvent) {
        // console.log(this.name + " onMessage_RunMethod:", ev.data);
        const {dataExecute} = ev.data;
        if (dataExecute === undefined || dataExecute === null) {
            console.warn("<data> not in ev.data");
            return;
        }
        if (!RPCExecutePacket.checkType(dataExecute)) {
            console.warn("<data> type error: ", dataExecute);
            return;
        }
        const packet: RPCExecutePacket = dataExecute as RPCExecutePacket;

        const id = packet.id;
        const service = packet.header.serviceName;
        const remoteExecutor = packet.header.remoteExecutor;

        const params = [];
        if (remoteExecutor.params !== undefined && remoteExecutor.params !== null) {
            for (const param of remoteExecutor.params) {
                const v = RPCParam.getValue(param as RPCParam);
                // console.log("RPCParam.getValue: ", param, v);
                // 参数支持0 undefined
                params.push(v);
            }
        }
        const result = this.executeFunctionByName(remoteExecutor.method, remoteExecutor.context, params);
        if (result instanceof Promise) {
            result.then((val) => {
                this.handlerExcuteResult(service, id, val);
            });
        } else {
            this.handlerExcuteResult(service, id, result);
        }
    }

    private onMessage_Respond(ev: MessageEvent) {
        const {dataResponse} = ev.data;
        if (dataResponse === undefined || dataResponse === null) {
            console.warn("<data> not in ev.data");
            return;
        }
        if (!RPCResponsePacket.checkType(dataResponse)) {
            console.warn("<data> type error: ", dataResponse);
            return;
        }
        const packet: RPCResponsePacket = dataResponse as RPCResponsePacket;

        if (!this.resolvers.has(packet.id)) {
            console.error("respones.id undefined: ", packet.id);
            return;
        }

        const resolver = this.resolvers.get(packet.id);
        this.resolvers.delete(packet.id);
        if (packet.err !== undefined && packet.err !== null) {
            console.error("get error response: ", packet.err);
            resolver.reject(packet.err);
            return;
        }

        if (packet.val === undefined || packet.val === null) {
            resolver.resolve();
        } else {
            resolver.resolve(RPCParam.getValue(packet.val as RPCParam));
        }
    }

    private onMessage_Unlink(ev: MessageEvent) {
        const {worker} = ev.data;

        if (this.channels.has(worker)) {
            this.channels.delete(worker);
        }
        if (this.registry.has(worker)) {
            this.registry.delete(worker);
        }
        if (this.remote !== undefined && this.remote !== null && (worker in this.remote)) {
            delete this.remote[worker];
        }

        // console.log(this.name + " unlink: ", this.channels, this.registry, this.remote);
    }

    private onMessage_ProxyCreateWorker(ev: MessageEvent) {
        const {workerName, workerUrl, msg} = ev.data;

        if (typeof Worker === "undefined") {
            console.error("Worker undefined! can not create worker");
            return;
        }

        console.log("webworker-rpc ProxyCreateWorker: location: ", location);
        let pathRoot = location.origin + location.pathname;
        // console.log("webworker-rpc ProxyCreateWorker: pathRoot-1: ", pathRoot);
        // 兼容ios打包
        if (pathRoot.endsWith("index.html")) {
            pathRoot = pathRoot.slice(0, -10);
        } else if (pathRoot.endsWith("index.html/")) {
            pathRoot = pathRoot.slice(0, -11) + "/";
        }
        // console.log("webworker-rpc ProxyCreateWorker: pathRoot-2: ", pathRoot);
        const path = pathRoot + workerUrl;
        // console.log("webworker-rpc ProxyCreateWorker: workerUrl: ", workerUrl);
        const newWorker = new Worker(path, {name: workerName});
        console.log(this.name + " create worker: ", path, workerName);
        const ports = [];
        for (const oneP of ev.ports) {
            ports.push(oneP);
        }
        newWorker.postMessage(msg, ports);
    }

    private exportObject(obj: any, rootContext: string, recursion = true): RPCExecutor[] {
        // console.log(this.name + " exportObject: " + rootContext, obj);
        // if (RPCFunctions.length > 40) return;
        let addExecutors: RPCExecutor[] = [];

        for (const key in obj) {
            if (EXCLUDEPROPERTIES.includes(key) && !INCLUDEPROPERTIES.includes(key)) continue;

            const element = obj[key];
            // console.log(this.name + " exportKey: " + key, element);
            if (typeof element === "function") {
                // console.log("element: ", element);
                const newExecutor = new RPCExecutor(key, rootContext);
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
            console.error(`excute function <${functionName}> error, no context <${context}> exist`);
            return null;
        }
        return con[functionName].apply(con, args);
    }

    private getContext(path: string): any {
        const contexts = path.split(".");
        if (!RPCContexts.has(contexts[0])) {
            console.error("no context exist: ", contexts[0]);
            return null;
        }

        let resultCon = RPCContexts.get(contexts[0]);
        for (let i = 1; i < contexts.length; i++) {
            const context = contexts[i];
            if (!(context in resultCon)) {
                console.error(`${context} is undefined in `, resultCon);
                return null;
            }
            resultCon = resultCon[context];
        }
        return resultCon;
    }

    private addRegistryProperty(packet: RPCRegistryPacket) {
        if (this.remote === undefined || this.remote === null) this.remote = {};

        const service = packet.serviceName;
        const executors = packet.executors;

        let serviceProp = {};
        if (service in this.remote) {
            serviceProp = this.remote[service];
        } else {
            addProperty(this.remote, service, serviceProp);
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
                // console.log(this.name + " call property ", service, executor.method, executor.context);
                const params: RPCParam[] = [];
                if (args !== undefined && args !== null) {
                    for (const arg of args) {
                        params.push(RPCParam.createByValue(arg));
                    }
                }
                // 此处不检测params，检测在typescript层执行
                return this.execute(service, executor.method, executor.context, params);
            });
        }

        console.log(this.name + ".remote: ", this.remote);
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
            this.linkListeners.get(worker).setPortReady(this.name);
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
    public setPortReady(port: string) {
        if (this.port1 !== port && this.port2 !== port) return;

        if (!this.port1Ready) this.port1Ready = this.port1 === port;
        if (!this.port2Ready) this.port2Ready = this.port2 === port;

        if (this.port1Ready && this.port2Ready) {
            if (this.readyFunc) {
                this.readyFunc();
                this.readyFunc = null;
            }
        }
    }
}

export class SyncRegistryListener {
    private readyFunc: () => any;
    private workersState: Map<string, boolean>;

    constructor(private id: number, workers: string[]) {
        this.workersState = new Map();
        for (const w of workers) {
            if (w === MANAGERWORKERNAME) {
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
        console.error("key exist, add property failed!", obj, key);
        return obj;
    }
    obj[key] = val;
    return obj;
}
