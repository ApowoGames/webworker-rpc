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
var RPCMessage = /** @class */ (function (_super) {
    __extends(RPCMessage, _super);
    function RPCMessage(key, data) {
        var _this = _super.call(this) || this;
        _this.key = key;
        if (data instanceof webworker_rpc.ExecutePacket) {
            _this.dataExecute = data;
        }
        else if (data instanceof webworker_rpc.RegistryPacket) {
            _this.dataRegistry = data;
        }
        return _this;
    }
    return RPCMessage;
}(webworker_rpc.WebWorkerMessage));
export { RPCMessage };
var RPCRegistryPacket = /** @class */ (function (_super) {
    __extends(RPCRegistryPacket, _super);
    function RPCRegistryPacket(service, executors) {
        var _this = _super.call(this) || this;
        _this.serviceName = service;
        _this.executors = executors;
        return _this;
    }
    RPCRegistryPacket.checkType = function (obj) {
        if (!obj)
            return false;
        if (!("serviceName" in obj))
            return false;
        if ("executors" in obj) {
            if (!Array.isArray(obj["executors"]))
                return false;
            if (obj["executors"].length > 0) {
                for (var _i = 0, _a = obj["executors"]; _i < _a.length; _i++) {
                    var one = _a[_i];
                    if (!RPCExecutor.checkType(one))
                        return false;
                }
            }
        }
        return true;
    };
    return RPCRegistryPacket;
}(webworker_rpc.RegistryPacket));
export { RPCRegistryPacket };
// worker调用其他worker方法的数据结构
var RPCExecutePacket = /** @class */ (function (_super) {
    __extends(RPCExecutePacket, _super);
    function RPCExecutePacket(service, method, context, params, callback) {
        var _this = _super.call(this) || this;
        _this.header = new webworker_rpc.Header();
        _this.header.serviceName = service;
        _this.header.remoteExecutor = new webworker_rpc.Executor();
        _this.header.remoteExecutor.method = method;
        if (context)
            _this.header.remoteExecutor.context = context;
        if (params)
            _this.header.remoteExecutor.params = params;
        if (callback)
            _this.header.callbackExecutor = callback;
        return _this;
    }
    RPCExecutePacket.checkType = function (obj) {
        if (!obj)
            return false;
        if (!("header" in obj))
            return false;
        var header = obj["header"];
        if (!("serviceName" in header))
            return false;
        if (!("remoteExecutor" in header))
            return false;
        var remoteExecutor = header["remoteExecutor"];
        if (!RPCExecutor.checkType(remoteExecutor))
            return false;
        return true;
    };
    return RPCExecutePacket;
}(webworker_rpc.ExecutePacket));
export { RPCExecutePacket };
// worker更新方法注册表后通知其他worker的数据结构
var RPCExecutor = /** @class */ (function (_super) {
    __extends(RPCExecutor, _super);
    function RPCExecutor(method, context, params) {
        var _this = _super.call(this) || this;
        _this.method = method;
        if (context)
            _this.context = context;
        if (params)
            _this.params = params;
        return _this;
    }
    RPCExecutor.checkType = function (obj) {
        if (!obj)
            return false;
        if (!("method" in obj))
            return false;
        if ("params" in obj) {
            if (!Array.isArray(obj["params"]))
                return false;
            if (obj["params"].length > 0) {
                for (var _i = 0, _a = obj["params"]; _i < _a.length; _i++) {
                    var one = _a[_i];
                    if (!RPCParam.checkType(one))
                        return false;
                }
            }
        }
        return true;
    };
    return RPCExecutor;
}(webworker_rpc.Executor));
export { RPCExecutor };
var RPCParam = /** @class */ (function (_super) {
    __extends(RPCParam, _super);
    function RPCParam(t, val) {
        var _this = _super.call(this) || this;
        _this.t = t;
        if (val) {
            switch (t) {
                case webworker_rpc.ParamType.str:
                    if (typeof val !== "string") {
                        console.error(val + " is not type of string");
                        return _this;
                    }
                    _this.valStr = val;
                    break;
                case webworker_rpc.ParamType.boolean:
                    if (typeof val !== "boolean") {
                        console.error(val + " is not type of boolean");
                        return _this;
                    }
                    _this.valBool = val;
                    break;
                case webworker_rpc.ParamType.num:
                    if (typeof val !== "number") {
                        console.error(val + " is not type of number");
                        return _this;
                    }
                    _this.valNum = val;
                    break;
                case webworker_rpc.ParamType.unit8array:
                    if (val.constructor !== Uint8Array) {
                        console.error(val + " is not type of Uint8Array");
                        return _this;
                    }
                    _this.valBytes = val;
                    break;
                case webworker_rpc.ParamType.executor:
                    if (!(val instanceof webworker_rpc.Executor)) {
                        console.error(val + " is not type of Executor");
                        return _this;
                    }
                    _this.valExecutor = val;
                    break;
                default:
                    console.error("unkonw type : ", t);
                    break;
            }
        }
        return _this;
    }
    RPCParam.checkType = function (obj) {
        if (!obj)
            return false;
        if (!("t" in obj))
            return false;
        return true;
    };
    RPCParam.typeOf = function (val) {
        if (typeof val === "string") {
            return webworker_rpc.ParamType.str;
        }
        else if (typeof val === "boolean") {
            return webworker_rpc.ParamType.boolean;
        }
        else if (typeof val === "number") {
            return webworker_rpc.ParamType.num;
        }
        else if (val.constructor === Uint8Array) {
            return webworker_rpc.ParamType.unit8array;
        }
        else if (val instanceof webworker_rpc.Executor) {
            return webworker_rpc.ParamType.executor;
        }
        return webworker_rpc.ParamType.UNKNOWN;
    };
    return RPCParam;
}(webworker_rpc.Param));
export { RPCParam };
