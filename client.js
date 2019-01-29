const net = require('net')
const State = require('./ConnectionState')
const MessageType = require('./MessageType')
<<<<<<< HEAD
const MessageHeader = require('./MessageHeader.js')

const defaultAddress = '127.0.01'
const defaultPort = 2000

class Client {
  constructor (port, address) {
    this.socket = new net.Socket()
    this.port = port || defaultPort
    this.address = address || defaultAddress
    this.state = State.Connecting
    this.boot()
  }
  boot () {
    let client = this

    client.socket.connect(2000, '127.0.0.1', () => {
      client.state = State.Connected
      console.log(this.getConnectionState(client.state))
      // client.send(new Buffer(MessageType.SelectRequest.toString(), "binary"))
      const lengthBytes = new Buffer([0, 0, 0, 10])
      const msg = new MessageHeader(0xFFFF, false, 0, 0, MessageType.SelectRequest, this.testSystemByte())
      client.send(lengthBytes)
      client.send(msg.encode())
    })

    client.socket.on('data', (chunk) => {
      if (client.isBufferEqual(chunk, new Buffer(MessageType.SelectResponse.toString(), "binary"))) {
        client.state = State.Selected
        console.log("Select Transaction complete!")
        console.log(this.getConnectionState(client.state))
        return
      }

      if (chunk.toString() === 'status') {
        console.log(client.getConnectionState(client.state))

        return
      }

      console.log("Recv: ", chunk)
    })

    client.socket.on('close', () => {
      console.log("☠️  Server closed the connection")
      client.state = State.Connecting
    })

    client.socket.on('error', () => {
      console.log("Socket error?")
      client.state = State.Connecting
    })

  }
  testSystemByte () {
    return 1233687660
  }
  send (message) {
    this.socket.write(message)
  }
  isBufferEqual (buf1, buf2) {
    return Buffer.compare(buf1, buf2) === 0
  }
  generateSystemByte () {
    return Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000
  }
  getConnectionState (value) {
    return Object.keys(State)[Object.values(State).indexOf(value)];
  }

}


module.exports = Client
=======
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
>>>>>>> 8e9a7d209ac05abc4825df23c66feaa4654c5241
