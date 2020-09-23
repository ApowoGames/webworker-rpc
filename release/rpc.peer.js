var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { webworker_rpc } from "./protocols";
import { RPCMessage, RPCExecutor, RPCExecutePacket, RPCParam, RPCRegistryPacket } from "./rpc.message";
// decorater
var RPCFunctions = [];
var RPCContexts = new Map();
export function Export(paramTypes) {
    return function (target, name, descriptor) {
        // console.log("Export: ", target, name, descriptor);
        var context = target.constructor.name;
        if (!RPCContexts.has(context))
            RPCContexts.set(context, target);
        var params = [];
        if (paramTypes) {
            for (var _i = 0, paramTypes_1 = paramTypes; _i < paramTypes_1.length; _i++) {
                var pt = paramTypes_1[_i];
                params.push(new RPCParam(pt));
            }
        }
        if (params.length > 0) {
            RPCFunctions.push(new RPCExecutor(name, context, params));
        }
        else {
            RPCFunctions.push(new RPCExecutor(name, context));
        }
    };
}
var RPCListeners = new Map();
export function RemoteListener(worker, context, event, paramTypes) {
    return function (target, name, descriptor) {
        // TODO: 合并function
        //-- Export
        var executorContext = target.constructor.name;
        if (!RPCContexts.has(executorContext))
            RPCContexts.set(executorContext, target);
        var params = [];
        if (paramTypes) {
            for (var _i = 0, paramTypes_2 = paramTypes; _i < paramTypes_2.length; _i++) {
                var pt = paramTypes_2[_i];
                params.push(new RPCParam(pt));
            }
        }
        if (params.length > 0) {
            RPCFunctions.push(new RPCExecutor(name, executorContext, params));
        }
        else {
            RPCFunctions.push(new RPCExecutor(name, executorContext));
        }
        //--
        var executor = null;
        if (params.length > 0) {
            executor = new RPCExecutor(name, executorContext, params);
        }
        else {
            executor = new RPCExecutor(name, executorContext);
        }
        if (!RPCListeners.has(worker)) {
            RPCListeners.set(worker, []);
        }
        RPCListeners.get(worker).push({ context: context, event: event, executor: executor });
    };
}
// manager worker sprite
var MANAGERWORKERSPRITE = function (ev) {
    var MESSAGEKEY_LINK = "link";
    var MESSAGEKEY_REQUESTLINK = "requestLink";
    var MANAGERWORKERNAME = "__MANAGER";
    var channels = new Map();
    var addLink = function (worker, port) {
        if (channels.has(worker)) {
            return;
        }
        channels.set(worker, port);
        port.onmessage = function (ev) {
            var key = ev.data.key;
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
    };
    var onMessage_Link = function (_ev) {
        var workers = _ev.data.workers;
        var ports = _ev.ports;
        for (var i = 0; i < ports.length; i++) {
            var onePort = ports[i];
            var oneWorker = workers[i];
            addLink(oneWorker, onePort);
        }
    };
    var onMessage_RequestLink = function (_ev) {
        var _a = _ev.data, serviceName = _a.serviceName, workerName = _a.workerName, workerUrl = _a.workerUrl;
        var service2TarChannel = new MessageChannel();
        if (!channels.has(serviceName)) {
            console.error(MANAGERWORKERNAME + " not yet link to " + serviceName);
            return;
        }
        channels.get(serviceName).postMessage({ key: MESSAGEKEY_LINK, workers: [workerName] }, [service2TarChannel.port1]);
        if (channels.has(workerName)) {
            channels.get(workerName).postMessage({ key: MESSAGEKEY_LINK, workers: [serviceName] }, [service2TarChannel.port2]);
        }
        else {
            if (!workerUrl) {
                console.error("worker url undefined");
                return;
            }
            // console.log(MANAGERWORKERNAME + " new worker: ", location, workerUrl, workerName);
            var tarWorker = new Worker(location.origin + workerUrl, { name: workerName });
            var manager2TarChannel = new MessageChannel();
            tarWorker.postMessage({ key: MESSAGEKEY_LINK, workers: [MANAGERWORKERNAME, serviceName] }, [manager2TarChannel.port2, service2TarChannel.port2]);
            addLink(workerName, manager2TarChannel.port1);
        }
    };
    var key = ev.data.key;
    switch (key) {
        case MESSAGEKEY_LINK:
            onMessage_Link(ev);
            break;
        default:
            break;
    }
};
var RPCEmitter = /** @class */ (function () {
    function RPCEmitter() {
        this.emitFunctions = new Map();
        // console.log("Emitter constructor: ", this);
        RPCContexts.set(this.constructor.name, this);
        RPCFunctions.push(new RPCExecutor("on", this.constructor.name, [new RPCParam(webworker_rpc.ParamType.str), new RPCParam(webworker_rpc.ParamType.executor), new RPCParam(webworker_rpc.ParamType.str)]));
        RPCFunctions.push(new RPCExecutor("off", this.constructor.name, [new RPCParam(webworker_rpc.ParamType.str)]));
    }
    // @Export([webworker_rpc.ParamType.str, webworker_rpc.ParamType.executor, webworker_rpc.ParamType.str])
    RPCEmitter.prototype.on = function (event, executor, worker) {
        // console.log("on", event, executor, worker, this);
        if (!this.emitFunctions.has(event)) {
            this.emitFunctions.set(event, []);
        }
        this.emitFunctions.get(event).push({ worker: worker, executor: executor });
    };
    // @Export([webworker_rpc.ParamType.str])
    RPCEmitter.prototype.off = function (event, executor, worker) {
        if (!this.emitFunctions.has(event))
            return;
        if (executor && executor instanceof RPCExecutor && worker && typeof worker === "string") {
            var executors = this.emitFunctions.get(event);
            var idx = executors.findIndex(function (x) { return x.worker === worker && x.executor === executor; });
            if (idx > 0) {
                executors.splice(idx, 0);
            }
        }
        else {
            this.emitFunctions.delete(event);
        }
    };
    RPCEmitter.prototype.emit = function (event) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.emitFunctions.has(event))
            return;
        if (!RPCPeer.getInstance()) {
            console.error("no peer created");
            return;
        }
        var funs = this.emitFunctions.get(event);
        for (var _b = 0, funs_1 = funs; _b < funs_1.length; _b++) {
            var fun = funs_1[_b];
            if (fun.worker in RPCPeer.getInstance().remote) {
                (_a = RPCPeer.getInstance().remote[fun.worker][fun.executor.context])[fun.executor.method].apply(_a, args);
            }
        }
    };
    return RPCEmitter;
}());
export { RPCEmitter };
// 各个worker之间通信桥梁
var RPCPeer = /** @class */ (function (_super) {
    __extends(RPCPeer, _super);
    function RPCPeer(name, w) {
        var _this = _super.call(this) || this;
        _this.MESSAGEKEY_LINK = "link"; // TODO: define type of data
        _this.MESSAGEKEY_REQUESTLINK = "requestLink"; // TODO: define type of data
        _this.MESSAGEKEY_ADDREGISTRY = "addRegistry";
        _this.MESSAGEKEY_GOTREGISTRY = "gotRegistry";
        _this.MESSAGEKEY_RUNMETHOD = "runMethod";
        _this.MESSAGEKEY_Terminate = "terminate"; // TODO: 创建对应方法
        _this.MANAGERWORKERNAME = "__MANAGER";
        if (RPCPeer._instance) {
            console.error("duplicate RPCPeer created");
            return _this;
        }
        RPCPeer._instance = _this;
        if (!name) {
            console.error("param <name> error");
            return _this;
        }
        _this.name = name;
        if (w) {
            _this.worker = w;
        }
        else {
            _this.worker = self;
        }
        _this.registry = new Map();
        _this.channels = new Map();
        _this.linkListeners = new Map();
        _this.linkTasks = [];
        _this.worker.onmessage = function (ev) {
            var key = ev.data.key;
            if (key && key === _this.MESSAGEKEY_LINK) { // 由父节点发送的消息，除了起始节点，其他的父节点都是ManagerWorker
                _this.onMessage_Link(ev);
            }
        };
        return _this;
        // console.log(name + " RPCFunctions", RPCFunctions);
        // console.log(name + " RPCContexts", RPCContexts);
        // console.log(name + " RPCListeners", RPCListeners);
    }
    RPCPeer.getInstance = function () {
        return RPCPeer._instance;
    };
    RPCPeer.prototype.linkTo = function (workerName, workerUrl) {
        if (this.linkListeners.has(workerName)) {
            console.warn("already requested link to " + workerName);
            return this.linkListeners.get(workerName);
        }
        var listener = new LinkListener(this.name, workerName);
        this.linkListeners.set(workerName, listener);
        if (!this.channels.has(this.MANAGERWORKERNAME)) {
            var selfName = this.worker["name"];
            if (selfName && selfName === this.name) {
                // 这是由ManagerWorker创建的worker，需要等待和ManagerWorker连接完成后再进行linkTo操作
                this.linkTasks.push({ workerName: workerName, workerUrl: workerUrl });
                return listener;
            }
            var managerWorkerURL = this.getManagerWorkerURL();
            // console.log(this.name + " new worker: ", managerWorkerURL, this.MANAGERWORKERNAME);
            var managerWorker = new Worker(managerWorkerURL);
            var managerChannel = new MessageChannel();
            managerWorker.postMessage({ key: this.MESSAGEKEY_LINK, workers: [this.name] }, [managerChannel.port2]);
            this.addLink(this.MANAGERWORKERNAME, managerChannel.port1);
        }
        this.channels.get(this.MANAGERWORKERNAME).postMessage({ key: this.MESSAGEKEY_REQUESTLINK, serviceName: this.name, workerName: workerName, workerUrl: workerUrl });
        return listener;
    };
    RPCPeer.prototype.linkFinished = function () {
        // TODO: 所有连接建立完毕 关闭ManagerWorker
    };
    RPCPeer.prototype.linkToWorker = function (workerName, worker) {
        // console.log(this.name + " linkToWorker", workerName);
        var listener = new LinkListener(this.name, workerName);
        this.linkListeners.set(workerName, listener);
        var channel = new MessageChannel();
        worker.postMessage({ key: this.MESSAGEKEY_LINK, workers: [this.name] }, [channel.port2]);
        this.addLink(workerName, channel.port1);
        return listener;
    };
    // 增加worker之间的通道联系
    RPCPeer.prototype.addLink = function (worker, port) {
        var _this = this;
        if (this.channels.has(worker)) {
            return;
        }
        this.channels.set(worker, port);
        // console.log(this.name + " addLink: ", worker);
        port.onmessage = function (ev) {
            var key = ev.data.key;
            if (!key) {
                // console.warn("<key> not in ev.data");
                return;
            }
            // TODO 使用map结构
            switch (key) {
                case _this.MESSAGEKEY_LINK: // 通过port接收到的信息，即ManagerWorker发送的消息
                    _this.onMessage_Link(ev);
                    break;
                case _this.MESSAGEKEY_ADDREGISTRY:
                    _this.onMessage_AddRegistry(ev);
                    break;
                case _this.MESSAGEKEY_GOTREGISTRY:
                    _this.onMessage_GotRegistry(ev);
                    break;
                case _this.MESSAGEKEY_RUNMETHOD:
                    _this.onMessage_RunMethod(ev);
                    break;
                default:
                    // console.warn("got message outof control: ", ev.data);
                    break;
            }
        };
        // post registry
        this.postRegistry(worker, new RPCRegistryPacket(this.name, RPCFunctions));
        if (worker === this.MANAGERWORKERNAME) {
            // 执行未进行的linkTo task
            var taskNum = this.linkTasks.length;
            for (var i = 0; i < taskNum; i++) {
                var task = this.linkTasks.pop();
                this.channels.get(this.MANAGERWORKERNAME).postMessage({
                    key: this.MESSAGEKEY_REQUESTLINK,
                    serviceName: this.name,
                    workerName: task.workerName,
                    workerUrl: task.workerUrl
                });
            }
        }
    };
    // worker调用其他worker方法
    RPCPeer.prototype.execute = function (worker, packet) {
        // console.log(this.name + " execute: ", worker, packet);
        if (!this.registry.has(worker)) {
            console.error("worker <" + worker + "> not registed");
            return;
        }
        var executor = this.registry.get(worker).find(function (x) { return x.context === packet.header.remoteExecutor.context &&
            x.method === packet.header.remoteExecutor.method; });
        if (!executor) {
            console.error("method <" + packet.header.remoteExecutor.method + "> not registed");
            return;
        }
        var regParams = executor.params;
        var remoteParams = packet.header.remoteExecutor.params;
        if (regParams && regParams.length > 0) {
            if (!remoteParams || remoteParams.length === 0) {
                console.error("execute param error! ", "param.length = 0");
                return;
            }
            if (regParams.length > remoteParams.length) {
                console.error("execute param error! ", "param not enough");
                return;
            }
            for (var i = 0; i < regParams.length; i++) {
                var regP = regParams[i];
                var remoteP = remoteParams[i];
                if (regP.t !== remoteP.t) {
                    console.error("execute param error! ", "type not match, registry: <", regP.t, ">; execute: <", remoteP.t, ">");
                    return;
                }
            }
        }
        var messageData = new RPCMessage(this.MESSAGEKEY_RUNMETHOD, packet);
        var buf = webworker_rpc.WebWorkerMessage.encode(messageData).finish().buffer;
        if (this.channels.has(worker)) {
            this.channels.get(worker).postMessage(messageData, [].concat(buf.slice(0)));
        }
    };
    // 通知其他worker添加回调注册表
    RPCPeer.prototype.postRegistry = function (worker, registry) {
        // console.log(this.name + " postRegistry: ", worker, registry);
        if (worker === this.MANAGERWORKERNAME)
            return;
        var messageData = new RPCMessage(this.MESSAGEKEY_ADDREGISTRY, registry);
        var buf = webworker_rpc.WebWorkerMessage.encode(messageData).finish().buffer;
        if (this.channels.has(worker)) {
            var port = this.channels.get(worker);
            port.postMessage(messageData, [].concat(buf.slice(0)));
        }
    };
    RPCPeer.prototype.onMessage_Link = function (ev) {
        // console.log(this.name + " onMessage_Link: ", ev);
        var workers = ev.data.workers;
        var ports = ev.ports;
        for (var i = 0; i < ports.length; i++) {
            var onePort = ports[i];
            var oneWorker = workers[i];
            this.addLink(oneWorker, onePort);
        }
    };
    RPCPeer.prototype.onMessage_AddRegistry = function (ev) {
        // console.log(this.name + " onMessage_AddRegistry:", ev.data);
        var dataRegistry = ev.data.dataRegistry;
        if (!dataRegistry) {
            console.warn("<data> not in ev.data");
            return;
        }
        if (!RPCRegistryPacket.checkType(dataRegistry)) {
            console.warn("<data> type error: ", dataRegistry);
            return;
        }
        var packet = dataRegistry;
        this.registry.set(packet.serviceName, packet.executors);
        this.addRegistryProperty(packet);
        if (this.channels.has(packet.serviceName)) {
            var port = this.channels.get(packet.serviceName);
            port.postMessage({ key: this.MESSAGEKEY_GOTREGISTRY, worker: this.name });
        }
        if (this.linkListeners.has(packet.serviceName)) {
            this.linkListeners.get(packet.serviceName).setPortReady(this.name);
        }
        if (RPCListeners.has(packet.serviceName)) {
            var listeners = RPCListeners.get(packet.serviceName);
            for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
                var listener = listeners_1[_i];
                // console.log(this.name + " remote on, ", this.remote, packet.serviceName, listener);
                this.remote[packet.serviceName][listener.context].on(listener.event, listener.executor, this.name);
            }
        }
    };
    RPCPeer.prototype.onMessage_GotRegistry = function (ev) {
        // console.log(this.name + " onMessage_GotRegistry:", ev.data);
        var worker = ev.data.worker;
        if (this.linkListeners.has(worker)) {
            this.linkListeners.get(worker).setPortReady(worker);
        }
    };
    RPCPeer.prototype.onMessage_RunMethod = function (ev) {
        var _this = this;
        // console.log(this.name + " onMessage_RunMethod:", ev.data);
        var dataExecute = ev.data.dataExecute;
        if (!dataExecute) {
            console.warn("<data> not in ev.data");
            return;
        }
        if (!RPCExecutePacket.checkType(dataExecute)) {
            console.warn("<data> type error: ", dataExecute);
            return;
        }
        var packet = dataExecute;
        var remoteExecutor = packet.header.remoteExecutor;
        var params = [];
        if (remoteExecutor.params) {
            for (var _i = 0, _a = remoteExecutor.params; _i < _a.length; _i++) {
                var param = _a[_i];
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
        var result = this.executeFunctionByName(remoteExecutor.method, remoteExecutor.context, params);
        if (result && result instanceof Promise) {
            result.then(function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var callbackParams = [];
                for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                    var arg = args_1[_a];
                    var t = RPCParam.typeOf(arg);
                    if (t !== webworker_rpc.ParamType.UNKNOWN) {
                        callbackParams.push(new RPCParam(t, arg));
                    }
                }
                if (packet.header.callbackExecutor) {
                    var callback = packet.header.callbackExecutor;
                    if (callback.params) {
                        if (callbackParams.length < callback.params.length) {
                            console.error("not enough data from promise");
                            return;
                        }
                        for (var i = 0; i < callback.params.length; i++) {
                            var p = callback.params[i];
                            var cp = callbackParams[i];
                            if (p.t !== cp.t) {
                                console.error("param type not match: <" + p.t + "> <" + cp.t + ">");
                                return;
                            }
                        }
                        _this.execute(packet.header.serviceName, new RPCExecutePacket(_this.name, callback.method, callback.context, callbackParams));
                    }
                    else {
                        _this.execute(packet.header.serviceName, new RPCExecutePacket(_this.name, callback.method, callback.context));
                    }
                }
            });
        }
    };
    RPCPeer.prototype.executeFunctionByName = function (functionName, context, args) {
        if (!RPCContexts.has(context)) {
            console.error("no context exit: ", context);
            return null;
        }
        var con = RPCContexts.get(context);
        return con[functionName].apply(con, args);
    };
    RPCPeer.prototype.addRegistryProperty = function (packet) {
        var _this = this;
        var service = packet.serviceName;
        var executors = packet.executors;
        var serviceProp = {};
        var _loop_1 = function (executor) {
            if (!(executor.context in serviceProp)) {
                addProperty(serviceProp, executor.context, {});
            }
            addProperty(serviceProp[executor.context], executor.method, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                // console.log(this.name + " call property ", service, executor.method, executor.context);
                var params = [];
                var callback = null; // TODO add callback from args
                if (args) {
                    for (var _a = 0, args_2 = args; _a < args_2.length; _a++) {
                        var arg = args_2[_a];
                        var t = RPCParam.typeOf(arg);
                        if (t === webworker_rpc.ParamType.UNKNOWN) {
                            console.warn("unknown param type: ", arg);
                            continue;
                        }
                        params.push(new RPCParam(t, arg));
                    }
                }
                if (callback) {
                    _this.execute(service, new RPCExecutePacket(_this.name, executor.method, executor.context, params, callback));
                }
                else {
                    _this.execute(service, new RPCExecutePacket(_this.name, executor.method, executor.context, params));
                }
            });
        };
        for (var _i = 0, executors_1 = executors; _i < executors_1.length; _i++) {
            var executor = executors_1[_i];
            _loop_1(executor);
        }
        if (!this.remote)
            this.remote = {};
        addProperty(this.remote, service, serviceProp);
        // Logger.getInstance().log(this.name + "addRegistryProperty", this);
    };
    RPCPeer.prototype.getManagerWorkerURL = function () {
        // "./managerWorker.js"
        // return URL.createObjectURL(new Blob([MANAGERWORKERTEXT], { type: 'text/javascript' }));
        var resolveString = MANAGERWORKERSPRITE.toString();
        // The template is basically an addEventListener attachment that creates a
        // closure (IIFE*) with the provided function and invokes it with the provided
        // data.
        // * IIFE stands for immediately Immediately-Invoked Function Expression
        // Removed the postMessage from this template in order to allow worker functions
        // to use asynchronous functions and resolve whenever they need to.
        var webWorkerTemplate = "\n            self.addEventListener('message', function(e) {\n                ((" + resolveString + ")(e));\n            });\n        ";
        var blob = new Blob([webWorkerTemplate], { type: 'text/javascript' });
        return URL.createObjectURL(blob);
    };
    return RPCPeer;
}(RPCEmitter));
export { RPCPeer };
var LinkListener = /** @class */ (function () {
    function LinkListener(port1, port2) {
        this.port1 = "";
        this.port2 = "";
        this.port1Ready = false;
        this.port2Ready = false;
        this.port1 = port1;
        this.port2 = port2;
    }
    LinkListener.prototype.onReady = function (f) {
        this.readyFunc = f;
    };
    // TODO: 对外隐藏
    LinkListener.prototype.setPortReady = function (port) {
        if (this.port1 !== port && this.port2 !== port)
            return;
        if (!this.port1Ready)
            this.port1Ready = this.port1 === port;
        if (!this.port2Ready)
            this.port2Ready = this.port2 === port;
        if (this.port1Ready && this.port2Ready) {
            if (this.readyFunc) {
                this.readyFunc();
            }
        }
    };
    return LinkListener;
}());
export { LinkListener };
function addProperty(obj, key, val) {
    if (key in obj) {
        console.error("key exits, add property failed!", obj, key);
        return obj;
    }
    obj[key] = val;
    return obj;
}
