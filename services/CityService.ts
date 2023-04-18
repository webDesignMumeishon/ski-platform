import City from '../db/models/city'

class CityService {

    public static async getCitiesList(): Promise<City[]>{
        return City.findAll()
    }
}



export default CityService