import Router, {RouterContext} from '@koa/router';
const axios = require('axios');
const cheerio = require('cheerio');

const router = new Router();

router.get('/', async (ctx: RouterContext) => {
    // Send a GET request to the Snocountry page

    const urlWeb = 'https://snocountry.com/snow-report/colorado/breckenridge/';

    const html = await axios.get(urlWeb)

    const $ = cheerio.load(html.data);

    const body = $('body');

    const snowReport = body.data('snowreport');

    const urlApi = `https://snocountry.com/.netlify/functions/snowreport-api?target=${snowReport}&src=resort`;

    const apiHtml = await axios.get(urlApi)

    const $1 = cheerio.load(apiHtml.data.snowreport);
    
    const openTrailsText = $1('h3:contains("Open Trails:")').next('.item').find('.value').text();

    console.log('Open Trails:', openTrailsText);

    ctx.body = openTrailsText

})

export default router.routes()