import { DataTypes, Model } from 'sequelize';
import sequelize from '../db'
import Comments from './comments'

type CommentsAttributes = {
    parent_comment_id: number,
    child_comment_id: number,
}

type CommentsCreationAttributes = CommentsAttributes

class ParentChildComment extends Model<CommentsAttributes, CommentsCreationAttributes> {
    declare parent_comment_id: number;
    declare child_comment_id: number;
}

ParentChildComment.init({
    parent_comment_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Comments,
            key: 'id',
        }
    },
    child_comment_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Comments,
            key: 'id',
        }
    },
  }, {
    sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    modelName: 'parent_child_comment'
});
  
export default ParentChildComment