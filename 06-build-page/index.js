const fs = require('fs/promises');
const path = require('path');

async function buildPage() {
  const destDir = path.join(__dirname, 'project-dist');
  const srcHtml = path.join(__dirname, 'template.html');

  const srcCompDir = path.join(__dirname, 'components');
  const srcCssDir = path.join(__dirname, 'styles');
  const srcAssetsDir = path.join(__dirname, 'assets');
  const destAssetsDir = path.join(destDir, 'assets');
  const destHtml = path.join(destDir, 'index.html');
  const destCssFile = path.join(destDir, 'style.css');

  //html
  await fs.mkdir(destDir, { recursive: true });

  let htmlFile = await fs.readFile(srcHtml, 'utf-8');
  htmlFile = await replaceTags(htmlFile, srcCompDir);
  await fs.writeFile(destHtml, htmlFile, 'utf-8');

  //css

  const srcCssFiles = await fs.readdir(srcCssDir, { withFileTypes: true });
  const cssArr = [];
  for (const file of srcCssFiles) {
    const srcCssFile = path.join(srcCssDir, file.name);
    if (file.isFile() && path.extname(file.name) === '.css') {
      const content = await fs.readFile(srcCssFile, 'utf-8');
      cssArr.push(content);
    }
  }
  await fs.writeFile(destCssFile, cssArr.join('\n'), 'utf-8');

  //assets
  await fs.mkdir(destAssetsDir, { recursive: true });
  await copyDir(srcAssetsDir, destAssetsDir)
}

async function replaceTags(srcHtml, srcCompDir) {
  const tagRegex = /{{\s*(\w+)\s*}}/g;
  let resultHtml = srcHtml;

  const matches = srcHtml.matchAll(tagRegex);
  for (const match of matches) {
    const compName = match[1];
    try {
      const srcCompFile = path.join(srcCompDir, `${compName}.html`);
      const content = await fs.readFile(srcCompFile, 'utf-8');
      resultHtml = resultHtml.replace(match[0], content);
    } catch (error) {
      console.error(`did not find ${compName}`);
    }
  }
  return resultHtml;
}

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const items = await fs.readdir(src, { withFileTypes: true });

  for (let item of items) {
    const srcPath = path.join(src, item.name);
    const destPath = path.join(dest, item.name);

    if (item.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

buildPage();