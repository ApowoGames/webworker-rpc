import { webworker_rpc } from "./protocols";
import { RPCMessage, RPCExecutor, RPCExecutePacket, RPCParam, RPCRegistryPacket } from "./rpc.message";

// decorator
const RPCFunctions: RPCExecutor[] = [];
const RPCContexts: Map<string, any> = new Map();
const RPCClasses: string[] = [];// 等待link之后，递归注册其所有function
const RPCAttributes: Map<string, string[]> = new Map();// 等待link之后，注册其所有function
const ExportFunction = (target, name, descriptor, paramTypes?: webworker_rpc.ParamType[]) => {
    const context = typeof target === "function" ? target.name + ".constructor" : target.constructor.name;
    const params: RPCParam[] = [];
    if (paramTypes) {
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
    }
}
export function ExportAll() {
    return (target) => {
        RPCClasses.push(target.name);
        return target;
    }
}
export function Export(paramTypes?: webworker_rpc.ParamType[]) {
    return (target, name, descriptor?) => {
        if (descriptor)
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
        if (paramTypes) {
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
        RPCListeners.get(worker).push({ context, event, executor });
    }
}

// manager worker sprite
const MANAGERWORKERSPRITE = (ev) => {
    const MESSAGEKEY_LINK: string = "link";
    const MESSAGEKEY_REQUESTLINK: string = "requestLink";
    const MANAGERWORKERNAME: string = "__MANAGER";

    const channels: Map<string, MessagePort> = new Map();

    const addLink = (worker: string, port: MessagePort) => {
        if (channels.has(worker)) {
            return;
        }
        channels.set(worker, port);
        port.onmessage = (ev: MessageEvent) => {
            const { key } = ev.data;
            if (!key) {
                return;
            }
            // TODO 使用map结构
            switch (key) {
                case MESSAGEKEY_REQUESTLINK:
                    onMessage_RequestLink(ev);
                    break;
                default:
                    break;
            }
        };
    }

    const onMessage_Link = (_ev: MessageEvent) => {
        const { workers } = _ev.data;
        const ports = _ev.ports;
        for (let i = 0; i < ports.length; i++) {
            const onePort = ports[i];
            const oneWorker = workers[i];
            addLink(oneWorker, onePort);
        }
    }

    const onMessage_RequestLink = (_ev: MessageEvent) => {
        const { serviceName, workerName, workerUrl } = _ev.data;
        const service2TarChannel = new MessageChannel();

        if (!channels.has(serviceName)) {
            console.error(MANAGERWORKERNAME + " not yet link to " + serviceName);
            return;
        }
        channels.get(serviceName).postMessage({ key: MESSAGEKEY_LINK, workers: [workerName] }, [service2TarChannel.port1]);

        if (channels.has(workerName)) {
            channels.get(workerName).postMessage({ key: MESSAGEKEY_LINK, workers: [serviceName] }, [service2TarChannel.port2]);
        } else {
            if (!workerUrl) {
                console.error("worker url undefined");
                return;
            }

            // console.log(MANAGERWORKERNAME + " new worker: ", location, workerUrl, workerName);
            const tarWorker = new Worker(location.origin + workerUrl, { name: workerName });
            const manager2TarChannel = new MessageChannel();

            tarWorker.postMessage({ key: MESSAGEKEY_LINK, workers: [MANAGERWORKERNAME, serviceName] }, [manager2TarChannel.port2, service2TarChannel.port2]);
            addLink(workerName, manager2TarChannel.port1);
        }
    }

    const { key } = ev.data;
    switch (key) {
        case MESSAGEKEY_LINK:
            onMessage_Link(ev);
            break;

        default:
            break;
    }
}

const EXCEPTEDPROPERTIES: string[] = ["prototype", "__proto__", "self", "worker", "remote", "on", "off", "emit", "linkTo", "linkFinished"];

function ExceptClassProperties() {
    return (target, name, descriptor) => {
        for (const key in target) {
            if (!EXCEPTEDPROPERTIES.includes(key)) {
                EXCEPTEDPROPERTIES.push(key);
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
        AddRPCFunction(new RPCExecutor("on", this.constructor.name,
            [new RPCParam(webworker_rpc.ParamType.str), new RPCParam(webworker_rpc.ParamType.executor), new RPCParam(webworker_rpc.ParamType.str)]));
        AddRPCFunction(new RPCExecutor("off", this.constructor.name,
            [new RPCParam(webworker_rpc.ParamType.str)]));
    }

    // @Export([webworker_rpc.ParamType.str, webworker_rpc.ParamType.executor, webworker_rpc.ParamType.str])
    @ExceptClassProperties()
    public on(event: string, executor: RPCExecutor, worker: string) {
        // console.log("on", event, executor, worker, this);

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

    protected emit(event: string, ...args) {
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
    private readonly MESSAGEKEY_RUNMETHOD: string = "runMethod";
    private readonly MESSAGEKEY_Terminate: string = "terminate";// TODO: 创建对应方法
    private readonly MANAGERWORKERNAME: string = "__MANAGER";

    private worker: Worker;
    private registry: Map<string, webworker_rpc.IExecutor[]>;
    private channels: Map<string, MessagePort>;
    private linkListeners: Map<string, LinkListener>;
    private linkTasks: { workerName: string, workerUrl?: string }[];
    private exported: boolean = false;

    static getInstance() {
        return RPCPeer._instance;
    }

    constructor(name: string, w?: Worker) {
        super();

        if (RPCPeer._instance) {
            console.error("duplicate RPCPeer created");
            return;
        }
        RPCPeer._instance = this;

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
        this.linkTasks = [];

        this.worker.onmessage = (ev: MessageEvent) => {
            const { key } = ev.data;
            if (key && key === this.MESSAGEKEY_LINK) {// 由父节点发送的消息，除了起始节点，其他的父节点都是ManagerWorker
                this.onMessage_Link(ev);
            }
        };

        // console.log(name + " RPCFunctions", RPCFunctions);
        // console.log(name + " RPCContexts", RPCContexts);
        // console.log(name + " RPCListeners", RPCListeners);
    }

    @ExceptClassProperties()
    public linkTo(workerName: string, workerUrl?: string): LinkListener {
        if (this.linkListeners.has(workerName)) {
            console.warn("already requested link to " + workerName);
            return this.linkListeners.get(workerName);
        }

        const listener = new LinkListener(this.name, workerName);
        this.linkListeners.set(workerName, listener);

        if (!this.channels.has(this.MANAGERWORKERNAME)) {
            const selfName = this.worker["name"];
            if (selfName && selfName === this.name) {
                // 这是由ManagerWorker创建的worker，需要等待和ManagerWorker连接完成后再进行linkTo操作
                this.linkTasks.push({ workerName, workerUrl });
                return listener;
            }

            const managerWorkerURL = this.getManagerWorkerURL();
            // console.log(this.name + " new worker: ", managerWorkerURL, this.MANAGERWORKERNAME);
            const managerWorker = new Worker(managerWorkerURL);
            const managerChannel = new MessageChannel();

            managerWorker.postMessage({ key: this.MESSAGEKEY_LINK, workers: [this.name] }, [managerChannel.port2]);
            this.addLink(this.MANAGERWORKERNAME, managerChannel.port1);
        }

        this.channels.get(this.MANAGERWORKERNAME).postMessage({ key: this.MESSAGEKEY_REQUESTLINK, serviceName: this.name, workerName, workerUrl });

        return listener;
    }

    public linkFinished() {
        // TODO: 所有连接建立完毕 关闭ManagerWorker
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
                case this.MESSAGEKEY_RUNMETHOD:
                    this.onMessage_RunMethod(ev);
                    break;
                default:
                    // console.warn("got message outof control: ", ev.data);
                    break;
            }
        };
        // check export all
        if (!this.exported) {
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
            for (const context of attributeKeys) {
                if (!RPCContexts.has(context)) {
                    console.error("Export only decorate Emitter!");
                    continue;
                }
                for (const attr of RPCAttributes.get(context)) {
                    const conObj = RPCContexts.get(context);
                    if (!(attr in conObj)) {
                        console.error(`${attr} not in `, conObj);
                        continue;
                    }
                    this.exportObject(conObj[attr], context + "." + attr, false);
                }
            }
        }

        // post registry
        this.postRegistry(worker, new RPCRegistryPacket(this.name, RPCFunctions));

        if (worker === this.MANAGERWORKERNAME) {
            // 执行未进行的linkTo task
            const taskNum = this.linkTasks.length;
            for (let i = 0; i < taskNum; i++) {
                const task = this.linkTasks.pop();
                this.channels.get(this.MANAGERWORKERNAME).postMessage({
                    key: this.MESSAGEKEY_REQUESTLINK,
                    serviceName: this.name,
                    workerName: task.workerName,
                    workerUrl: task.workerUrl
                });
            }
        }
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

        const messageData = new RPCMessage(this.MESSAGEKEY_RUNMETHOD, packet);
        const buf = webworker_rpc.WebWorkerMessage.encode(messageData).finish().buffer;
        if (this.channels.has(worker)) {
            this.channels.get(worker).postMessage(messageData, [].concat(buf.slice(0)));
        }
    }
    // 通知其他worker添加回调注册表
    private postRegistry(worker: string, registry: RPCRegistryPacket) {
        // console.log(this.name + " postRegistry: ", worker, registry);
        if (worker === this.MANAGERWORKERNAME) return;

        const messageData = new RPCMessage(this.MESSAGEKEY_ADDREGISTRY, registry);
        const buf = webworker_rpc.WebWorkerMessage.encode(messageData).finish().buffer;
        if (this.channels.has(worker)) {
            const port = this.channels.get(worker);
            port.postMessage(messageData, [].concat(buf.slice(0)));
        }
    }
    private onMessage_Link(ev: MessageEvent) {
        // console.log(this.name + " onMessage_Link: ", ev);
        const { workers } = ev.data;
        const ports = ev.ports;
        for (let i = 0; i < ports.length; i++) {
            const onePort = ports[i];
            const oneWorker = workers[i];
            this.addLink(oneWorker, onePort);
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
            port.postMessage({ key: this.MESSAGEKEY_GOTREGISTRY, worker: this.name });
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

    private exportObject(obj: any, rootContext: string, recursion = true) {
        // console.log(this.name + " exportObject: " + rootContext, obj);

        for (const key in obj) {
            if (EXCEPTEDPROPERTIES.includes(key)) continue;

            const element = obj[key];
            if (typeof element === "function") {
                // console.log("element: ", element);
                AddRPCFunction(new RPCExecutor(key, rootContext));
            } else if (recursion && element instanceof Object) {
                const cStr = rootContext.concat(".", key);
                this.exportObject(element, cStr);
            }
        }

        // 静态属性/方法注册
        const rootPath = rootContext.split(".");
        if (rootPath[rootPath.length - 1] !== "constructor") {
            const objCons = obj.constructor;
            // console.log("constructor exportObject: ", objCons);
            this.exportObject(objCons, rootContext + ".constructor", false);
        }
    }

    private executeFunctionByName(functionName: string, context: string, args?: any[]) {
        const con = this.getContext(context);
        if (!con) {
            return null;
        }
        return con[functionName].apply(con, args);
    }

    private getContext(path: string): any {
        const contexts = path.split(".");
        if (!RPCContexts.has(contexts[0])) {
            console.error("no context exit: ", contexts[0]);
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
        const service = packet.serviceName;
        const executors = packet.executors;
        const serviceProp = {};
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
                // 此处不检测params，检测在typescript层执行
                if (callback) {
                    this.execute(service, new RPCExecutePacket(this.name, executor.method, executor.context, params, callback));
                } else {
                    this.execute(service, new RPCExecutePacket(this.name, executor.method, executor.context, params));
                }
            });
        }

        if (!this.remote) this.remote = {};

        addProperty(this.remote, service, serviceProp);

        console.log(this.name + ".remote: ", this.remote);
    }

    private getManagerWorkerURL(): string {
        const resolveString = MANAGERWORKERSPRITE.toString();
        const webWorkerTemplate = `
            self.addEventListener('message', function(e) {
                ((${resolveString})(e));
            });
        `;
        const blob = new Blob([webWorkerTemplate], { type: 'text/javascript' });
        return URL.createObjectURL(blob);
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

    // TODO: 对外隐藏
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