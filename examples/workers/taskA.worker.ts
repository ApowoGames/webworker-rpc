import { RPCPeer, Export, RPCEmitter } from "../../src/rpc.peer";
import { webworker_rpc } from "../../src/lib/protocols";
import { RPCExecutor, RPCParam } from "../../src/rpc.message";

// 子worker
class WorkerAContext extends RPCPeer {
    constructor() {
        super("workerA");
    }

    @Export([webworker_rpc.ParamType.boolean])
    public methodA(val: boolean): Promise<string> {
        console.log("methodA: ", val);
        this.emit("foremanCall", "WorkerA emit");// this 丢失
        return new Promise<string>((resolve, reject) => {
            resolve("callback from WorkerA");
        });
    }
}

const context: WorkerAContext = new WorkerAContext();