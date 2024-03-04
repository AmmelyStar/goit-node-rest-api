import express from "express";
import { registration } from "../controllers/auth.js"
import { login } from "../controllers/auth.js"
import { getCurrent } from "../controllers/auth.js"
import { authenticate } from '../helpers/authenticate.js'
import { logout } from "../controllers/auth.js"
const router = express.Router();


router.post("/register", registration);

router.post("/login", login);

router.get("/current", authenticate, getCurrent);


router.post("/logout", authenticate, logout);
 
export default router;