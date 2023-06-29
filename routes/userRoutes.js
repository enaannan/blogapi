const express = require("express");
const router = express.Router();

const {checkSchema} = require("express-validator");
const {schemaFromModel} = require("../utils/modelUtils");

const userController = require("../Controllers/userController");
const user = require("../models/User");

const userValidationSchema = schemaFromModel(user);

delete userValidationSchema.id

router.post('/', checkSchema(userValidationSchema), userController.createUser);
router.get('/:id', userController.findOne);
router.get('/', userController.findAll);
router.put('/:id', checkSchema(userValidationSchema), userController.update);
router.delete('/:id', checkSchema(userValidationSchema), userController.deleteById);
router.delete('/', checkSchema(userValidationSchema), userController.deleteAll);

module.exports = router;
