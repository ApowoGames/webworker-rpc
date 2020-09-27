// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../../protobufjs

declare module 'webworker-rpc' {
    export { webworker_rpc } from "webworker-rpc/protocols";
    export { RPCEmitter, RPCPeer, LinkListener, ExportAll, Export, RemoteListener, } from "webworker-rpc/rpc.peer";
    export { RPCMessage, RPCRegistryPacket, RPCExecutePacket, RPCExecutor, RPCParam, } from "webworker-rpc/rpc.message";
}

declare module 'webworker-rpc/protocols' {
    import * as $protobuf from "protobufjs";
    /** Namespace webworker_rpc. */
    export namespace webworker_rpc {
    
            /** MSG_ERR enum. */
            enum MSG_ERR {
                    OK = 0
            }
    
            /** Properties of an Executor. */
            interface IExecutor {
    
                    /** Executor method */
                    method: string;
    
                    /** Executor context */
                    context?: (string|null);
    
                    /** Executor params */
                    params?: (webworker_rpc.IParam[]|null);
            }
    
            /** Represents an Executor. */
            class Executor implements IExecutor {
    
                    /**
                        * Constructs a new Executor.
                        * @param [properties] Properties to set
                        */
                    constructor(properties?: webworker_rpc.IExecutor);
    
                    /** Executor method. */
                    method: string;
    
                    /** Executor context. */
                    context: string;
    
                    /** Executor params. */
                    params: webworker_rpc.IParam[];
    
                    /**
                        * Creates a new Executor instance using the specified properties.
                        * @param [properties] Properties to set
                        * @returns Executor instance
                        */
                    static create(properties?: webworker_rpc.IExecutor): webworker_rpc.Executor;
    
                    /**
                        * Encodes the specified Executor message. Does not implicitly {@link webworker_rpc.Executor.verify|verify} messages.
                        * @param message Executor message or plain object to encode
                        * @param [writer] Writer to encode to
                        * @returns Writer
                        */
                    static encode(message: webworker_rpc.IExecutor, writer?: $protobuf.Writer): $protobuf.Writer;
    
                    /**
                        * Encodes the specified Executor message, length delimited. Does not implicitly {@link webworker_rpc.Executor.verify|verify} messages.
                        * @param message Executor message or plain object to encode
                        * @param [writer] Writer to encode to
                        * @returns Writer
                        */
                    static encodeDelimited(message: webworker_rpc.IExecutor, writer?: $protobuf.Writer): $protobuf.Writer;
    
                    /**
                        * Decodes an Executor message from the specified reader or buffer.
                        * @param reader Reader or buffer to decode from
                        * @param [length] Message length if known beforehand
                        * @returns Executor
                        * @throws {Error} If the payload is not a reader or valid buffer
                        * @throws {$protobuf.util.ProtocolError} If required fields are missing
                        */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webworker_rpc.Executor;
    
                    /**
                        * Decodes an Executor message from the specified reader or buffer, length delimited.
                        * @param reader Reader or buffer to decode from
                        * @returns Executor
                        * @throws {Error} If the payload is not a reader or valid buffer
                        * @throws {$protobuf.util.ProtocolError} If required fields are missing
                        */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webworker_rpc.Executor;
    
                    /**
                        * Verifies an Executor message.
                        * @param message Plain object to verify
                        * @returns `null` if valid, otherwise the reason why it is not
                        */
                    static verify(message: { [k: string]: any }): (string|null);
    
                    /**
                        * Creates an Executor message from a plain object. Also converts values to their respective internal types.
                        * @param object Plain object
                        * @returns Executor
                        */
                    static fromObject(object: { [k: string]: any }): webworker_rpc.Executor;
    
                    /**
                        * Creates a plain object from an Executor message. Also converts values to other types if specified.
                        * @param message Executor
                        * @param [options] Conversion options
                        * @returns Plain object
                        */
                    static toObject(message: webworker_rpc.Executor, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
                    /**
                        * Converts this Executor to JSON.
                        * @returns JSON object
                        */
                    toJSON(): { [k: string]: any };
            }
    
            /** Properties of a Param. */
            interface IParam {
    
                    /** Param t */
                    t: webworker_rpc.ParamType;
    
                    /** Param valStr */
                    valStr?: (string|null);
    
                    /** Param valBool */
                    valBool?: (boolean|null);
    
                    /** Param valNum */
                    valNum?: (number|null);
    
                    /** Param valBytes */
                    valBytes?: (Uint8Array|null);
    
                    /** Param valExecutor */
                    valExecutor?: (webworker_rpc.IExecutor|null);
            }
    
            /** Represents a Param. */
            class Param implements IParam {
    
                    /**
                        * Constructs a new Param.
                        * @param [properties] Properties to set
                        */
                    constructor(properties?: webworker_rpc.IParam);
    
                    /** Param t. */
                    t: webworker_rpc.ParamType;
    
                    /** Param valStr. */
                    valStr: string;
    
                    /** Param valBool. */
                    valBool: boolean;
    
                    /** Param valNum. */
                    valNum: number;
    
                    /** Param valBytes. */
                    valBytes: Uint8Array;
    
                    /** Param valExecutor. */
                    valExecutor?: (webworker_rpc.IExecutor|null);
    
                    /** Param val. */
                    val?: ("valStr"|"valBool"|"valNum"|"valBytes"|"valExecutor");
    
                    /**
                        * Creates a new Param instance using the specified properties.
                        * @param [properties] Properties to set
                        * @returns Param instance
                        */
                    static create(properties?: webworker_rpc.IParam): webworker_rpc.Param;
    
                    /**
                        * Encodes the specified Param message. Does not implicitly {@link webworker_rpc.Param.verify|verify} messages.
                        * @param message Param message or plain object to encode
                        * @param [writer] Writer to encode to
                        * @returns Writer
                        */
                    static encode(message: webworker_rpc.IParam, writer?: $protobuf.Writer): $protobuf.Writer;
    
                    /**
                        * Encodes the specified Param message, length delimited. Does not implicitly {@link webworker_rpc.Param.verify|verify} messages.
                        * @param message Param message or plain object to encode
                        * @param [writer] Writer to encode to
                        * @returns Writer
                        */
                    static encodeDelimited(message: webworker_rpc.IParam, writer?: $protobuf.Writer): $protobuf.Writer;
    
                    /**
                        * Decodes a Param message from the specified reader or buffer.
                        * @param reader Reader or buffer to decode from
                        * @param [length] Message length if known beforehand
                        * @returns Param
                        * @throws {Error} If the payload is not a reader or valid buffer
                        * @throws {$protobuf.util.ProtocolError} If required fields are missing
                        */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webworker_rpc.Param;
    
                    /**
                        * Decodes a Param message from the specified reader or buffer, length delimited.
                        * @param reader Reader or buffer to decode from
                        * @returns Param
                        * @throws {Error} If the payload is not a reader or valid buffer
                        * @throws {$protobuf.util.ProtocolError} If required fields are missing
                        */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webworker_rpc.Param;
    
                    /**
                        * Verifies a Param message.
                        * @param message Plain object to verify
                        * @returns `null` if valid, otherwise the reason why it is not
                        */
                    static verify(message: { [k: string]: any }): (string|null);
    
                    /**
                        * Creates a Param message from a plain object. Also converts values to their respective internal types.
                        * @param object Plain object
                        * @returns Param
                        */
                    static fromObject(object: { [k: string]: any }): webworker_rpc.Param;
    
                    /**
                        * Creates a plain object from a Param message. Also converts values to other types if specified.
                        * @param message Param
                        * @param [options] Conversion options
                        * @returns Plain object
                        */
                    static toObject(message: webworker_rpc.Param, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
                    /**
                        * Converts this Param to JSON.
                        * @returns JSON object
                        */
                    toJSON(): { [k: string]: any };
            }
    
            /** ParamType enum. */
            enum ParamType {
                    UNKNOWN = 0,
                    str = 1,
                    boolean = 2,
                    num = 3,
                    unit8array = 4,
                    executor = 5
            }
    
            /** Properties of a Header. */
            interface IHeader {
    
                    /** Header serviceName */
                    serviceName: string;
    
                    /** Header error */
                    error: webworker_rpc.MSG_ERR;
    
                    /** Header remoteExecutor */
                    remoteExecutor: webworker_rpc.IExecutor;
    
                    /** Header callbackExecutor */
                    callbackExecutor?: (webworker_rpc.IExecutor|null);
    
                    /** Header bodyLen */
                    bodyLen?: (number|null);
            }
    
            /** Represents a Header. */
            class Header implements IHeader {
    
                    /**
                        * Constructs a new Header.
                        * @param [properties] Properties to set
                        */
                    constructor(properties?: webworker_rpc.IHeader);
    
                    /** Header serviceName. */
                    serviceName: string;
    
                    /** Header error. */
                    error: webworker_rpc.MSG_ERR;
    
                    /** Header remoteExecutor. */
                    remoteExecutor: webworker_rpc.IExecutor;
    
                    /** Header callbackExecutor. */
                    callbackExecutor?: (webworker_rpc.IExecutor|null);
    
                    /** Header bodyLen. */
                    bodyLen: number;
    
                    /**
                        * Creates a new Header instance using the specified properties.
                        * @param [properties] Properties to set
                        * @returns Header instance
                        */
                    static create(properties?: webworker_rpc.IHeader): webworker_rpc.Header;
    
                    /**
                        * Encodes the specified Header message. Does not implicitly {@link webworker_rpc.Header.verify|verify} messages.
                        * @param message Header message or plain object to encode
                        * @param [writer] Writer to encode to
                        * @returns Writer
                        */
                    static encode(message: webworker_rpc.IHeader, writer?: $protobuf.Writer): $protobuf.Writer;
    
                    /**
                        * Encodes the specified Header message, length delimited. Does not implicitly {@link webworker_rpc.Header.verify|verify} messages.
                        * @param message Header message or plain object to encode
                        * @param [writer] Writer to encode to
                        * @returns Writer
                        */
                    static encodeDelimited(message: webworker_rpc.IHeader, writer?: $protobuf.Writer): $protobuf.Writer;
    
                    /**
                        * Decodes a Header message from the specified reader or buffer.
                        * @param reader Reader or buffer to decode from
                        * @param [length] Message length if known beforehand
                        * @returns Header
                        * @throws {Error} If the payload is not a reader or valid buffer
                        * @throws {$protobuf.util.ProtocolError} If required fields are missing
                        */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webworker_rpc.Header;
    
                    /**
                        * Decodes a Header message from the specified reader or buffer, length delimited.
                        * @param reader Reader or buffer to decode from
                        * @returns Header
                        * @throws {Error} If the payload is not a reader or valid buffer
                        * @throws {$protobuf.util.ProtocolError} If required fields are missing
                        */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webworker_rpc.Header;
    
                    /**
                        * Verifies a Header message.
                        * @param message Plain object to verify
                        * @returns `null` if valid, otherwise the reason why it is not
                        */
                    static verify(message: { [k: string]: any }): (string|null);
    
                    /**
                        * Creates a Header message from a plain object. Also converts values to their respective internal types.
                        * @param object Plain object
                        * @returns Header
                        */
                    static fromObject(object: { [k: string]: any }): webworker_rpc.Header;
    
                    /**
                        * Creates a plain object from a Header message. Also converts values to other types if specified.
                        * @param message Header
                        * @param [options] Conversion options
                        * @returns Plain object
                        */
                    static toObject(message: webworker_rpc.Header, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
                    /**
                        * Converts this Header to JSON.
                        * @returns JSON object
                        */
                    toJSON(): { [k: string]: any };
            }
    
            /** Properties of an ExecutePacket. */
            interface IExecutePacket {
    
                    /** ExecutePacket header */
                    header: webworker_rpc.IHeader;
    
                    /** ExecutePacket body */
                    body?: (Uint8Array|null);
            }
    
            /** Represents an ExecutePacket. */
            class ExecutePacket implements IExecutePacket {
    
                    /**
                        * Constructs a new ExecutePacket.
                        * @param [properties] Properties to set
                        */
                    constructor(properties?: webworker_rpc.IExecutePacket);
    
                    /** ExecutePacket header. */
                    header: webworker_rpc.IHeader;
    
                    /** ExecutePacket body. */
                    body: Uint8Array;
    
                    /**
                        * Creates a new ExecutePacket instance using the specified properties.
                        * @param [properties] Properties to set
                        * @returns ExecutePacket instance
                        */
                    static create(properties?: webworker_rpc.IExecutePacket): webworker_rpc.ExecutePacket;
    
                    /**
                        * Encodes the specified ExecutePacket message. Does not implicitly {@link webworker_rpc.ExecutePacket.verify|verify} messages.
                        * @param message ExecutePacket message or plain object to encode
                        * @param [writer] Writer to encode to
                        * @returns Writer
                        */
                    static encode(message: webworker_rpc.IExecutePacket, writer?: $protobuf.Writer): $protobuf.Writer;
    
                    /**
                        * Encodes the specified ExecutePacket message, length delimited. Does not implicitly {@link webworker_rpc.ExecutePacket.verify|verify} messages.
                        * @param message ExecutePacket message or plain object to encode
                        * @param [writer] Writer to encode to
                        * @returns Writer
                        */
                    static encodeDelimited(message: webworker_rpc.IExecutePacket, writer?: $protobuf.Writer): $protobuf.Writer;
    
                    /**
                        * Decodes an ExecutePacket message from the specified reader or buffer.
                        * @param reader Reader or buffer to decode from
                        * @param [length] Message length if known beforehand
                        * @returns ExecutePacket
                        * @throws {Error} If the payload is not a reader or valid buffer
                        * @throws {$protobuf.util.ProtocolError} If required fields are missing
                        */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webworker_rpc.ExecutePacket;
    
                    /**
                        * Decodes an ExecutePacket message from the specified reader or buffer, length delimited.
                        * @param reader Reader or buffer to decode from
                        * @returns ExecutePacket
                        * @throws {Error} If the payload is not a reader or valid buffer
                        * @throws {$protobuf.util.ProtocolError} If required fields are missing
                        */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webworker_rpc.ExecutePacket;
    
                    /**
                        * Verifies an ExecutePacket message.
                        * @param message Plain object to verify
                        * @returns `null` if valid, otherwise the reason why it is not
                        */
                    static verify(message: { [k: string]: any }): (string|null);
    
                    /**
                        * Creates an ExecutePacket message from a plain object. Also converts values to their respective internal types.
                        * @param object Plain object
                        * @returns ExecutePacket
                        */
                    static fromObject(object: { [k: string]: any }): webworker_rpc.ExecutePacket;
    
                    /**
                        * Creates a plain object from an ExecutePacket message. Also converts values to other types if specified.
                        * @param message ExecutePacket
                        * @param [options] Conversion options
                        * @returns Plain object
                        */
                    static toObject(message: webworker_rpc.ExecutePacket, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
                    /**
                        * Converts this ExecutePacket to JSON.
                        * @returns JSON object
                        */
                    toJSON(): { [k: string]: any };
            }
    
            /** Properties of a RegistryPacket. */
            interface IRegistryPacket {
    
                    /** RegistryPacket serviceName */
                    serviceName: string;
    
                    /** RegistryPacket executors */
                    executors?: (webworker_rpc.IExecutor[]|null);
            }
    
            /** Represents a RegistryPacket. */
            class RegistryPacket implements IRegistryPacket {
    
                    /**
                        * Constructs a new RegistryPacket.
                        * @param [properties] Properties to set
                        */
                    constructor(properties?: webworker_rpc.IRegistryPacket);
    
                    /** RegistryPacket serviceName. */
                    serviceName: string;
    
                    /** RegistryPacket executors. */
                    executors: webworker_rpc.IExecutor[];
    
                    /**
                        * Creates a new RegistryPacket instance using the specified properties.
                        * @param [properties] Properties to set
                        * @returns RegistryPacket instance
                        */
                    static create(properties?: webworker_rpc.IRegistryPacket): webworker_rpc.RegistryPacket;
    
                    /**
                        * Encodes the specified RegistryPacket message. Does not implicitly {@link webworker_rpc.RegistryPacket.verify|verify} messages.
                        * @param message RegistryPacket message or plain object to encode
                        * @param [writer] Writer to encode to
                        * @returns Writer
                        */
                    static encode(message: webworker_rpc.IRegistryPacket, writer?: $protobuf.Writer): $protobuf.Writer;
    
                    /**
                        * Encodes the specified RegistryPacket message, length delimited. Does not implicitly {@link webworker_rpc.RegistryPacket.verify|verify} messages.
                        * @param message RegistryPacket message or plain object to encode
                        * @param [writer] Writer to encode to
                        * @returns Writer
                        */
                    static encodeDelimited(message: webworker_rpc.IRegistryPacket, writer?: $protobuf.Writer): $protobuf.Writer;
    
                    /**
                        * Decodes a RegistryPacket message from the specified reader or buffer.
                        * @param reader Reader or buffer to decode from
                        * @param [length] Message length if known beforehand
                        * @returns RegistryPacket
                        * @throws {Error} If the payload is not a reader or valid buffer
                        * @throws {$protobuf.util.ProtocolError} If required fields are missing
                        */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webworker_rpc.RegistryPacket;
    
                    /**
                        * Decodes a RegistryPacket message from the specified reader or buffer, length delimited.
                        * @param reader Reader or buffer to decode from
                        * @returns RegistryPacket
                        * @throws {Error} If the payload is not a reader or valid buffer
                        * @throws {$protobuf.util.ProtocolError} If required fields are missing
                        */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webworker_rpc.RegistryPacket;
    
                    /**
                        * Verifies a RegistryPacket message.
                        * @param message Plain object to verify
                        * @returns `null` if valid, otherwise the reason why it is not
                        */
                    static verify(message: { [k: string]: any }): (string|null);
    
                    /**
                        * Creates a RegistryPacket message from a plain object. Also converts values to their respective internal types.
                        * @param object Plain object
                        * @returns RegistryPacket
                        */
                    static fromObject(object: { [k: string]: any }): webworker_rpc.RegistryPacket;
    
                    /**
                        * Creates a plain object from a RegistryPacket message. Also converts values to other types if specified.
                        * @param message RegistryPacket
                        * @param [options] Conversion options
                        * @returns Plain object
                        */
                    static toObject(message: webworker_rpc.RegistryPacket, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
                    /**
                        * Converts this RegistryPacket to JSON.
                        * @returns JSON object
                        */
                    toJSON(): { [k: string]: any };
            }
    
            /** Properties of a WebWorkerMessage. */
            interface IWebWorkerMessage {
    
                    /** WebWorkerMessage key */
                    key: string;
    
                    /** WebWorkerMessage dataExecute */
                    dataExecute?: (webworker_rpc.IExecutePacket|null);
    
                    /** WebWorkerMessage dataRegistry */
                    dataRegistry?: (webworker_rpc.IRegistryPacket|null);
            }
    
            /** Represents a WebWorkerMessage. */
            class WebWorkerMessage implements IWebWorkerMessage {
    
                    /**
                        * Constructs a new WebWorkerMessage.
                        * @param [properties] Properties to set
                        */
                    constructor(properties?: webworker_rpc.IWebWorkerMessage);
    
                    /** WebWorkerMessage key. */
                    key: string;
    
                    /** WebWorkerMessage dataExecute. */
                    dataExecute?: (webworker_rpc.IExecutePacket|null);
    
                    /** WebWorkerMessage dataRegistry. */
                    dataRegistry?: (webworker_rpc.IRegistryPacket|null);
    
                    /** WebWorkerMessage data. */
                    data?: ("dataExecute"|"dataRegistry");
    
                    /**
                        * Creates a new WebWorkerMessage instance using the specified properties.
                        * @param [properties] Properties to set
                        * @returns WebWorkerMessage instance
                        */
                    static create(properties?: webworker_rpc.IWebWorkerMessage): webworker_rpc.WebWorkerMessage;
    
                    /**
                        * Encodes the specified WebWorkerMessage message. Does not implicitly {@link webworker_rpc.WebWorkerMessage.verify|verify} messages.
                        * @param message WebWorkerMessage message or plain object to encode
                        * @param [writer] Writer to encode to
                        * @returns Writer
                        */
                    static encode(message: webworker_rpc.IWebWorkerMessage, writer?: $protobuf.Writer): $protobuf.Writer;
    
                    /**
                        * Encodes the specified WebWorkerMessage message, length delimited. Does not implicitly {@link webworker_rpc.WebWorkerMessage.verify|verify} messages.
                        * @param message WebWorkerMessage message or plain object to encode
                        * @param [writer] Writer to encode to
                        * @returns Writer
                        */
                    static encodeDelimited(message: webworker_rpc.IWebWorkerMessage, writer?: $protobuf.Writer): $protobuf.Writer;
    
                    /**
                        * Decodes a WebWorkerMessage message from the specified reader or buffer.
                        * @param reader Reader or buffer to decode from
                        * @param [length] Message length if known beforehand
                        * @returns WebWorkerMessage
                        * @throws {Error} If the payload is not a reader or valid buffer
                        * @throws {$protobuf.util.ProtocolError} If required fields are missing
                        */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webworker_rpc.WebWorkerMessage;
    
                    /**
                        * Decodes a WebWorkerMessage message from the specified reader or buffer, length delimited.
                        * @param reader Reader or buffer to decode from
                        * @returns WebWorkerMessage
                        * @throws {Error} If the payload is not a reader or valid buffer
                        * @throws {$protobuf.util.ProtocolError} If required fields are missing
                        */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webworker_rpc.WebWorkerMessage;
    
                    /**
                        * Verifies a WebWorkerMessage message.
                        * @param message Plain object to verify
                        * @returns `null` if valid, otherwise the reason why it is not
                        */
                    static verify(message: { [k: string]: any }): (string|null);
    
                    /**
                        * Creates a WebWorkerMessage message from a plain object. Also converts values to their respective internal types.
                        * @param object Plain object
                        * @returns WebWorkerMessage
                        */
                    static fromObject(object: { [k: string]: any }): webworker_rpc.WebWorkerMessage;
    
                    /**
                        * Creates a plain object from a WebWorkerMessage message. Also converts values to other types if specified.
                        * @param message WebWorkerMessage
                        * @param [options] Conversion options
                        * @returns Plain object
                        */
                    static toObject(message: webworker_rpc.WebWorkerMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };
    
                    /**
                        * Converts this WebWorkerMessage to JSON.
                        * @returns JSON object
                        */
                    toJSON(): { [k: string]: any };
            }
    }
}

declare module 'webworker-rpc/rpc.peer' {
    import { webworker_rpc } from "webworker-rpc/protocols";
    import { RPCExecutor } from "webworker-rpc/rpc.message";
    export function ExportAll(): (target: any) => any;
    export function Export(paramTypes?: webworker_rpc.ParamType[]): (target: any, name: any, descriptor?: any) => void;
    export function RemoteListener(worker: string, context: string, event: string, paramTypes?: webworker_rpc.ParamType[]): (target: any, name: any, descriptor: any) => void;
    export class RPCEmitter {
        constructor();
        on(event: string, executor: RPCExecutor, worker: string): void;
        off(event: string, executor?: RPCExecutor, worker?: string): void;
        protected emit(event: string, ...args: any[]): void;
    }
    export class RPCPeer extends RPCEmitter {
        ["remote"]: {
            [worker: string]: {
                [context: string]: any;
            };
        };
        name: string;
        static getInstance(): RPCPeer;
        constructor(name: string, w?: Worker);
        linkTo(workerName: string, workerUrl?: string): LinkListener;
        linkFinished(): void;
    }
    export class LinkListener {
        constructor(port1: string, port2: string);
        onReady(f: () => any): void;
        setPortReady(port: string): void;
    }
}

declare module 'webworker-rpc/rpc.message' {
    import { webworker_rpc } from "webworker-rpc/protocols";
    export class RPCMessage extends webworker_rpc.WebWorkerMessage {
        constructor(key: string, data: webworker_rpc.ExecutePacket | webworker_rpc.RegistryPacket);
    }
    export class RPCRegistryPacket extends webworker_rpc.RegistryPacket {
        static checkType(obj: any): boolean;
        constructor(service: string, executors: webworker_rpc.Executor[]);
    }
    export class RPCExecutePacket extends webworker_rpc.ExecutePacket {
        static checkType(obj: any): boolean;
        constructor(service: string, method: string, context?: string, params?: webworker_rpc.Param[], callback?: webworker_rpc.Executor);
    }
    export class RPCExecutor extends webworker_rpc.Executor {
        static checkType(obj: any): boolean;
        constructor(method: string, context: string, params?: webworker_rpc.Param[]);
    }
    export class RPCParam extends webworker_rpc.Param {
        static checkType(obj: any): boolean;
        static typeOf(val: any): webworker_rpc.ParamType;
        constructor(t: webworker_rpc.ParamType, val?: any);
    }
}

