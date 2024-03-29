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

        /** Param className */
        className?: (string|null);
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

        /** Param className. */
        public className: string;

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
        str = 1,
        boolean = 2,
        num = 3,
        unit8array = 4,
        executor = 5,
        custom = 6
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

    /** Properties of a ResponsePacket. */
    interface IResponsePacket {

        /** ResponsePacket id */
        id: number;

        /** ResponsePacket val */
        val?: (webworker_rpc.IParam|null);

        /** ResponsePacket err */
        err?: (string|null);
    }

    /** Represents a ResponsePacket. */
    class ResponsePacket implements IResponsePacket {

        /**
         * Constructs a new ResponsePacket.
         * @param [properties] Properties to set
         */
        constructor(properties?: webworker_rpc.IResponsePacket);

        /** ResponsePacket id. */
        public id: number;

        /** ResponsePacket val. */
        public val?: (webworker_rpc.IParam|null);

        /** ResponsePacket err. */
        public err: string;

        /**
         * Creates a new ResponsePacket instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResponsePacket instance
         */
        public static create(properties?: webworker_rpc.IResponsePacket): webworker_rpc.ResponsePacket;

        /**
         * Encodes the specified ResponsePacket message. Does not implicitly {@link webworker_rpc.ResponsePacket.verify|verify} messages.
         * @param message ResponsePacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webworker_rpc.IResponsePacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResponsePacket message, length delimited. Does not implicitly {@link webworker_rpc.ResponsePacket.verify|verify} messages.
         * @param message ResponsePacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webworker_rpc.IResponsePacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResponsePacket message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResponsePacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webworker_rpc.ResponsePacket;

        /**
         * Decodes a ResponsePacket message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResponsePacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webworker_rpc.ResponsePacket;

        /**
         * Verifies a ResponsePacket message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResponsePacket message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResponsePacket
         */
        public static fromObject(object: { [k: string]: any }): webworker_rpc.ResponsePacket;

        /**
         * Creates a plain object from a ResponsePacket message. Also converts values to other types if specified.
         * @param message ResponsePacket
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webworker_rpc.ResponsePacket, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResponsePacket to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AddRegistryPacket. */
    interface IAddRegistryPacket {

        /** AddRegistryPacket id */
        id: number;

        /** AddRegistryPacket serviceName */
        serviceName: string;

        /** AddRegistryPacket executors */
        executors?: (webworker_rpc.IExecutor[]|null);
    }

    /** Represents an AddRegistryPacket. */
    class AddRegistryPacket implements IAddRegistryPacket {

        /**
         * Constructs a new AddRegistryPacket.
         * @param [properties] Properties to set
         */
        constructor(properties?: webworker_rpc.IAddRegistryPacket);

        /** AddRegistryPacket id. */
        public id: number;

        /** AddRegistryPacket serviceName. */
        public serviceName: string;

        /** AddRegistryPacket executors. */
        public executors: webworker_rpc.IExecutor[];

        /**
         * Creates a new AddRegistryPacket instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AddRegistryPacket instance
         */
        public static create(properties?: webworker_rpc.IAddRegistryPacket): webworker_rpc.AddRegistryPacket;

        /**
         * Encodes the specified AddRegistryPacket message. Does not implicitly {@link webworker_rpc.AddRegistryPacket.verify|verify} messages.
         * @param message AddRegistryPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webworker_rpc.IAddRegistryPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AddRegistryPacket message, length delimited. Does not implicitly {@link webworker_rpc.AddRegistryPacket.verify|verify} messages.
         * @param message AddRegistryPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webworker_rpc.IAddRegistryPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AddRegistryPacket message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AddRegistryPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webworker_rpc.AddRegistryPacket;

        /**
         * Decodes an AddRegistryPacket message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AddRegistryPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webworker_rpc.AddRegistryPacket;

        /**
         * Verifies an AddRegistryPacket message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AddRegistryPacket message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AddRegistryPacket
         */
        public static fromObject(object: { [k: string]: any }): webworker_rpc.AddRegistryPacket;

        /**
         * Creates a plain object from an AddRegistryPacket message. Also converts values to other types if specified.
         * @param message AddRegistryPacket
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webworker_rpc.AddRegistryPacket, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AddRegistryPacket to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GotRegistryPacket. */
    interface IGotRegistryPacket {

        /** GotRegistryPacket id */
        id: number;

        /** GotRegistryPacket serviceName */
        serviceName: string;
    }

    /** Represents a GotRegistryPacket. */
    class GotRegistryPacket implements IGotRegistryPacket {

        /**
         * Constructs a new GotRegistryPacket.
         * @param [properties] Properties to set
         */
        constructor(properties?: webworker_rpc.IGotRegistryPacket);

        /** GotRegistryPacket id. */
        public id: number;

        /** GotRegistryPacket serviceName. */
        public serviceName: string;

        /**
         * Creates a new GotRegistryPacket instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GotRegistryPacket instance
         */
        public static create(properties?: webworker_rpc.IGotRegistryPacket): webworker_rpc.GotRegistryPacket;

        /**
         * Encodes the specified GotRegistryPacket message. Does not implicitly {@link webworker_rpc.GotRegistryPacket.verify|verify} messages.
         * @param message GotRegistryPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webworker_rpc.IGotRegistryPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GotRegistryPacket message, length delimited. Does not implicitly {@link webworker_rpc.GotRegistryPacket.verify|verify} messages.
         * @param message GotRegistryPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webworker_rpc.IGotRegistryPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GotRegistryPacket message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GotRegistryPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webworker_rpc.GotRegistryPacket;

        /**
         * Decodes a GotRegistryPacket message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GotRegistryPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webworker_rpc.GotRegistryPacket;

        /**
         * Verifies a GotRegistryPacket message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GotRegistryPacket message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GotRegistryPacket
         */
        public static fromObject(object: { [k: string]: any }): webworker_rpc.GotRegistryPacket;

        /**
         * Creates a plain object from a GotRegistryPacket message. Also converts values to other types if specified.
         * @param message GotRegistryPacket
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webworker_rpc.GotRegistryPacket, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GotRegistryPacket to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RemoveRegistryPacket. */
    interface IRemoveRegistryPacket {

        /** RemoveRegistryPacket serviceName */
        serviceName: string;

        /** RemoveRegistryPacket executors */
        executors?: (webworker_rpc.IExecutor[]|null);
    }

    /** Represents a RemoveRegistryPacket. */
    class RemoveRegistryPacket implements IRemoveRegistryPacket {

        /**
         * Constructs a new RemoveRegistryPacket.
         * @param [properties] Properties to set
         */
        constructor(properties?: webworker_rpc.IRemoveRegistryPacket);

        /** RemoveRegistryPacket serviceName. */
        public serviceName: string;

        /** RemoveRegistryPacket executors. */
        public executors: webworker_rpc.IExecutor[];

        /**
         * Creates a new RemoveRegistryPacket instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoveRegistryPacket instance
         */
        public static create(properties?: webworker_rpc.IRemoveRegistryPacket): webworker_rpc.RemoveRegistryPacket;

        /**
         * Encodes the specified RemoveRegistryPacket message. Does not implicitly {@link webworker_rpc.RemoveRegistryPacket.verify|verify} messages.
         * @param message RemoveRegistryPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webworker_rpc.IRemoveRegistryPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoveRegistryPacket message, length delimited. Does not implicitly {@link webworker_rpc.RemoveRegistryPacket.verify|verify} messages.
         * @param message RemoveRegistryPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webworker_rpc.IRemoveRegistryPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoveRegistryPacket message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RemoveRegistryPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webworker_rpc.RemoveRegistryPacket;

        /**
         * Decodes a RemoveRegistryPacket message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RemoveRegistryPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webworker_rpc.RemoveRegistryPacket;

        /**
         * Verifies a RemoveRegistryPacket message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoveRegistryPacket message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoveRegistryPacket
         */
        public static fromObject(object: { [k: string]: any }): webworker_rpc.RemoveRegistryPacket;

        /**
         * Creates a plain object from a RemoveRegistryPacket message. Also converts values to other types if specified.
         * @param message RemoveRegistryPacket
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webworker_rpc.RemoveRegistryPacket, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoveRegistryPacket to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an UnlinkPacket. */
    interface IUnlinkPacket {

        /** UnlinkPacket serviceName */
        serviceName: string;
    }

    /** Represents an UnlinkPacket. */
    class UnlinkPacket implements IUnlinkPacket {

        /**
         * Constructs a new UnlinkPacket.
         * @param [properties] Properties to set
         */
        constructor(properties?: webworker_rpc.IUnlinkPacket);

        /** UnlinkPacket serviceName. */
        public serviceName: string;

        /**
         * Creates a new UnlinkPacket instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UnlinkPacket instance
         */
        public static create(properties?: webworker_rpc.IUnlinkPacket): webworker_rpc.UnlinkPacket;

        /**
         * Encodes the specified UnlinkPacket message. Does not implicitly {@link webworker_rpc.UnlinkPacket.verify|verify} messages.
         * @param message UnlinkPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webworker_rpc.IUnlinkPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UnlinkPacket message, length delimited. Does not implicitly {@link webworker_rpc.UnlinkPacket.verify|verify} messages.
         * @param message UnlinkPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webworker_rpc.IUnlinkPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UnlinkPacket message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UnlinkPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webworker_rpc.UnlinkPacket;

        /**
         * Decodes an UnlinkPacket message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UnlinkPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webworker_rpc.UnlinkPacket;

        /**
         * Verifies an UnlinkPacket message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UnlinkPacket message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UnlinkPacket
         */
        public static fromObject(object: { [k: string]: any }): webworker_rpc.UnlinkPacket;

        /**
         * Creates a plain object from an UnlinkPacket message. Also converts values to other types if specified.
         * @param message UnlinkPacket
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webworker_rpc.UnlinkPacket, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UnlinkPacket to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RequestLinkPacket. */
    interface IRequestLinkPacket {

        /** RequestLinkPacket serviceName */
        serviceName: string;

        /** RequestLinkPacket workerName */
        workerName: string;

        /** RequestLinkPacket workerUrl */
        workerUrl: string;
    }

    /** Represents a RequestLinkPacket. */
    class RequestLinkPacket implements IRequestLinkPacket {

        /**
         * Constructs a new RequestLinkPacket.
         * @param [properties] Properties to set
         */
        constructor(properties?: webworker_rpc.IRequestLinkPacket);

        /** RequestLinkPacket serviceName. */
        public serviceName: string;

        /** RequestLinkPacket workerName. */
        public workerName: string;

        /** RequestLinkPacket workerUrl. */
        public workerUrl: string;

        /**
         * Creates a new RequestLinkPacket instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestLinkPacket instance
         */
        public static create(properties?: webworker_rpc.IRequestLinkPacket): webworker_rpc.RequestLinkPacket;

        /**
         * Encodes the specified RequestLinkPacket message. Does not implicitly {@link webworker_rpc.RequestLinkPacket.verify|verify} messages.
         * @param message RequestLinkPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webworker_rpc.IRequestLinkPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RequestLinkPacket message, length delimited. Does not implicitly {@link webworker_rpc.RequestLinkPacket.verify|verify} messages.
         * @param message RequestLinkPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webworker_rpc.IRequestLinkPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestLinkPacket message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RequestLinkPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webworker_rpc.RequestLinkPacket;

        /**
         * Decodes a RequestLinkPacket message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RequestLinkPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webworker_rpc.RequestLinkPacket;

        /**
         * Verifies a RequestLinkPacket message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RequestLinkPacket message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RequestLinkPacket
         */
        public static fromObject(object: { [k: string]: any }): webworker_rpc.RequestLinkPacket;

        /**
         * Creates a plain object from a RequestLinkPacket message. Also converts values to other types if specified.
         * @param message RequestLinkPacket
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webworker_rpc.RequestLinkPacket, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RequestLinkPacket to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DestroyManagerPacket. */
    interface IDestroyManagerPacket {

        /** DestroyManagerPacket serviceName */
        serviceName?: (string|null);
    }

    /** Represents a DestroyManagerPacket. */
    class DestroyManagerPacket implements IDestroyManagerPacket {

        /**
         * Constructs a new DestroyManagerPacket.
         * @param [properties] Properties to set
         */
        constructor(properties?: webworker_rpc.IDestroyManagerPacket);

        /** DestroyManagerPacket serviceName. */
        public serviceName: string;

        /**
         * Creates a new DestroyManagerPacket instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DestroyManagerPacket instance
         */
        public static create(properties?: webworker_rpc.IDestroyManagerPacket): webworker_rpc.DestroyManagerPacket;

        /**
         * Encodes the specified DestroyManagerPacket message. Does not implicitly {@link webworker_rpc.DestroyManagerPacket.verify|verify} messages.
         * @param message DestroyManagerPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webworker_rpc.IDestroyManagerPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DestroyManagerPacket message, length delimited. Does not implicitly {@link webworker_rpc.DestroyManagerPacket.verify|verify} messages.
         * @param message DestroyManagerPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webworker_rpc.IDestroyManagerPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DestroyManagerPacket message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DestroyManagerPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webworker_rpc.DestroyManagerPacket;

        /**
         * Decodes a DestroyManagerPacket message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DestroyManagerPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webworker_rpc.DestroyManagerPacket;

        /**
         * Verifies a DestroyManagerPacket message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DestroyManagerPacket message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DestroyManagerPacket
         */
        public static fromObject(object: { [k: string]: any }): webworker_rpc.DestroyManagerPacket;

        /**
         * Creates a plain object from a DestroyManagerPacket message. Also converts values to other types if specified.
         * @param message DestroyManagerPacket
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webworker_rpc.DestroyManagerPacket, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DestroyManagerPacket to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LinkPacket. */
    interface ILinkPacket {

        /** LinkPacket workers */
        workers?: (string[]|null);
    }

    /** Represents a LinkPacket. */
    class LinkPacket implements ILinkPacket {

        /**
         * Constructs a new LinkPacket.
         * @param [properties] Properties to set
         */
        constructor(properties?: webworker_rpc.ILinkPacket);

        /** LinkPacket workers. */
        public workers: string[];

        /**
         * Creates a new LinkPacket instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LinkPacket instance
         */
        public static create(properties?: webworker_rpc.ILinkPacket): webworker_rpc.LinkPacket;

        /**
         * Encodes the specified LinkPacket message. Does not implicitly {@link webworker_rpc.LinkPacket.verify|verify} messages.
         * @param message LinkPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webworker_rpc.ILinkPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LinkPacket message, length delimited. Does not implicitly {@link webworker_rpc.LinkPacket.verify|verify} messages.
         * @param message LinkPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webworker_rpc.ILinkPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LinkPacket message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LinkPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webworker_rpc.LinkPacket;

        /**
         * Decodes a LinkPacket message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LinkPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webworker_rpc.LinkPacket;

        /**
         * Verifies a LinkPacket message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LinkPacket message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LinkPacket
         */
        public static fromObject(object: { [k: string]: any }): webworker_rpc.LinkPacket;

        /**
         * Creates a plain object from a LinkPacket message. Also converts values to other types if specified.
         * @param message LinkPacket
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webworker_rpc.LinkPacket, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LinkPacket to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ProxyCreateWorkerPacket. */
    interface IProxyCreateWorkerPacket {

        /** ProxyCreateWorkerPacket workerName */
        workerName: string;

        /** ProxyCreateWorkerPacket workerUrl */
        workerUrl: string;

        /** ProxyCreateWorkerPacket workerType */
        workerType?: (string|null);

        /** ProxyCreateWorkerPacket msg */
        msg: webworker_rpc.IWebWorkerMessage;
    }

    /** Represents a ProxyCreateWorkerPacket. */
    class ProxyCreateWorkerPacket implements IProxyCreateWorkerPacket {

        /**
         * Constructs a new ProxyCreateWorkerPacket.
         * @param [properties] Properties to set
         */
        constructor(properties?: webworker_rpc.IProxyCreateWorkerPacket);

        /** ProxyCreateWorkerPacket workerName. */
        public workerName: string;

        /** ProxyCreateWorkerPacket workerUrl. */
        public workerUrl: string;

        /** ProxyCreateWorkerPacket workerType. */
        public workerType: string;

        /** ProxyCreateWorkerPacket msg. */
        public msg: webworker_rpc.IWebWorkerMessage;

        /**
         * Creates a new ProxyCreateWorkerPacket instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ProxyCreateWorkerPacket instance
         */
        public static create(properties?: webworker_rpc.IProxyCreateWorkerPacket): webworker_rpc.ProxyCreateWorkerPacket;

        /**
         * Encodes the specified ProxyCreateWorkerPacket message. Does not implicitly {@link webworker_rpc.ProxyCreateWorkerPacket.verify|verify} messages.
         * @param message ProxyCreateWorkerPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webworker_rpc.IProxyCreateWorkerPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ProxyCreateWorkerPacket message, length delimited. Does not implicitly {@link webworker_rpc.ProxyCreateWorkerPacket.verify|verify} messages.
         * @param message ProxyCreateWorkerPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webworker_rpc.IProxyCreateWorkerPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ProxyCreateWorkerPacket message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ProxyCreateWorkerPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webworker_rpc.ProxyCreateWorkerPacket;

        /**
         * Decodes a ProxyCreateWorkerPacket message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ProxyCreateWorkerPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webworker_rpc.ProxyCreateWorkerPacket;

        /**
         * Verifies a ProxyCreateWorkerPacket message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ProxyCreateWorkerPacket message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ProxyCreateWorkerPacket
         */
        public static fromObject(object: { [k: string]: any }): webworker_rpc.ProxyCreateWorkerPacket;

        /**
         * Creates a plain object from a ProxyCreateWorkerPacket message. Also converts values to other types if specified.
         * @param message ProxyCreateWorkerPacket
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webworker_rpc.ProxyCreateWorkerPacket, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ProxyCreateWorkerPacket to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a WebWorkerMessage. */
    interface IWebWorkerMessage {

        /** WebWorkerMessage key */
        key: string;

        /** WebWorkerMessage dataLink */
        dataLink?: (webworker_rpc.ILinkPacket|null);

        /** WebWorkerMessage dataRequestLink */
        dataRequestLink?: (webworker_rpc.IRequestLinkPacket|null);

        /** WebWorkerMessage dataProxyCreateWorker */
        dataProxyCreateWorker?: (webworker_rpc.IProxyCreateWorkerPacket|null);

        /** WebWorkerMessage dataAddRegistry */
        dataAddRegistry?: (webworker_rpc.IAddRegistryPacket|null);

        /** WebWorkerMessage dataGotRegistry */
        dataGotRegistry?: (webworker_rpc.IGotRegistryPacket|null);

        /** WebWorkerMessage dataRemoveRegistry */
        dataRemoveRegistry?: (webworker_rpc.IRemoveRegistryPacket|null);

        /** WebWorkerMessage dataExecute */
        dataExecute?: (webworker_rpc.IExecutePacket|null);

        /** WebWorkerMessage dataResponse */
        dataResponse?: (webworker_rpc.IResponsePacket|null);

        /** WebWorkerMessage dataUnlink */
        dataUnlink?: (webworker_rpc.IUnlinkPacket|null);

        /** WebWorkerMessage dataDestroyManager */
        dataDestroyManager?: (webworker_rpc.IDestroyManagerPacket|null);
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

        /** WebWorkerMessage dataLink. */
        public dataLink?: (webworker_rpc.ILinkPacket|null);

        /** WebWorkerMessage dataRequestLink. */
        public dataRequestLink?: (webworker_rpc.IRequestLinkPacket|null);

        /** WebWorkerMessage dataProxyCreateWorker. */
        public dataProxyCreateWorker?: (webworker_rpc.IProxyCreateWorkerPacket|null);

        /** WebWorkerMessage dataAddRegistry. */
        public dataAddRegistry?: (webworker_rpc.IAddRegistryPacket|null);

        /** WebWorkerMessage dataGotRegistry. */
        public dataGotRegistry?: (webworker_rpc.IGotRegistryPacket|null);

        /** WebWorkerMessage dataRemoveRegistry. */
        public dataRemoveRegistry?: (webworker_rpc.IRemoveRegistryPacket|null);

        /** WebWorkerMessage dataExecute. */
        public dataExecute?: (webworker_rpc.IExecutePacket|null);

        /** WebWorkerMessage dataResponse. */
        public dataResponse?: (webworker_rpc.IResponsePacket|null);

        /** WebWorkerMessage dataUnlink. */
        public dataUnlink?: (webworker_rpc.IUnlinkPacket|null);

        /** WebWorkerMessage dataDestroyManager. */
        public dataDestroyManager?: (webworker_rpc.IDestroyManagerPacket|null);

        /** WebWorkerMessage data. */
        public data?: ("dataLink"|"dataRequestLink"|"dataProxyCreateWorker"|"dataAddRegistry"|"dataGotRegistry"|"dataRemoveRegistry"|"dataExecute"|"dataResponse"|"dataUnlink"|"dataDestroyManager");

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
