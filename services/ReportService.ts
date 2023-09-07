import axios from 'axios'
import { load } from 'cheerio'
import City from '../db/models/city'

class NotFoundReport extends Error{
    public statusCode: number

    constructor(message: string){
        super(message)
        this.statusCode = 404
    }
}

export const ResortRouteError = {
    REPORT_NOT_FOUND: NotFoundReport
}

class ReportService {
    private apiUrl: string = '';
    private _state: string;
    private _town: string;


    constructor(state: string, town: string) {
        this._state = state
        this._town = town
    }
    
    private async init() : Promise<void>{
        const snowReport = await this.getSnowReport();
        this.apiUrl = `https://snocountry.com/.netlify/functions/snowreport-api?target=${snowReport}&src=resort`;
    }

    private async getSnowReport(): Promise<number> {
        const urlWeb = `https://snocountry.com/snow-report/${this._state}/${this._town}/`;
        const html = await axios.get(urlWeb);
        const $ = load(html.data);
        const body = $('body');
        const snowReport = body.data('snowreport');
        if(typeof snowReport === 'number'){
            return snowReport
        }
        else{
            throw new NotFoundReport('Report not found')
        }
    }

    public async getResortReport(){
        await this.init()
        const apiHtml = await axios.get(this.apiUrl);
        const $api = load(apiHtml.data.snowreport);

        const openTerrainPercentage = $api('h3:contains("Open Terrain:")').next('.item').find('.value').text().replace(/\s+/g, "");

        const openTrails = $api('h3:contains("Open Trails:")').next('.item').find('.value').text();
        const openTerrain = openTerrainPercentage === '%' ? '0%' : openTerrainPercentage
        const openLifts = $api('h3:contains("Open Lifts:")').next('.item').find('.value').text();
        const snowConditions = $api('.simple-conditions-wrapper .copy').text();
        const status = Number(openLifts.split(' ')[0]) > 0 ?? false

        const city = await City.findOne({
            where: {code: this._town, state: this._state}
        })
        
        return {
            id: city.id,
            city: city.city,
            state: city.state,
            status,
            openTrails,
            openTerrain,
            openLifts,
            snowConditions,
        }
    }

}

export default ReportService