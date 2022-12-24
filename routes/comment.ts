import Router from '@koa/router';
import Comments from '../db/models/comments';

const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = await Comments.findAll()
});


export default router.routes()