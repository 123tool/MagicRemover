const uploadInput = document.getElementById('uploadInput');
const canvasContainer = document.getElementById('canvasContainer');
const emptyState = document.getElementById('emptyState');
const imageCanvas = document.getElementById('imageCanvas');
const drawCanvas = document.getElementById('drawCanvas');
const brushSizeInput = document.getElementById('brushSize');
const clearBtn = document.getElementById('clearBtn');
const processBtn = document.getElementById('processBtn');
const loading = document.getElementById('loading');

const imgCtx = imageCanvas.getContext('2d');
const drawCtx = drawCanvas.getContext('2d');

let isDrawing = false;
let currentImage = null;
let originalImageBlob = null;

// Handle Image Upload
uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    originalImageBlob = file;
    const reader = new FileReader();

    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            currentImage = img;
            setupCanvases(img);
            emptyState.classList.add('hidden');
            canvasContainer.classList.remove('hidden');
            processBtn.disabled = false;
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

// Setup ukuran Canvas sesuai gambar
function setupCanvases(img) {
    // Sesuaikan ukuran maksimal agar tidak pecah di memori
    const MAX_WIDTH = 800;
    let width = img.width;
    let height = img.height;

    if (width > MAX_WIDTH) {
        height = Math.floor(height * (MAX_WIDTH / width));
        width = MAX_WIDTH;
    }

    imageCanvas.width = drawCanvas.width = width;
    imageCanvas.height = drawCanvas.height = height;

    // Gambar foto asli ke layer bawah
    imgCtx.drawImage(img, 0, 0, width, height);
    
    // Setting kuas untuk layer coretan
    drawCtx.lineCap = 'round';
    drawCtx.lineJoin = 'round';
    drawCtx.strokeStyle = 'rgba(233, 69, 96, 0.6)'; // Warna merah transparan biar keren
}

// Fitur Menggambar (Masking)
function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY
    };
}

drawCanvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    const pos = getMousePos(drawCanvas, e);
    drawCtx.beginPath();
    drawCtx.moveTo(pos.x, pos.y);
});

drawCanvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    const pos = getMousePos(drawCanvas, e);
    drawCtx.lineWidth = brushSizeInput.value;
    drawCtx.lineTo(pos.x, pos.y);
    drawCtx.stroke();
});

drawCanvas.addEventListener('mouseup', () => isDrawing = false);
drawCanvas.addEventListener('mouseout', () => isDrawing = false);

// Hapus Coretan
clearBtn.addEventListener('click', () => {
    drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
});

// Proses Gambar ke Backend
processBtn.addEventListener('click', async () => {
    loading.classList.remove('hidden');
    processBtn.disabled = true;

    // 1. Ekstrak Mask (Kita buat canvas bayangan untuk bikin mask hitam-putih untuk OpenCV)
    const hiddenMaskCanvas = document.createElement('canvas');
    hiddenMaskCanvas.width = drawCanvas.width;
    hiddenMaskCanvas.height = drawCanvas.height;
    const hiddenCtx = hiddenMaskCanvas.getContext('2d');
    
    // Fill hitam (Background aman)
    hiddenCtx.fillStyle = "black";
    hiddenCtx.fillRect(0, 0, hiddenMaskCanvas.width, hiddenMaskCanvas.height);
    
    // Copy coretan dari drawCanvas lalu jadikan putih tebal
    hiddenCtx.drawImage(drawCanvas, 0, 0);
    // Ubah semua piksel yg tidak hitam menjadi putih pekat (untuk area inpaint)
    const imgData = hiddenCtx.getImageData(0, 0, hiddenMaskCanvas.width, hiddenMaskCanvas.height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
        if (data[i] !== 0 || data[i+1] !== 0 || data[i+2] !== 0) {
            data[i] = 255; // R
            data[i+1] = 255; // G
            data[i+2] = 255; // B
        }
    }
    hiddenCtx.putImageData(imgData, 0, 0);

    // 2. Convert canvas ke format file Blob
    const maskBlob = await new Promise(resolve => hiddenMaskCanvas.toBlob(resolve, 'image/jpeg'));
    const imageBlob = await new Promise(resolve => imageCanvas.toBlob(resolve, 'image/jpeg'));

    // 3. Kirim via FormData ke FastAPI Backend
    const formData = new FormData();
    formData.append('image', imageBlob, 'image.jpg');
    formData.append('mask', maskBlob, 'mask.jpg');

    try {
        const response = await fetch('http://localhost:8000/api/inpaint', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error("Gagal memproses gambar");

        const resultBlob = await response.blob();
        const resultUrl = URL.createObjectURL(resultBlob);

        // Tampilkan hasil kembali ke kanvas
        const resultImg = new Image();
        resultImg.onload = () => {
            imgCtx.drawImage(resultImg, 0, 0, imageCanvas.width, imageCanvas.height);
            // Bersihkan layer coretan
            drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height); 
            loading.classList.add('hidden');
            processBtn.disabled = false;
        };
        resultImg.src = resultUrl;

    } catch (error) {
        console.error(error);
        alert("Terjadi kesalahan pada server. Pastikan backend Python sudah menyala di port 8000.");
        loading.classList.add('hidden');
        processBtn.disabled = false;
    }
});
