import { RPCPeer } from "../src/index";

window.onload = () => {
  const peer = new RPCPeer("main");
  peer.linkTo("foreman", "/foremanWorker.js").onceReady(() => {
    peer.remote.foreman.ForemanContext.getValue().then((val) => {
      console.log("main got value: ", val);
    });
    // peer.remote.foreman.ForemanContext.son.foremanSonStaticFunction();
    // peer.remote.foreman.ForemanContext.staticSon.foremanSonFunction();
    // peer.remote.foreman.ForemanContext.staticSon.staticGrandson.foremanGrandsonFunction();
  });
};