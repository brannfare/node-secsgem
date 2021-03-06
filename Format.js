module.exports = {
  List: 0b00000000, //new Buffer([0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0]),
  Binary: 0b00100000, //new Buffer([0x0, 0x0, 0x1, 0x0, 0x0, 0x0, 0x0, 0x0]),
  Boolean: 0b00100100, //new Buffer([0x0, 0x0, 0x1, 0x0, 0x0, 0x1, 0x0, 0x0]),
  ASCII: 0b01000000, //new Buffer([0x0, 0x1, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0]),
  JIS8: 0b01000100, //new Buffer([0x0, 0x1, 0x0, 0x0, 0x0, 0x1, 0x0, 0x0]),
  I8: 0b01100000, //new Buffer([0x0, 0x1, 0x1, 0x0, 0x0, 0x0, 0x0, 0x0]),
  I1: 0b01100100, //new Buffer([0x0, 0x1, 0x1, 0x0, 0x0, 0x1, 0x0, 0x0]),
  I2: 0b01101000, //new Buffer([0x0, 0x1, 0x1, 0x0, 0x1, 0x0, 0x0, 0x0]),
  I4: 0b01110000, //new Buffer([0x0, 0x1, 0x1, 0x1, 0x0, 0x0, 0x0, 0x0]),
  F8: 0b10000000, //new Buffer([0x1, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0]),
  F4: 0b10010000, //new Buffer([0x1, 0x0, 0x0, 0x1, 0x0, 0x0, 0x0, 0x0]),
  U8: 0b10100000, //new Buffer([0x1, 0x0, 0x1, 0x0, 0x0, 0x0, 0x0, 0x0]),
  U1: 0b10100100, //new Buffer([0x1, 0x0, 0x1, 0x0, 0x0, 0x1, 0x0, 0x0]),
  U2: 0b10101000, //new Buffer([0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x0, 0x0]),
  U4: 0b10110000 //new Buffer([0x1, 0x0, 0x1, 0x1, 0x0, 0x0, 0x0, 0x0])
}
