import { RPCPeer, RPCFunction } from "../../src/rpc.peer";
import { webworker_rpc } from "../../src/lib/protocols";
import { RPCExecutor, RPCParam } from "../../src/rpc.message";
import { Logger } from "../../src/utils/log";

const worker: Worker = self as any;
class WorkerBContext extends RPCPeer {
    constructor() {
        super("workerB", worker);
    }

    @RPCFunction([webworker_rpc.ParamType.num])
    public methodB(val: number): Promise<string> {
        Logger.getInstance().log("methodB: ", val);
        return new Promise<string>((resolve, reject) => {
            resolve("callback from WorkerB");
        });
    }
}

const context: WorkerBContext = new WorkerBContext();