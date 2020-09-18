import { RPCPeer } from "./rpc.peer";

class Helper extends RPCPeer {
    constructor() {
        super("__HELPER");
        console.log("Helper created");
    }
}

const helper: Helper = new Helper();