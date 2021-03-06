const net = require('net')
const State = require('./ConnectionState')
const MessageType = require('./MessageType')
const MessageHeader = require('./MessageHeader')
const StreamDecoder = require('./StreamDecoder')
const Item = require('./Item')
const Format = require('./Format')
const Message = require('./Message')

const defaultAddress = '127.0.0.1'
const defaultPort = 2000

class Client {
  constructor (port, address) {
    this.socket = new net.Socket()
    this.port = port || defaultPort
    this.address = address || defaultAddress
    this.state = State.Connecting
    this.SystemByte = this.testSystemByte()
    this.boot()
  }
  boot () {
    let client = this

    client.socket.connect(2000, this.address, () => {
      client.state = State.Connected

      client.SendControlMessage(MessageType.SelectRequest, this.SystemByte, (msg) => {
        client.send(msg)
      })

    })

    client.socket.on('data', (chunk) => {

      const decoder = new StreamDecoder(chunk, (header) => {
        switch(header.MessageType) {
          case MessageType.SelectResponse:
            switch(header.F) {
              case 0:
                console.log("✅   Select Transaction complete!")
                client.state = State.Selected

                let buf = new Buffer(4)
                buf.writeInt32BE(1337)
                let item = new Item(Format.I4, buf)

                let message = new Message(1, 1, 'potato', item, false)

                client.SendDataMessage(message, this.SystemByte, (datamsg) => {
                  // client.send(datamsg)
                })

              break
              case 1:
                console.log("Communication already Active")
              break
              case 2:
                console.log("Communication not ready")
              break
              case 3:
                console.log("Communication exhausted")
              break
              default:
                console.log("Unknown communcation status")
              break
            }
          break;
        }
      }, (header, msg) => {
        // console.log(header, msg)
      })
      decoder.Decode(chunk.length)
    })

    client.socket.on('close', () => {
      console.log("☠️   Server closed the connection")
      client.state = State.Connecting
    })

    client.socket.on('error', () => {
      console.log("Socket error?")
      client.state = State.Connecting
    })

  }
  SendDataMessage (msg, sysbyte, cb) {
    if (this.state !== State.Selected) {
      throw new Error("[!] Communication state is not Selected")
    }

    let header = new MessageHeader(
      0, // DeviceId
      msg.ReplyExpected, // ReplyExpected
      msg.S,// S
      msg.F,// F
      MessageType.DataMessage, // MessageType
      sysbyte // System byte
    )

    let totalLength = Buffer.from([0, 0, 0, msg.RawData.itemData.length + header.encode().length])

    let joined = Buffer.concat([totalLength, header.encode()])

    cb(joined)
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
