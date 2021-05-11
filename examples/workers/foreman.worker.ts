import { RPCPeer, Export, RemoteListener, webworker_rpc } from "../../src/index";

// 主worker 创建子worker 并创建连接
// worker对应的实体，用于注册worker之间的回调，方法
// @Export()
class ForemanContext extends RPCPeer {
    @Export()
    public attr1: ForemanAttribute;
    // @Export()
    // public static staticSon: ForemanSon;

    constructor() {
        super("foreman");

        this.attr1 = new ForemanAttribute();
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
            this.attr1 = new ForemanAttribute();
            this.exportProperty(this.attr1, this).onceReady(() => {
                const son2 = new ForemanAttribute();
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
    public static setValue(obj: { "posX": number, "posY": number, "flipX": boolean }) {
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

    @Export()
    public testExtends() {
        console.log("testExtends: parent");
    }
}

class ForemanAttribute {
    public attr2: ForemanAttributeAttribute;
    public static staticAttr2: ForemanAttributeAttribute;

    constructor() {
        this.attr2 = new ForemanAttributeAttribute();
        ForemanAttribute.staticAttr2 = new ForemanAttributeAttribute();
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

class ForemanAttributeAttribute {

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

class ForemanChild extends ForemanContext {

    // @Export()
    public testExtends() {
        super.testExtends();
        console.log("testExtends: child");
    }
}

const context: ForemanChild = new ForemanChild();
