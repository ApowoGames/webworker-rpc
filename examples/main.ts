// import ForemanWorker from "worker-loader?name=[name].js!./workers/foreman.worker";
import { RPCPeer } from "../src/rpc.peer";

window.onload = () => {
  const peer = new RPCPeer("main");
  peer.linkTo("foreman", "worker-loader?name=[name].js!../examples/workers/foreman.worker").onReady(() => {
    peer.remote.foreman.ForemanContext.methodF();
  });
};