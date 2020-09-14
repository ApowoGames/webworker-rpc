import { RPCPeer, RPCFunction } from "../../src/rpc.peer";
import { webworker_rpc } from "../../lib/protocols";
import { RPCExecutor, RPCParam } from "../../src/rpc.message";
import { Logger } from "../../src/utils/log";
// 子worker
const worker: Worker = self as any;
class WorkerAContext extends RPCPeer {
    constructor() {
        super("workerA", worker);
    }

    @RPCFunction([webworker_rpc.ParamType.boolean])
    public methodA(val: boolean): Promise<string> {
        Logger.getInstance().log("methodA: ", val);
        return new Promise<string>((resolve, reject) => {
            resolve("callback from WorkerA");
        });
    }
}

const context: WorkerAContext = new WorkerAContext();