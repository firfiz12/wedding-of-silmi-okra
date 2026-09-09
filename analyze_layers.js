const fs = require('fs');
const path = require('path');

// Analyze 1_elemen_png
const files = fs.readdirSync('./file_svg/1_elemen_png').filter(f => f.endsWith('.png'));
console.log('Total PNG files in 1_elemen_png:', files.length);

// Let's inspect what is in cropped folder and their bounding boxes if known, or file sizes
const details = [];
files.forEach(f => {
  const cropP = './file_svg/1_elemen_png/cropped/crop_' + f;
  if (fs.existsSync(cropP)) {
    const buf = fs.readFileSync(cropP);
    let w = 0, h = 0;
    if (buf.toString('ascii', 12, 16) === 'IHDR') {
      w = buf.readUInt32BE(16);
      h = buf.readUInt32BE(20);
    }
    details.push({ file: f, size: fs.statSync('./file_svg/1_elemen_png/' + f).size, cropW: w, cropH: h });
  } else {
    details.push({ file: f, size: fs.statSync('./file_svg/1_elemen_png/' + f).size, cropW: 0, cropH: 0 });
  }
});

details.sort((a, b) => b.size - a.size);
console.log('Top 25 by file size:');
console.log(details.slice(0, 25));
