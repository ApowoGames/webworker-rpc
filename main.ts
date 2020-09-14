import ForemanWorker from "worker-loader?name=dist/[name].js!./foremanworker";
import { RPCPeer } from "./src/rpc.peer";

window.onload = () => {
    const peer = new RPCPeer("main");
    peer.linkToWorker("foreman", new ForemanWorker()).onReady(() => {
       peer.remote.foreman.ForemanContext.methodF();
     });
 };