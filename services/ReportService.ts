import axios from 'axios'
import { load } from 'cheerio'

class ReportService {

    public static async getResortReport(state: string, town: string){

        const urlWeb = `https://snocountry.com/snow-report/${state}/${town}/`;

        const html = await axios.get(urlWeb)
    
        let $ = load(html.data);
    
        const body = $('body');
    
        const snowReport = body.data('snowreport');
    
        const urlApi = `https://snocountry.com/.netlify/functions/snowreport-api?target=${snowReport}&src=resort`;
    
        const apiHtml = await axios.get(urlApi)
    
        $ = load(apiHtml.data.snowreport);
        
        const openTrails = $('h3:contains("Open Trails:")').next('.item').find('.value').text();
        const openTerrain = $('h3:contains("Open Terrain:")').next('.item').find('.value').text();
        const openLifts = $('h3:contains("Open Lifts:")').next('.item').find('.value').text();
        const snowConditions = $('.simple-conditions-wrapper .copy').text();
    
        return {
            openTrails,
            openTerrain,
            openLifts,
            snowConditions,
        }
    }

}

export default ReportService