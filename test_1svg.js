const fs = require('fs');
const path = require('path');

const svg1 = fs.readFileSync(path.join(__dirname, 'file_svg', '1.svg'), 'utf8');
console.log('1.svg length:', svg1.length);
// Search for groups and IDs
const match47 = svg1.match(/<g[^>]*id="[^"]*47[^"]*"[^>]*>/);
console.log('Match 47:', match47 ? match47[0] : 'no');
