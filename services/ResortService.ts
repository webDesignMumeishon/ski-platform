import City from '../db/models/city'

class ResortService {

    public static async getCitiesList(): Promise<City[]>{
        return City.findAll()
    }

    public static async getCityByName(city: string, state: string): Promise<City>{
        return City.findOne({
            where: {
                city,
                state
            },
            attributes:['id', 'city', 'state']
        })
    }
}



export default ResortService