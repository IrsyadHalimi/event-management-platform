import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/";

    // Tentukan sub-folder berdasarkan nama field di frontend/route
    if (file.fieldname === "thumbnail") {
      folder += "events";
    } else if (file.fieldname === "profilePicture") {
      folder += "profilePictures";
    } else if (file.fieldname === "paymentProof") {
      folder += "payment-proofs";
    } else {
      folder += "others";
    }

    // Pastikan folder ada, jika tidak, buat foldernya
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },

  filename: (req, file, cb) => {
    // Tambahkan prefix agar lebih rapi, misal: thumbnail-12345.png
    const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images (png, jpg, jpeg) are allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});