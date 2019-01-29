class MessageHeader {
  constructor (deviceId, replyExpected, s, f, messageType, systemBytes) {
    this.DeviceId = deviceId
    this.ReplyExpected = replyExpected
    // Message stream number
    this.S = s
    // Message function number
    this.F = f
    this.MessageType = messageType
    this.SystemBytes = systemBytes
  }

  encode () {
    // Write to buffer
    this.buffer = new Buffer(10)
    // DeviceId
    this.buffer.writeUInt16BE(this.DeviceId, 0);
    // S
    this.buffer.writeUInt8(this.S | (this.ReplyExpected ? 128 : 0), 2)
    // F
    this.buffer.writeUInt8(this.F, 3)
    this.buffer.writeUInt8(0, 4)
    // MessageType
    this.buffer.writeUInt8(this.MessageType, 5)
    // SystemBytes
    this.buffer.writeInt32BE(this.SystemBytes, 6)

    return this.buffer
  }

  decode () {
    // Decode from buffer
  }

}

module.exports = MessageHeader
