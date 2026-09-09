/**
 * THE WEDDING OF SILMI & OKRA - SCRIPT.JS
 * Revisi Total: GSAP Animation Engine + Dynamic Countdown + Pure HTML RSVP + Audio Controller
 * Fast 60 FPS Mobile GPU Optimized
 */

// Status undangan sudah dibuka (scroll aktif + navigasi tampil)
let isOpened = false;

document.addEventListener('DOMContentLoaded', () => {
  // Scroll dikunci sampai "Buka Undangan" diklik
  document.body.classList.add('locked');

  // 1. Personalize Guest Name from URL (?to=Nama+Tamu)
  initGuestPersonalization();

  // 2. Build Cover Entrance Animation Timeline (diputar ulang saat cover tampil)
  initCoverAnimation();

  // 3. Setup Open Invitation Trigger with Exit Animation
  initOpenInvitation();

  // 4. Setup Dynamic Countdown Timer (Real-time Ticker)
  initCountdownTimer();

  // 5. Setup Floating Audio Controller
  initAudioController();

  // 6. Setup Staggered ScrollTrigger on Inner Sections
  initScrollAnimations();

  // 7. Setup Auto-hide Page Navigation Dock
  initNavigationDock();

  // 8. Load Stored RSVP Wishes from LocalStorage
  loadSavedWishes();
});

/* ==========================================================================
   1. GUEST PERSONALIZATION
   ========================================================================== */
function initGuestPersonalization() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('to') || urlParams.get('p') || urlParams.get('guest');

  if (guestName) {
    const cleanName = decodeURIComponent(guestName.replace(/\+/g, ' '));
    // Update RSVP name input placeholder or value
    const nameInput = document.getElementById('rsvp-name');
    if (nameInput) {
      nameInput.value = cleanName;
    }
  }
}

/* ==========================================================================
   2. COVER ENTRANCE ANIMATION (GSAP TIMELINE)
   Elemen non-teks: masuk dengan efek POP (scale + opacity, tanpa geser).
   Elemen teks: masuk dengan BURST horizontal dari kiri.
   Timeline disimpan di window._coverTl agar bisa diputar ulang (replay)
   setiap user kembali men-scroll ke halaman cover.
   ========================================================================== */
function initCoverAnimation() {
  if (typeof gsap === 'undefined') return;

  const coverEl = document.getElementById('cover');
  if (!coverEl) return;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ delay: 0.15 });
    tl.timeScale(1.2);

    tl
      // --- Kondisi awal (set di awal timeline agar restart selalu bersih) ---
      .set('.bg-paper', { opacity: 0, scale: 1.05 })
      .set('.p1-paper-curl', { opacity: 0, scale: 0.7, rotation: 8, transformOrigin: '50% 50%' })
      .set('.p1-ribbon', { opacity: 0, scale: 0.6, rotation: -12, transformOrigin: '50% 50%' })
      .set('.p1-title', { opacity: 0, x: -70 })
      .set('.p1-bodies', { opacity: 0, scale: 0.7, transformOrigin: '50% 50%' })
      .set('.p1-head-silmi', { opacity: 0, scale: 0.5, rotation: -10, transformOrigin: '50% 50%' })
      .set('.p1-head-okra', { opacity: 0, scale: 0.5, rotation: 10, transformOrigin: '50% 50%' })
      .set(['.p1-stars-left', '.p1-stars-right'], { opacity: 0, scale: 0, transformOrigin: '50% 50%' })
      .set('.p1-couple-sign', { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' })
      .set('.p1-date', { opacity: 0, x: -70 })
      .set('.p1-recip-label', { opacity: 0, x: -70 })
      .set('.p1-recip-name', { opacity: 0, x: -70 })
      .set(['.p1-btn-open', '.p1-btn-envelope'], { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' })

      // 1. Background & Paper texture fades in & zooms out gently
      .to('.bg-paper', {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out'
      })
      // 2. PAPER CURL (art) - POP
      .to('.p1-paper-curl', {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.55,
        ease: 'back.out(1.6)'
      }, '-=0.4')
      // 3. RIBBON (art) - POP
      .to('.p1-ribbon', {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, '-=0.35')
      // 4. TITLE (text) - BURST horizontal dari kiri
      .to('.p1-title', {
        opacity: 1,
        x: 0,
        duration: 1.1,
        ease: 'power2.out'
      }, '-=0.4')
      // 5. BODIES (art kartun) - POP
      .to('.p1-bodies', {
        opacity: 1,
        scale: 1,
        duration: 0.55,
        ease: 'back.out(1.5)'
      }, '-=0.4')
      // 6. Caricature heads - POP dengan bounce
      .to(['.p1-head-okra', '.p1-head-silmi'], {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.8)'
      }, '-=0.3')
      // 7. Stars - POP elastic
      .to(['.p1-stars-left', '.p1-stars-right'], {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        stagger: 0.1,
        ease: 'elastic.out(1, 0.6)'
      }, '-=0.3')
      // 8. COUPLE SIGN (art) - POP
      .to('.p1-couple-sign', {
        opacity: 1,
        scale: 1,
        duration: 0.55,
        ease: 'back.out(1.6)'
      }, '-=0.2')
      // 9. DATE & RECIP (text) - BURST horizontal
      .to('.p1-date', {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power2.out'
      }, '-=0.25')
      .to(['.p1-recip-label', '.p1-recip-name'], {
        opacity: 1,
        x: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power2.out'
      }, '-=0.2')
      // 10. Open button & envelope - POP
      .to(['.p1-btn-open', '.p1-btn-envelope'], {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.8)'
      }, '-=0.1');

    window._coverTl = tl;
  }, coverEl);

  return ctx;
}

/* ==========================================================================
   3. OPEN INVITATION (BUKA UNDANGAN & PUTAR MUSIK)
   Scroll terkunci sampai tombol diklik. Cover tetap sebagai halaman pertama.
   ========================================================================== */
function initOpenInvitation() {
  const btnOpen = document.getElementById('btn-open-invitation');
  const audioFloating = document.getElementById('floating-audio');

  if (!btnOpen) return;

  btnOpen.addEventListener('click', () => {
    // Buka undangan: aktifkan scroll, tampilkan kontrol audio,
    // lalu scroll mulus ke halaman berikutnya.
    document.body.classList.remove('locked');
    isOpened = true;
    if (audioFloating) audioFloating.classList.remove('hidden');

    // Smooth scroll to Section 2 (Mempelai).
    // Dilakukan setelah frame berikutnya agar posisi target akurat
    // setelah layout cover berubah menjadi halaman biasa.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const p2 = document.getElementById('page-2');
        if (p2) {
          p2.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Trigger background audio
    playBackgroundAudio();
  });
}

/* ==========================================================================
   4. DYNAMIC COUNTDOWN TIMER (REAL-TIME TICKER)
   Target: October 11, 2026 08:00:00 WIB (UTC+7)
   ========================================================================== */
function initCountdownTimer() {
  const weddingDate = new Date('2026-10-11T08:00:00+07:00').getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days < 10 ? '0' + days : days;
    hoursEl.textContent = hours < 10 ? '0' + hours : hours;
    minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
  }

  // Initial call and interval
  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   5. AUDIO CONTROLLER
   ========================================================================== */
function initAudioController() {
  const audioBtn = document.getElementById('floating-audio');
  const bgAudio = document.getElementById('bg-audio');

  if (!audioBtn || !bgAudio) return;

  audioBtn.addEventListener('click', () => {
    if (bgAudio.paused) {
      bgAudio.play().then(() => {
        audioBtn.classList.remove('paused');
        showToast('Musik diputar 🎵');
      }).catch(err => console.warn('Audio play blocked:', err));
    } else {
      bgAudio.pause();
      audioBtn.classList.add('paused');
      showToast('Musik dijeda ⏸️');
    }
  });
}

function playBackgroundAudio() {
  const bgAudio = document.getElementById('bg-audio');
  const audioBtn = document.getElementById('floating-audio');

  if (!bgAudio) return;

  bgAudio.volume = 0.75;
  const p = bgAudio.play();
  if (p !== undefined) {
    p.then(() => {
      if (audioBtn) audioBtn.classList.remove('paused');
    }).catch(e => {
      console.log('Autoplay deferred:', e);
      if (audioBtn) audioBtn.classList.add('paused');
    });
  }
}

/* ==========================================================================
   6. SCROLL ANIMATIONS (REPLAY SETIAP HALAMAN MASUK LAYAR)
   Berbasis evaluasi tiap scroll (rAF-throttled): setiap halaman yang
   masuk layar diputar animasi entrinya; halaman yang keluar layar
   direset agar siap replay — berlaku untuk scroll ke bawah maupun ke atas.
   ========================================================================== */
function initScrollAnimations() {
  if (typeof gsap === 'undefined') return;

  // Mainkan animasi entri satu halaman (art pop, teks burst horizontal)
  function playSection(section) {
    const isRsvp = section.classList.contains('section-rsvp');

    if (isRsvp) {
      const card = section.querySelector('.rsvp-card');
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, y: 60, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out', clearProps: 'transform,opacity' }
        );
      }
      return;
    }

    // 1. Ornamen / elemen seni: POP (scale + opacity)
    const artLayers = section.querySelectorAll('.layer-art:not(.bg-paper)');
    if (artLayers.length > 0) {
      gsap.fromTo(artLayers,
        { opacity: 0, scale: 0.92, transformOrigin: '50% 50%' },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out', clearProps: 'transform,opacity' }
      );
    }

    // 2. Teks PNG: BURST horizontal dari kiri (perlahan)
    const textLayers = section.querySelectorAll('.layer-text');
    if (textLayers.length > 0) {
      gsap.fromTo(textLayers,
        { opacity: 0, x: -70 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', clearProps: 'transform,opacity' }
      );
    }

    // 3. Dynamic Countdown Timer (Page 3)
    const countdown = section.querySelector('.countdown-section');
    if (countdown) {
      gsap.fromTo(countdown,
        { opacity: 0, y: 40, scale: 0.92, transformOrigin: '50% 50%' },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out', clearProps: 'transform,opacity' }
      );
    }
  }

  // Kumpulkan target: cover + semua halaman
  const targets = [];
  const coverEl = document.getElementById('cover');
  if (coverEl) targets.push(coverEl);
  document.querySelectorAll('.page-section').forEach(el => targets.push(el));

  // Halaman yang animasinya sudah/kondisi replay
  const played = new WeakSet();
  let lastPlay = 0;

  // Bagian tengah halaman sudah masuk layar => siap diputar
  function isMidVisible(el) {
    const rect = el.getBoundingClientRect();
    const mid = rect.top + rect.height / 2;
    return mid > 0 && mid < window.innerHeight;
  }

  // Halaman benar-benar keluar layar => izinkan replay berikutnya
  function isFullyOut(el) {
    const rect = el.getBoundingClientRect();
    return rect.bottom <= 0 || rect.top >= window.innerHeight;
  }

  function scan() {
    const now = performance.now();
    targets.forEach(el => {
      // Sebelum undangan dibuka, hanya cover yang beranimasi
      if (!isOpened && el.id !== 'cover') return;

      if (isMidVisible(el)) {
        // Main hanya jika belum pernah dimainkan, atau sudah keluar layar,
        // dan sudah lewat cooldown agar tidak restart di tengah scroll
        if (!played.has(el) || el._replayReady) {
          if (now - lastPlay > 400) {
            played.add(el);
            el._replayReady = false;
            lastPlay = now;
            if (el.id === 'cover') {
              if (window._coverTl) window._coverTl.restart();
            } else {
              playSection(el);
            }
          }
        }
      } else if (isFullyOut(el)) {
        // Keluar layar => siap diputar ulang saat kembali
        el._replayReady = true;
      }
    });
  }

  // Evaluasi ulang saat scroll / resize (throttled dengan rAF)
  let ticking = false;
  function schedule() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      scan();
    });
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });

  scan();
}

/* ==========================================================================
   7. AUTO-HIDE PAGE NAVIGATION DOCK
   Muncul saat klik / sentuh / scroll, sembunyi kembali saat idle
   ========================================================================== */
function initNavigationDock() {
  const dock = document.getElementById('nav-dock');
  const dockInner = document.getElementById('nav-dock-inner');
  if (!dock || !dockInner) return;

  const sections = [
    { id: 'cover', label: 'Cover', icon: 'fa-envelope-open' },
    { id: 'page-2', label: 'Mempelai', icon: 'fa-ring' },
    { id: 'page-3', label: 'Acara', icon: 'fa-calendar-days' },
    { id: 'page-4', label: 'Lokasi', icon: 'fa-location-dot' },
    { id: 'page-5', label: 'Hadiah', icon: 'fa-gift' },
    { id: 'page-6', label: 'Kisah', icon: 'fa-book-open' },
    { id: 'page-7', label: 'RSVP', icon: 'fa-paper-plane' },
    { id: 'page-8', label: 'Penutup', icon: 'fa-heart' }
  ];

  // Build navigation items
  const items = sections.map(sec => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-dock-item';
    btn.dataset.target = sec.id;
    btn.setAttribute('aria-label', 'Ke halaman ' + sec.label);
    btn.innerHTML = `<span class="nav-dock-icon"><i class="fa-solid ${sec.icon}"></i></span><span class="nav-dock-label">${sec.label}</span>`;

    btn.addEventListener('click', () => {
      setActive(sec.id);
      const target = document.getElementById(sec.id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      hideDock();
    });

    dockInner.appendChild(btn);
    return btn;
  });

  let idleTimer = null;
  const IDLE_DELAY = 2600;

  function showDock() {
    dock.classList.add('visible');
    restartIdleTimer();
  }

  function hideDock() {
    dock.classList.remove('visible');
    clearTimeout(idleTimer);
  }

  function restartIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(hideDock, IDLE_DELAY);
  }

  // Trigger muncul pada klik / sentuh / scroll (hanya setelah undangan dibuka)
  ['click', 'touchstart', 'scroll'].forEach(evt => {
    document.addEventListener(evt, (event) => {
      if (!isOpened) return;

      if (evt !== 'scroll' && event.target && event.target.closest && event.target.closest('.nav-dock')) {
        return;
      }
      if (!dock.classList.contains('visible')) {
        dock.classList.add('visible');
      }
      restartIdleTimer();
    }, { passive: true });
  });

  // Set item navigasi aktif (ikon & label berwarna tema)
  function setActive(id) {
    items.forEach(btn => btn.classList.toggle('active', btn.dataset.target === id));
  }

  // Scroll-spy: section yang bagian atasnya paling baru melewati tengah layar
  function updateActive() {
    const scanLine = window.innerHeight * 0.5;
    let currentId = 'cover';
    let best = -Infinity;

    sections.forEach(sec => {
      const el = document.getElementById(sec.id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= scanLine && rect.top > best) {
        best = rect.top;
        currentId = sec.id;
      }
    });

    setActive(currentId);
  }

  // Jadwalkan scroll-spy via rAF agar ringan
  let spyTicking = false;
  function scheduleSpy() {
    if (spyTicking) return;
    spyTicking = true;
    requestAnimationFrame(() => {
      spyTicking = false;
      updateActive();
    });
  }

  window.addEventListener('scroll', scheduleSpy, { passive: true });
  window.addEventListener('resize', scheduleSpy, { passive: true });

  updateActive();
}

/* ==========================================================================
   8. RSVP FORM SUBMISSION & LOCALSTORAGE WISHES
   ========================================================================== */

// URL Web App Google Apps Script untuk menyimpan data RSVP ke Google Sheets.
// Isi dengan URL yang didapat saat Deploy > Manage deployments > Web app.
// Contoh: 'https://script.google.com/macros/s/ABCDEF123/exec'
// Biarkan kosong ('') jika belum diinisialisasi -> data hanya tersimpan di localStorage.
const RSVP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxp1e8Y3pHy90Ys0hmdDBq4oZCyXOB0-iDhCGxlf1tczNmvGddPlSSGLpV7c-4ooqMvuA/exec';

window.handleRsvp = function(e) {
  e.preventDefault();

  const nameInput = document.getElementById('rsvp-name');
  const statusSelect = document.getElementById('rsvp-status');
  const msgInput = document.getElementById('rsvp-msg');
  const submitBtn = document.getElementById('btn-submit-rsvp');

  const name = nameInput.value.trim();
  const status = statusSelect.value;
  const msg = msgInput.value.trim();

  if (!name || !msg) {
    showToast('Mohon lengkapi nama dan ucapan Anda.');
    return;
  }

  const rsvpData = {
    name,
    status,
    msg,
    timestamp: new Date().toISOString()
  };

  // Button loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>Mengirim...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

  // Kirim ke Google Spreadsheet (jika URL sudah di-set), lalu tampilkan hasil.
  // Selalu berhasil secara lokal walau pengiriman ke Sheets gagal / belum di-set.
  const sendToSheet = RSVP_SCRIPT_URL
    ? fetch(RSVP_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(rsvpData)
      })
      .then(() => ({ ok: true }))
      .catch(() => ({ ok: false }))
    : Promise.resolve({ ok: true });

  sendToSheet.finally(() => {
    // Add to wishes list
    addWishToBoard(name, status, msg, 'Baru saja');

    // Save to LocalStorage
    saveWishLocally(rsvpData);

    // Reset inputs
    msgInput.value = '';
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span>Terkirim!</span> <i class="fa-solid fa-check"></i>`;

    setTimeout(() => {
      submitBtn.innerHTML = `<span>Kirim Konfirmasi</span> <i class="fa-solid fa-paper-plane"></i>`;
    }, 2500);

    showToast(`Terima kasih ${name}! Konfirmasi kehadiran Anda berhasil dikirim.`);

    // Reload feed ucapan global (iframe) agar ucapan baru langsung tampil
    reloadWishesFeed();
  });
};

function reloadWishesFeed() {
  const frame = document.querySelector('.live-wishes-frame');
  if (!frame || !RSVP_SCRIPT_URL) return;
  setTimeout(() => {
    frame.src = RSVP_SCRIPT_URL + '?action=feed&r=' + Date.now();
  }, 1200);
}

function addWishToBoard(name, status, msg, timeStr) {
  const wishesList = document.getElementById('wishes-list');
  const countEl = document.getElementById('wishes-count');
  if (!wishesList) return;

  let badgeClass = 'badge-hadir';
  if (status === 'Ragu-ragu') badgeClass = 'badge-ragu';
  else if (status.includes('Tidak')) badgeClass = 'badge-tidak';

  const item = document.createElement('div');
  item.className = 'wish-item';
  item.style.animation = 'fadeInUp 0.5s ease forwards';
  item.innerHTML = `
    <div class="wish-header">
      <strong class="wish-author cute-font">${escapeHtml(name)}</strong>
      <span class="wish-badge ${badgeClass}">${escapeHtml(status)}</span>
    </div>
    <p class="wish-text">${escapeHtml(msg)}</p>
    <span class="wish-time">${timeStr}</span>
  `;

  wishesList.insertBefore(item, wishesList.firstChild);

  if (countEl) {
    const currentCount = parseInt(countEl.textContent || '0', 10);
    countEl.textContent = (currentCount + 1).toString();
  }
}

function saveWishLocally(wish) {
  try {
    const existing = JSON.parse(localStorage.getItem('silmi_okra_wishes') || '[]');
    existing.unshift(wish);
    localStorage.setItem('silmi_okra_wishes', JSON.stringify(existing));
  } catch (err) {
    console.warn('LocalStorage error:', err);
  }
}

function loadSavedWishes() {
  try {
    const saved = JSON.parse(localStorage.getItem('silmi_okra_wishes') || '[]');
    saved.forEach(w => {
      const timeDiff = getTimeAgo(new Date(w.timestamp));
      addWishToBoard(w.name, w.status, w.msg, timeDiff);
    });
  } catch (err) {
    console.warn('Error loading saved wishes:', err);
  }
}

function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return 'Baru saja';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} menit yang lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam yang lalu`;
  const days = Math.floor(hours / 24);
  return `${days} hari yang lalu`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/* ==========================================================================
   9. COPY REKENING UTILITY & TOAST
   ========================================================================== */
window.copyAccount = function(num, label) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(num).then(() => {
      showToast(`${label} (${num}) berhasil disalin!`);
    }).catch(() => fallbackCopy(num, label));
  } else {
    fallbackCopy(num, label);
  }
};

function fallbackCopy(num, label) {
  const ta = document.createElement('textarea');
  ta.value = num;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    showToast(`${label} (${num}) berhasil disalin!`);
  } catch (e) {
    showToast(`Gagal menyalin: ${num}`);
  }
  document.body.removeChild(ta);
}

function showToast(text) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  if (!toast || !toastText) return;

  toastText.textContent = text;
  toast.classList.remove('hidden');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.add('hidden');
  }, 2800);
}
