const { readFile } = require('fs');
const fs = require('fs/promises');
const path = require('path');

async function mergeStyles() {
  const srcDir = path.join(__dirname, 'styles');
  const destDir = path.join(__dirname, 'project-dist');
  const destFile = path.join(destDir, 'bundle.css');
  const cssArr = [];

  await fs.mkdir(destDir, { recursive: true });

  const arr = await fs.readdir(srcDir, { withFileTypes: true });
  for (let file of arr) {
    const srcFile = path.join(srcDir, file.name);
    if (path.extname(file.name) === '.css' && file.isFile()) {

      const content = await fs.readFile(srcFile, 'utf-8');
      cssArr.push(content);
    }
  }

  await fs.writeFile(destFile, cssArr.join('\n'), 'utf-8')
  //fs.appendFile
}
mergeStyles();