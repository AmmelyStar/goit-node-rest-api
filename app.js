import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRouter.js";
import mongoose from "mongoose";
const DB_HOST = "mongodb+srv://Ammely:sJWdmiPiaMkQfuVi@cluster0.fao8nvs.mongodb.net/db-contacts";
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

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

