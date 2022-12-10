import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db'


type PostAttributes = {
    id: number,
    title: string,
}

type PostCreationAttributes = Optional<PostAttributes, 'id'>

class Post extends Model<PostAttributes, PostCreationAttributes> {
    declare id: number;
    declare title: string;
}

Post.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    modelName: 'user'
});
  
  export default Post