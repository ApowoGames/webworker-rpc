# webworker-rpc


## Getting Started
install

### Inlined
**Register**

**Execute**

## Features
* remote.xx.xx(): Promise
* @Export
* @RemoteListener
* rpcPeer.exportProperty().onceReady
* rpcPeer.destroy()
* special param (undefined, null, 0, false)

## Usage
* @Export()
* RPCPeer.create(<peerName>)
* RPCPeer.attach()
* RPCPeer.remote.<peerName>.<className>.<functionName>()
* RPCPeer.destroy()

## Examples

### Build protobuf protocol
```bash
$ yarn global add rimraf protobufjs
$ yarn mkproto
```
编译成功后提交./lib 目录


### Develop Run
yarn dev

### Build Run
yarn build
git add .
git commit -m "vxxx"
git push
git push gitlab master
