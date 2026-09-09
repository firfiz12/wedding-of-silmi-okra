# 💌 Undangan Digital Interaktif: Silmi & Okra

Website undangan pernikahan digital interaktif berbasis web (HTML5, Vanilla CSS, JavaScript, GSAP) dengan tata letak layering presisi 9:16 mobile-first dan replikasi animasi dinamis sesuai video referensi.

---

## 🌟 Fitur Utama

1. **Tata Letak & Layering Presisi (Layout Precision)**:
   - Disusun dari pecahan elemen PNG kanvas presisi (`file_svg/1_elemen_png/`) dengan penataan z-index bertingkat.
   - Rasio aspek 9:16 yang ramah layar smartphone, serta tampilan elegan terpusat saat dibuka di layar komputer/laptop.
2. **Replikasi Animasi GSAP (Matching Reference Video)**:
   - **Intro Sequence**: Fade-in background tekstur kertas, ornamen pita & cincin meluncur dari sudut layar dengan rotasi halus, judul *"These kids are getting married!"* muncul bertahap, ilustrasi karikatur & foto masa kecil Silmi-Okra pop-up menggemaskan dengan pancaran sinar sunburst, nama & tanggal muncul lembut, kartu nama tamu dinamis, dan tombol *"Open Invitation"* muncul dengan efek *bounce* lalu berdenyut (*pulse & glow*).
   - **Exit Sequence**: Saat tombol dibuka, elemen terangkat ke atas, cover memudar halus, musik pernikahan otomatis diputar, dan layar beralih ke isi undangan.
3. **Fitur Interaktif Lengkap**:
   - **Nama Tamu Undangan Dinamis**: Mendukung query string URL `?to=Nama+Tamu` (contoh: `index.html?to=Budi+Santoso` atau `?to=Keluarga+Besar+Bpk+Hadi`).
   - **Pemutar Musik Latar Belakang (Background Music)**: Otomatis berputar saat undangan dibuka, dilengkapi tombol mengambang piringan hitam (*vinyl disc*) yang berputar dan bisa di-pause/play kapan saja.
   - **Live Countdown Timer**: Menghitung mundur real-time ke **11 Oktober 2026 09.00 WIB** (Hari, Jam, Menit, Detik).
   - **Simpan ke Google Calendar**: Tombol otomatis membuat agenda di kalender ponsel tamu.
   - **Peta Lokasi & Navigasi**: Jadwal Akad Nikah (09.00 - 10.00 WIB) & Resepsi (11.00 - 13.30 WIB) di Kampung Makan Joglo + tombol direct Google Maps & embed peta interaktif.
   - **Amplop Digital (Wedding Gift)**: Salin nomor rekening BCA & Mandiri dengan satu klik (*One-Click Copy*) disertai notifikasi toast, serta tombol konfirmasi kado via WhatsApp.
   - **Love Story Timeline**: Kisah perjalanan cinta bertahap (*Takdir, Sebuah Luka, Saling Dipersiapkan, Bismillah*).
   - **Buku Tamu / RSVP & Doa Restu**: Form konfirmasi kehadiran (Hadir / Tidak Hadir) yang langsung tersimpan di *localStorage* dan ditampilkan secara live di feed ucapan.
   - **Bottom Navigation Dock**: Navigasi cepat antar seksi (Cover, Mempelai, Acara, Lokasi, Hadiah, RSVP).

---

## 📁 Struktur Berkas

```
d:/apps/Undangan silmi-okra/
├── index.html            # Struktur utama website undangan (HTML5 semantik)
├── style.css             # Styling responsif, layering z-index, & estetika warna
├── script.js             # Logika interaktif, animasi GSAP, countdown, audio, & RSVP
├── music/
│   └── wedding_bgm.mp3   # Musik latar romantis Canon in D acoustic piano
├── file_svg/             # Aset grafis PNG kanvas presisi & gambar halaman 1-8
└── README.md             # Petunjuk penggunaan dan kustomisasi
```

---

## 🛠️ Panduan Kustomisasi

### 1. Mengubah Nama Pengantin & Tanggal Acara
Buka [index.html](file:///d:/apps/Undangan%20silmi-okra/index.html):
- **Nama Mempelai Wanita**: Cari `Silmi Koffah Almunawar, B.B.A.` lalu ganti sesuai nama yang diinginkan.
- **Nama Mempelai Pria**: Cari `Muhammad Okra Dinata, S.I.P.` lalu ganti sesuai nama yang diinginkan.
- **Nama Orang Tua**: Cari teks di dalam class `.profile-parents`.
- **Tanggal Acara**: Cari `11.10.26` atau `Minggu, 11 Oktober 2026`.

Untuk target waktu countdown timer, buka [script.js](file:///d:/apps/Undangan%20silmi-okra/script.js) pada baris berikut:
```javascript
// Target: 11 October 2026 09:00:00 UTC+7 (Jakarta)
const targetDate = new Date('2026-10-11T09:00:00+07:00').getTime();
```
Ubah format tanggal sesuai waktu pernikahan Anda.

### 2. Mengubah Lagu Latar (Background Music)
Anda dapat mengganti lagu pernikahan dengan salah satu cara berikut:
1. Ganti file `music/wedding_bgm.mp3` dengan file lagu MP3 pilihan Anda (pastikan namanya tetap sama `wedding_bgm.mp3`), **ATAU**
2. Di [index.html](file:///d:/apps/Undangan%20silmi-okra/index.html) bagian `<audio id="bg-audio">`:
   ```html
   <audio id="bg-audio" loop preload="auto">
     <source src="music/nama_lagu_baru_anda.mp3" type="audio/mp3">
   </audio>
   ```

### 3. Mengubah Nomor Rekening Bank & Konfirmasi WhatsApp
Buka [index.html](file:///d:/apps/Undangan%20silmi-okra/index.html) pada bagian **SECTION 5: WEDDING GIFT**:
- Ganti nomor rekening BCA pada teks `<div class="bank-account-num">` dan pada fungsi `onclick="copyToClipboard('11223344', 'Nomor rekening BCA')"`
- Ganti nomor rekening Mandiri pada teks `<div class="bank-account-num">` dan pada fungsi `onclick="copyToClipboard('11223344', 'Nomor rekening Mandiri')"`
- Ganti nomor WhatsApp pada tautan `https://wa.me/6281234567890`.

### 4. Mengirim Undangan dengan Nama Tamu Berbeda
Cukup tambahkan parameter `?to=Nama+Tamu` di akhir URL link undangan:
- Contoh: `https://domain-undangan.com/?to=Bapak+Joko+Wi`
- Contoh: `https://domain-undangan.com/?to=Keluarga+Besar+Bpk.+Ahmad`
- Nama tamu akan otomatis tercetak di cover depan dan otomatis terisi di kolom form RSVP!

---

## 🚀 Menjalankan Secara Lokal

Buka terminal dan jalankan server lokal:
```bash
# Menggunakan Node.js / npx http-server
npx http-server . -p 8080 -c-1
```
Buka browser di `http://localhost:8080/?to=Sahabat+Tersayang`.

---

## 📊 Menyimpan Data RSVP ke Google Sheets

Form RSVP dapat menyimpan data tamu (Nama, Status Kehadiran, Ucapan, Waktu) ke **Google Spreadsheet** menggunakan **Google Apps Script**, tanpa perlu server/backend.

### Langkah 1 — Buat Google Spreadsheet
1. Buka **sheets.new** lalu buat sheet baru.
2. Beri nama sheet **`RSVP`** (atau sesuaikan di kode).
3. Isi baris pertama (header) dengan:
   `Timestamp | Nama | Status | Ucapan`

### Langkah 2 — Buat Google Apps Script
1. Di Spreadsheet: menu **Extensions → Apps Script**.
2. Hapus isi editor, lalu tempel kode berikut:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RSVP');

  // Jika sheet 'RSVP' belum ada, buat otomatis dengan header
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('RSVP');
    sheet.appendRow(['Timestamp', 'Nama', 'Status', 'Ucapan']);
  }

  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput('Invalid JSON').setMimeType(ContentService.MimeType.TEXT);
  }

  sheet.appendRow([
    new Date().toISOString(),
    data.name || '',
    data.status || '',
    data.msg || ''
  ]);

  return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
}
```

3. Klik **Saving** (ikon 💾). Pastikan nama function adalah **`doPost`**.

### Langkah 3 — Deploy sebagai Web App
1. Klik **Deploy → New deployment**.
2. Pilih type **Web app**.
3. **Execute as:** *Me*
4. **Who has access:** *Anyone* (agar bisa diakses semua tamu yang membuka link undangan).
5. Klik **Deploy**, lalu **Authorize access** (buka menu akun, pilih akun Anda, klik **Advanced** → **Go to ... (unsafe)** bila perlu).
6. Salin **Web app URL** (berakhiran `/exec`), contoh: `https://script.google.com/macros/s/ABCDEF123/exec`.

### Langkah 4 — Pasang URL di Script
1. Buka [script.js](script.js), cari:
   ```javascript
   const RSVP_SCRIPT_URL = '';
   ```
2. Isi dengan URL Web App, menjadi:
   ```javascript
   const RSVP_SCRIPT_URL = 'https://script.google.com/macros/s/ABCDEF123/exec';
   ```
3. Commit & push. Deploy otomatis dilakukan oleh GitHub Pages (Deploy from a branch).

> **Catatan:** Jika `RSVP_SCRIPT_URL` dibiarkan kosong, form RSVP tetap berfungsi dan data hanya disimpan di `localStorage` browser tamu (perilaku semula). Setelah diisi URL, data juga masuk ke Google Sheets.
