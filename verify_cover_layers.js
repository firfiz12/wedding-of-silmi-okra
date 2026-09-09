const fs = require('fs');

const files = [
  '001_rect_1.png', // bg rect
  '002_g_2.png',    // paper texture
  '004_g_4.png',    // ribbon bow
  '005_g_5.png',    // rings
  '047_g_47.png',   // "THESE KIDS ARE GETTING MARRIED!"
  '006_g_6.png',    // radiating lines
  '007_g_7.png',    // silmi head photo
  '008_g_8.png',    // okra head photo
  '009_g_9.png',    // bride groom cartoon body
  '003_g_3.png',    // silmi heart okra
  '046_g_46.png',   // 11.10.26
  '029_g_29.png',   // button bg
  '030_g_30.png'    // button text & envelope
];

console.log('Checking key cover layers:');
files.forEach(f => {
  const p = './file_svg/1_elemen_png/' + f;
  console.log(f, fs.existsSync(p) ? fs.statSync(p).size : 'MISSING');
});
