const fs = require('fs');
const path = require('path');

function getPageImgs(pageNum) {
  const dir = `./file_svg/${pageNum}_elemen_png`;
  if (!fs.existsSync(dir)) return '';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png')).sort();

  return files.map((f, idx) => {
    // Page 3: Skip 03_gambar_elemen.png because it's replaced by dynamic countdown
    if (pageNum === 3 && f === '03_gambar_elemen.png') {
      return '';
    }

    // Page 7: Skip 03 and 04 teks_paragraf because RSVP is 100% pure HTML!
    if (pageNum === 7 && (f.includes('teks_paragraf') || f === '01_gambar_elemen.png')) {
      return '';
    }

    // Skip empty 01_gambar_elemen if 0x0
    if (f === '01_gambar_elemen.png') {
      return `      <!-- ${f} (transparent base) -->`;
    }

    const isArt = f.includes('gambar_elemen');
    const isText = f.includes('teks_paragraf');
    let cls = 'layer';
    if (isArt) cls += ' layer-art';
    if (isText) cls += ' layer-text';

    // Semantic classes for targeted animations
    if (f === '02_gambar_elemen.png') cls += ' bg-layer bg-paper';

    if (pageNum === 1) {
      if (f === '03_gambar_elemen.png') cls += ' p1-couple-sign';
      else if (f === '04_gambar_elemen.png') cls += ' p1-paper-curl';
      else if (f === '05_gambar_elemen.png') cls += ' p1-ribbon';
      else if (f === '06_gambar_elemen.png') cls += ' p1-head-okra';
      else if (f === '07_gambar_elemen.png') cls += ' p1-head-silmi';
      else if (f === '08_gambar_elemen.png') cls += ' p1-btn-envelope';
      else if (f === '09_teks_paragraf.png') cls += ' title-layer p1-title';
      else if (f === '10_teks_paragraf.png') cls += ' p1-bodies';
      else if (f === '11_teks_paragraf.png') cls += ' p1-stars-left';
      else if (f === '12_teks_paragraf.png') cls += ' p1-stars-right';
      else if (f === '13_teks_paragraf.png') cls += ' p1-date';
      else if (f === '14_teks_paragraf.png') cls += ' p1-recip-label';
      else if (f === '15_teks_paragraf.png') cls += ' p1-recip-name';
      else if (f === '16_teks_paragraf.png') cls += ' p1-btn-open';
    } else {
      cls += ` p${pageNum}-el p${pageNum}-el-${idx}`;
    }

    const loadingAttr = pageNum <= 1 ? 'eager' : 'lazy';
    return `      <img src="file_svg/${pageNum}_elemen_png/${f}" class="${cls}" loading="${loadingAttr}" alt="" />`;
  }).filter(Boolean).join('\n');
}

const page1Imgs = getPageImgs(1);
const page2Imgs = getPageImgs(2);
const page3Imgs = getPageImgs(3);
const page4Imgs = getPageImgs(4);
const page5Imgs = getPageImgs(5);
const page6Imgs = getPageImgs(6);
const page7Imgs = getPageImgs(7);
const page8Imgs = getPageImgs(8);

const fullHtml = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="description" content="Undangan Pernikahan Silmi & Okra - 11 Oktober 2026. Merayakan hari bahagia kami bersama keluarga dan sahabat.">
  <title>The Wedding of Silmi & Okra | 11.10.2026</title>
  
  <!-- GSAP Animation Engine & ScrollTrigger -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  
  <!-- Font Awesome Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  
  <!-- Main Stylesheet -->
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- Audio Background Player -->
  <audio id="bg-audio" loop preload="auto">
    <source src="music/wedding_bgm.mp3" type="audio/mp3">
  </audio>

  <!-- Floating Audio Control Disc -->
  <div id="floating-audio" class="floating-audio hidden" title="Putar / Jeda Musik">
    <div class="disc-wrapper">
      <div class="disc-vinyl">
        <i class="fa-solid fa-compact-disc"></i>
      </div>
      <div class="disc-indicator">
        <i class="fa-solid fa-music"></i>
      </div>
    </div>
  </div>

  <!-- Toast Notification -->
  <div id="toast" class="toast hidden" role="alert">
    <i class="fa-solid fa-circle-check"></i>
    <span id="toast-text">Berhasil disalin!</span>
  </div>

  <!-- Mobile 9:16 Frame Wrapper -->
  <div class="site-wrapper">

    <!-- ================= SECTION 1: COVER OVERLAY (PECAHAN PNG) ================= -->
    <section class="section-visual invitation-container cover-container" id="cover">
${page1Imgs}
      <!-- Hotspot Tombol Buka Undangan -->
      <button class="hotspot-btn hotspot-open" id="btn-open-invitation" aria-label="Buka Undangan"></button>
    </section>

    <!-- ================= INNER CONTENT ================= -->
    <main class="inner-content" id="inner-content">

      <!-- ================= SECTION 2: MEMPELAI & AYAT (PECAHAN PNG) ================= -->
      <section class="section-visual invitation-container page-section" id="page-2">
${page2Imgs}
      </section>

      <!-- ================= SECTION 3: SAVE THE DATE & DYNAMIC COUNTDOWN ================= -->
      <section class="section-visual invitation-container page-section" id="page-3">
${page3Imgs}
        <!-- Section Countdown Timer Dinamis (HTML Dinamis + Font Lucu) -->
        <div class="countdown-section transparent-bg" id="countdown-timer">
          <div class="timer-box cute-font">
            <div class="time-item">
              <span id="days" class="time-number">00</span>
              <span class="time-label">Hari</span>
            </div>
            <div class="time-divider">:</div>
            <div class="time-item">
              <span id="hours" class="time-number">00</span>
              <span class="time-label">Jam</span>
            </div>
            <div class="time-divider">:</div>
            <div class="time-item">
              <span id="minutes" class="time-number">00</span>
              <span class="time-label">Mnt</span>
            </div>
            <div class="time-divider">:</div>
            <div class="time-item">
              <span id="seconds" class="time-number">00</span>
              <span class="time-label">Dtk</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= SECTION 4: LOCATION / LOKASI ACARA ================= -->
      <section class="section-visual invitation-container page-section" id="page-4">
${page4Imgs}
        <!-- Hotspot Buka Google Maps -->
        <a href="https://maps.google.com/?q=Kampung+Makan+Joglo+Jakarta+Barat" target="_blank" rel="noopener noreferrer" class="hotspot-btn hotspot-location" aria-label="Buka Peta Google Maps"></a>
      </section>

      <!-- ================= SECTION 5: WEDDING GIFT / TANDA KASIH ================= -->
      <section class="section-visual invitation-container page-section" id="page-5">
${page5Imgs}
        <!-- Hotspot Salin Rekening BCA -->
        <button type="button" class="hotspot-btn hotspot-copy-bca" onclick="copyAccount('4190221046', 'Nomor Rekening BCA')" aria-label="Salin Rekening BCA"></button>
        <!-- Hotspot Salin Rekening Mandiri / BSI -->
        <button type="button" class="hotspot-btn hotspot-copy-mandiri" onclick="copyAccount('7185383247', 'Nomor Rekening Silmi Kaffah')" aria-label="Salin Rekening"></button>
        <!-- Hotspot WhatsApp Konfirmasi -->
        <a href="https://wa.me/6282333840722?text=Halo%20Silmi%20%26%20Okra,%20saya%20ingin%20konfirmasi%20tanda%20kasih%20hadiah%20pernikahan." target="_blank" rel="noopener noreferrer" class="hotspot-btn hotspot-whatsapp" aria-label="Konfirmasi via WhatsApp"></a>
      </section>

      <!-- ================= SECTION 6: LOVE STORY / FOTO ================= -->
      <section class="section-visual invitation-container page-section" id="page-6">
${page6Imgs}
      </section>

      <!-- ================= SECTION 7: RSVP (TULISAN HTML MURNI + LOCAL FONT) ================= -->
      <section class="section-rsvp page-section" id="page-7">
${page7Imgs}
        <div class="rsvp-card-container">
          <div class="rsvp-card">
            <div class="rsvp-header">
              <h2 class="rsvp-title cute-font">RSVP</h2>
              <p class="rsvp-subtitle cute-font">Konfirmasi kehadiran Anda dan berikan doa restu</p>
            </div>

            <!-- Section RSVP Form Murni -->
            <form id="rsvp-form" class="custom-font-style" onsubmit="handleRsvp(event)">
              <div class="form-group">
                <label for="rsvp-name" class="cute-font">Nama Tamu</label>
                <input type="text" id="rsvp-name" placeholder="Masukkan nama Anda..." required autocomplete="name" />
              </div>

              <div class="form-group">
                <label for="rsvp-status" class="cute-font">Konfirmasi Kehadiran</label>
                <select id="rsvp-status" required>
                  <option value="Hadir">Hadir</option>
                  <option value="Ragu-ragu">Ragu-ragu</option>
                  <option value="Maaf, Tidak Bisa Hadir">Maaf, Tidak Bisa Hadir</option>
                </select>
              </div>

              <div class="form-group">
                <label for="rsvp-msg" class="cute-font">Ucapan &amp; Doa</label>
                <textarea id="rsvp-msg" placeholder="Tuliskan ucapan dan doa restu..." rows="3" required></textarea>
              </div>

              <button type="submit" class="rsvp-submit-btn cute-font" id="btn-submit-rsvp">
                <span>Kirim Konfirmasi</span>
                <i class="fa-solid fa-paper-plane"></i>
              </button>
            </form>

            <!-- Live Guest Wishes Board -->
            <div class="wishes-section">
              <div class="wishes-heading cute-font">
                <i class="fa-solid fa-heart"></i>
                <span>Ucapan &amp; Doa Restu (<span id="wishes-count">3</span>)</span>
              </div>
              <div class="wishes-list" id="wishes-list">
                <div class="wish-item">
                  <div class="wish-header">
                    <strong class="wish-author cute-font">Keluarga Besar Bpk. Ahmad</strong>
                    <span class="wish-badge badge-hadir">Hadir</span>
                  </div>
                  <p class="wish-text">Selamat menempuh hidup baru Silmi &amp; Okra! Semoga menjadi keluarga sakinah mawaddah warahmah, dilimpahi berkah selalu.</p>
                  <span class="wish-time">10 menit yang lalu</span>
                </div>
                <div class="wish-item">
                  <div class="wish-header">
                    <strong class="wish-author cute-font">Rian &amp; Dhea</strong>
                    <span class="wish-badge badge-hadir">Hadir</span>
                  </div>
                  <p class="wish-text">Happy wedding Silmi &amp; Okra! Bahagia terus sampai kakek nenek, lancar terus acaranya nanti!</p>
                  <span class="wish-time">1 jam yang lalu</span>
                </div>
                <div class="wish-item">
                  <div class="wish-header">
                    <strong class="wish-author cute-font">Nadia Putri</strong>
                    <span class="wish-badge badge-hadir">Hadir</span>
                  </div>
                  <p class="wish-text">Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fii khair. Turut berbahagia untuk kalian berdua!</p>
                  <span class="wish-time">3 jam yang lalu</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- ================= SECTION 8: PENUTUP (PECAHAN PNG) ================= -->
      <section class="section-visual invitation-container page-section" id="page-8">
${page8Imgs}
      </section>

    </main>

  </div>

  <!-- Custom Scripts -->
  <script src="script.js"></script>
</body>
</html>`;

fs.writeFileSync('./index.html', fullHtml);
console.log('Successfully generated updated index.html with new clean PNG stacking, dynamic countdown, and pure HTML RSVP form!');
