import express from "express";
import { registration } from "../controllers/auth.js"


const router = express.Router();


router.post("/register", registration);
 
export default router;