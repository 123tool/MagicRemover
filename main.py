from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from inpaint_engine import process_inpainting
import uvicorn

app = FastAPI(title="Magic Remover API")

# Konfigurasi CORS agar Frontend (HTML biasa) bisa nembak ke API ini
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Saat produksi, ganti dengan domainmu
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/inpaint")
async def inpaint_image(
    image: UploadFile = File(...),
    mask: UploadFile = File(...)
):
    try:
        # Baca file dari request frontend
        image_bytes = await image.read()
        mask_bytes = await mask.read()

        # Lempar ke engine inpainting
        result_bytes = process_inpainting(image_bytes, mask_bytes)

        # Kembalikan gambar hasil ke frontend
        return Response(content=result_bytes, media_type="image/jpeg")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    # Jalankan server di port 8000
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
