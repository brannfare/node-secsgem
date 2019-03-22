const Client = require('./client')
const readline = require('readline');
const rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});

const client = new Client(2000, '127.0.0.1')

rl.on('line', (cmd) => {
  client.send(cmd)
});
