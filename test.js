// const format = require('./Format.js')

const MessageType = require('./MessageType.js')
const MessageHeader = require('./MessageHeader.js')

const lengthBytes = new Buffer([0, 0, 0, 10])
const deviceId = 0xFFFF
const msgType = MessageType.SelectRequest
const sysbyte = testSystemByte()

function testSystemByte () {
  return 1233687660
}

console.log([lengthBytes, msg.encode()])






// Object.keys(format).forEach((key) => {
//   console.log(key, format[key])
// })
