// Should be converted to a enum class
module.exports = {
  DataMessage: 0b00000000,
  SelectRequest: 0b00000001, // new Buffer([0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x1]),
  SelectResponse: 0b00000010, // new Buffer([0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x1, 0x0])
  LinkTestRequest: 0b00000101,
  LinkTestResponse: 0b00000110,
  SeperateRequest: 0b00001001
}
