# Kaoem Telapak — situs lokal

Buka `index.html` untuk landing page Beranda. Daftar modul tersedia terpisah di `halaman.html`. Seluruh navigasi `data-path` mengarah ke berkas lokal. Menu yang belum memiliki konten sumber membuka halaman keterangan.

Logo di `assets/kaoem-telapak-logo.png` disalin dari `Frontend-KT/src/assets/kaoem-telapak-logo-transparent.png`. Gambar pratinjau `screen.png` telah dihapus; foto konten di halaman dipertahankan.

Empat halaman geospasial menggunakan Leaflet 1.9.4 dan peta dasar OpenStreetMap, mengikuti https://leafletjs.com/examples/quick-start/. Koneksi internet diperlukan untuk peta, Tailwind, font, dan foto eksternal. Penanda adalah contoh lokasi wilayah, bukan data anggota/proyek terverifikasi. Formulir, angka dashboard, serta alur persetujuan masih merupakan prototipe tanpa backend.

`verify.py` memeriksa keberadaan tujuan tautan dan aset lokal.

Untuk peta, jalankan `BUKA-WEBSITE.cmd` lalu buka http://127.0.0.1:8000/index.html. Hindari membuka peta melalui file:// karena tile OpenStreetMap memerlukan HTTP Referer. Library Leaflet dan ikonnya tersedia lokal di `assets/leaflet/`; tile peta tetap membutuhkan internet.

Login demo: username `anggota`, `admin`, atau `gis`, dengan kata sandi `KTdemo2026!`. Masing-masing menuju dashboard anggota, pusat persetujuan, atau atlas. Pemeriksaan akun berlangsung di browser dan tidak melindungi data atau menggantikan autentikasi server.

Portal peran: `portal-admin.html`, `portal-gis.html`, dan `portal-anggota.html`. Login demo mengarah ke portal tersebut. `cms-peta.html` mendukung tambah, ubah, hapus titik, draf/tayang, pencarian, impor/ekspor JSON. Data disimpan di localStorage pada origin yang sama; port 5500 dan 8000 tidak berbagi penyimpanan. Ini CMS demo, belum menggunakan server atau pembatasan akses nyata. Titik tayang dibaca oleh empat halaman peta. Jangan masukkan koordinat pribadi atau data sensitif ke prototipe.

Area CMS menggunakan sidebar bersama melalui `assets/cms-shell.*`. Peta pengelolaan tersedia di `cms/`, terpisah dari halaman peta publik. Menu peran disusun untuk demo dan tidak menggantikan otorisasi server.

Semua HTML kini berada di folder utama. Folder `assets/` menyimpan CSS, JavaScript, logo, dan Leaflet. Buka `index.html` melalui server lokal untuk mulai.
