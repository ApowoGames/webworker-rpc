import { RPCPeer, Export, RPCEmitter } from "../../src/rpc.peer";
import { webworker_rpc } from "../../src/lib/protocols";
import { RPCExecutor, RPCParam } from "../../src/rpc.message";

class WorkerBContext extends RPCPeer {
    constructor() {
        super("workerB");
    }

    @Export([webworker_rpc.ParamType.num])
    public methodB(val: number): Promise<string> {
        console.log("methodB: ", val);
        this.emit("foremanCall", "WorkerB emit");
        return new Promise<string>((resolve, reject) => {
            resolve("callback from WorkerB");
        });
    }
}

const context: WorkerBContext = new WorkerBContext();