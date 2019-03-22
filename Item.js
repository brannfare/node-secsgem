const Format = require('./Format')

class Item {
  constructor (format, value) {
    this.Format = format
    this.Value = value

    let arr = Buffer.from(value)
    let byteLength = Buffer.byteLength(arr)
    let encoded = this.encode(byteLength)
    let result = encoded.result
    let headerLength = encoded.initialBytes
    arr.copy(result, headerLength, 0, byteLength)
    this.data = result
  }

  encode (valueCount) {
    if (valueCount <= 0xff) {
      // 1 byte
      let result = Buffer.alloc(valueCount + 2)
      result[0] = (this.Format | 1)
      result[1] = valueCount

      // console.log("res[0]", result[0])
      // console.log("res[1]", result[1])

      return { result: result, initialBytes: 2 }
    }
    if (valueCount <= 0xffff) {
      // 2 bytes
      let result = Buffer.alloc(valueCount + 3)
      result[0] = (this.Format | 2)
      result[1] = this.Value
      return { result: result, initialBytes: 3 }
    }
    if (valueCount <= 0xffffff) {
      // 3 bytes
      let result = Buffer.alloc(valueCount + 4)
      result[0] = (this.Format | 3)
      result[1] = this.Value
      return { result: result, initialBytes: 4 }
    }

  }

}

// let num = 1337
// let buf = new Buffer(4)
// buf.writeInt32BE(num)
// const item = new Item(Format.I4, buf)

module.exports = Item
