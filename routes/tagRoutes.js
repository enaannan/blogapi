const express = require("express");
const router = express.Router();

const {checkSchema} = require("express-validator");
const {schemaFromModel} = require("../utils/modelUtils");

const tagController = require("../Controllers/tagController");
const tag = require("../models/Tag");

const tagValidationSchema = schemaFromModel(tag);

delete tagValidationSchema.id

router.post('/', checkSchema(tagValidationSchema), tagController.createTag);
router.get('/:id', tagController.findOne);
router.get('/', tagController.findAll);
router.put('/:id', checkSchema(tagValidationSchema), tagController.update);
router.delete('/:id', checkSchema(tagValidationSchema), tagController.deleteById);
router.delete('/', checkSchema(tagValidationSchema), tagController.deleteAll);

module.exports = router;
