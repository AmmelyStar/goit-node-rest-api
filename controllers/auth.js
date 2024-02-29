import { User } from "../db/user.js";
import  {registerSchema}  from '../db/user.js'

import {HttpError}  from "../helpers/HttpError.js";

export const registration = async (req, res) => {

    const newUser = await User.create(req.body);
        try {
        const validationResult = registerSchema.validate(req.body);
       if (validationResult.error) {
            return res.status(400).json({ message: validationResult.error.message });
        }
        const newContact = await Contact.create(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
}; 
    
