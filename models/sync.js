const sequelize = require("../DB/db.connection")
require("./BlogPost")
require("./User")
require("./BlogPostCategory")
require("./Category")
const tag = require("./Tag")
require("./BlogPostTag")
// try{
//
// sequelize.sync({ alter: true }).then(() => {
// });} catch (error) {
//         console.error('Error synchronizing tables:', error);
//     }

const {schemaFromModel} = require("../utils/modelUtils")



// const tagSchema = schemaFromModel(tag);
// module.export = {tagSchema}


