import { RPCPeer } from "../src/index";

window.onload = () => {
  const peer = new RPCPeer("main");
  peer.linkTo("foreman", "/foremanWorker.js").onReady(() => {
    peer.remote.foreman.ForemanContext.methodF();
    peer.remote.foreman.ForemanContext.son.foremanSonStaticFunction();
    peer.remote.foreman.ForemanContext.staticSon.foremanSonFunction();
    peer.remote.foreman.ForemanContext.staticSon.staticGrandson.foremanGrandsonFunction();
  });
};