import City from "../db/models/city";
import { Op } from "sequelize";

class ResortService {
  public static async getCitiesList(): Promise<City[]> {
    return City.findAll();
  }

  public static async getCityByName(
    city: string,
    state: string
  ): Promise<City> {
    return City.findOne({
      where: {
        city,
        state,
      },
      attributes: ["id", "city", "state"],
    });
  }

  public static async searchByKeyword(keyword: string) {
    return City.findAll({
        where: {
        city: {
            [Op.iLike]: `%${keyword}%`,
        },
        },
    });
  }
}

export default ResortService;
