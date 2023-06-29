const express = require("express");
const router = express.Router();

const {checkSchema} = require("express-validator");
const {schemaFromModel} = require("../utils/modelUtils");

const categoryController = require("../Controllers/categoryController");
const tag = require("../models/Tag");

const tagValidationSchema = schemaFromModel(tag);

delete tagValidationSchema.id

router.post('/', checkSchema(tagValidationSchema), categoryController.createCategory);
router.get('/:id', categoryController.findOne);
router.get('/', categoryController.findAll);
router.put('/:id', checkSchema(tagValidationSchema), categoryController.update);
router.delete('/:id', checkSchema(tagValidationSchema), categoryController.deleteById);
router.delete('/', checkSchema(tagValidationSchema), categoryController.deleteAll);

module.exports = router;
