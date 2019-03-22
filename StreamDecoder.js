const MessageHeader = require('./MessageHeader')
const MessageType = require('./MessageType')
const Message = require('./Message')

class StreamDecoder {
  constructor(data, cbControlMessage, cbDataMessage) {
    this.Buffer = data
    this.bufferOffset = 0
    this.decodeIndex = 0
    this.messageDataLength = 0
    this.previousRemainedCount = 0
    this.msgHeader = undefined
    this.cbControlMessage = cbControlMessage
    this.cbDataMessage = cbDataMessage
  }
  // Main function
  Decode (length) {
    let self = this
    let decodeLength = length
    length += this.previousRemainedCount

    let need = 0

    let totalMessageLength = this.GetTotalMessageLength(length, need)

    return this.messageDataLength > 0
  }
  // 0: Get total message length (4 bytes)
  GetTotalMessageLength(length, need) {
    let self = this

    if (!self.CheckAvailable(length, 4, need)) {
      return 0
    }

    self.messageDataLength = self.Buffer.readUInt32BE(self.decodeIndex)
    self.decodeIndex += 4
    length -= 4

    console.log("Message length: %s bytes", self.messageDataLength)

    return this.GetMessageHeader(length, need)
  }
  // 1: Get message header (10 bytes)
  GetMessageHeader (length, need) {
    let self = this

    if (!self.CheckAvailable(length, 10, need)) {
      return 1
    }
    // Decode header (10 bytes)
    this.msgHeader = MessageHeader.decode(this.Buffer.slice(this.decodeIndex, (this.decodeIndex + 10)))
    this.decodeIndex += 10
    this.messageDataLength -= 10
    length -= 10

    // console.log("GetMessageHeader :: Message Data length: %s bytes", self.messageDataLength)

    if (this.messageDataLength === 0) {
      if (this.msgHeader.MessageType === MessageType.DataMessage) {
        console.log("DataMessage hit")
        this.cbDataMessage(this.msgHeader, new Message(
          this.msgHeader.S, this.msgHeader.F, "", null, this.msgHeader.ReplyExpected
        ))
      } else {
        this.cbControlMessage(this.msgHeader)
      }
    }

    // console.log("GetMessageHeader :: Length: %s bytes", length)

    if (length > this.messageDataLength) {
      console.log("DataMessage hit 2", length, this.messageDataLength)

      // console.log(this.msgHeader)

      this.cbDataMessage(this.msgHeader, new Message(
        this.msgHeader.S, this.msgHeader.F, "", this.Buffer, this.msgHeader.ReplyExpected
      ))
      length -= this.messageDataLength
      this.messageDataLength = 0
      return 0
    }
    return this.GetItemHeader(length, need)
  }
  GetItemHeader (length, need) {
    let self = this

    if (!self.CheckAvailable(length, 1, need)) {
      return 2
    }

    let format = this.Buffer[this.decodeIndex] // & 0xFC
    let lengthBits = this.Buffer[this.decodeIndex] // & 3
    this.decodeIndex++
    this.messageDataLength--
    length--
    console.log(`format: ${format}`)

    return this.GetItemLength(length, need)
  }
  GetItemLength (length, need) {}
  GetItem (length, need) {}
  CheckAvailable (length, required, need) {
    need = required - length
    if (need > 0)
    {
        return false
    }
    need = 0
    return true
  }
  BufferedDecodeItem () {}
}

module.exports = StreamDecoder
