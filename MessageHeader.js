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

  static decode (buf) {
    // Decode from buffer
    return new MessageHeader(
      buf.readUInt16BE(0), // DeviceId
      Boolean((buf.readUInt8(2) & 128)), // ReplyExpected
      (buf.readUInt8(2) & 63),  // S
      buf.readUInt8(3), // F
      buf.readUInt8(5), // MessageType
      buf.readInt32BE(6) // SystemBytes
    )
  }

}

module.exports = MessageHeader
