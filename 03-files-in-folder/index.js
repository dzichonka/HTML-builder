const fs = require('fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

async function displayFileInfo() {
  const arr = await fs.readdir(folderPath, { withFileTypes: true });
  for (const value of arr) {
    const filePath = path.join(folderPath, value.name);
    if (value.isFile()) {
      const fileExtension = path.extname(value.name).slice(1);
      const stats = await fs.stat(filePath);
      console.log(`${value.name} - ${fileExtension} - ${stats.size}b`);
    }
  }
}
displayFileInfo();