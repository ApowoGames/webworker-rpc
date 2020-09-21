import { RPCPeer } from "./rpc.peer";

class Manager extends RPCPeer {
    constructor() {
        super("__MANAGER");
        console.log("Manager created");
    }
}

const manager: Manager = new Manager();