const fs = require('fs');

console.log('=== Checking all pages ===');
for (let i = 1; i <= 8; i++) {
  const fullPng = `./file_svg/${i}_full.png`;
  const dirPng = `./file_svg/${i}_elemen_png`;
  const croppedDir = `./file_svg/${i}_elemen_png/cropped`;
  const fullExist = fs.existsSync(fullPng);
  const dirCount = fs.existsSync(dirPng) ? fs.readdirSync(dirPng).filter(f => f.endsWith('.png')).length : 0;
  const croppedCount = fs.existsSync(croppedDir) ? fs.readdirSync(croppedDir).filter(f => f.endsWith('.png')).length : 0;
  console.log(`Page ${i}: full=${fullExist} (${fullExist ? fs.statSync(fullPng).size : 0} bytes), canvasElements=${dirCount}, croppedElements=${croppedCount}`);
}
