require("../DB/db.connection")
require("./BlogPost")
require("./User")
require("./BlogPostCategory")
require("./Category")
require("./Tag")
require("./BlogPostTag")
const  sequelize  = require("../DB/db.connection")

//todo: uncomment before deploying. Commented out to speed up development
try{
    sequelize.sync({ alter: true }).then(() => {
    });}
    catch (error){
        console.error('Error synchronizing tables:', error);
    }

