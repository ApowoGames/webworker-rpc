export const MANAGERWORKERSPRITE = (ev) => {
    if (typeof MessageChannel === "undefined") {
        console.error("webworker-rpc: MessageChannel undefined");
        return;
    }

    const MESSAGEKEY_LINK: string = "link";
    const MESSAGEKEY_REQUEST_LINK: string = "requestLink";
    const MESSAGEKEY_PROXY_CREATE_WORKER: string = "proxyCreateWorker";
    const MESSAGEKEY_UNLINK: string = "unlink";
    const MESSAGEKEY_DESTROY_MANAGER: string = "destroyManager";
    const MANAGER_WORKER_NAME: string = "__MANAGER";

    const channels: Map<string, MessagePort> = new Map();
    let windowsPort: MessagePort = null;

    const addLink = (worker: string, port: MessagePort) => {
        if (channels.has(worker)) {
            return;
        }
        if (channels.size === 0) {
            // 建立的第一个连接 必然是Windows发来的
            windowsPort = port;
        }
        channels.set(worker, port);
        port.onmessage = (ev: MessageEvent) => {
            const {key} = ev.data;
            if (key === undefined || key === null) {
                return;
            }
            switch (key) {
                case MESSAGEKEY_REQUEST_LINK:
                    onMessage_RequestLink(ev);
                    break;
                case MESSAGEKEY_UNLINK:
                    onMessage_Unlink(ev);
                    break;
                case MESSAGEKEY_DESTROY_MANAGER:
                    onMessage_Destroy(ev);
                    break;
                default:
                    break;
            }
        };
    }

    const onMessage_Link = (_ev: MessageEvent) => {
        // console.log("webworker-rpc: " + MANAGER_WORKER_NAME + "onMessage_Link ", _ev.data.dataLink.workers[0], _ev.ports[0]);
        const {workers} = _ev.data.dataLink;
        const ports = _ev.ports;
        for (let i = 0; i < ports.length; i++) {
            const onePort = ports[i];
            const oneWorker = workers[i];
            addLink(oneWorker, onePort);
        }
    }

    const onMessage_RequestLink = (_ev: MessageEvent) => {
        // console.log("webworker-rpc: " + MANAGER_WORKER_NAME + "onMessage_RequestLink ", _ev.data);
        const {serviceName, workerName, workerUrl} = _ev.data.dataRequestLink;
        const service2TarChannel = new MessageChannel();

        if (!channels.has(serviceName)) {
            console.error("webworker-rpc: " + MANAGER_WORKER_NAME + " not yet link to " + serviceName);
            return;
        }
        channels.get(serviceName).postMessage({
            key: MESSAGEKEY_LINK,
            dataLink: {
                workers: [workerName]
            }
        }, [service2TarChannel.port1]);

        if (channels.has(workerName)) {
            channels.get(workerName).postMessage({
                key: MESSAGEKEY_LINK,
                dataLink: {
                    workers: [serviceName]
                }
            }, [service2TarChannel.port2]);
        } else {
            if (workerUrl === undefined || workerUrl === null) {
                console.error("webworker-rpc: worker url undefined");
                return;
            }

            const manager2TarChannel = new MessageChannel();
            // if (typeof Worker === "undefined") {
            // ios worker中不能创建worker，转交Windows创建
            if (windowsPort === undefined || windowsPort === null) return;

            windowsPort.postMessage({
                key: MESSAGEKEY_PROXY_CREATE_WORKER,
                dataProxyCreateWorker: {
                    workerName: workerName,
                    workerUrl: workerUrl,
                    msg: {
                        key: MESSAGEKEY_LINK,
                        dataLink: {
                            workers: [MANAGER_WORKER_NAME, serviceName]
                        }
                    }
                }
            }, [manager2TarChannel.port2, service2TarChannel.port2]);
            // } else {
            //     const tarWorker = new Worker(location.origin + workerUrl, { name: workerName });
            //     console.log("webworker-rpc: " + MANAGERWORKERNAME + " new worker: ", location.origin + workerUrl, workerName);
            //
            //     tarWorker.postMessage({
            //         key: MESSAGEKEY_LINK,
            //         dataLink: {
            //             workers: [MANAGERWORKERNAME, serviceName]
            //         }
            //     }, [manager2TarChannel.port2, service2TarChannel.port2]);
            // }
            addLink(workerName, manager2TarChannel.port1);
        }
    }

    const onMessage_Unlink = (_ev: MessageEvent) => {
        // follow proto
        const {serviceName} = _ev.data.dataUnlink;
        if (channels.has(serviceName)) {
            channels.delete(serviceName);
        }

        // console.log("webworker-rpc: " + MANAGERWORKERNAME + " unlink: ", channels);
    }

    const onMessage_Destroy = (_ev: MessageEvent) => {
        const {serviceName} = _ev.data.dataDestroyManager;
        const linkedNames = Array.from(channels.keys());
        for (const oneName of linkedNames) {
            const w = channels.get(oneName);
            // follow proto
            w.postMessage({key: MESSAGEKEY_UNLINK, dataUnlink: {serviceName: MANAGER_WORKER_NAME}});
        }
        console.log("webworker-rpc: manager worker closed");
        self.close();
    }

    const {key} = ev.data;
    switch (key) {
        case MESSAGEKEY_LINK:
            onMessage_Link(ev);
            break;

        default:
            break;
    }
}
