const Item = require('./Item')

class Message {
  constructor (s, f, name = null, item = null, replyExpected = true) {
    if(this.S > 127) {
      throw new TypeError("Stream number can not exceed 127")
    }

    this.S = s
    this.F = f
    this.Name = name
    this.ReplyExpected = replyExpected
    this.Item = item
    this.RawData = this.Data()
  }
  Data () {
    return {
      itemData: this.Item.data
    }
  }
}

module.exports = Message
