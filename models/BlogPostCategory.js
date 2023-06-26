const sequelize = require("../DB/db.connection")
const { Model, DataTypes} = require("sequelize")
const BlogPost = require("./BlogPost")
const Category = require("./Category")

class BlogPostCategory extends Model {
//extra methods
}

BlogPostCategory.init(
    {
        post_id:{
            type: DataTypes.UUID,
            primaryKey: true,

            references: {
                model: BlogPost,
                key: 'id',
            }
        },
        category_id:{
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: Category,
                key: 'id',
            }
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            default: false,
            allowNull: false,
        }
    },
    {sequelize}
)

module.exports = BlogPostCategory;