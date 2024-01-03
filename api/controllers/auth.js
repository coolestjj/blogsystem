import {db} from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = (req, res) => {
    //Check existing user
    const query = "SELECT * FROM users WHERE username = ? OR email = ?";
    db.query(query, [req.body.username, req.body.email], (err, result) => {
        if (err) {
            return res.json({message: err})
        }
        if (result.length > 0) {
            return res.status(409).json("User already exists")
        }

        //Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        const values = [req.body.username, req.body.email, hash];
        db.query(query, values, (err, result) => {
            if (err) {
                return res.json({message: err})
            }
            return res.status(200).json("User created")
        })
    })


}

export const login = (req, res) => {
    //Check user exists
    const query= "SELECT * FROM users WHERE username = ?";
    db.query(query, [req.body.username], (err, result) => {
        if (err) {
            return res.json({message: err});
        }
        if (result.length === 0) {
            return res.status(404).json("User not found");
        }

        // Check password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, result[0].password);
        if (!isPasswordCorrect) {
            return res.status(400).json("Wrong username or password");
        }

        const token = jwt.sign({id:result[0].id}, "jwtkey");
        const {password, ...others} = result[0];
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(others);


    })
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true,
    }).status(200).json("Logged out");
}