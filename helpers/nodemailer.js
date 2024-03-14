import nodemailer from "nodemailer"
import {META_PASSWORD} from "../configuration.js"
import { nanoid } from "nanoid";

export const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: "ammelymm@meta.ua",
        pass: META_PASSWORD
    }
};

export const transport = nodemailer.createTransport(nodemailerConfig);




  const verificationToken = nanoid();
export const emailOptions = {
    from: 'ammelymm@meta.ua', // sender address
    to: "ammelymm@i.ua", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<a target="_blank" href="http://localhost:5000/api/auth/verify/${verificationToken}">Click verify email </a>`, // html body
};
export const sendEmail = async (emailOptions) => {
  try {
    await transport.sendMail(emailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

sendEmail(emailOptions);
  