import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRouter.js";
import mongoose from "mongoose";
import { DB_HOST } from "./configuration.js";
import authRouter from './routes/auth.js'





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


app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});



app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});






// export const nodemailerConfig = {
//     host: "smtp.meta.ua",
//     port: 465,
//     secure: true,
//     auth: {
//         user: "ammelymm@meta.ua",
//         pass: META_PASSWORD
//     }
// };

// export const transport = nodemailer.createTransport(nodemailerConfig);





// export const emailOptions = {
//     from: ' ammelymm@meta.ua', // sender address
//     to: "ammelymm@i.ua", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
// };
// export const sendEmail = async (emailOptions) => {
//   try {
//     await transport.sendMail(emailOptions);
//     console.log("Email sent successfully");
//   } catch (error) {
//     console.error("Error sending email:", error.message);
//   }
// };

// sendEmail(emailOptions);
  


  

  