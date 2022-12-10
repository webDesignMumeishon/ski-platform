import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db'
import User from './user'
import Post from './post'

type CommentsAttributes = {
    id: number,
    user_id: number,
    post_id: number,
    comment: string,
}

type CommentsCreationAttributes = Optional<CommentsAttributes, 'id'>

class Comments extends Model<CommentsAttributes, CommentsCreationAttributes> {
    declare id: number;
    declare user_id: number;
    declare post_id: number;
    declare comment: string;

    static classLevelMethod() {
        return 'foo';
    }
}

Comments.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
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
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    modelName: 'comments'
});
  
  export default Comments