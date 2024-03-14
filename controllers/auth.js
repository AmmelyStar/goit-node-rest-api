import { User } from "../db/user.js";
import { registerSchema } from '../db/user.js'
import{ HttpError} from "../helpers/HttpError.js"
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../configuration.js";
import gravatar from 'gravatar';
import fs from "fs/promises"
import path from "path";
import Jimp from "jimp";
import { nanoid } from "nanoid";
import { sendEmail } from "../helpers/nodemailer.js";


export const registration = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email already is use");
    }

        try {
        const validationResult = registerSchema.validate(req.body);
       if (validationResult.error) {
            return res.status(400).json({ message: validationResult.error.message });
            }
            
            const hashPassword = await bcrypt.hash(password, 10);
            const avatarURL = gravatar.url(email);
            const verificationToken = nanoid();


        const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationToken});
            const verifyEmail = {
                to: email, subject: "Verify email",
                html: `<a target="_blank" href="http://localhost:5000/api/auth/verify/${verificationToken}">Click verify email </a>`
            }
            
            await sendEmail(verifyEmail);
            
        res.status(201).json(newUser);
        } catch (error) {
            console.log(error)
        res.status(500).json({
            message: 'Server error'
        });
    }
}; 

export const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken })
    if (!user) {
        throw HttpError(401, "Email not found")
    }
    await User.findOneAndUpdate(user._id, { verify: true, verificationToken: "" })
    
    res.json({
        message: "Email verify success"
    })
    
}

export const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
         throw HttpError(401, "Email not found")        
    }
    if (user.verify) {
         throw HttpError(401, "Email already verify")                
    }

        const verifyEmail = {
            to: email,
            subject: "Verify email",
                html: `<a target="_blank" href="http://localhost:5000/api/auth/verify/${user.verificationToken}">Click verify email </a>`
            }
            
    await sendEmail(verifyEmail);
    
    res.json({
        message: "Verify email send success"
    })
}





export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, "Email or password invalid");
    }
    if (!user.verify) {
        throw HttpError(401, "Email not verified");    
        
    }
    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw HttpError(401, "Email or password invalid");        
    }

    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        token,
    })
}; 

export const getCurrent = async (req, res) => {
    const { email, name } = req.body;

    res.json({
        email,
        name,
    })
    
}

export const logout = async (req, res) => {
    const { _id } = req.body;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.json({
        message: "Logout success"
    })
    
}


export const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tmpUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
  const resultUpload = `./public/avatars/${filename}`;
    await fs.rename(tmpUpload, resultUpload);

    const img = await Jimp.read(resultUpload);
    await img.resize(250, 250).write(resultUpload);


    const avatarURL = path.join(resultUpload, filename);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
        avatarURL,
    })
    
}
    
    
