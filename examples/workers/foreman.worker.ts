import TaskWorkerA from "worker-loader?name=[name].js!./taskA.worker";
import TaskWorkerB from "worker-loader?name=[name].js!./taskB.worker";
import TaskWorkerC from "worker-loader?name=[name].js!./taskC.worker";
import { RPCPeer, RPCFunction } from "../../src/rpc.peer";
import { webworker_rpc } from "../../src/lib/protocols";
import { RPCExecutor, RPCExecutePacket, RPCParam } from "../../src/rpc.message";
import { Logger } from "../../src/utils/log";

// 主worker 创建子worker 并创建连接
const worker: Worker = self as any;

// worker对应的实体，用于注册worker之间的回调，方法
class ForemanContext extends RPCPeer {
    constructor() {
        super("foreman", worker);
        const callback = new RPCExecutor("foremanCallback", "ForemanContext",
            [new RPCParam(webworker_rpc.ParamType.str)]);

        this.linkToWorker("workerA", new TaskWorkerA()).onReady(() => {
            this.remote.workerA.WorkerAContext.methodA(true, callback);
        });
        this.linkToWorker("workerB", new TaskWorkerB()).onReady(() => {
            this.remote.workerB.WorkerBContext.methodB(333);
        });
        this.linkToWorker("workerC", new TaskWorkerC()).onReady(() => {
            this.remote.workerC.WorkerCContext.methodC(new Uint8Array(webworker_rpc.Executor.encode(callback).finish().buffer.slice(0)), callback);
        });
    }

    @RPCFunction()
    public methodF() {
        Logger.getInstance().log("methodF");
    }

    @RPCFunction([webworker_rpc.ParamType.str])
    public foremanCallback(val: string) {
        Logger.getInstance().log("foremanCallback: ", val);
    }
}

const context: ForemanContext = new ForemanContext();