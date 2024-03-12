import multer from "multer";



export const multerConfig = multer.diskStorage({
  destination: "tmp",
  filename: (req, file, cb) => {

    cb(null, file.originalname);
  }
})

export const upload = multer({
  storage: multerConfig
})