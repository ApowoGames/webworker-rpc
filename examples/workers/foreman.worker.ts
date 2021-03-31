import { RPCPeer, Export, RemoteListener, webworker_rpc, ExportAll } from "../../src/index";

// 主worker 创建子worker 并创建连接
// worker对应的实体，用于注册worker之间的回调，方法
// @ExportAll()
class ForemanContext extends RPCPeer {
    // @Export()
    public son: ForemanSon;
    // @Export()
    // public static staticSon: ForemanSon;

    constructor() {
        super("foreman");

        this.son = new ForemanSon();
        // ForemanContext.staticSon = new ForemanSon();

        // this.linkTo("workerA", "/taskAWorker.js").onceReady(() => {
        //     this.remote.workerA.WorkerAContext.methodA(true);
        // });
        // this.linkTo("workerB", "/taskBWorker.js").onceReady(() => {
        //     this.remote.workerB.WorkerBContext.methodB(333);
        // });
        // this.linkTo("workerC", "/taskCWorker.js").onceReady(() => {
        //     this.remote.workerC.WorkerCContext.methodC("111");
        // });
    }

    // @Export()
    // public createSon() {
    //     console.log("createSon");
    //     this.son = new ForemanSon();
    //     this.export(this.son, this);
    // }

    @Export()
    public testSpecialParams(arg1, arg2, arg3, arg4) {
        // return [arg1, arg2, arg3, arg4];
        console.log(arg1);
        return arg1;
    }

    @Export([webworker_rpc.ParamType.str])
    public multiParams(num: number, arr: [], obj: any) {
        console.log("multiParams: ", num, arr, obj);
    }

    @Export()
    public tryLinkToMain(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.linkTo("main").onceReady(() => {
                resolve("link to main ready");
            });
        });
    }

    @Export()
    public createSon(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.son = new ForemanSon();
            this.exportProperty(this.son, this).onceReady(() => {
                const son2 = new ForemanSon();
                this.exportProperty(son2, this, "son2").onceReady(() => {
                    resolve();
                });
            });

        });
    }

    @Export()
    public getValue() {
        return [1, true, "sss", { "posX": 10, "posY": 15, "flipX": true }];
    }

    @Export()
    public setValue(obj: { "posX": number, "posY": number, "flipX": boolean }) {
        console.log("foreman got value: ", obj);
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
    public static staticGrandson: ForemanGrandson;

    constructor() {
        this.grandSon = new ForemanGrandson();
        ForemanSon.staticGrandson = new ForemanGrandson();
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

    private destroy() {
        console.log("destroy");
    }
}

const context: ForemanContext = new ForemanContext();
