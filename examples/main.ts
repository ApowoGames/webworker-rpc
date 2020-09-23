// import ForemanWorker from "worker-loader?name=[name].js!./workers/foreman.worker";
import { RPCPeer } from "../release/index";

window.onload = () => {
  const peer = new RPCPeer("main");
  peer.linkTo("foreman", "/foremanWorker.js").onReady(() => {
    peer.remote.foreman.ForemanContext.methodF();
  });
};