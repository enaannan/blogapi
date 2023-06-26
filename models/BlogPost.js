const sequelize = require("../DB/db.connection")
const { Model, DataTypes} = require("sequelize")
const User = require("./User")
class BlogPost extends Model {
//extra methods
}

BlogPost.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(16000),
            allowNull: false,
        },
        user_id:{
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id',
            }
        }
    },
    {sequelize}
)

module.exports = BlogPost;