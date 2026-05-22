import cv2
import numpy as np

def process_inpainting(image_bytes: bytes, mask_bytes: bytes) -> bytes:
    # 1. Konversi bytes ke array numpy
    np_img = np.frombuffer(image_bytes, np.uint8)
    np_mask = np.frombuffer(mask_bytes, np.uint8)

    # 2. Decode array menjadi format gambar OpenCV
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
    mask = cv2.imdecode(np_mask, cv2.IMREAD_GRAYSCALE)

    # Pastikan ukuran mask dan image sama
    if img.shape[:2] != mask.shape[:2]:
        mask = cv2.resize(mask, (img.shape[1], img.shape[0]))

    # Threshold mask untuk memastikan hanya ada warna hitam (0) dan putih (255)
    # Area putih adalah area yang akan dihapus/direkonstruksi
    _, mask = cv2.threshold(mask, 127, 255, cv2.THRESH_BINARY)

    # 3. Proses Inpainting (Algoritma Telea)
    # inpaintRadius = 3 adalah ukuran radius piksel di sekitar area untuk dianalisis
    result = cv2.inpaint(img, mask, inpaintRadius=3, flags=cv2.INPAINT_TELEA)

    # 4. Encode kembali ke format JPG
    success, encoded_image = cv2.imencode('.jpg', result)
    if not success:
        raise ValueError("Gagal meng-encode gambar hasil inpainting.")

    return encoded_image.tobytes()
