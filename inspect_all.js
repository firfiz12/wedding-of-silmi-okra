const fs = require('fs');

let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Inspect All Elemen PNG</title>
  <style>
    body { background: #1a1a1a; color: #eee; font-family: system-ui, sans-serif; padding: 20px; }
    .page-section { margin-bottom: 40px; border-bottom: 1px solid #444; padding-bottom: 20px; }
    h2 { color: #f59e0b; margin-bottom: 16px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; }
    .card { background: #2a2a2a; border-radius: 8px; padding: 10px; text-align: center; border: 1px solid #333; }
    .img-box {
      width: 100%;
      height: 280px;
      background: #111;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: 
        linear-gradient(45deg, #222 25%, transparent 25%), 
        linear-gradient(-45deg, #222 25%, transparent 25%), 
        linear-gradient(45deg, transparent 75%, #222 75%), 
        linear-gradient(-45deg, transparent 75%, #222 75%);
      background-size: 16px 16px;
      background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
    }
    .img-box img { max-width: 100%; max-height: 100%; object-fit: contain; }
    .caption { font-size: 11px; margin-top: 8px; color: #aaa; word-break: break-all; }
    .type-badge { display: inline-block; font-size: 10px; padding: 2px 6px; border-radius: 4px; margin-bottom: 6px; }
    .type-img { background: #2563eb; color: white; }
    .type-txt { background: #16a34a; color: white; }
    .stacked-preview {
      position: relative;
      width: 270px;
      height: 480px;
      background: #fff;
      margin: 20px 0;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    }
    .stacked-layer {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      object-fit: contain;
      pointer-events: none;
    }
  </style>
</head>
<body>
  <h1>Pecahan PNG Inspector (Pages 1 - 8)</h1>
`;

for (let i = 1; i <= 8; i++) {
  const dir = `./file_svg/${i}_elemen_png`;
  if (!fs.existsSync(dir)) continue;

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png')).sort();
  
  html += `
  <div class="page-section">
    <h2>Halaman ${i} (${files.length} elemen)</h2>
    <div style="display: flex; gap: 30px; align-items: flex-start; flex-wrap: wrap;">
      <div>
        <h4>Full Stack Preview Halaman ${i}</h4>
        <div class="stacked-preview">
  `;

  files.forEach(f => {
    html += `        <img src="${dir}/${f}" class="stacked-layer" title="${f}">\n`;
  });

  html += `      </div>
      </div>
      <div style="flex: 1; min-width: 300px;">
        <h4>Elemen Terpisah</h4>
        <div class="grid">
  `;

  files.forEach(f => {
    const isText = f.includes('teks_paragraf');
    html += `
          <div class="card">
            <span class="type-badge ${isText ? 'type-txt' : 'type-img'}">${isText ? 'TEKS' : 'GAMBAR'}</span>
            <div class="img-box">
              <img src="${dir}/${f}" alt="${f}" loading="lazy" />
            </div>
            <div class="caption">${f}</div>
          </div>
    `;
  });

  html += `
        </div>
      </div>
    </div>
  </div>
  `;
}

html += `
</body>
</html>
`;

fs.writeFileSync('./inspect_all.html', html);
console.log('Successfully written inspect_all.html');
