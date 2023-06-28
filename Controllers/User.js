const User = require('../models/User');
const {validationResult} = require("express-validator");

class UserController {
    static async createUser(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const userData = { ...req.body };
            console.log("***************************************")
            console.log(userData)
            const user = await User.create(userData);
            res.status(201).json({ message: 'User created successfully', user });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Failed to create user' });
        }
    }

    // static findAll(){}
    // static findOne(){}
    // static update(){}
    // static deleteById(){}
    // static deleteAll(){}
    // static findAllPublished(){}
}

module.exports = UserController;

