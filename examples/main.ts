import {RPCPeer, RPCData} from "../src/index";
import {CustomData} from "./custom.data";

window.onload = () => {
    RPCPeer.create("main");
    RPCPeer.attach("foreman", new URL("/foremanWorker.js", location.origin)).onceReady(() => {
        console.log("ready link to foreman");

        RPCPeer.remote.foreman.ForemanChild.exportAttr()
            .then(() => {
                RPCPeer.remote.foreman.ForemanChild.attr2.foremanGrandsonFunction();
                RPCPeer.remote.foreman.ForemanChild.attr2.foremanSonFunction();
                RPCPeer.remote.foreman.ForemanChild.attr2.foremanSonStaticFunction();

                RPCPeer.remote.foreman.ForemanChild.cancelExportAttr();

                RPCPeer.remote.foreman.ForemanChild.destroy();
            });

        // const line = 2000;
        // const arr = new Uint8Array(line * 1024 * 1024);
        // console.log("uccessfully created the array. The array has " + line + " m");
        // const startTime = new Date().getTime();
        // RPCPeer.remote.foreman.ForemanChild.testLargeMsg(arr);
        // const timeTaken = new Date().getTime() - startTime;

        // RPCPeer.remote.foreman.ForemanChild.testExtends();
        // const importedData = new CustomData("1", true, 1);
        // RPCPeer.attach("workerA", "/taskAWorker.js").onceReady(() => {
        //     console.log("ready link to workerA");
        //     RPCPeer.remote.foreman.ForemanChild.testSpecialParams("s", true, null, {x: 1, y: 2}).then((data) => {
        //         console.log("test then ", data);
        //         RPCPeer.destroyManagerWorker();
        //     });
        // });

    });
};
