import { BelongsToGetAssociationMixin, DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db";
import City from "./city";
import User from "./user";

type PostAttributes = {
  id: number;
  user_id: number;
  title: string;
  city_id: number;
};

type PostCreationAttributes = Optional<PostAttributes, "id">;

class Post extends Model<PostAttributes, PostCreationAttributes> {
  declare id: number;
  declare user_id: number;
  declare title: string;
  declare city_id: number;
  
  declare getUser: BelongsToGetAssociationMixin<User>;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city_id: {
      type: DataTypes.INTEGER,
      references: {
        model: City,
        key: "id",
      },
      validate: {
        async cityExists(value: number) {
          const city = await City.findByPk(value);
          if (city === null) {
            throw new Error("City does not exist");
          }
        }
      }
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    modelName: "post",
  }
);

export default Post;
