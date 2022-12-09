import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db'

type UserAttributes = {
  id: number,
  firstName: string,
  lastName: string
  email: string
};

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
}

User.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }

}, {
  sequelize,
  timestamps: true,
  underscored: true,
  paranoid: true,
  modelName: 'user'
});

export default User
