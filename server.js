const net = require('net')
const MessageType = require('./MessageType')
const State = require('./ConnectionState')

<<<<<<< HEAD
const defaultAddress = '127.0.01'
const defaultPort = 2000

class Server {
  constructor (port, address) {
    this.port = port || defaultPort
    this.address = address || defaultAddress
    this.boot()
  }
  boot () {
    let server = this

    server.connection = net.createServer((socket) => {

      this.state = State.Connected

      socket.on('data', (chunk) => {

        if (server.isBufferEqual(chunk, new Buffer(MessageType.SelectRequest.toString(), "binary"))) {
          socket.write(new Buffer(MessageType.SelectResponse.toString(), "binary"))
          this.state = State.Selected
          return
        }

        if (chunk.toString() === 'status') {
          console.log(server.getConnectionState(this.state))

          return
        }

        console.log("Recv: ", chunk)
      })

      socket.on('close', () => {
        console.log("☠️  Client closed the connection")
        this.state = State.Connecting
      })

      socket.on('error', () => {
        console.log("Socket error?")
        this.state = State.Connecting
      })

    })

    server.connection.listen(server.port, server.address)

  }
  testSystemByte () {
    return 1233687660
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

module.exports = Server
=======
const server = net.createServer((socket) => {

  this.state = State.Connected

  socket.on('data', (chunk) => {

    if (isBufferEqual(chunk, MessageType.SelectRequest)) {
      socket.write(MessageType.SelectResponse)
      this.state = State.Selected
      return
    }

    if (chunk.toString() === 'status') {
      console.log(getConnectionState(this.state))

      return
    }

    console.log("Recv: ", chunk)
  })

  socket.on('close', () => {
    console.log("☠️  Client closed the connection")
    this.state = State.Connecting
  })

  socket.on('error', () => {
    console.log("Socket error?")
    this.state = State.Connecting
  })

})

function isBufferEqual(buf1, buf2) {
  return Buffer.compare(buf1, buf2) === 0
}

function generateSystemByte() {
    return Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
}

server.listen(2000)
>>>>>>> 8e9a7d209ac05abc4825df23c66feaa4654c5241
