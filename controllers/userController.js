import User from "../models/userModel.js";
import { validationResult } from 'express-validator';

export const signUp = async (req, res) => {    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const data = req.body;    
    //const uname = data.name;
    //const pass = data.password;
    
    /* const user = new User({
        userName: uname,
        password: pass
    });

    await user.save(); */

    res.send(data);
}
