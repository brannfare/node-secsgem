const Client = require('./client')
const readline = require('readline');
const rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});

const client = new Client(2000, '0.0.0.0')

rl.on('line', (cmd) => {
  client.send(cmd)
});
