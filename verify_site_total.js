const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const regex = /src="([^"]+\.png)"/g;
let match;
const missing = [];
let totalFound = 0;

while ((match = regex.exec(html)) !== null) {
  totalFound++;
  const src = match[1];
  if (!fs.existsSync(src)) {
    missing.push(src);
  }
}

console.log(`\n========================================`);
console.log(`WEBSITE VERIFICATION REPORT`);
console.log(`========================================`);
console.log(`Total PNG images linked: ${totalFound}`);

if (missing.length === 0) {
  console.log(`✅ 100% SUCCESS: All ${totalFound} PNG images exist and are verified!`);
} else {
  console.error(`❌ MISSING FILES (${missing.length}):`, missing);
}

// Check font
const fontExists = fs.existsSync('Providence-Sans.otf');
console.log(`Font Providence-Sans.otf exists: ${fontExists ? '✅ YES' : '❌ NO'}`);

// Check audio
const audioExists = fs.existsSync('music/wedding_bgm.mp3');
console.log(`Music music/wedding_bgm.mp3 exists: ${audioExists ? '✅ YES' : '❌ NO'}`);

// Check essential sections
const hasCover = html.includes('id="cover"');
const hasPage2 = html.includes('id="page-2"');
const hasCountdown = html.includes('id="countdown-timer"');
const hasLocation = html.includes('hotspot-location');
const hasGift = html.includes('hotspot-copy-bca');
const hasRsvpForm = html.includes('id="rsvp-form"');
const hasWishes = html.includes('id="wishes-list"');
const hasPage8 = html.includes('id="page-8"');

console.log(`\nStructure Checks:`);
console.log(`- Cover Overlay (Pecahan PNG): ${hasCover ? '✅' : '❌'}`);
console.log(`- Section Mempelai (Pecahan PNG): ${hasPage2 ? '✅' : '❌'}`);
console.log(`- Dynamic Countdown Timer (HTML): ${hasCountdown ? '✅' : '❌'}`);
console.log(`- Google Maps Location: ${hasLocation ? '✅' : '❌'}`);
console.log(`- Wedding Gift & Copy Buttons: ${hasGift ? '✅' : '❌'}`);
console.log(`- Pure HTML RSVP Form: ${hasRsvpForm ? '✅' : '❌'}`);
console.log(`- Live Guest Wishes Board: ${hasWishes ? '✅' : '❌'}`);
console.log(`- Penutup Section: ${hasPage8 ? '✅' : '❌'}`);
console.log(`========================================\n`);
