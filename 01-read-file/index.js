const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

const readStream = fs.createReadStream(filePath, 'utf-8');

readStream.on('data', (block) => {
  console.log(block);
});

readStream.on('end', () => {
  console.log('');
});

readStream.on('error', (err) => {
  console.error(`Uh! Oh! You made a mistake: ${err.message}`);
});