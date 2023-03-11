import axios from 'axios'
import { load } from 'cheerio'

class ReportService {

    public static async getTrails(state: string, town: string){

        const urlWeb = `https://snocountry.com/snow-report/${state}/${town}/`;

        const html = await axios.get(urlWeb)
    
        const $ = load(html.data);
    
        const body = $('body');
    
        const snowReport = body.data('snowreport');
    
        const urlApi = `https://snocountry.com/.netlify/functions/snowreport-api?target=${snowReport}&src=resort`;
    
        const apiHtml = await axios.get(urlApi)
    
        const $1 = load(apiHtml.data.snowreport);
        
        const openTrailsText = $1('h3:contains("Open Trails:")').next('.item').find('.value').text();
    
        console.log('Open Trails:', openTrailsText);
    
        return openTrailsText
    }

}

export default ReportService