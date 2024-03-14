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


        const newUser = await User.create({...req.body, password: hashPassword, avatarURL});
        res.status(201).json(newUser);
        } catch (error) {
            console.log(error)
        res.status(500).json({
            message: 'Server error'
        });
    }
}; 



export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, "Email or password invalid");
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
    
    
