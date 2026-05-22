# 🪄 Magic Remover - Pro Object Eraser
**A Premium Image Inpainting Tool by 123Tool**

Magic Remover adalah aplikasi web *Full-Stack* profesional yang dirancang untuk menghapus objek yang tidak diinginkan, noda, atau *watermark* dari sebuah gambar secara instan. 

Berbeda dengan penghapus objek berbasis *browser* biasa yang hanya mengaburkan (*blur*) gambar, Magic Remover menggunakan *backend* Python dengan algoritma **OpenCV Telea Inpainting**. Sistem ini secara cerdas merekonstruksi piksel di area yang dihapus berdasarkan tekstur dan pencahayaan di sekitarnya, menghasilkan foto yang bersih, autentik, dan 100% alami tanpa kehilangan ketajaman.

Dilengkapi dengan antarmuka pengguna (UI) bergaya **Glassmorphism** yang modern, bersih, dan memanjakan mata, aplikasi ini siap digunakan untuk kebutuhan personal maupun diintegrasikan ke dalam platform SaaS.

---

## ✨ Fitur Utama
*   **Pro-Level Inpainting:** Menggunakan algoritma *Telea* untuk rekonstruksi gambar yang mulus tanpa distorsi warna.
*   **Interactive Masking:** Fitur *brush* interaktif langsung di atas kanvas HTML5 untuk menandai area yang ingin dihapus dengan presisi.
*   **Glassmorphism UI:** Desain antarmuka premium dengan efek kaca transparan dan *animated background blobs*.
*   **Full-Stack Architecture:** Pemisahan *frontend* (Vanilla JS) dan *backend* (FastAPI) untuk performa maksimal dan skalabilitas.
*   **Real-time Processing:** Pemrosesan API yang cepat dan responsif.

---

## 🛠️ Tech Stack
*   **Frontend:** HTML5, CSS3 (Glassmorphism), Vanilla JavaScript, HTML5 Canvas API.
*   **Backend:** Python 3.x, FastAPI, Uvicorn, OpenCV (cv2), NumPy.

---

## 🚀 Panduan Instalasi & Penggunaan

Proyek ini terdiri dari dua bagian: **Backend** dan **Frontend**. Keduanya harus dijalankan agar aplikasi berfungsi dengan baik.

### 1. Persiapan Backend (Python)
Pastikan kamu sudah menginstal [Python 3.8+](https://www.python.org/downloads/) di komputermu.

1. Buka terminal/Command Prompt dan arahkan ke folder `backend`:
   
```bash
   cd MagicRemover/backend
