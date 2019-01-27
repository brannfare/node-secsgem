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
  }

  decode () {
    // Decode from buffer
  }

}
