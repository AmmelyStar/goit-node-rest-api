import express from "express";
import { authenticate } from '../helpers/authenticate.js'
// import {upload} from '../app.js'
import multer from "multer";
import fs from "fs/promises";


import {
  getAllContacts,
   getOneContact,
   deleteContact,
  createContact,
  updateContact,
   updateFavorite
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

export const multerConfig = multer.diskStorage({
  destination: "tmp",
  filename: (req, file, cb) => {

    cb(null, file.originalname);
  }
})

export const upload = multer({
  storage: multerConfig
})


contactsRouter.get("/", authenticate, upload.single("avatar"), getAllContacts);


contactsRouter.get("/:id", authenticate, upload.single("avatar"), getOneContact);

 contactsRouter.delete("/:id", authenticate, deleteContact);

contactsRouter.post("/", authenticate, upload.single("avatar"), createContact);

contactsRouter.put("/:id", authenticate, updateContact);

contactsRouter.patch("/:id/favorite", authenticate, updateFavorite);

export default contactsRouter;
