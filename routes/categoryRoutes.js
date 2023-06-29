const express = require("express");
const router = express.Router();

const {checkSchema} = require("express-validator");
const {schemaFromModel} = require("../utils/modelUtils");

const categoryController = require("../Controllers/categoryController");
const category = require("../models/Category");

const categoryValidationSchema = schemaFromModel(category);

delete categoryValidationSchema.id

router.post('/', checkSchema(categoryValidationSchema), categoryController.createCategory);
router.get('/:id', categoryController.findOne);
router.get('/', categoryController.findAll);
router.put('/:id', checkSchema(categoryValidationSchema), categoryController.update);
router.delete('/:id', checkSchema(categoryValidationSchema), categoryController.deleteById);
router.delete('/', checkSchema(categoryValidationSchema), categoryController.deleteAll);

module.exports = router;
