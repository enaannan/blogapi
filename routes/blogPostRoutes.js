const express = require("express");
const router = express.Router();

const {checkSchema} = require("express-validator");
const {schemaFromModel} = require("../utils/modelUtils");

const blogPostController = require("../Controllers/blogPostController");
const blogPost = require("../models/BlogPost");

const blogPostValidationSchema = schemaFromModel(blogPost);

delete blogPostValidationSchema.id

router.post('/', checkSchema(blogPostValidationSchema), blogPostController.createBlogPost);
router.get('/:id', blogPostController.findOne);
router.get('/', blogPostController.findAll);
router.put('/:id', checkSchema(blogPostValidationSchema), blogPostController.update);
router.delete('/:id', checkSchema(blogPostValidationSchema), blogPostController.deleteById);
router.delete('/', checkSchema(blogPostValidationSchema), blogPostController.deleteAll);

module.exports = router;
