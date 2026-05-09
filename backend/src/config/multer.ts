import multer from "multer";

import path from "path";

const storage =
  multer.diskStorage({
    destination: (
      req,
      file,
      cb
    ) => {
      cb(
        null,
        "src/uploads/payment-proofs"
      );
    },

    filename: (
      req,
      file,
      cb
    ) => {
      const uniqueName =
        Date.now() +
        path.extname(
          file.originalname
        );

      cb(null, uniqueName);
    }
  });

const fileFilter = (
  req: any,
  file: any,
  cb: any
) => {
  const allowedMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg"
  ];

  if (
    allowedMimeTypes.includes(
      file.mimetype
    )
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only images are allowed"
      )
    );
  }
};

export const upload =
  multer({
    storage,
    fileFilter,

    limits: {
      fileSize:
        2 * 1024 * 1024
    }
  });