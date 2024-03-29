import {RPCPeer, Export, RemoteListener, webworker_rpc} from "../../src/index";
import {CustomData} from "../custom.data";

// 主worker 创建子worker 并创建连接
// worker对应的实体，用于注册worker之间的回调，方法
// @Export()
class ForemanContext extends RPCPeer {
    // @Export()
    public attr1: ForemanAttribute;
    // @Export()
    // public static staticSon: ForemanSon;

    constructor() {
        super("foreman");

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
    public exportAttr(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.attr1 = new ForemanAttributeAttribute();
            this.exportProperty(this.attr1, this, "attr2")
                .onceReady(() => {
                    resolve();
                });
        });
    }

    @Export()
    public cancelExportAttr() {
        this.cancelExportProperty(this.attr1, this, "attr2");
    }

    @Export()
    public testLargeMsg(data) {
        console.log(data);
    }

    @Export()
    public testSpecialParams(arg1, arg2, arg3, arg4) {
        console.log("", arg1, arg2, arg3, arg4);
        return new CustomData(arg1, arg2, arg3);
    }

    @Export([webworker_rpc.ParamType.str])
    public multiParams(num: number, arr: [], obj: any) {
        console.log("multiParams: ", num, arr, obj);
    }

    @Export()
    public tryLinkToMain(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.attach("main").onceReady(() => {
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
        return [1, true, "sss", {"posX": 10, "posY": 15, "flipX": true}];
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

    constructor() {
    }

    @Export()
    public foremanSonFunction() {
        console.log("foremanSonFunction");
    }

    @Export()
    public static foremanSonStaticFunction() {
        console.log("foremanSonStaticFunction");
    }

    private privateFunction() {
        console.log("privateFunction");
    }
}

class ForemanAttributeAttribute extends ForemanAttribute {

    @Export()
    public foremanGrandsonFunction() {
        console.log("foremanGrandsonFunction");
    }

    private destroy() {
        console.log("destroy");
    }
}

class ForemanChild extends ForemanContext {

    @Export()
    public testExtends() {
        super.testExtends();
        console.log("testExtends: child");
    }
}

const context: ForemanChild = new ForemanChild();
