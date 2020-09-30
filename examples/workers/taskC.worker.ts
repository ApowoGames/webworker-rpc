import { RPCPeer, Export, RPCEmitter, webworker_rpc } from "../../src/index";

class WorkerCContext extends RPCPeer {
    constructor() {
        super("workerC");
    }

    @Export([webworker_rpc.ParamType.str])
    public methodC(val: string) {
        console.log("methodC: ", val);
        this.emit("foremanCall", "WorkerC emit");
    }
}

const context: WorkerCContext = new WorkerCContext();