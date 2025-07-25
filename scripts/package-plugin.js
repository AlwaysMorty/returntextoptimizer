const fs = require('fs');
const archiver = require('archiver');

const output = fs.createWriteStream('plugin.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`Created plugin.zip (${archive.pointer()} bytes)`);
});
archive.on('error', err => { throw err; });

archive.pipe(output);

archive.directory('frontend/', 'frontend');
archive.file('index.js', { name: 'index.js' });
archive.directory('api/', 'api');
archive.directory('db/', 'db');
archive.directory('gpt/', 'gpt');
archive.file('products.json', { name: 'products.json' });
archive.file('returns.csv', { name: 'returns.csv' });
archive.file('package.json', { name: 'package.json' });
archive.file('package-lock.json', { name: 'package-lock.json' });

archive.finalize();
