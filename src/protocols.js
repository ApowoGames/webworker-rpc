/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.webworker_rpc = (function() {
    
        /**
         * Namespace webworker_rpc.
         * @exports webworker_rpc
         * @namespace
         */
        var webworker_rpc = {};
    
        /**
         * MSG_ERR enum.
         * @name webworker_rpc.MSG_ERR
         * @enum {number}
         * @property {number} OK=0 OK value
         */
        webworker_rpc.MSG_ERR = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "OK"] = 0;
            return values;
        })();
    
        webworker_rpc.Executor = (function() {
    
            /**
             * Properties of an Executor.
             * @memberof webworker_rpc
             * @interface IExecutor
             * @property {string} method Executor method
             * @property {string|null} [context] Executor context
             * @property {Array.<webworker_rpc.IParam>|null} [params] Executor params
             */
    
            /**
             * Constructs a new Executor.
             * @memberof webworker_rpc
             * @classdesc Represents an Executor.
             * @implements IExecutor
             * @constructor
             * @param {webworker_rpc.IExecutor=} [properties] Properties to set
             */
            function Executor(properties) {
                this.params = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Executor method.
             * @member {string} method
             * @memberof webworker_rpc.Executor
             * @instance
             */
            Executor.prototype.method = "";
    
            /**
             * Executor context.
             * @member {string} context
             * @memberof webworker_rpc.Executor
             * @instance
             */
            Executor.prototype.context = "";
    
            /**
             * Executor params.
             * @member {Array.<webworker_rpc.IParam>} params
             * @memberof webworker_rpc.Executor
             * @instance
             */
            Executor.prototype.params = $util.emptyArray;
    
            /**
             * Creates a new Executor instance using the specified properties.
             * @function create
             * @memberof webworker_rpc.Executor
             * @static
             * @param {webworker_rpc.IExecutor=} [properties] Properties to set
             * @returns {webworker_rpc.Executor} Executor instance
             */
            Executor.create = function create(properties) {
                return new Executor(properties);
            };
    
            /**
             * Encodes the specified Executor message. Does not implicitly {@link webworker_rpc.Executor.verify|verify} messages.
             * @function encode
             * @memberof webworker_rpc.Executor
             * @static
             * @param {webworker_rpc.IExecutor} message Executor message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Executor.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.method);
                if (message.context != null && Object.hasOwnProperty.call(message, "context"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.context);
                if (message.params != null && message.params.length)
                    for (var i = 0; i < message.params.length; ++i)
                        $root.webworker_rpc.Param.encode(message.params[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified Executor message, length delimited. Does not implicitly {@link webworker_rpc.Executor.verify|verify} messages.
             * @function encodeDelimited
             * @memberof webworker_rpc.Executor
             * @static
             * @param {webworker_rpc.IExecutor} message Executor message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Executor.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an Executor message from the specified reader or buffer.
             * @function decode
             * @memberof webworker_rpc.Executor
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {webworker_rpc.Executor} Executor
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Executor.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.webworker_rpc.Executor();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.method = reader.string();
                        break;
                    case 2:
                        message.context = reader.string();
                        break;
                    case 3:
                        if (!(message.params && message.params.length))
                            message.params = [];
                        message.params.push($root.webworker_rpc.Param.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("method"))
                    throw $util.ProtocolError("missing required 'method'", { instance: message });
                return message;
            };
    
            /**
             * Decodes an Executor message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof webworker_rpc.Executor
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {webworker_rpc.Executor} Executor
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Executor.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an Executor message.
             * @function verify
             * @memberof webworker_rpc.Executor
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Executor.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.method))
                    return "method: string expected";
                if (message.context != null && message.hasOwnProperty("context"))
                    if (!$util.isString(message.context))
                        return "context: string expected";
                if (message.params != null && message.hasOwnProperty("params")) {
                    if (!Array.isArray(message.params))
                        return "params: array expected";
                    for (var i = 0; i < message.params.length; ++i) {
                        var error = $root.webworker_rpc.Param.verify(message.params[i]);
                        if (error)
                            return "params." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates an Executor message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof webworker_rpc.Executor
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {webworker_rpc.Executor} Executor
             */
            Executor.fromObject = function fromObject(object) {
                if (object instanceof $root.webworker_rpc.Executor)
                    return object;
                var message = new $root.webworker_rpc.Executor();
                if (object.method != null)
                    message.method = String(object.method);
                if (object.context != null)
                    message.context = String(object.context);
                if (object.params) {
                    if (!Array.isArray(object.params))
                        throw TypeError(".webworker_rpc.Executor.params: array expected");
                    message.params = [];
                    for (var i = 0; i < object.params.length; ++i) {
                        if (typeof object.params[i] !== "object")
                            throw TypeError(".webworker_rpc.Executor.params: object expected");
                        message.params[i] = $root.webworker_rpc.Param.fromObject(object.params[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from an Executor message. Also converts values to other types if specified.
             * @function toObject
             * @memberof webworker_rpc.Executor
             * @static
             * @param {webworker_rpc.Executor} message Executor
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Executor.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.params = [];
                if (options.defaults) {
                    object.method = "";
                    object.context = "";
                }
                if (message.method != null && message.hasOwnProperty("method"))
                    object.method = message.method;
                if (message.context != null && message.hasOwnProperty("context"))
                    object.context = message.context;
                if (message.params && message.params.length) {
                    object.params = [];
                    for (var j = 0; j < message.params.length; ++j)
                        object.params[j] = $root.webworker_rpc.Param.toObject(message.params[j], options);
                }
                return object;
            };
    
            /**
             * Converts this Executor to JSON.
             * @function toJSON
             * @memberof webworker_rpc.Executor
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Executor.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Executor;
        })();
    
        webworker_rpc.Param = (function() {
    
            /**
             * Properties of a Param.
             * @memberof webworker_rpc
             * @interface IParam
             * @property {webworker_rpc.ParamType} t Param t
             * @property {string|null} [valStr] Param valStr
             * @property {boolean|null} [valBool] Param valBool
             * @property {number|null} [valNum] Param valNum
             * @property {Uint8Array|null} [valBytes] Param valBytes
             * @property {webworker_rpc.IExecutor|null} [valExecutor] Param valExecutor
             * @property {string|null} [className] Param className
             */
    
            /**
             * Constructs a new Param.
             * @memberof webworker_rpc
             * @classdesc Represents a Param.
             * @implements IParam
             * @constructor
             * @param {webworker_rpc.IParam=} [properties] Properties to set
             */
            function Param(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Param t.
             * @member {webworker_rpc.ParamType} t
             * @memberof webworker_rpc.Param
             * @instance
             */
            Param.prototype.t = 1;
    
            /**
             * Param valStr.
             * @member {string} valStr
             * @memberof webworker_rpc.Param
             * @instance
             */
            Param.prototype.valStr = "";
    
            /**
             * Param valBool.
             * @member {boolean} valBool
             * @memberof webworker_rpc.Param
             * @instance
             */
            Param.prototype.valBool = false;
    
            /**
             * Param valNum.
             * @member {number} valNum
             * @memberof webworker_rpc.Param
             * @instance
             */
            Param.prototype.valNum = 0;
    
            /**
             * Param valBytes.
             * @member {Uint8Array} valBytes
             * @memberof webworker_rpc.Param
             * @instance
             */
            Param.prototype.valBytes = $util.newBuffer([]);
    
            /**
             * Param valExecutor.
             * @member {webworker_rpc.IExecutor|null|undefined} valExecutor
             * @memberof webworker_rpc.Param
             * @instance
             */
            Param.prototype.valExecutor = null;
    
            /**
             * Param className.
             * @member {string} className
             * @memberof webworker_rpc.Param
             * @instance
             */
            Param.prototype.className = "";
    
            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;
    
            /**
             * Param val.
             * @member {"valStr"|"valBool"|"valNum"|"valBytes"|"valExecutor"|undefined} val
             * @memberof webworker_rpc.Param
             * @instance
             */
            Object.defineProperty(Param.prototype, "val", {
                get: $util.oneOfGetter($oneOfFields = ["valStr", "valBool", "valNum", "valBytes", "valExecutor"]),
                set: $util.oneOfSetter($oneOfFields)
            });
    
            /**
             * Creates a new Param instance using the specified properties.
             * @function create
             * @memberof webworker_rpc.Param
             * @static
             * @param {webworker_rpc.IParam=} [properties] Properties to set
             * @returns {webworker_rpc.Param} Param instance
             */
            Param.create = function create(properties) {
                return new Param(properties);
            };
    
            /**
             * Encodes the specified Param message. Does not implicitly {@link webworker_rpc.Param.verify|verify} messages.
             * @function encode
             * @memberof webworker_rpc.Param
             * @static
             * @param {webworker_rpc.IParam} message Param message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Param.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.t);
                if (message.valStr != null && Object.hasOwnProperty.call(message, "valStr"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.valStr);
                if (message.valBool != null && Object.hasOwnProperty.call(message, "valBool"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.valBool);
                if (message.valNum != null && Object.hasOwnProperty.call(message, "valNum"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.valNum);
                if (message.valBytes != null && Object.hasOwnProperty.call(message, "valBytes"))
                    writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.valBytes);
                if (message.valExecutor != null && Object.hasOwnProperty.call(message, "valExecutor"))
                    $root.webworker_rpc.Executor.encode(message.valExecutor, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.className != null && Object.hasOwnProperty.call(message, "className"))
                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.className);
                return writer;
            };
    
            /**
             * Encodes the specified Param message, length delimited. Does not implicitly {@link webworker_rpc.Param.verify|verify} messages.
             * @function encodeDelimited
             * @memberof webworker_rpc.Param
             * @static
             * @param {webworker_rpc.IParam} message Param message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Param.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Param message from the specified reader or buffer.
             * @function decode
             * @memberof webworker_rpc.Param
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {webworker_rpc.Param} Param
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Param.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.webworker_rpc.Param();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.t = reader.int32();
                        break;
                    case 2:
                        message.valStr = reader.string();
                        break;
                    case 3:
                        message.valBool = reader.bool();
                        break;
                    case 4:
                        message.valNum = reader.int32();
                        break;
                    case 5:
                        message.valBytes = reader.bytes();
                        break;
                    case 6:
                        message.valExecutor = $root.webworker_rpc.Executor.decode(reader, reader.uint32());
                        break;
                    case 7:
                        message.className = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("t"))
                    throw $util.ProtocolError("missing required 't'", { instance: message });
                return message;
            };
    
            /**
             * Decodes a Param message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof webworker_rpc.Param
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {webworker_rpc.Param} Param
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Param.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Param message.
             * @function verify
             * @memberof webworker_rpc.Param
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Param.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                switch (message.t) {
                default:
                    return "t: enum value expected";
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    break;
                }
                if (message.valStr != null && message.hasOwnProperty("valStr")) {
                    properties.val = 1;
                    if (!$util.isString(message.valStr))
                        return "valStr: string expected";
                }
                if (message.valBool != null && message.hasOwnProperty("valBool")) {
                    if (properties.val === 1)
                        return "val: multiple values";
                    properties.val = 1;
                    if (typeof message.valBool !== "boolean")
                        return "valBool: boolean expected";
                }
                if (message.valNum != null && message.hasOwnProperty("valNum")) {
                    if (properties.val === 1)
                        return "val: multiple values";
                    properties.val = 1;
                    if (!$util.isInteger(message.valNum))
                        return "valNum: integer expected";
                }
                if (message.valBytes != null && message.hasOwnProperty("valBytes")) {
                    if (properties.val === 1)
                        return "val: multiple values";
                    properties.val = 1;
                    if (!(message.valBytes && typeof message.valBytes.length === "number" || $util.isString(message.valBytes)))
                        return "valBytes: buffer expected";
                }
                if (message.valExecutor != null && message.hasOwnProperty("valExecutor")) {
                    if (properties.val === 1)
                        return "val: multiple values";
                    properties.val = 1;
                    {
                        var error = $root.webworker_rpc.Executor.verify(message.valExecutor);
                        if (error)
                            return "valExecutor." + error;
                    }
                }
                if (message.className != null && message.hasOwnProperty("className"))
                    if (!$util.isString(message.className))
                        return "className: string expected";
                return null;
            };
    
            /**
             * Creates a Param message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof webworker_rpc.Param
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {webworker_rpc.Param} Param
             */
            Param.fromObject = function fromObject(object) {
                if (object instanceof $root.webworker_rpc.Param)
                    return object;
                var message = new $root.webworker_rpc.Param();
                switch (object.t) {
                case "str":
                case 1:
                    message.t = 1;
                    break;
                case "boolean":
                case 2:
                    message.t = 2;
                    break;
                case "num":
                case 3:
                    message.t = 3;
                    break;
                case "unit8array":
                case 4:
                    message.t = 4;
                    break;
                case "executor":
                case 5:
                    message.t = 5;
                    break;
                case "custom":
                case 6:
                    message.t = 6;
                    break;
                }
                if (object.valStr != null)
                    message.valStr = String(object.valStr);
                if (object.valBool != null)
                    message.valBool = Boolean(object.valBool);
                if (object.valNum != null)
                    message.valNum = object.valNum | 0;
                if (object.valBytes != null)
                    if (typeof object.valBytes === "string")
                        $util.base64.decode(object.valBytes, message.valBytes = $util.newBuffer($util.base64.length(object.valBytes)), 0);
                    else if (object.valBytes.length)
                        message.valBytes = object.valBytes;
                if (object.valExecutor != null) {
                    if (typeof object.valExecutor !== "object")
                        throw TypeError(".webworker_rpc.Param.valExecutor: object expected");
                    message.valExecutor = $root.webworker_rpc.Executor.fromObject(object.valExecutor);
                }
                if (object.className != null)
                    message.className = String(object.className);
                return message;
            };
    
            /**
             * Creates a plain object from a Param message. Also converts values to other types if specified.
             * @function toObject
             * @memberof webworker_rpc.Param
             * @static
             * @param {webworker_rpc.Param} message Param
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Param.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.t = options.enums === String ? "str" : 1;
                    object.className = "";
                }
                if (message.t != null && message.hasOwnProperty("t"))
                    object.t = options.enums === String ? $root.webworker_rpc.ParamType[message.t] : message.t;
                if (message.valStr != null && message.hasOwnProperty("valStr")) {
                    object.valStr = message.valStr;
                    if (options.oneofs)
                        object.val = "valStr";
                }
                if (message.valBool != null && message.hasOwnProperty("valBool")) {
                    object.valBool = message.valBool;
                    if (options.oneofs)
                        object.val = "valBool";
                }
                if (message.valNum != null && message.hasOwnProperty("valNum")) {
                    object.valNum = message.valNum;
                    if (options.oneofs)
                        object.val = "valNum";
                }
                if (message.valBytes != null && message.hasOwnProperty("valBytes")) {
                    object.valBytes = options.bytes === String ? $util.base64.encode(message.valBytes, 0, message.valBytes.length) : options.bytes === Array ? Array.prototype.slice.call(message.valBytes) : message.valBytes;
                    if (options.oneofs)
                        object.val = "valBytes";
                }
                if (message.valExecutor != null && message.hasOwnProperty("valExecutor")) {
                    object.valExecutor = $root.webworker_rpc.Executor.toObject(message.valExecutor, options);
                    if (options.oneofs)
                        object.val = "valExecutor";
                }
                if (message.className != null && message.hasOwnProperty("className"))
                    object.className = message.className;
                return object;
            };
    
            /**
             * Converts this Param to JSON.
             * @function toJSON
             * @memberof webworker_rpc.Param
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Param.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Param;
        })();
    
        /**
         * ParamType enum.
         * @name webworker_rpc.ParamType
         * @enum {number}
         * @property {number} str=1 str value
         * @property {number} boolean=2 boolean value
         * @property {number} num=3 num value
         * @property {number} unit8array=4 unit8array value
         * @property {number} executor=5 executor value
         * @property {number} custom=6 custom value
         */
        webworker_rpc.ParamType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[1] = "str"] = 1;
            values[valuesById[2] = "boolean"] = 2;
            values[valuesById[3] = "num"] = 3;
            values[valuesById[4] = "unit8array"] = 4;
            values[valuesById[5] = "executor"] = 5;
            values[valuesById[6] = "custom"] = 6;
            return values;
        })();
    
        webworker_rpc.Header = (function() {
    
            /**
             * Properties of a Header.
             * @memberof webworker_rpc
             * @interface IHeader
             * @property {string} serviceName Header serviceName
             * @property {webworker_rpc.IExecutor} remoteExecutor Header remoteExecutor
             */
    
            /**
             * Constructs a new Header.
             * @memberof webworker_rpc
             * @classdesc Represents a Header.
             * @implements IHeader
             * @constructor
             * @param {webworker_rpc.IHeader=} [properties] Properties to set
             */
            function Header(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Header serviceName.
             * @member {string} serviceName
             * @memberof webworker_rpc.Header
             * @instance
             */
            Header.prototype.serviceName = "";
    
            /**
             * Header remoteExecutor.
             * @member {webworker_rpc.IExecutor} remoteExecutor
             * @memberof webworker_rpc.Header
             * @instance
             */
            Header.prototype.remoteExecutor = null;
    
            /**
             * Creates a new Header instance using the specified properties.
             * @function create
             * @memberof webworker_rpc.Header
             * @static
             * @param {webworker_rpc.IHeader=} [properties] Properties to set
             * @returns {webworker_rpc.Header} Header instance
             */
            Header.create = function create(properties) {
                return new Header(properties);
            };
    
            /**
             * Encodes the specified Header message. Does not implicitly {@link webworker_rpc.Header.verify|verify} messages.
             * @function encode
             * @memberof webworker_rpc.Header
             * @static
             * @param {webworker_rpc.IHeader} message Header message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Header.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.serviceName);
                $root.webworker_rpc.Executor.encode(message.remoteExecutor, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified Header message, length delimited. Does not implicitly {@link webworker_rpc.Header.verify|verify} messages.
             * @function encodeDelimited
             * @memberof webworker_rpc.Header
             * @static
             * @param {webworker_rpc.IHeader} message Header message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Header.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Header message from the specified reader or buffer.
             * @function decode
             * @memberof webworker_rpc.Header
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {webworker_rpc.Header} Header
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Header.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.webworker_rpc.Header();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.serviceName = reader.string();
                        break;
                    case 2:
                        message.remoteExecutor = $root.webworker_rpc.Executor.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("serviceName"))
                    throw $util.ProtocolError("missing required 'serviceName'", { instance: message });
                if (!message.hasOwnProperty("remoteExecutor"))
                    throw $util.ProtocolError("missing required 'remoteExecutor'", { instance: message });
                return message;
            };
    
            /**
             * Decodes a Header message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof webworker_rpc.Header
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {webworker_rpc.Header} Header
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Header.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Header message.
             * @function verify
             * @memberof webworker_rpc.Header
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Header.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.serviceName))
                    return "serviceName: string expected";
                {
                    var error = $root.webworker_rpc.Executor.verify(message.remoteExecutor);
                    if (error)
                        return "remoteExecutor." + error;
                }
                return null;
            };
    
            /**
             * Creates a Header message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof webworker_rpc.Header
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {webworker_rpc.Header} Header
             */
            Header.fromObject = function fromObject(object) {
                if (object instanceof $root.webworker_rpc.Header)
                    return object;
                var message = new $root.webworker_rpc.Header();
                if (object.serviceName != null)
                    message.serviceName = String(object.serviceName);
                if (object.remoteExecutor != null) {
                    if (typeof object.remoteExecutor !== "object")
                        throw TypeError(".webworker_rpc.Header.remoteExecutor: object expected");
                    message.remoteExecutor = $root.webworker_rpc.Executor.fromObject(object.remoteExecutor);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a Header message. Also converts values to other types if specified.
             * @function toObject
             * @memberof webworker_rpc.Header
             * @static
             * @param {webworker_rpc.Header} message Header
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Header.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.serviceName = "";
                    object.remoteExecutor = null;
                }
                if (message.serviceName != null && message.hasOwnProperty("serviceName"))
                    object.serviceName = message.serviceName;
                if (message.remoteExecutor != null && message.hasOwnProperty("remoteExecutor"))
                    object.remoteExecutor = $root.webworker_rpc.Executor.toObject(message.remoteExecutor, options);
                return object;
            };
    
            /**
             * Converts this Header to JSON.
             * @function toJSON
             * @memberof webworker_rpc.Header
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Header.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Header;
        })();
    
        webworker_rpc.ExecutePacket = (function() {
    
            /**
             * Properties of an ExecutePacket.
             * @memberof webworker_rpc
             * @interface IExecutePacket
             * @property {number} id ExecutePacket id
             * @property {webworker_rpc.IHeader} header ExecutePacket header
             * @property {number|null} [bodyLen] ExecutePacket bodyLen
             * @property {Uint8Array|null} [body] ExecutePacket body
             */
    
            /**
             * Constructs a new ExecutePacket.
             * @memberof webworker_rpc
             * @classdesc Represents an ExecutePacket.
             * @implements IExecutePacket
             * @constructor
             * @param {webworker_rpc.IExecutePacket=} [properties] Properties to set
             */
            function ExecutePacket(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ExecutePacket id.
             * @member {number} id
             * @memberof webworker_rpc.ExecutePacket
             * @instance
             */
            ExecutePacket.prototype.id = 0;
    
            /**
             * ExecutePacket header.
             * @member {webworker_rpc.IHeader} header
             * @memberof webworker_rpc.ExecutePacket
             * @instance
             */
            ExecutePacket.prototype.header = null;
    
            /**
             * ExecutePacket bodyLen.
             * @member {number} bodyLen
             * @memberof webworker_rpc.ExecutePacket
             * @instance
             */
            ExecutePacket.prototype.bodyLen = 0;
    
            /**
             * ExecutePacket body.
             * @member {Uint8Array} body
             * @memberof webworker_rpc.ExecutePacket
             * @instance
             */
            ExecutePacket.prototype.body = $util.newBuffer([]);
    
            /**
             * Creates a new ExecutePacket instance using the specified properties.
             * @function create
             * @memberof webworker_rpc.ExecutePacket
             * @static
             * @param {webworker_rpc.IExecutePacket=} [properties] Properties to set
             * @returns {webworker_rpc.ExecutePacket} ExecutePacket instance
             */
            ExecutePacket.create = function create(properties) {
                return new ExecutePacket(properties);
            };
    
            /**
             * Encodes the specified ExecutePacket message. Does not implicitly {@link webworker_rpc.ExecutePacket.verify|verify} messages.
             * @function encode
             * @memberof webworker_rpc.ExecutePacket
             * @static
             * @param {webworker_rpc.IExecutePacket} message ExecutePacket message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ExecutePacket.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                $root.webworker_rpc.Header.encode(message.header, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.bodyLen != null && Object.hasOwnProperty.call(message, "bodyLen"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.bodyLen);
                if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                    writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.body);
                return writer;
            };
    
            /**
             * Encodes the specified ExecutePacket message, length delimited. Does not implicitly {@link webworker_rpc.ExecutePacket.verify|verify} messages.
             * @function encodeDelimited
             * @memberof webworker_rpc.ExecutePacket
             * @static
             * @param {webworker_rpc.IExecutePacket} message ExecutePacket message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ExecutePacket.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an ExecutePacket message from the specified reader or buffer.
             * @function decode
             * @memberof webworker_rpc.ExecutePacket
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {webworker_rpc.ExecutePacket} ExecutePacket
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ExecutePacket.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.webworker_rpc.ExecutePacket();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.int32();
                        break;
                    case 2:
                        message.header = $root.webworker_rpc.Header.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.bodyLen = reader.int32();
                        break;
                    case 4:
                        message.body = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("id"))
                    throw $util.ProtocolError("missing required 'id'", { instance: message });
                if (!message.hasOwnProperty("header"))
                    throw $util.ProtocolError("missing required 'header'", { instance: message });
                return message;
            };
    
            /**
             * Decodes an ExecutePacket message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof webworker_rpc.ExecutePacket
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {webworker_rpc.ExecutePacket} ExecutePacket
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ExecutePacket.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an ExecutePacket message.
             * @function verify
             * @memberof webworker_rpc.ExecutePacket
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ExecutePacket.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
                {
                    var error = $root.webworker_rpc.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.bodyLen != null && message.hasOwnProperty("bodyLen"))
                    if (!$util.isInteger(message.bodyLen))
                        return "bodyLen: integer expected";
                if (message.body != null && message.hasOwnProperty("body"))
                    if (!(message.body && typeof message.body.length === "number" || $util.isString(message.body)))
                        return "body: buffer expected";
                return null;
            };
    
            /**
             * Creates an ExecutePacket message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof webworker_rpc.ExecutePacket
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {webworker_rpc.ExecutePacket} ExecutePacket
             */
            ExecutePacket.fromObject = function fromObject(object) {
                if (object instanceof $root.webworker_rpc.ExecutePacket)
                    return object;
                var message = new $root.webworker_rpc.ExecutePacket();
                if (object.id != null)
                    message.id = object.id | 0;
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".webworker_rpc.ExecutePacket.header: object expected");
                    message.header = $root.webworker_rpc.Header.fromObject(object.header);
                }
                if (object.bodyLen != null)
                    message.bodyLen = object.bodyLen | 0;
                if (object.body != null)
                    if (typeof object.body === "string")
                        $util.base64.decode(object.body, message.body = $util.newBuffer($util.base64.length(object.body)), 0);
                    else if (object.body.length)
                        message.body = object.body;
                return message;
            };
    
            /**
             * Creates a plain object from an ExecutePacket message. Also converts values to other types if specified.
             * @function toObject
             * @memberof webworker_rpc.ExecutePacket
             * @static
             * @param {webworker_rpc.ExecutePacket} message ExecutePacket
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ExecutePacket.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.id = 0;
                    object.header = null;
                    object.bodyLen = 0;
                    if (options.bytes === String)
                        object.body = "";
                    else {
                        object.body = [];
                        if (options.bytes !== Array)
                            object.body = $util.newBuffer(object.body);
                    }
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.webworker_rpc.Header.toObject(message.header, options);
                if (message.bodyLen != null && message.hasOwnProperty("bodyLen"))
                    object.bodyLen = message.bodyLen;
                if (message.body != null && message.hasOwnProperty("body"))
                    object.body = options.bytes === String ? $util.base64.encode(message.body, 0, message.body.length) : options.bytes === Array ? Array.prototype.slice.call(message.body) : message.body;
                return object;
            };
    
            /**
             * Converts this ExecutePacket to JSON.
             * @function toJSON
             * @memberof webworker_rpc.ExecutePacket
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ExecutePacket.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ExecutePacket;
        })();
    
        webworker_rpc.ResponesPacket = (function() {
    
            /**
             * Properties of a ResponesPacket.
             * @memberof webworker_rpc
             * @interface IResponesPacket
             * @property {number} id ResponesPacket id
             * @property {webworker_rpc.IParam|null} [val] ResponesPacket val
             * @property {string|null} [err] ResponesPacket err
             */
    
            /**
             * Constructs a new ResponesPacket.
             * @memberof webworker_rpc
             * @classdesc Represents a ResponesPacket.
             * @implements IResponesPacket
             * @constructor
             * @param {webworker_rpc.IResponesPacket=} [properties] Properties to set
             */
            function ResponesPacket(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ResponesPacket id.
             * @member {number} id
             * @memberof webworker_rpc.ResponesPacket
             * @instance
             */
            ResponesPacket.prototype.id = 0;
    
            /**
             * ResponesPacket val.
             * @member {webworker_rpc.IParam|null|undefined} val
             * @memberof webworker_rpc.ResponesPacket
             * @instance
             */
            ResponesPacket.prototype.val = null;
    
            /**
             * ResponesPacket err.
             * @member {string} err
             * @memberof webworker_rpc.ResponesPacket
             * @instance
             */
            ResponesPacket.prototype.err = "";
    
            /**
             * Creates a new ResponesPacket instance using the specified properties.
             * @function create
             * @memberof webworker_rpc.ResponesPacket
             * @static
             * @param {webworker_rpc.IResponesPacket=} [properties] Properties to set
             * @returns {webworker_rpc.ResponesPacket} ResponesPacket instance
             */
            ResponesPacket.create = function create(properties) {
                return new ResponesPacket(properties);
            };
    
            /**
             * Encodes the specified ResponesPacket message. Does not implicitly {@link webworker_rpc.ResponesPacket.verify|verify} messages.
             * @function encode
             * @memberof webworker_rpc.ResponesPacket
             * @static
             * @param {webworker_rpc.IResponesPacket} message ResponesPacket message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResponesPacket.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                if (message.val != null && Object.hasOwnProperty.call(message, "val"))
                    $root.webworker_rpc.Param.encode(message.val, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.err);
                return writer;
            };
    
            /**
             * Encodes the specified ResponesPacket message, length delimited. Does not implicitly {@link webworker_rpc.ResponesPacket.verify|verify} messages.
             * @function encodeDelimited
             * @memberof webworker_rpc.ResponesPacket
             * @static
             * @param {webworker_rpc.IResponesPacket} message ResponesPacket message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResponesPacket.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ResponesPacket message from the specified reader or buffer.
             * @function decode
             * @memberof webworker_rpc.ResponesPacket
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {webworker_rpc.ResponesPacket} ResponesPacket
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResponesPacket.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.webworker_rpc.ResponesPacket();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.int32();
                        break;
                    case 2:
                        message.val = $root.webworker_rpc.Param.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.err = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("id"))
                    throw $util.ProtocolError("missing required 'id'", { instance: message });
                return message;
            };
    
            /**
             * Decodes a ResponesPacket message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof webworker_rpc.ResponesPacket
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {webworker_rpc.ResponesPacket} ResponesPacket
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResponesPacket.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ResponesPacket message.
             * @function verify
             * @memberof webworker_rpc.ResponesPacket
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ResponesPacket.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
                if (message.val != null && message.hasOwnProperty("val")) {
                    var error = $root.webworker_rpc.Param.verify(message.val);
                    if (error)
                        return "val." + error;
                }
                if (message.err != null && message.hasOwnProperty("err"))
                    if (!$util.isString(message.err))
                        return "err: string expected";
                return null;
            };
    
            /**
             * Creates a ResponesPacket message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof webworker_rpc.ResponesPacket
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {webworker_rpc.ResponesPacket} ResponesPacket
             */
            ResponesPacket.fromObject = function fromObject(object) {
                if (object instanceof $root.webworker_rpc.ResponesPacket)
                    return object;
                var message = new $root.webworker_rpc.ResponesPacket();
                if (object.id != null)
                    message.id = object.id | 0;
                if (object.val != null) {
                    if (typeof object.val !== "object")
                        throw TypeError(".webworker_rpc.ResponesPacket.val: object expected");
                    message.val = $root.webworker_rpc.Param.fromObject(object.val);
                }
                if (object.err != null)
                    message.err = String(object.err);
                return message;
            };
    
            /**
             * Creates a plain object from a ResponesPacket message. Also converts values to other types if specified.
             * @function toObject
             * @memberof webworker_rpc.ResponesPacket
             * @static
             * @param {webworker_rpc.ResponesPacket} message ResponesPacket
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ResponesPacket.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.id = 0;
                    object.val = null;
                    object.err = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.val != null && message.hasOwnProperty("val"))
                    object.val = $root.webworker_rpc.Param.toObject(message.val, options);
                if (message.err != null && message.hasOwnProperty("err"))
                    object.err = message.err;
                return object;
            };
    
            /**
             * Converts this ResponesPacket to JSON.
             * @function toJSON
             * @memberof webworker_rpc.ResponesPacket
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ResponesPacket.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ResponesPacket;
        })();
    
        webworker_rpc.AddRegistryPacket = (function() {
    
            /**
             * Properties of an AddRegistryPacket.
             * @memberof webworker_rpc
             * @interface IAddRegistryPacket
             * @property {number} id AddRegistryPacket id
             * @property {string} serviceName AddRegistryPacket serviceName
             * @property {Array.<webworker_rpc.IExecutor>|null} [executors] AddRegistryPacket executors
             */
    
            /**
             * Constructs a new AddRegistryPacket.
             * @memberof webworker_rpc
             * @classdesc Represents an AddRegistryPacket.
             * @implements IAddRegistryPacket
             * @constructor
             * @param {webworker_rpc.IAddRegistryPacket=} [properties] Properties to set
             */
            function AddRegistryPacket(properties) {
                this.executors = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * AddRegistryPacket id.
             * @member {number} id
             * @memberof webworker_rpc.AddRegistryPacket
             * @instance
             */
            AddRegistryPacket.prototype.id = 0;
    
            /**
             * AddRegistryPacket serviceName.
             * @member {string} serviceName
             * @memberof webworker_rpc.AddRegistryPacket
             * @instance
             */
            AddRegistryPacket.prototype.serviceName = "";
    
            /**
             * AddRegistryPacket executors.
             * @member {Array.<webworker_rpc.IExecutor>} executors
             * @memberof webworker_rpc.AddRegistryPacket
             * @instance
             */
            AddRegistryPacket.prototype.executors = $util.emptyArray;
    
            /**
             * Creates a new AddRegistryPacket instance using the specified properties.
             * @function create
             * @memberof webworker_rpc.AddRegistryPacket
             * @static
             * @param {webworker_rpc.IAddRegistryPacket=} [properties] Properties to set
             * @returns {webworker_rpc.AddRegistryPacket} AddRegistryPacket instance
             */
            AddRegistryPacket.create = function create(properties) {
                return new AddRegistryPacket(properties);
            };
    
            /**
             * Encodes the specified AddRegistryPacket message. Does not implicitly {@link webworker_rpc.AddRegistryPacket.verify|verify} messages.
             * @function encode
             * @memberof webworker_rpc.AddRegistryPacket
             * @static
             * @param {webworker_rpc.IAddRegistryPacket} message AddRegistryPacket message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AddRegistryPacket.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.serviceName);
                if (message.executors != null && message.executors.length)
                    for (var i = 0; i < message.executors.length; ++i)
                        $root.webworker_rpc.Executor.encode(message.executors[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified AddRegistryPacket message, length delimited. Does not implicitly {@link webworker_rpc.AddRegistryPacket.verify|verify} messages.
             * @function encodeDelimited
             * @memberof webworker_rpc.AddRegistryPacket
             * @static
             * @param {webworker_rpc.IAddRegistryPacket} message AddRegistryPacket message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AddRegistryPacket.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an AddRegistryPacket message from the specified reader or buffer.
             * @function decode
             * @memberof webworker_rpc.AddRegistryPacket
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {webworker_rpc.AddRegistryPacket} AddRegistryPacket
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AddRegistryPacket.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.webworker_rpc.AddRegistryPacket();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.int32();
                        break;
                    case 2:
                        message.serviceName = reader.string();
                        break;
                    case 3:
                        if (!(message.executors && message.executors.length))
                            message.executors = [];
                        message.executors.push($root.webworker_rpc.Executor.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("id"))
                    throw $util.ProtocolError("missing required 'id'", { instance: message });
                if (!message.hasOwnProperty("serviceName"))
                    throw $util.ProtocolError("missing required 'serviceName'", { instance: message });
                return message;
            };
    
            /**
             * Decodes an AddRegistryPacket message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof webworker_rpc.AddRegistryPacket
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {webworker_rpc.AddRegistryPacket} AddRegistryPacket
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AddRegistryPacket.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an AddRegistryPacket message.
             * @function verify
             * @memberof webworker_rpc.AddRegistryPacket
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AddRegistryPacket.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
                if (!$util.isString(message.serviceName))
                    return "serviceName: string expected";
                if (message.executors != null && message.hasOwnProperty("executors")) {
                    if (!Array.isArray(message.executors))
                        return "executors: array expected";
                    for (var i = 0; i < message.executors.length; ++i) {
                        var error = $root.webworker_rpc.Executor.verify(message.executors[i]);
                        if (error)
                            return "executors." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates an AddRegistryPacket message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof webworker_rpc.AddRegistryPacket
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {webworker_rpc.AddRegistryPacket} AddRegistryPacket
             */
            AddRegistryPacket.fromObject = function fromObject(object) {
                if (object instanceof $root.webworker_rpc.AddRegistryPacket)
                    return object;
                var message = new $root.webworker_rpc.AddRegistryPacket();
                if (object.id != null)
                    message.id = object.id | 0;
                if (object.serviceName != null)
                    message.serviceName = String(object.serviceName);
                if (object.executors) {
                    if (!Array.isArray(object.executors))
                        throw TypeError(".webworker_rpc.AddRegistryPacket.executors: array expected");
                    message.executors = [];
                    for (var i = 0; i < object.executors.length; ++i) {
                        if (typeof object.executors[i] !== "object")
                            throw TypeError(".webworker_rpc.AddRegistryPacket.executors: object expected");
                        message.executors[i] = $root.webworker_rpc.Executor.fromObject(object.executors[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from an AddRegistryPacket message. Also converts values to other types if specified.
             * @function toObject
             * @memberof webworker_rpc.AddRegistryPacket
             * @static
             * @param {webworker_rpc.AddRegistryPacket} message AddRegistryPacket
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AddRegistryPacket.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.executors = [];
                if (options.defaults) {
                    object.id = 0;
                    object.serviceName = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.serviceName != null && message.hasOwnProperty("serviceName"))
                    object.serviceName = message.serviceName;
                if (message.executors && message.executors.length) {
                    object.executors = [];
                    for (var j = 0; j < message.executors.length; ++j)
                        object.executors[j] = $root.webworker_rpc.Executor.toObject(message.executors[j], options);
                }
                return object;
            };
    
            /**
             * Converts this AddRegistryPacket to JSON.
             * @function toJSON
             * @memberof webworker_rpc.AddRegistryPacket
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AddRegistryPacket.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return AddRegistryPacket;
        })();
    
        webworker_rpc.GotRegistryPacket = (function() {
    
            /**
             * Properties of a GotRegistryPacket.
             * @memberof webworker_rpc
             * @interface IGotRegistryPacket
             * @property {number} id GotRegistryPacket id
             * @property {string} serviceName GotRegistryPacket serviceName
             */
    
            /**
             * Constructs a new GotRegistryPacket.
             * @memberof webworker_rpc
             * @classdesc Represents a GotRegistryPacket.
             * @implements IGotRegistryPacket
             * @constructor
             * @param {webworker_rpc.IGotRegistryPacket=} [properties] Properties to set
             */
            function GotRegistryPacket(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GotRegistryPacket id.
             * @member {number} id
             * @memberof webworker_rpc.GotRegistryPacket
             * @instance
             */
            GotRegistryPacket.prototype.id = 0;
    
            /**
             * GotRegistryPacket serviceName.
             * @member {string} serviceName
             * @memberof webworker_rpc.GotRegistryPacket
             * @instance
             */
            GotRegistryPacket.prototype.serviceName = "";
    
            /**
             * Creates a new GotRegistryPacket instance using the specified properties.
             * @function create
             * @memberof webworker_rpc.GotRegistryPacket
             * @static
             * @param {webworker_rpc.IGotRegistryPacket=} [properties] Properties to set
             * @returns {webworker_rpc.GotRegistryPacket} GotRegistryPacket instance
             */
            GotRegistryPacket.create = function create(properties) {
                return new GotRegistryPacket(properties);
            };
    
            /**
             * Encodes the specified GotRegistryPacket message. Does not implicitly {@link webworker_rpc.GotRegistryPacket.verify|verify} messages.
             * @function encode
             * @memberof webworker_rpc.GotRegistryPacket
             * @static
             * @param {webworker_rpc.IGotRegistryPacket} message GotRegistryPacket message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GotRegistryPacket.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.serviceName);
                return writer;
            };
    
            /**
             * Encodes the specified GotRegistryPacket message, length delimited. Does not implicitly {@link webworker_rpc.GotRegistryPacket.verify|verify} messages.
             * @function encodeDelimited
             * @memberof webworker_rpc.GotRegistryPacket
             * @static
             * @param {webworker_rpc.IGotRegistryPacket} message GotRegistryPacket message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GotRegistryPacket.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GotRegistryPacket message from the specified reader or buffer.
             * @function decode
             * @memberof webworker_rpc.GotRegistryPacket
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {webworker_rpc.GotRegistryPacket} GotRegistryPacket
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GotRegistryPacket.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.webworker_rpc.GotRegistryPacket();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.int32();
                        break;
                    case 2:
                        message.serviceName = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("id"))
                    throw $util.ProtocolError("missing required 'id'", { instance: message });
                if (!message.hasOwnProperty("serviceName"))
                    throw $util.ProtocolError("missing required 'serviceName'", { instance: message });
                return message;
            };
    
            /**
             * Decodes a GotRegistryPacket message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof webworker_rpc.GotRegistryPacket
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {webworker_rpc.GotRegistryPacket} GotRegistryPacket
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GotRegistryPacket.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GotRegistryPacket message.
             * @function verify
             * @memberof webworker_rpc.GotRegistryPacket
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GotRegistryPacket.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
                if (!$util.isString(message.serviceName))
                    return "serviceName: string expected";
                return null;
            };
    
            /**
             * Creates a GotRegistryPacket message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof webworker_rpc.GotRegistryPacket
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {webworker_rpc.GotRegistryPacket} GotRegistryPacket
             */
            GotRegistryPacket.fromObject = function fromObject(object) {
                if (object instanceof $root.webworker_rpc.GotRegistryPacket)
                    return object;
                var message = new $root.webworker_rpc.GotRegistryPacket();
                if (object.id != null)
                    message.id = object.id | 0;
                if (object.serviceName != null)
                    message.serviceName = String(object.serviceName);
                return message;
            };
    
            /**
             * Creates a plain object from a GotRegistryPacket message. Also converts values to other types if specified.
             * @function toObject
             * @memberof webworker_rpc.GotRegistryPacket
             * @static
             * @param {webworker_rpc.GotRegistryPacket} message GotRegistryPacket
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GotRegistryPacket.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.id = 0;
                    object.serviceName = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.serviceName != null && message.hasOwnProperty("serviceName"))
                    object.serviceName = message.serviceName;
                return object;
            };
    
            /**
             * Converts this GotRegistryPacket to JSON.
             * @function toJSON
             * @memberof webworker_rpc.GotRegistryPacket
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GotRegistryPacket.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return GotRegistryPacket;
        })();
    
        webworker_rpc.UnlinkPacket = (function() {
    
            /**
             * Properties of an UnlinkPacket.
             * @memberof webworker_rpc
             * @interface IUnlinkPacket
             * @property {string} serviceName UnlinkPacket serviceName
             */
    
            /**
             * Constructs a new UnlinkPacket.
             * @memberof webworker_rpc
             * @classdesc Represents an UnlinkPacket.
             * @implements IUnlinkPacket
             * @constructor
             * @param {webworker_rpc.IUnlinkPacket=} [properties] Properties to set
             */
            function UnlinkPacket(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * UnlinkPacket serviceName.
             * @member {string} serviceName
             * @memberof webworker_rpc.UnlinkPacket
             * @instance
             */
            UnlinkPacket.prototype.serviceName = "";
    
            /**
             * Creates a new UnlinkPacket instance using the specified properties.
             * @function create
             * @memberof webworker_rpc.UnlinkPacket
             * @static
             * @param {webworker_rpc.IUnlinkPacket=} [properties] Properties to set
             * @returns {webworker_rpc.UnlinkPacket} UnlinkPacket instance
             */
            UnlinkPacket.create = function create(properties) {
                return new UnlinkPacket(properties);
            };
    
            /**
             * Encodes the specified UnlinkPacket message. Does not implicitly {@link webworker_rpc.UnlinkPacket.verify|verify} messages.
             * @function encode
             * @memberof webworker_rpc.UnlinkPacket
             * @static
             * @param {webworker_rpc.IUnlinkPacket} message UnlinkPacket message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UnlinkPacket.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.serviceName);
                return writer;
            };
    
            /**
             * Encodes the specified UnlinkPacket message, length delimited. Does not implicitly {@link webworker_rpc.UnlinkPacket.verify|verify} messages.
             * @function encodeDelimited
             * @memberof webworker_rpc.UnlinkPacket
             * @static
             * @param {webworker_rpc.IUnlinkPacket} message UnlinkPacket message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UnlinkPacket.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an UnlinkPacket message from the specified reader or buffer.
             * @function decode
             * @memberof webworker_rpc.UnlinkPacket
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {webworker_rpc.UnlinkPacket} UnlinkPacket
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UnlinkPacket.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.webworker_rpc.UnlinkPacket();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.serviceName = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("serviceName"))
                    throw $util.ProtocolError("missing required 'serviceName'", { instance: message });
                return message;
            };
    
            /**
             * Decodes an UnlinkPacket message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof webworker_rpc.UnlinkPacket
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {webworker_rpc.UnlinkPacket} UnlinkPacket
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UnlinkPacket.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an UnlinkPacket message.
             * @function verify
             * @memberof webworker_rpc.UnlinkPacket
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            UnlinkPacket.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.serviceName))
                    return "serviceName: string expected";
                return null;
            };
    
            /**
             * Creates an UnlinkPacket message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof webworker_rpc.UnlinkPacket
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {webworker_rpc.UnlinkPacket} UnlinkPacket
             */
            UnlinkPacket.fromObject = function fromObject(object) {
                if (object instanceof $root.webworker_rpc.UnlinkPacket)
                    return object;
                var message = new $root.webworker_rpc.UnlinkPacket();
                if (object.serviceName != null)
                    message.serviceName = String(object.serviceName);
                return message;
            };
    
            /**
             * Creates a plain object from an UnlinkPacket message. Also converts values to other types if specified.
             * @function toObject
             * @memberof webworker_rpc.UnlinkPacket
             * @static
             * @param {webworker_rpc.UnlinkPacket} message UnlinkPacket
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UnlinkPacket.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.serviceName = "";
                if (message.serviceName != null && message.hasOwnProperty("serviceName"))
                    object.serviceName = message.serviceName;
                return object;
            };
    
            /**
             * Converts this UnlinkPacket to JSON.
             * @function toJSON
             * @memberof webworker_rpc.UnlinkPacket
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UnlinkPacket.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return UnlinkPacket;
        })();
    
        webworker_rpc.WebWorkerMessage = (function() {
    
            /**
             * Properties of a WebWorkerMessage.
             * @memberof webworker_rpc
             * @interface IWebWorkerMessage
             * @property {string} key WebWorkerMessage key
             * @property {webworker_rpc.IAddRegistryPacket|null} [dataAddRegistry] WebWorkerMessage dataAddRegistry
             * @property {webworker_rpc.IGotRegistryPacket|null} [dataGotRegistry] WebWorkerMessage dataGotRegistry
             * @property {webworker_rpc.IExecutePacket|null} [dataExecute] WebWorkerMessage dataExecute
             * @property {webworker_rpc.IResponesPacket|null} [dataResponse] WebWorkerMessage dataResponse
             * @property {webworker_rpc.IUnlinkPacket|null} [dataUnlink] WebWorkerMessage dataUnlink
             */
    
            /**
             * Constructs a new WebWorkerMessage.
             * @memberof webworker_rpc
             * @classdesc Represents a WebWorkerMessage.
             * @implements IWebWorkerMessage
             * @constructor
             * @param {webworker_rpc.IWebWorkerMessage=} [properties] Properties to set
             */
            function WebWorkerMessage(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * WebWorkerMessage key.
             * @member {string} key
             * @memberof webworker_rpc.WebWorkerMessage
             * @instance
             */
            WebWorkerMessage.prototype.key = "";
    
            /**
             * WebWorkerMessage dataAddRegistry.
             * @member {webworker_rpc.IAddRegistryPacket|null|undefined} dataAddRegistry
             * @memberof webworker_rpc.WebWorkerMessage
             * @instance
             */
            WebWorkerMessage.prototype.dataAddRegistry = null;
    
            /**
             * WebWorkerMessage dataGotRegistry.
             * @member {webworker_rpc.IGotRegistryPacket|null|undefined} dataGotRegistry
             * @memberof webworker_rpc.WebWorkerMessage
             * @instance
             */
            WebWorkerMessage.prototype.dataGotRegistry = null;
    
            /**
             * WebWorkerMessage dataExecute.
             * @member {webworker_rpc.IExecutePacket|null|undefined} dataExecute
             * @memberof webworker_rpc.WebWorkerMessage
             * @instance
             */
            WebWorkerMessage.prototype.dataExecute = null;
    
            /**
             * WebWorkerMessage dataResponse.
             * @member {webworker_rpc.IResponesPacket|null|undefined} dataResponse
             * @memberof webworker_rpc.WebWorkerMessage
             * @instance
             */
            WebWorkerMessage.prototype.dataResponse = null;
    
            /**
             * WebWorkerMessage dataUnlink.
             * @member {webworker_rpc.IUnlinkPacket|null|undefined} dataUnlink
             * @memberof webworker_rpc.WebWorkerMessage
             * @instance
             */
            WebWorkerMessage.prototype.dataUnlink = null;
    
            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;
    
            /**
             * WebWorkerMessage data.
             * @member {"dataAddRegistry"|"dataGotRegistry"|"dataExecute"|"dataResponse"|"dataUnlink"|undefined} data
             * @memberof webworker_rpc.WebWorkerMessage
             * @instance
             */
            Object.defineProperty(WebWorkerMessage.prototype, "data", {
                get: $util.oneOfGetter($oneOfFields = ["dataAddRegistry", "dataGotRegistry", "dataExecute", "dataResponse", "dataUnlink"]),
                set: $util.oneOfSetter($oneOfFields)
            });
    
            /**
             * Creates a new WebWorkerMessage instance using the specified properties.
             * @function create
             * @memberof webworker_rpc.WebWorkerMessage
             * @static
             * @param {webworker_rpc.IWebWorkerMessage=} [properties] Properties to set
             * @returns {webworker_rpc.WebWorkerMessage} WebWorkerMessage instance
             */
            WebWorkerMessage.create = function create(properties) {
                return new WebWorkerMessage(properties);
            };
    
            /**
             * Encodes the specified WebWorkerMessage message. Does not implicitly {@link webworker_rpc.WebWorkerMessage.verify|verify} messages.
             * @function encode
             * @memberof webworker_rpc.WebWorkerMessage
             * @static
             * @param {webworker_rpc.IWebWorkerMessage} message WebWorkerMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WebWorkerMessage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
                if (message.dataAddRegistry != null && Object.hasOwnProperty.call(message, "dataAddRegistry"))
                    $root.webworker_rpc.AddRegistryPacket.encode(message.dataAddRegistry, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.dataGotRegistry != null && Object.hasOwnProperty.call(message, "dataGotRegistry"))
                    $root.webworker_rpc.GotRegistryPacket.encode(message.dataGotRegistry, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.dataExecute != null && Object.hasOwnProperty.call(message, "dataExecute"))
                    $root.webworker_rpc.ExecutePacket.encode(message.dataExecute, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.dataResponse != null && Object.hasOwnProperty.call(message, "dataResponse"))
                    $root.webworker_rpc.ResponesPacket.encode(message.dataResponse, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.dataUnlink != null && Object.hasOwnProperty.call(message, "dataUnlink"))
                    $root.webworker_rpc.UnlinkPacket.encode(message.dataUnlink, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified WebWorkerMessage message, length delimited. Does not implicitly {@link webworker_rpc.WebWorkerMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof webworker_rpc.WebWorkerMessage
             * @static
             * @param {webworker_rpc.IWebWorkerMessage} message WebWorkerMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WebWorkerMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a WebWorkerMessage message from the specified reader or buffer.
             * @function decode
             * @memberof webworker_rpc.WebWorkerMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {webworker_rpc.WebWorkerMessage} WebWorkerMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WebWorkerMessage.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.webworker_rpc.WebWorkerMessage();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.key = reader.string();
                        break;
                    case 2:
                        message.dataAddRegistry = $root.webworker_rpc.AddRegistryPacket.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.dataGotRegistry = $root.webworker_rpc.GotRegistryPacket.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.dataExecute = $root.webworker_rpc.ExecutePacket.decode(reader, reader.uint32());
                        break;
                    case 5:
                        message.dataResponse = $root.webworker_rpc.ResponesPacket.decode(reader, reader.uint32());
                        break;
                    case 6:
                        message.dataUnlink = $root.webworker_rpc.UnlinkPacket.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("key"))
                    throw $util.ProtocolError("missing required 'key'", { instance: message });
                return message;
            };
    
            /**
             * Decodes a WebWorkerMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof webworker_rpc.WebWorkerMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {webworker_rpc.WebWorkerMessage} WebWorkerMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WebWorkerMessage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a WebWorkerMessage message.
             * @function verify
             * @memberof webworker_rpc.WebWorkerMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            WebWorkerMessage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (!$util.isString(message.key))
                    return "key: string expected";
                if (message.dataAddRegistry != null && message.hasOwnProperty("dataAddRegistry")) {
                    properties.data = 1;
                    {
                        var error = $root.webworker_rpc.AddRegistryPacket.verify(message.dataAddRegistry);
                        if (error)
                            return "dataAddRegistry." + error;
                    }
                }
                if (message.dataGotRegistry != null && message.hasOwnProperty("dataGotRegistry")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.webworker_rpc.GotRegistryPacket.verify(message.dataGotRegistry);
                        if (error)
                            return "dataGotRegistry." + error;
                    }
                }
                if (message.dataExecute != null && message.hasOwnProperty("dataExecute")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.webworker_rpc.ExecutePacket.verify(message.dataExecute);
                        if (error)
                            return "dataExecute." + error;
                    }
                }
                if (message.dataResponse != null && message.hasOwnProperty("dataResponse")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.webworker_rpc.ResponesPacket.verify(message.dataResponse);
                        if (error)
                            return "dataResponse." + error;
                    }
                }
                if (message.dataUnlink != null && message.hasOwnProperty("dataUnlink")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.webworker_rpc.UnlinkPacket.verify(message.dataUnlink);
                        if (error)
                            return "dataUnlink." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a WebWorkerMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof webworker_rpc.WebWorkerMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {webworker_rpc.WebWorkerMessage} WebWorkerMessage
             */
            WebWorkerMessage.fromObject = function fromObject(object) {
                if (object instanceof $root.webworker_rpc.WebWorkerMessage)
                    return object;
                var message = new $root.webworker_rpc.WebWorkerMessage();
                if (object.key != null)
                    message.key = String(object.key);
                if (object.dataAddRegistry != null) {
                    if (typeof object.dataAddRegistry !== "object")
                        throw TypeError(".webworker_rpc.WebWorkerMessage.dataAddRegistry: object expected");
                    message.dataAddRegistry = $root.webworker_rpc.AddRegistryPacket.fromObject(object.dataAddRegistry);
                }
                if (object.dataGotRegistry != null) {
                    if (typeof object.dataGotRegistry !== "object")
                        throw TypeError(".webworker_rpc.WebWorkerMessage.dataGotRegistry: object expected");
                    message.dataGotRegistry = $root.webworker_rpc.GotRegistryPacket.fromObject(object.dataGotRegistry);
                }
                if (object.dataExecute != null) {
                    if (typeof object.dataExecute !== "object")
                        throw TypeError(".webworker_rpc.WebWorkerMessage.dataExecute: object expected");
                    message.dataExecute = $root.webworker_rpc.ExecutePacket.fromObject(object.dataExecute);
                }
                if (object.dataResponse != null) {
                    if (typeof object.dataResponse !== "object")
                        throw TypeError(".webworker_rpc.WebWorkerMessage.dataResponse: object expected");
                    message.dataResponse = $root.webworker_rpc.ResponesPacket.fromObject(object.dataResponse);
                }
                if (object.dataUnlink != null) {
                    if (typeof object.dataUnlink !== "object")
                        throw TypeError(".webworker_rpc.WebWorkerMessage.dataUnlink: object expected");
                    message.dataUnlink = $root.webworker_rpc.UnlinkPacket.fromObject(object.dataUnlink);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a WebWorkerMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof webworker_rpc.WebWorkerMessage
             * @static
             * @param {webworker_rpc.WebWorkerMessage} message WebWorkerMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            WebWorkerMessage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.key = "";
                if (message.key != null && message.hasOwnProperty("key"))
                    object.key = message.key;
                if (message.dataAddRegistry != null && message.hasOwnProperty("dataAddRegistry")) {
                    object.dataAddRegistry = $root.webworker_rpc.AddRegistryPacket.toObject(message.dataAddRegistry, options);
                    if (options.oneofs)
                        object.data = "dataAddRegistry";
                }
                if (message.dataGotRegistry != null && message.hasOwnProperty("dataGotRegistry")) {
                    object.dataGotRegistry = $root.webworker_rpc.GotRegistryPacket.toObject(message.dataGotRegistry, options);
                    if (options.oneofs)
                        object.data = "dataGotRegistry";
                }
                if (message.dataExecute != null && message.hasOwnProperty("dataExecute")) {
                    object.dataExecute = $root.webworker_rpc.ExecutePacket.toObject(message.dataExecute, options);
                    if (options.oneofs)
                        object.data = "dataExecute";
                }
                if (message.dataResponse != null && message.hasOwnProperty("dataResponse")) {
                    object.dataResponse = $root.webworker_rpc.ResponesPacket.toObject(message.dataResponse, options);
                    if (options.oneofs)
                        object.data = "dataResponse";
                }
                if (message.dataUnlink != null && message.hasOwnProperty("dataUnlink")) {
                    object.dataUnlink = $root.webworker_rpc.UnlinkPacket.toObject(message.dataUnlink, options);
                    if (options.oneofs)
                        object.data = "dataUnlink";
                }
                return object;
            };
    
            /**
             * Converts this WebWorkerMessage to JSON.
             * @function toJSON
             * @memberof webworker_rpc.WebWorkerMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            WebWorkerMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return WebWorkerMessage;
        })();
    
        return webworker_rpc;
    })();

    return $root;
});
