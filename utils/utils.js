require("sequelize")
const {validationResult} = require("express-validator");

function checkValidationErrors(req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
}
module.exports = {checkValidationErrors}