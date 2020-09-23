import { RPCPeer, Export, RPCEmitter, webworker_rpc } from "../../release/index";

// 子worker
class WorkerAContext extends RPCPeer {
    private helper: WorkerAHelper;

    constructor() {
        super("workerA");

        this.helper = new WorkerAHelper();
    }

    @Export([webworker_rpc.ParamType.boolean])
    public methodA(val: boolean): Promise<string> {
        console.log("methodA: ", val);

        this.helper.doHelp();
        return new Promise<string>((resolve, reject) => {
            resolve("callback from WorkerA");
        });
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