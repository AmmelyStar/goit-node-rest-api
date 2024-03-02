import { User } from "../db/user.js";
import  {registerSchema}  from '../db/user.js'


export const registration = async (req, res) => {
        try {
        const validationResult = registerSchema.validate(req.body);
       if (validationResult.error) {
            return res.status(400).json({ message: validationResult.error.message });
        }
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
}; 
    
