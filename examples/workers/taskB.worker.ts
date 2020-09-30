import { RPCPeer, Export, RPCEmitter, webworker_rpc } from "../../src/index";

class WorkerBContext extends RPCPeer {
    constructor() {
        super("workerB");
    }

    @Export([webworker_rpc.ParamType.num])
    public methodB(val: number) {
        console.log("methodB: ", val);
        this.emit("foremanCall", "WorkerB emit");
    }
}

const context: WorkerBContext = new WorkerBContext();