import {RPCPeer} from "../src/index";

window.onload = () => {
    const peer = new RPCPeer("main");
    peer.linkTo("foreman", "/foremanWorker.js", true).onceReady(() => {
        console.log("ready link to foreman");
        peer.remote.foreman.ForemanChild.testExtends();
        peer.remote.foreman.ForemanChild.testSpecialParams("1").then(() => {
            console.log("test then");
        });
        // peer.remote.foreman.ForemanContext.destroy();
        // peer.remote.foreman.ForemanContext.testSpecialParams("2");

        // peer.remote.foreman.ForemanContext.testSpecialParams([0], false, undefined, null).then((val) => {
        //   console.log("result: ", val);
        // });
        // peer.remote.foreman.ForemanContext.son.grandSon.destroy();
        // peer.remote.foreman.ForemanContext.multiParams(0, undefined, { x: 1 });
        // peer.remote.foreman.ForemanContext.createSon().then(() => {
        //   console.log("createSon then");
        //   peer.remote.foreman.ForemanContext.son.foremanSonFunction();
        //   peer.remote.foreman.ForemanContext.son2.foremanSonFunction();
        // });
        // peer.remote.foreman.ForemanContext.getValue().then((val) => {
        //   console.log("main got value: ", val);
        // });
        // peer.remote.foreman.ForemanChild.setValue({ "posX": 10, "posY": 15, "flipX": true });
        // peer.remote.foreman.ForemanContext.son.foremanSonStaticFunction();
        // peer.remote.foreman.ForemanContext.staticSon.foremanSonFunction();
        // peer.remote.foreman.ForemanContext.staticSon.staticGrandson.foremanGrandsonFunction();
    });
    peer.linkTo("workerA", "/taskAWorker.js", true).onceReady(() => {
        console.log("ready link to workerA");
    });
};
