import {User} from "../db/user.js";

import {HttpError}  from "../helpers/HttpError.js";

export const registration = async (req, res) => {

    const newUser = await User.create(req.body);
    res.status(201).json({
        email: newUser.email,
        password: newUser.password,
    })
    
};