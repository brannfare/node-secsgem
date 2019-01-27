const net = require('net')
const MessageType = require('./MessageType')
const State = require('./ConnectionState')

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
