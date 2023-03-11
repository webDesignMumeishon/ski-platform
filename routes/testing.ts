import Router, {RouterContext} from '@koa/router';
const axios = require('axios');
const cheerio = require('cheerio');

const router = new Router();

router.get('/', async (ctx: RouterContext) => {
    ctx.body = 'ok'
})

export default router.routes()