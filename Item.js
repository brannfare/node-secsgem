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
    console.log(result)
    arr.copy(result, headerLength, 0, byteLength)
    console.log(result)
  }

  encode (valueCount) {
    if (valueCount <= 0xff) {
      // 1 byte
      let result = new Buffer(valueCount + 2)
      result[0] = (this.Format | 1)
      result[1] = this.Value
      return { result: result, initialBytes: 2 }
    }
    if (valueCount <= 0xffff) {
      // 2 bytes
      let result = new Buffer(valueCount + 3)
      result[0] = (this.Format | 2)
      result[1] = this.Value
      return { result: result, initialBytes: 3 }
    }
    if (valueCount <= 0xffffff) {
      // 3 bytes
      let result = new Buffer(valueCount + 4)
      result[0] = (this.Format | 3)
      result[1] = this.Value
      return { result: result, initialBytes: 4 }
    }

  }

}

const item = new Item(Format.I4, [1337])

console.log()
