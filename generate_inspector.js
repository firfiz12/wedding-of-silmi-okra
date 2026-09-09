const fs = require('fs');

const html = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #333; color: white; font-family: sans-serif; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 15px; }
    .item { background: #444; border: 1px solid #555; padding: 5px; text-align: center; }
    .item img { max-width: 100%; max-height: 200px; background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect width="10" height="10" fill="%23666"/><rect x="10" width="10" height="10" fill="%23555"/><rect y="10" width="10" height="10" fill="%23555"/><rect x="10" y="10" width="10" height="10" fill="%23666"/></svg>'); }
    .name { font-size: 11px; word-break: break-all; margin-top: 4px; }
  </style>
</head>
<body>
  <h2>Layer Inspector - 1_elemen_png (cropped)</h2>
  <div class="grid">
    ${fs.readdirSync('./file_svg/1_elemen_png/cropped').map(f => `
      <div class="item">
        <img src="file_svg/1_elemen_png/cropped/${f}">
        <div class="name">${f}</div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;

fs.writeFileSync('./inspect_layers.html', html);
console.log('inspect_layers.html generated!');
