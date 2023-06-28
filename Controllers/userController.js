const User = require('../models/User');
const {validationResult} = require("express-validator");

class UserController {
    static checkValidationErrors(req,res){

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
    }

    static async createUser(req, res) {
        UserController.checkValidationErrors(req,res);
        try {
            const userData = {...req.body};
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
        if(!users) return res.status(404).json({message:'There are no users'})
            res.status(201).json(users)
        }catch(error){
            res.status(500).json({message:'Failed to find users' })
        }
    }

    static async findOne(req,res){
        try{
            const id = req.params.id;
            const user = await User.findByPk(id);
            if(!user)return res.status(404).json({message:'User not found'})
            res.status(201).json(user)
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
            res.status(201).json({message:'User updated'})
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
            res.status(201).json({message: 'User deleted',deletedRows});
        }catch (error){
            console.error('Error deleting user:', error);
            res.status(500).json({message: 'Failed to delete user'});
        }
       }

    static async deleteAll(req,res){
        try{
            const rowsDeleted = await User.destroy({where:{}})
             res.status(404).json({message: ` ${rowsDeleted} row(s) deleted`});
        }catch (error) {
            console.error('Error deleting all users:', error);
            res.status(500).json({message: 'Error deleting all users:'});
        }
    }


}

module.exports = UserController;

