const User = require('../models/User');
const {checkValidationErrors,hashPassword, authMiddleWare} = require("../utils/utils");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

class UserController {
    static async authenticateUser(req, res) {

        try {
            const userSigningIn = {...req.body};
            const user = await User.findOne({where:{email:userSigningIn.email}})

        if (!user) {
            return res.status(404).json({message:"User not found"});
        }

       let result = bcrypt.compare(userSigningIn.password, user.password);

        if (!result) {
            return res.status(404).json({message:"Invalid password"});
        }
            const maxAge = 3 * 60 * 60; // 3hrs in sec
            const token = jwt.sign(
                { id: user.id },
                process.env.JWTSECRET,
                {expiresIn: maxAge, }
            );

        res.cookie("jwt", token);
        return res.status(200).json({message:"Sign in successful"});

        }catch (error) {
            console.log(error);
            res.status(500).json({message: 'Failed to find user'});
        }
    }

    static async createUser(req, res) {
        checkValidationErrors(req,res);
        try {
            const userData = {...req.body};
            userData.password = await hashPassword(userData.password);
            const existingUser = await User.findOne({where:{email:userData.email}})
            if (existingUser) return res.status(404).json({message:"User already exists"})

            const user = await User.create(userData);
            res.status(201).json({message: 'User created successfully', user});
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({message: 'Failed to create user'});
        }
    }

    static async findAll(req,res){
        try{

            const users = await User.findAll();
            res.status(200).json(users)
        }catch(error){
            res.status(500).json({message:'Failed to find users' })
        }
    }

    static async findOne(req,res){
        try{
            const id = req.params.id;
            const user = await User.findByPk(id);
            if(!user)return res.status(404).json({message:`User with id ${id} not found`})
            res.status(200).json(user)
        }catch (error) {
            res.status(500).json({message: 'Failed to find user'});
        }
    }

    static async update(req,res){
        try{
            const id = req.params.id;
            const user = await User.update(req.body,
                {where: {id:id}});
            if(user[0] === 0) return res.status(404).json({message:`Can not update user with id ${id}`})
            res.status(200).json({message:'User updated'})
        }catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({message: 'Failed to update user'});
        }
    }
    static async deleteById(req,res){
       const id = req.params.id
        try {
            const deletedRows = await User.destroy({where: {id: id}});
            if (deletedRows === 0) return res.status(404).json({message: `Can not delete user with id ${id}`});
            res.status(200).json({message: 'User deleted successfully',deletedRows});
        }catch (error){
            console.error('Error deleting user:', error);
            res.status(500).json({message: 'Failed to delete user'});
        }
       }

    static async deleteAll(req,res){
        try{
            const rowsDeleted = await User.destroy({where:{}})
             res.status(200).json({message: "All users deleted successfully"});
        }catch (error) {
            console.error('Error deleting all users:', error);
            res.status(500).json({message: 'Error deleting all users:'});
        }
    }


}

module.exports = UserController;

