const express = require("express");
const router = express.Router();

const {checkSchema} = require("express-validator");
const {schemaFromModel} = require("../utils/modelUtils");

const UserController = require("../Controllers/User");
const user = require("../models/User");

const userValidationSchema = schemaFromModel(user);

//todo: generate these from the backend
//todo: implement third party login for authentication
delete userValidationSchema.id
delete userValidationSchema.salt

router.post('/', checkSchema(userValidationSchema), UserController.createUser);

module.exports = router;
