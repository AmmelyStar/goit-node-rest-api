import nodemailer from "nodemailer"

export const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1bcfc25cf8306e",
    pass: "8d4dba47c41334"
  }
});