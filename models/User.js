const {Model, DataTypes} = require("sequelize");
const sequelize = require("../DB/db.connection");

class User extends Model {
//extra methods
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(60),
            allowNull: false,
        }
    },
    {sequelize}
)
module.exports = User;