const Tag = require('../models/Tag');
const {checkValidationErrors} = require("../utils/utils");

class TagController {

    static async createTag(req, res) {
        checkValidationErrors(req,res);
        try {
            const tagData = {...req.body};
            const existingTag = await Tag.findOne({where:{email:tagData.email}})
            if (existingTag) return res.status(404).json({message:"Tag already exists"})

            const tag = await Tag.create(tagData);
            res.status(201).json({message: 'Tag created successfully', tag: tag});
        } catch (error) {
            console.error('Error creating tag:', error);
            res.status(500).json({message: 'Failed to create tag'});
        }
    }

    static async findAll(req,res){
        try{
            const tags = await Tag.findAll();
            res.status(201).json(tags)
        }catch(error){
            res.status(500).json({message:'Failed to find tags' })
        }
    }

    static async findOne(req,res){
        try{
            const id = req.params.id;
            const tag = await Tag.findByPk(id);
            if(!tag)return res.status(404).json({message:'Tag not found'})
            res.status(201).json(tag)
        }catch (error) {
            res.status(500).json({message: 'Failed to find tag'});
        }
    }

    static async update(req,res){
        try{
            const id = req.params.id;
            const tag = await Tag.update(req.body,
                {where: {id:id}});
            if(tag[0] === 0) return res.status(404).json({message:`Can not update tag with id ${id}`})
            res.status(201).json({message:'Tag updated'})
        }catch (error) {
            console.error('Error updating tag:', error);
            res.status(500).json({message: 'Failed to update tag'});
        }
    }
    static async deleteById(req,res){
        const id = req.params.id
        try {
            const deletedRows = await Tag.destroy({where: {id: id}});
            if (deletedRows === 0) return res.status(404).json({message: `Can not delete tag with id ${id}`});
            res.status(201).json({message: 'Tag deleted',deletedRows});
        }catch (error){
            console.error('Error deleting tag:', error);
            res.status(500).json({message: 'Failed to delete tag'});
        }
    }

    static async deleteAll(req,res){
        try{
            const rowsDeleted = await Tag.destroy({where:{}})
            res.status(404).json({message: ` ${rowsDeleted} row(s) deleted`});
        }catch (error) {
            console.error('Error deleting all tags:', error);
            res.status(500).json({message: 'Error deleting all tags:'});
        }
    }


}

module.exports = TagController;

