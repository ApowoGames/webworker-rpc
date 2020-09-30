import { RPCPeer, Export, RPCEmitter, webworker_rpc } from "../../src/index";

// 子worker
class WorkerAContext extends RPCPeer {
    private helper: WorkerAHelper;

    constructor() {
        super("workerA");

        this.helper = new WorkerAHelper();
    }

    @Export([webworker_rpc.ParamType.boolean])
    public methodA(val: boolean) {
        console.log("methodA: ", val);

        this.helper.doHelp();
    }
}

class WorkerAHelper extends RPCEmitter {
    constructor() {
        super();
    }

    public doHelp() {
        this.emit("foremanCall", "WorkerA emit");
    }
}

const context: WorkerAContext = new WorkerAContext();