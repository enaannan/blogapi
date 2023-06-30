require("sequelize")
const bcrypt = require('bcrypt');
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");

function checkValidationErrors(req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
}

async function hashPassword(password) {
    async function generateSalt() {
        try {
            const saltRounds = 10;
            return await bcrypt.genSalt(saltRounds);
        } catch (error) {
            console.error('Error generating salt:', error);
            throw error;
        }
    }

    try {
        let salt = await generateSalt();
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

async function authMiddleWare(req, res, next){
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.JWTSECRET, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized" })
            } next()
        })
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" })
    }
}

module.exports = {checkValidationErrors,hashPassword,authMiddleWare}