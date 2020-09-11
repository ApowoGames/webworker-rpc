import "phaser";
import ForemanWorker from "worker-loader?name=dist/[name].js!./foremanworker";
import { RPCPeer } from "./src/rpc.peer";
export class World {
    constructor() {
        const config = {
            type: Phaser.AUTO,
            parent: "game",
            width: 800,
            height: 600,
            backgroundColor: "#000033"
        };
        const game: Phaser.Game = new Phaser.Game(config);
        game.scene.add(GameScene.name, GameScene);
        game.scene.start(GameScene.name);
    }
}

export class GameScene extends Phaser.Scene {
    private peer: RPCPeer;

    constructor() {
        super({ key: GameScene.name });
    }

    public preload() {
        this.load.image("bubble", "./resource/bubblebg.png");

        this.peer = new RPCPeer("main");
        this.peer.linkToWorker("foreman", new ForemanWorker()).onReady(() => {
            this.peer.remote.foreman.ForemanContext.methodF();
        });
    }

    public create() {
        // const imgBtn = this.add.image(300, 150, "bubble");
        // imgBtn.setInteractive();
        // imgBtn.once("pointerup", () => {
        //     // tslint:disable-next-line:no-console
        //     console.log("pointerup ; start test");
        //     this.foreman.postMessage("start");
        // });

    }

}

window.onload = () => {
    const game = new World();
};