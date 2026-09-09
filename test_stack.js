const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('./file_svg/1_elemen_png')
  .filter(f => f.endsWith('.png'))
  .sort();

const imgTags = files.map(f => `<img src="file_svg/1_elemen_png/${f}" class="layer" title="${f}">`).join('\n  ');

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Stacked 1_elemen_png Test</title>
  <style>
    body { background: #333; margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    .canvas-box {
      position: relative;
      width: 450px;
      height: 800px;
      background: #fff;
      overflow: hidden;
      box-shadow: 0 0 20px rgba(0,0,0,0.5);
    }
    .layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      pointer-events: none;
    }
  </style>
</head>
<body>
  <div class="canvas-box">
  ${imgTags}
  </div>
</body>
</html>`;

fs.writeFileSync('./test_stack_1.html', html);
console.log('Generated test_stack_1.html');
