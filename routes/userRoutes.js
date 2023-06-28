const express = require("express");
const router = express.Router();

const {checkSchema} = require("express-validator");
const {schemaFromModel} = require("../utils/modelUtils");

const UserController = require("../Controllers/userController");
const user = require("../models/User");

const userValidationSchema = schemaFromModel(user);

//todo: generate these from the backend
//todo: implement third party login for authentication
delete userValidationSchema.id
delete userValidationSchema.salt

router.post('/', checkSchema(userValidationSchema), UserController.createUser);
router.get('/:id', UserController.findOne);
router.get('/', UserController.findAll);
router.put('/:id', checkSchema(userValidationSchema), UserController.update);
router.delete('/:id', checkSchema(userValidationSchema), UserController.deleteById);
router.delete('/', checkSchema(userValidationSchema), UserController.deleteAll);

module.exports = router;
