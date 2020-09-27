import { RPCPeer, Export, RemoteListener, webworker_rpc, ExportAll } from "../../src/index";

// 主worker 创建子worker 并创建连接
// worker对应的实体，用于注册worker之间的回调，方法
// @ExportAll()
class ForemanContext extends RPCPeer {
    // @Export()
    public son: ForemanSon;
    @Export()
    public static staticSon: ForemanSon;

    constructor() {
        super("foreman");

        this.son = new ForemanSon();
        ForemanContext.staticSon = new ForemanSon();

        // this.linkTo("workerA", "/taskAWorker.js").onReady(() => {
        //     this.remote.workerA.WorkerAContext.methodA(true);
        // });
        // this.linkTo("workerB", "/taskBWorker.js").onReady(() => {
        //     this.remote.workerB.WorkerBContext.methodB(333);
        // });
        // this.linkTo("workerC", "/taskCWorker.js").onReady(() => {
        //     this.remote.workerC.WorkerCContext.methodC("111");
        // });
    }

    // @Export()
    public static methodF() {
        console.log("methodF");
    }

    // @RemoteListener("workerA", "WorkerAHelper", "foremanCall", [webworker_rpc.ParamType.str])
    public foremanListen2A(val: string) {
        console.log("foremanListen2A: ", val);
    }

    // @RemoteListener("workerB", "WorkerBContext", "foremanCall", [webworker_rpc.ParamType.str])
    public foremanListen2B(val: string) {
        console.log("foremanListen2B: ", val);
    }

    // @RemoteListener("workerC", "WorkerCContext", "foremanCall", [webworker_rpc.ParamType.str])
    public foremanListen2C(val: string) {
        console.log("foremanListen2C: ", val);
    }
}

class ForemanSon {
    public grandSon: ForemanGrandson;
    public static grandSon2: ForemanGrandson;

    constructor() {
        this.grandSon = new ForemanGrandson();
        ForemanSon.grandSon2 = new ForemanGrandson();
    }

    public foremanSonFunction() {
        console.log("foremanSonFunction");
    }

    public static foremanSonStaticFunction() {
        console.log("foremanSonStaticFunction");
    }

    private privateFunction() {
        console.log("privateFunction");
    }
}

class ForemanGrandson {

    constructor() {
    }

    public foremanGrandsonFunction() {
        console.log("foremanGrandsonFunction");
    }

    private privateFunction() {
        console.log("privateFunction");
    }
}

const context: ForemanContext = new ForemanContext();