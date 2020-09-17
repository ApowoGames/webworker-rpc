import { RPCPeer } from "./rpc.peer";

class Helper extends RPCPeer {
    constructor() {
        super("__HELPER");
    }
}

const helper: Helper = new Helper();