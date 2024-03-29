import { Schema, model } from "mongoose";

import Joi from "joi";
import gravatar from 'gravatar';



export const userSchema = new Schema({
    
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
         type: String,
        default: gravatar.url(),
    }

}, { versionKey: false, timestamps: true });

userSchema.post("save", (error, data, next) => {
    const { name, code } = error;
    const status = (name === "MongoServerError" && code === 11000) ? 409 : 400;

    error.status = status;
    next();
    
})

export const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),

})

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),

})
 export const User = model("user", userSchema);
 
