const BlogPost = require('../models/BlogPost');

const {checkValidationErrors} = require("../utils/utils");

class BlogPostController {

    //todo: implement jwt to get client id from subsequent calls
    static async createBlogPost(req, res) {
        checkValidationErrors(req,res);
        try {
            const blogPost = await BlogPost.create(req.body);
            res.status(201).json({message: 'blog post created successfully', blogPost});
        } catch (error) {
            console.error('Error creating blog post:', error);
            res.status(500).json({message: 'Failed to create  blog post'});
        }
    }

    static async findAll(req,res){
        try{
            const blogPosts = await BlogPost.findAll();
            res.status(201).json(blogPosts)
        }catch(error){
            res.status(500).json({message:'Failed to find blog posts' })
        }
    }

    static async findOne(req,res){
        try{
            const id = req.params.id;
            const blogPosts = await BlogPost.findByPk(id);
            if(!blogPosts)return res.status(404).json({message:'blog post not found'})
            res.status(201).json(blogPosts)
        }catch (error) {
            res.status(500).json({message: 'Failed to find blog post'});
        }
    }

    static async update(req,res){
        try{
            if (Object.keys(req.body).length === 0) return res.status(404).json({message:"Provide a body for an update"})
            const id = req.params.id;
            const blogPost = await BlogPost.update(req.body,
                {where: {id:id}});
            if(blogPost[0] === 0) return res.status(404).json({message:`Can not update blog post with id ${id}`})
            res.status(201).json({message:'blog post updated'})
        }catch (error) {
            console.error('Error updating blog post:', error);
            res.status(500).json({message: 'Failed to update blog post'});
        }
    }

    static async deleteById(req,res){
        const id = req.params.id
        try {
            const deletedRows = await BlogPost.destroy({where: {id: id}});
            if (deletedRows === 0) return res.status(404).json({message: `Can not delete blog post with id ${id}`});
            res.status(201).json({message: 'blog post deleted',deletedRows});
        }catch (error){
            console.error('Error deleting blog post:', error);
            res.status(500).json({message: 'Failed to delete blog post'});
        }
    }

    static async deleteAll(req,res){
        try{
            const rowsDeleted = await BlogPost.destroy({where:{}})
            res.status(404).json({message: ` ${rowsDeleted} row(s) deleted`});
        }catch (error) {
            console.error('Error deleting all blog posts:', error);
            res.status(500).json({message: 'Error deleting all blog post:'});
        }
    }


}

module.exports = BlogPostController;

