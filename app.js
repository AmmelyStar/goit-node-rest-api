import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRouter.js";
import mongoose from "mongoose";
import { DB_HOST } from "./config.js";
import authRouter from './routes/auth.js'
// import multer from "multer";




mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(5000)
    console.log("Database connection successful")

  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);

  });

const app = express();
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public/avatars"));

app.use("/api/auth", authRouter);

app.use("/api/contacts", contactsRouter);

// export const multerConfig = multer.diskStorage({
//   destination: "./public/avatars",
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// })

// export const upload = multer({
//   storage: multerConfig
// })

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});



app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});





