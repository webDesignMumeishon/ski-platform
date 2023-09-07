import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db'

type CityAttributes = {
  id: number,
  city: string,
  code: string,
  flag: string,
  state: string,
  country: string,
  postcode: string,
}

type CityCreationAttributes = Optional<CityAttributes, 'id'>

class City extends Model<CityAttributes, CityCreationAttributes> {
  declare id: number;
  declare city: string;
  declare code: string;
  declare flag: string;
  declare state: string;
  declare country: string;
  declare postcode: string;
}

City.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    flag : {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postcode: {
        type: DataTypes.STRING,
        allowNull: false
    },
  }, {
    sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    modelName: 'city'
});

export default City