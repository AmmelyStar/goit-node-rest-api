import express from "express";
import { authenticate } from '../helpers/authenticate.js'

// import multer from "multer";



import {
  getAllContacts,
   getOneContact,
   deleteContact,
  createContact,
  updateContact,
   updateFavorite
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

// export const multerConfig = multer.diskStorage({
//   destination: "tmp",
//   filename: (req, file, cb) => {

//     cb(null, file.originalname);
//   }
// })

// export const upload = multer({
//   storage: multerConfig
// })


contactsRouter.get("/", authenticate,  getAllContacts);


contactsRouter.get("/:id", authenticate,  getOneContact);

 contactsRouter.delete("/:id", authenticate, deleteContact);

contactsRouter.post("/", authenticate,  createContact);

contactsRouter.put("/:id", authenticate, updateContact);

contactsRouter.patch("/:id/favorite", authenticate, updateFavorite);

export default contactsRouter;
