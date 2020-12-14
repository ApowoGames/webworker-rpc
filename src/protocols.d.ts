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
        public method: string;

        /** Executor context. */
        public context: string;

        /** Executor params. */
        public params: webworker_rpc.IParam[];

        /**
         * Creates a new Executor instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Executor instance
         */
        public static create(properties?: webworker_rpc.IExecutor): webworker_rpc.Executor;

        /**
         * Encodes the specified Executor message. Does not implicitly {@link webworker_rpc.Executor.verify|verify} messages.
         * @param message Executor message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webworker_rpc.IExecutor, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Executor message, length delimited. Does not implicitly {@link webworker_rpc.Executor.verify|verify} messages.
         * @param message Executor message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webworker_rpc.IExecutor, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Executor message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Executor
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webworker_rpc.Executor;

        /**
         * Decodes an Executor message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Executor
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webworker_rpc.Executor;

        /**
         * Verifies an Executor message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Executor message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Executor
         */
        public static fromObject(object: { [k: string]: any }): webworker_rpc.Executor;

        /**
         * Creates a plain object from an Executor message. Also converts values to other types if specified.
         * @param message Executor
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webworker_rpc.Executor, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Executor to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
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
        public t: webworker_rpc.ParamType;

        /** Param valStr. */
        public valStr: string;

        /** Param valBool. */
        public valBool: boolean;

        /** Param valNum. */
        public valNum: number;

        /** Param valBytes. */
        public valBytes: Uint8Array;

        /** Param valExecutor. */
        public valExecutor?: (webworker_rpc.IExecutor|null);

        /** Param val. */
        public val?: ("valStr"|"valBool"|"valNum"|"valBytes"|"valExecutor");

        /**
         * Creates a new Param instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Param instance
         */
        public static create(properties?: webworker_rpc.IParam): webworker_rpc.Param;

        /**
         * Encodes the specified Param message. Does not implicitly {@link webworker_rpc.Param.verify|verify} messages.
         * @param message Param message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webworker_rpc.IParam, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Param message, length delimited. Does not implicitly {@link webworker_rpc.Param.verify|verify} messages.
         * @param message Param message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webworker_rpc.IParam, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Param message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Param
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webworker_rpc.Param;

        /**
         * Decodes a Param message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Param
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webworker_rpc.Param;

        /**
         * Verifies a Param message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Param message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Param
         */
        public static fromObject(object: { [k: string]: any }): webworker_rpc.Param;

        /**
         * Creates a plain object from a Param message. Also converts values to other types if specified.
         * @param message Param
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webworker_rpc.Param, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Param to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
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

        /** Header remoteExecutor */
        remoteExecutor: webworker_rpc.IExecutor;
    }

    /** Represents a Header. */
    class Header implements IHeader {

        /**
         * Constructs a new Header.
         * @param [properties] Properties to set
         */
        constructor(properties?: webworker_rpc.IHeader);

        /** Header serviceName. */
        public serviceName: string;

        /** Header remoteExecutor. */
        public remoteExecutor: webworker_rpc.IExecutor;

        /**
         * Creates a new Header instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Header instance
         */
        public static create(properties?: webworker_rpc.IHeader): webworker_rpc.Header;

        /**
         * Encodes the specified Header message. Does not implicitly {@link webworker_rpc.Header.verify|verify} messages.
         * @param message Header message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webworker_rpc.IHeader, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Header message, length delimited. Does not implicitly {@link webworker_rpc.Header.verify|verify} messages.
         * @param message Header message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webworker_rpc.IHeader, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Header message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Header
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webworker_rpc.Header;

        /**
         * Decodes a Header message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Header
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webworker_rpc.Header;

        /**
         * Verifies a Header message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Header message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Header
         */
        public static fromObject(object: { [k: string]: any }): webworker_rpc.Header;

        /**
         * Creates a plain object from a Header message. Also converts values to other types if specified.
         * @param message Header
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webworker_rpc.Header, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Header to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ExecutePacket. */
    interface IExecutePacket {

        /** ExecutePacket id */
        id: number;

        /** ExecutePacket header */
        header: webworker_rpc.IHeader;

        /** ExecutePacket bodyLen */
        bodyLen?: (number|null);

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

        /** ExecutePacket id. */
        public id: number;

        /** ExecutePacket header. */
        public header: webworker_rpc.IHeader;

        /** ExecutePacket bodyLen. */
        public bodyLen: number;

        /** ExecutePacket body. */
        public body: Uint8Array;

        /**
         * Creates a new ExecutePacket instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ExecutePacket instance
         */
        public static create(properties?: webworker_rpc.IExecutePacket): webworker_rpc.ExecutePacket;

        /**
         * Encodes the specified ExecutePacket message. Does not implicitly {@link webworker_rpc.ExecutePacket.verify|verify} messages.
         * @param message ExecutePacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webworker_rpc.IExecutePacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ExecutePacket message, length delimited. Does not implicitly {@link webworker_rpc.ExecutePacket.verify|verify} messages.
         * @param message ExecutePacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webworker_rpc.IExecutePacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ExecutePacket message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ExecutePacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webworker_rpc.ExecutePacket;

        /**
         * Decodes an ExecutePacket message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ExecutePacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webworker_rpc.ExecutePacket;

        /**
         * Verifies an ExecutePacket message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ExecutePacket message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ExecutePacket
         */
        public static fromObject(object: { [k: string]: any }): webworker_rpc.ExecutePacket;

        /**
         * Creates a plain object from an ExecutePacket message. Also converts values to other types if specified.
         * @param message ExecutePacket
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webworker_rpc.ExecutePacket, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ExecutePacket to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResponesPacket. */
    interface IResponesPacket {

        /** ResponesPacket id */
        id: number;

        /** ResponesPacket val */
        val?: (webworker_rpc.IParam|null);

        /** ResponesPacket err */
        err?: (string|null);
    }

    /** Represents a ResponesPacket. */
    class ResponesPacket implements IResponesPacket {

        /**
         * Constructs a new ResponesPacket.
         * @param [properties] Properties to set
         */
        constructor(properties?: webworker_rpc.IResponesPacket);

        /** ResponesPacket id. */
        public id: number;

        /** ResponesPacket val. */
        public val?: (webworker_rpc.IParam|null);

        /** ResponesPacket err. */
        public err: string;

        /**
         * Creates a new ResponesPacket instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResponesPacket instance
         */
        public static create(properties?: webworker_rpc.IResponesPacket): webworker_rpc.ResponesPacket;

        /**
         * Encodes the specified ResponesPacket message. Does not implicitly {@link webworker_rpc.ResponesPacket.verify|verify} messages.
         * @param message ResponesPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webworker_rpc.IResponesPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResponesPacket message, length delimited. Does not implicitly {@link webworker_rpc.ResponesPacket.verify|verify} messages.
         * @param message ResponesPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webworker_rpc.IResponesPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResponesPacket message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResponesPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webworker_rpc.ResponesPacket;

        /**
         * Decodes a ResponesPacket message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResponesPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webworker_rpc.ResponesPacket;

        /**
         * Verifies a ResponesPacket message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResponesPacket message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResponesPacket
         */
        public static fromObject(object: { [k: string]: any }): webworker_rpc.ResponesPacket;

        /**
         * Creates a plain object from a ResponesPacket message. Also converts values to other types if specified.
         * @param message ResponesPacket
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webworker_rpc.ResponesPacket, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResponesPacket to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RegistryPacket. */
    interface IRegistryPacket {

        /** RegistryPacket id */
        id: number;

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

        /** RegistryPacket id. */
        public id: number;

        /** RegistryPacket serviceName. */
        public serviceName: string;

        /** RegistryPacket executors. */
        public executors: webworker_rpc.IExecutor[];

        /**
         * Creates a new RegistryPacket instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RegistryPacket instance
         */
        public static create(properties?: webworker_rpc.IRegistryPacket): webworker_rpc.RegistryPacket;

        /**
         * Encodes the specified RegistryPacket message. Does not implicitly {@link webworker_rpc.RegistryPacket.verify|verify} messages.
         * @param message RegistryPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webworker_rpc.IRegistryPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RegistryPacket message, length delimited. Does not implicitly {@link webworker_rpc.RegistryPacket.verify|verify} messages.
         * @param message RegistryPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webworker_rpc.IRegistryPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RegistryPacket message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RegistryPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webworker_rpc.RegistryPacket;

        /**
         * Decodes a RegistryPacket message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RegistryPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webworker_rpc.RegistryPacket;

        /**
         * Verifies a RegistryPacket message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RegistryPacket message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RegistryPacket
         */
        public static fromObject(object: { [k: string]: any }): webworker_rpc.RegistryPacket;

        /**
         * Creates a plain object from a RegistryPacket message. Also converts values to other types if specified.
         * @param message RegistryPacket
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webworker_rpc.RegistryPacket, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RegistryPacket to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a WebWorkerMessage. */
    interface IWebWorkerMessage {

        /** WebWorkerMessage key */
        key: string;

        /** WebWorkerMessage dataRegistry */
        dataRegistry?: (webworker_rpc.IRegistryPacket|null);

        /** WebWorkerMessage dataExecute */
        dataExecute?: (webworker_rpc.IExecutePacket|null);

        /** WebWorkerMessage dataResponse */
        dataResponse?: (webworker_rpc.IResponesPacket|null);
    }

    /** Represents a WebWorkerMessage. */
    class WebWorkerMessage implements IWebWorkerMessage {

        /**
         * Constructs a new WebWorkerMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: webworker_rpc.IWebWorkerMessage);

        /** WebWorkerMessage key. */
        public key: string;

        /** WebWorkerMessage dataRegistry. */
        public dataRegistry?: (webworker_rpc.IRegistryPacket|null);

        /** WebWorkerMessage dataExecute. */
        public dataExecute?: (webworker_rpc.IExecutePacket|null);

        /** WebWorkerMessage dataResponse. */
        public dataResponse?: (webworker_rpc.IResponesPacket|null);

        /** WebWorkerMessage data. */
        public data?: ("dataRegistry"|"dataExecute"|"dataResponse");

        /**
         * Creates a new WebWorkerMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WebWorkerMessage instance
         */
        public static create(properties?: webworker_rpc.IWebWorkerMessage): webworker_rpc.WebWorkerMessage;

        /**
         * Encodes the specified WebWorkerMessage message. Does not implicitly {@link webworker_rpc.WebWorkerMessage.verify|verify} messages.
         * @param message WebWorkerMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webworker_rpc.IWebWorkerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified WebWorkerMessage message, length delimited. Does not implicitly {@link webworker_rpc.WebWorkerMessage.verify|verify} messages.
         * @param message WebWorkerMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webworker_rpc.IWebWorkerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WebWorkerMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns WebWorkerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webworker_rpc.WebWorkerMessage;

        /**
         * Decodes a WebWorkerMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns WebWorkerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webworker_rpc.WebWorkerMessage;

        /**
         * Verifies a WebWorkerMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a WebWorkerMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WebWorkerMessage
         */
        public static fromObject(object: { [k: string]: any }): webworker_rpc.WebWorkerMessage;

        /**
         * Creates a plain object from a WebWorkerMessage message. Also converts values to other types if specified.
         * @param message WebWorkerMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webworker_rpc.WebWorkerMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this WebWorkerMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
