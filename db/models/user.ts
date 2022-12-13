import { DataTypes, Model, NonAttribute, Optional } from "sequelize";
import _ from "lodash";

import sequelize from "../db";
import { UserFields } from "../../enums/user";


type UserAttributes = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  p_enabled: boolean;
};

type UserCreationAttributes = Optional<UserAttributes, "id" | "p_enabled">;

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare p_enabled: boolean;

  get fullName(): NonAttribute<string> {
    return `${this.firstName} ${this.lastName}`;
  }

  omitFields(fields: UserFields[]) {
    return _.omit(this.get(), fields);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue("firstName");
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    p_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    modelName: "user",
  }
);

export default User;
