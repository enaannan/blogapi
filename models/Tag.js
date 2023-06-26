const {Model, DataTypes} = require("sequelize");
const sequelize = require("../DB/db.connection");

class Tag extends Model {
//extra methods
}

Tag.init(
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
module.exports = Tag;