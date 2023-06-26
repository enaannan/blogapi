const sequelize = require("../DB/db.connection")
require("./BlogPost")
require("./User")
require("./BlogPostCategory")
require("./Category")
require("./Tag")
require("./BlogPostTag")
try{
sequelize.sync({ alter: true }).then(() => {
    console.log("All models were synchronized successfully");
});} catch (error) {
        console.error('Error synchronizing tables:', error);
    }