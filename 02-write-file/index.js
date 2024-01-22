const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'text.txt');

const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\nHi! Enter your text. Type "stop" or "ctrl + c" to end.\n');

const stopProcess = () => {
  console.log('\nSee you later!\n');
  writeStream.end();
  process.exit();
};

rl.on('line', (input) => {
  if (input.toLowerCase() === 'stop') {
    stopProcess();
  }
  writeStream.write(input + '\n');
});

rl.on('close', () => {
  stopProcess();
});