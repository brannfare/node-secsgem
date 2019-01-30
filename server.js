const net = require('net')
const MessageHeader = require('./MessageHeader')
const MessageType = require('./MessageType')
const State = require('./ConnectionState')
const StreamDecoder = require('./StreamDecoder')

const defaultAddress = '127.0.01'
const defaultPort = 2000

class Server {
  constructor (port, address) {
    this.port = port || defaultPort
    this.address = address || defaultAddress
    this.Systembyte = this.testSystemByte()
    this.boot()
  }
  boot () {
    let server = this

    server.connection = net.createServer((socket) => {

      this.state = State.Connected

      socket.on('data', (chunk) => {

        const decoder = new StreamDecoder(chunk, (header) => {
          switch(header.MessageType) {
            case MessageType.SelectRequest:
              server.SendControlMessage(MessageType.SelectResponse, this.Systembyte, (msg) => {
                socket.write(msg)
              })
            break;
          }
        })
        decoder.Decode(chunk.length)

        // console.log("Recv: ", chunk)
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
  SendControlMessage (msgType, sysbyte, cb) {
    const controlMessagelengthBytes = new Buffer([0, 0, 0, 10])
    const msg = new MessageHeader(0xFFFF, false, 0, 0, msgType, sysbyte)
    const joined = Buffer.concat([controlMessagelengthBytes, msg.encode()])

    return cb(joined)
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
