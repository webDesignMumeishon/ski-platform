import axios from 'axios'
import { load } from 'cheerio'

class ReportService {
    private apiUrl: string = '';
    private _state: string;
    private _town: string;


    constructor(private state: string, private town: string) {
        this._state = state
        this._town = town
    }
    
    public async init() : Promise<void>{
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
            throw Error('Snow report not found')
        }
    }

    public async getResortReport(){
        const apiHtml = await axios.get(this.apiUrl);
        const $api = load(apiHtml.data.snowreport);

        const openTrails = $api('h3:contains("Open Trails:")').next('.item').find('.value').text();
        const openTerrain = $api('h3:contains("Open Terrain:")').next('.item').find('.value').text();
        const openLifts = $api('h3:contains("Open Lifts:")').next('.item').find('.value').text();
        const snowConditions = $api('.simple-conditions-wrapper .copy').text();
    
        return {
            openTrails,
            openTerrain,
            openLifts,
            snowConditions,
        }
    }

}

export default ReportService