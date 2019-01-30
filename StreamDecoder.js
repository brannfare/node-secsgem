const MessageHeader = require('./MessageHeader')
const MessageType = require('./MessageType')

class StreamDecoder {
  constructor(data, cbControlMessage) {
    this.Buffer = data
    this.bufferOffset = 0
    this.decodeIndex = 0
    this.messageDataLength = 0
    this.previousRemainedCount = 0
    this.msgHeader = undefined
    this.cbControlMessage = cbControlMessage
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

    if(!self.CheckAvailable(length, 4, need)) {
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

    if(!self.CheckAvailable(length, 10, need)) {
      return 1
    }
    // Decode header (10 bytes)
    this.msgHeader = MessageHeader.decode(this.Buffer.slice(this.decodeIndex, (this.decodeIndex + 10)))
    this.decodeIndex += 10
    this.messageDataLength -= 10
    length -= 10

    if(this.messageDataLength == 0) {
      if (this.msgHeader.MessageType === MessageType.DataMessage) {
        console.log("DataMessage not implemented yet")
      } else {
        this.cbControlMessage(this.msgHeader)
      }
    }

  }
  GetItemHeader (length, need) {}
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
