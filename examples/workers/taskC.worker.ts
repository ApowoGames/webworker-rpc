import { RPCPeer, Export, RPCEmitter, webworker_rpc } from "../../release/index";

class WorkerCContext extends RPCPeer {
    constructor() {
        super("workerC");
    }

    @Export([webworker_rpc.ParamType.str])
    public methodC(val: string): Promise<string> {
        console.log("methodC: ", val);
        this.emit("foremanCall", "WorkerC emit");
        return new Promise<string>((resolve, reject) => {
            resolve("callback from WorkerC");
        });
    }
}

const context: WorkerCContext = new WorkerCContext();