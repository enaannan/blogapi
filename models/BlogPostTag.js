const {Model, DataTypes} = require("sequelize");
const sequelize = require("../DB/db.connection");
const BlogPost = require("./BlogPost");
const Tag = require("./Tag");

class BlogPostTag extends Model {
//extra methods
}

BlogPostTag.init(
    {
        post_id:{
            type: DataTypes.UUID,
            primaryKey: true,

            references: {
                model: BlogPost,
                key: 'id',
            }
        },
        tag_id:{
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: Tag,
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
module.exports = BlogPostTag;