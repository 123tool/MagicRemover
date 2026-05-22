## Magic Remover - Pro Object Eraser

Magic Remover adalah aplikasi web *Full-Stack* profesional yang dirancang untuk menghapus objek yang tidak diinginkan, noda, atau *watermark* dari sebuah gambar secara instan. 

Berbeda dengan penghapus objek berbasis *browser* biasa yang hanya mengaburkan (*blur*) gambar, Magic Remover menggunakan *backend* Python dengan algoritma **OpenCV Telea Inpainting**. Sistem ini secara cerdas merekonstruksi piksel di area yang dihapus berdasarkan tekstur dan pencahayaan di sekitarnya, menghasilkan foto yang bersih, autentik, dan 100% alami tanpa kehilangan ketajaman.

---

##  Fitur
*   **Pro-Level Inpainting:** Menggunakan algoritma *Telea* untuk rekonstruksi gambar yang mulus tanpa distorsi warna.
*   **Interactive Masking:** Fitur *brush* interaktif langsung di atas kanvas HTML5 untuk menandai area yang ingin dihapus dengan presisi.
*   **Full-Stack Architecture:** Pemisahan *frontend* (Vanilla JS) dan *backend* (FastAPI) untuk performa maksimal dan skalabilitas.
*   **Real-time Processing:** Pemrosesan API yang cepat dan responsif.

---

## Tech Stack
*   **Frontend:** HTML5, CSS3 (Glassmorphism), Vanilla JavaScript, HTML5 Canvas API.
*   **Backend:** Python 3.x, FastAPI, Uvicorn, OpenCV (cv2), NumPy.

---

## Instalasi & Penggunaan

Proyek ini terdiri dari dua bagian: **Backend** dan **Frontend**. Keduanya harus dijalankan agar aplikasi berfungsi dengan baik.

### 1. Persiapan Backend (Python)
Pastikan kamu sudah menginstal [Python 3.8+](https://www.python.org/downloads/) di komputermu.

1. Buka terminal/Command Prompt dan arahkan ke folder `backend`:
   
```bash
   cd MagicRemover/backend
```
2. ​(Opsional namun disarankan) Buat dan aktifkan Virtual Environment:
```
   python -m venv venv
   # Untuk Windows:
   venv\Scripts\activate
   # Untuk Mac/Linux:
   source venv/bin/activate
```
3. ​Instal semua library yang dibutuhkan:
```
   pip install -r requirements.txt
```
4. Jalankan server FastAPI:
```
   python main.py
```
Server backend akan berjalan di
```
http://0.0.0.0:8000
atau
http://localhost:8000.
```
​
## Menjalankan Frontend
​Karena frontend dibangun murni dengan HTML/CSS/JS standar, kamu tidak perlu menginstal Node.js atau framework tambahan.

1. ​Buka folder frontend di code editor pilihanmu (misalnya VS Code).
2. ​Cara terbaik untuk menjalankannya adalah menggunakan ekstensi Live Server :
```
​Klik kanan pada file index.html dan pilih "Open with Live Server".
```
3. ​Alternatif : Kamu juga bisa langsung klik ganda (double-click) file index.html untuk membukanya di browser (Chrome/Firefox/Edge).

## Cara Menggunakan Aplikasi
- ​Buka aplikasi di browser.
- ​Klik tombol "📂 Unggah Foto" dan pilih gambar yang ingin diedit.
- ​Atur "Ukuran Kuas" sesuai kebutuhan.
- ​Coret/warnai objek atau area pada gambar yang ingin kamu hapus.
- ​Jika salah coret, klik "Batal Coret" untuk mengulangi masking.
- ​Klik "🪄 Proses Gambar" dan biarkan AI bekerja.
- ​Hasil gambar yang sudah direkonstruksi akan langsung tampil di layar!
  
​
## Pengembangan Lanjut (Deployment)
- ​Frontend : File statis di folder frontend dapat dengan mudah di-hosting secara gratis di GitHub Pages, Vercel, atau Netlify.
- ​Backend : Script Python membutuhkan server yang dapat menjalankan runtime Python. Sangat disarankan untuk melakukan deployment backend ke layanan VPS, Render, Railway, atau Hugging Face Spaces.
- ​Pastikan untuk memperbarui konfigurasi CORS di main.py dan URL fetch di app.js sesuai dengan domain production kamu (misal: magicremover.my.id) saat melakukan deployment.
