const net = require('net')
const State = require('./ConnectionState')
const MessageType = require('./MessageType')
const readline = require('readline');
const rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});
const client = new net.Socket()

client.state = State.Connecting

client.connect(2000, '127.0.0.1', () => {
  client.state = State.Connected
  console.log(getConnectionState(client.state))
  client.write(MessageType.SelectRequest)
})

client.on('data', (chunk) => {
  if (isBufferEqual(chunk, MessageType.SelectResponse)) {
    client.state = State.Selected
    console.log("Select Transaction complete!")
    console.log(getConnectionState(client.state))
    return
  }

  if (chunk.toString() === 'status') {
    console.log(getConnectionState(client.state))

    return
  }

  console.log("Recv: ", chunk)
})

client.on('close', () => {
  console.log("☠️  Server closed the connection")
  client.state = State.Connecting
})

client.on('error', () => {
  console.log("Socket error?")
  client.state = State.Connecting
})

rl.on('line', (cmd) => {
  client.write(cmd)
});

function isBufferEqual(buf1, buf2) {
  return Buffer.compare(buf1, buf2) === 0
}

function getConnectionState (value) {
  return Object.keys(State)[Object.values(State).indexOf(value)];
}
