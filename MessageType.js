// Should be converted to a enum class
module.exports = {
<<<<<<< HEAD
  DataMessage: 0b00000000,
  SelectRequest: 0b00000001, // new Buffer([0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x1]),
  SelectResponse: 0b00000010, // new Buffer([0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x1, 0x0])
  LinkTestRequest: 0b00000101,
  LinkTestResponse: 0b00000110,
  SeperateRequest: 0b00001001
=======
  SelectRequest: Buffer.from([0, 0, 0, 0, 0, 0, 0, 1]),
  SelectResponse: Buffer.from([0, 0, 0, 0, 0, 0, 1, 0])
>>>>>>> 8e9a7d209ac05abc4825df23c66feaa4654c5241
}
