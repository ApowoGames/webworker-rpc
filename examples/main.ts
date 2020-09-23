import { RPCPeer } from "../src/index";

window.onload = () => {
  const peer = new RPCPeer("main");
  peer.linkTo("foreman", "/foremanWorker.js").onReady(() => {
    peer.remote.foreman.ForemanContext.methodF();
  });
};