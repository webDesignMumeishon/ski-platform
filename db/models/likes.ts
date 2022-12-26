import { DataTypes, Model } from 'sequelize';
import sequelize from '../db'
import User from './user'
import Post from './post'

type LikesAttributes = {
    user_id: number,
    post_id: number,
}

class Likes extends Model<LikesAttributes, LikesAttributes> {
    declare user_id: number;
    declare post_id: number;
}

Likes.init({
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        }
    },
    post_id : {
        type: DataTypes.INTEGER,
        references: {
            model: Post,
            key: 'id'
        }
    },
  }, {
    sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    modelName: 'likes',
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'post_id']
        }
    ]
});
  
  export default Likes