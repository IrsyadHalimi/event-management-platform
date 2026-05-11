import fs from "fs";

export const deleteFile = (filePath?: string) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) console.error("Gagal menghapus file sampah:", err);
    });
  }
};