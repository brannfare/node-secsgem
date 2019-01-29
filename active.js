const Client = require('./client')
const readline = require('readline');
const rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});

const client = new Client()

rl.on('line', (cmd) => {
  client.send(cmd)
});
