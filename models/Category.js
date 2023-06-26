const sequelize = require("../DB/db.connection")
const { Model, DataTypes} = require("sequelize")
// const User = require("./User")
class Category extends Model {
//extra methods
}

Category.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
    },
    {sequelize}
)

module.exports = Category;