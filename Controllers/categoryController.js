const Category = require('../models/Category');
const {checkValidationErrors} = require("../utils/utils");

class CategoryController {

    static async createCategory(req, res) {
        checkValidationErrors(req,res);
        try {
            const categoryData = {...req.body};
            const existingCategory = await Category.findOne({where:{email:categoryData.email}})
            if (existingCategory) return res.status(404).json({message:"Category already exists"})

            const category = await Category.create(categoryData);
            res.status(201).json({message: 'Category created successfully', category: category});
        } catch (error) {
            console.error('Error creating category:', error);
            res.status(500).json({message: 'Failed to create category'});
        }
    }

    static async findAll(req,res){
        try{
            const category = await Category.findAll();
            res.status(201).json(category)
        }catch(error){
            res.status(500).json({message:'Failed to find category' })
        }
    }

    static async findOne(req,res){
        try{
            const id = req.params.id;
            const category = await Category.findByPk(id);
            if(!category)return res.status(404).json({message:'Category not found'})
            res.status(201).json(category)
        }catch (error) {
            res.status(500).json({message: 'Failed to find category'});
        }
    }

    static async update(req,res){
        try{
            const id = req.params.id;
            const category = await Category.update(req.body,
                {where: {id:id}});
            if(category[0] === 0) return res.status(404).json({message:`Can not update category with id ${id}`})
            res.status(201).json({message:'Tag updated'})
        }catch (error) {
            console.error('Error updating category:', error);
            res.status(500).json({message: 'Failed to update category'});
        }
    }
    static async deleteById(req,res){
        const id = req.params.id
        try {
            const deletedRows = await Category.destroy({where: {id: id}});
            if (deletedRows === 0) return res.status(404).json({message: `Can not delete category with id ${id}`});
            res.status(201).json({message: 'Category deleted',deletedRows});
        }catch (error){
            console.error('Error deleting category:', error);
            res.status(500).json({message: 'Failed to delete category'});
        }
    }

    static async deleteAll(req,res){
        try{
            const rowsDeleted = await Category.destroy({where:{}})
            res.status(404).json({message: ` ${rowsDeleted} row(s) deleted`});
        }catch (error) {
            console.error('Error deleting all categories:', error);
            res.status(500).json({message: 'Error deleting all categories:'});
        }
    }


}

module.exports = CategoryController;

