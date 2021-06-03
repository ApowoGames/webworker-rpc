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

    /** Properties of a WebWorkerMessage. */
    interface IWebWorkerMessage {

        /** WebWorkerMessage key */
        key: string;

        /** WebWorkerMessage dataRequestLink */
        dataRequestLink?: (webworker_rpc.IRequestLinkPacket|null);

        /** WebWorkerMessage dataAddRegistry */
        dataAddRegistry?: (webworker_rpc.IAddRegistryPacket|null);

        /** WebWorkerMessage dataGotRegistry */
        dataGotRegistry?: (webworker_rpc.IGotRegistryPacket|null);

        /** WebWorkerMessage dataExecute */
        dataExecute?: (webworker_rpc.IExecutePacket|null);

        /** WebWorkerMessage dataResponse */
        dataResponse?: (webworker_rpc.IResponesPacket|null);

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

        /** WebWorkerMessage dataRequestLink. */
        public dataRequestLink?: (webworker_rpc.IRequestLinkPacket|null);

        /** WebWorkerMessage dataAddRegistry. */
        public dataAddRegistry?: (webworker_rpc.IAddRegistryPacket|null);

        /** WebWorkerMessage dataGotRegistry. */
        public dataGotRegistry?: (webworker_rpc.IGotRegistryPacket|null);

        /** WebWorkerMessage dataExecute. */
        public dataExecute?: (webworker_rpc.IExecutePacket|null);

        /** WebWorkerMessage dataResponse. */
        public dataResponse?: (webworker_rpc.IResponesPacket|null);

        /** WebWorkerMessage dataUnlink. */
        public dataUnlink?: (webworker_rpc.IUnlinkPacket|null);

        /** WebWorkerMessage dataDestroyManager. */
        public dataDestroyManager?: (webworker_rpc.IDestroyManagerPacket|null);

        /** WebWorkerMessage data. */
        public data?: ("dataRequestLink"|"dataAddRegistry"|"dataGotRegistry"|"dataExecute"|"dataResponse"|"dataUnlink"|"dataDestroyManager");

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
