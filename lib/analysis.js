const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync("./style.js", 'utf-8');


const analyzeDep = (filePath, parent = ['root']) => {
  if (filePath.indexOf('.scss') !== -1) return [];
  const absoluteFilePath = require.resolve(filePath);
  const fileContent = fs.readFileSync(absoluteFilePath, 'utf-8');
  const matches = fileContent.match(/require\(['|"](.*)['|"]\)/g)
    .map((item) => item.replace(/require\(['|"](.*)['|"]\)/, '$1'))
    .map((item) => {
      return {
        parent,
        name: item,
        children: analyzeDep(item.startsWith('.') ? path.join(absoluteFilePath, '../', item) : item, parent.concat([item])),
      }
    });
  return matches;
}

const result = analyzeDep('./style.js')

fs.writeFileSync('./result.json', JSON.stringify(result, null, '  '));

console.log(JSON.stringify(result, null, '  '));