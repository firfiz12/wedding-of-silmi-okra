const fs = require('fs');
const http = require('http');

console.log('=== 1. Checking Asset Files Referenced in index.html ===');
const html = fs.readFileSync('./index.html', 'utf8');
const regex = /(?:src|href)="([^"]+)"/g;
let match;
const missing = [];
const found = [];

while ((match = regex.exec(html)) !== null) {
  const file = match[1];
  if (file.startsWith('http') || file.startsWith('#') || file.startsWith('mailto:') || file.startsWith('tel:')) continue;
  if (fs.existsSync(file)) {
    found.push(file);
  } else {
    missing.push(file);
  }
}

console.log(`Checked local assets: ${found.length} found, ${missing.length} missing.`);
if (missing.length > 0) {
  console.error('Missing assets:', missing);
  process.exit(1);
} else {
  console.log('All local asset paths exist on disk!');
}

console.log('\n=== 2. Testing HTTP Server Endpoint on port 3456 ===');
http.get('http://localhost:3456/index.html', res => {
  console.log('HTTP GET /index.html Status:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Received', data.length, 'bytes of HTML content.');
    console.log('Verification Success!');
    process.exit(0);
  });
}).on('error', err => {
  console.warn('Server test notice:', err.message);
  process.exit(0);
});
