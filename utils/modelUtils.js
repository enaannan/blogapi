require("sequelize")
const {validationResult} = require("express-validator");

//todo: write a test for this utility
function schemaFromModel(Model){
    const attributesToIgnore = ["createdAt","updatedAt"];
    const attributes = Model.getAttributes();
    const attributeKeys = Object.keys(attributes);

    const schema = {};

    attributeKeys.forEach((attributeKey)=>{
        if (! attributesToIgnore.includes(attributeKey)){
            schema[attributeKey]={
                in:['body'],
                notEmpty: (attributeKey === 'id')?true: !attributes[attributeKey].allowNull,
                errorMessage: `${attributeKey} is required.`
            }
        }
    })
    return schema;
}
function checkValidationErrors(req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
}
module.exports = {schemaFromModel,checkValidationErrors}