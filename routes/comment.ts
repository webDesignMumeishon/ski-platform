import Router from '@koa/router';
import Comments from '../db/models/comments';
import sequelize from '../db/db'
import CommentService from '../services/CommentService';

const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = await CommentService.getCommentsFromPost(1)
});


export default router.routes()