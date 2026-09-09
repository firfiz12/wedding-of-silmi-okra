const fs = require('fs');
const path = require('path');

// Read all files in 1_elemen_png
const files1 = fs.readdirSync('./file_svg/1_elemen_png')
  .filter(f => f.endsWith('.png'))
  .sort();

console.log('Total files in 1_elemen_png:', files1.length);

// Let's create an HTML that stacks them in exact numerical order
// and test it
const layersHtml = files1.map((f, idx) => {
  let extraClass = 'layer';
  let id = `p1-layer-${idx}`;
  
  // Specific semantic classes for animation
  if (f.includes('001_rect')) extraClass += ' layer-bg';
  else if (f.includes('002_g_2')) extraClass += ' layer-paper';
  else if (f.includes('004_g_4')) extraClass += ' layer-ribbon';
  else if (f.includes('005_g_5')) extraClass += ' layer-rings';
  else if (f.includes('006_g_6')) extraClass += ' layer-sunburst';
  else if (f.includes('007_g_7')) extraClass += ' layer-silmi';
  else if (f.includes('008_g_8')) extraClass += ' layer-okra';
  else if (f.includes('009_g_9')) extraClass += ' layer-body';
  else if (f.includes('003_g_3')) extraClass += ' layer-couple-name';
  else if (f.includes('046_g_46')) extraClass += ' layer-date';
  else if (f.includes('029_g_29')) extraClass += ' layer-btn-bg';
  else if (f.includes('030_g_30')) extraClass += ' layer-btn-text';
  else if (idx >= 47 && idx <= 76) extraClass += ' layer-title-letter';
  else if (idx >= 30 && idx <= 44) extraClass += ' layer-recip-letter';
  else if (idx >= 9 && idx <= 27) extraClass += ' layer-name-letter';
  else if (idx >= 77) extraClass += ' layer-star';

  return `    <img src="file_svg/1_elemen_png/${f}" class="${extraClass}" id="${id}" alt="" />`;
}).join('\n');

console.log('Sample layers:');
console.log(layersHtml.slice(0, 500));
