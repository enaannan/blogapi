const express = require("express");
const router = express.Router();

const {checkSchema} = require("express-validator");
const {schemaFromModel} = require("../utils/modelUtils");

const userController = require("../Controllers/userController");
const user = require("../models/User");
const {authMiddleWare} = require("../utils/utils");

const userValidationSchema = schemaFromModel(user);

delete userValidationSchema.id

router.post('/auth', checkSchema(userValidationSchema), userController.authenticateUser);
router.post('/', checkSchema(userValidationSchema), userController.createUser);
router.get('/:id', userController.findOne);
router.get('/',authMiddleWare,userController.findAll);
router.put('/:id', checkSchema(userValidationSchema), userController.update);
router.delete('/:id', checkSchema(userValidationSchema), userController.deleteById);
router.delete('/', checkSchema(userValidationSchema), userController.deleteAll);

module.exports = router;
