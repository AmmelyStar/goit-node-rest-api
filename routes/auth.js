import express from "express";
import { registration } from "../controllers/auth.js"
import { login } from "../controllers/auth.js"
import { getCurrent } from "../controllers/auth.js"
import { authenticate } from '../helpers/authenticate.js'
import { logout } from "../controllers/auth.js"
import { upload } from "../helpers/upload.js";
import { updateAvatar } from "../controllers/auth.js"
import { verifyEmail } from "../controllers/auth.js"
import { resendVerifyEmail } from "../controllers/auth.js"


const router = express.Router();


router.post("/register", registration);

router.get("/verify/:verificationToken", verifyEmail);

router.post("/verify",  resendVerifyEmail);

router.post("/login", login);

router.get("/current", authenticate, getCurrent);


router.post("/logout", authenticate, logout);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);
 
export default router;