import Router from '@koa/router';

import CommentService from '../services/CommentService';

const router = new Router();

router.get('/:id', async (ctx) => {
    const postId = ctx.params.id
    ctx.body = await CommentService.getCommentsFromPost(Number(postId))
});


export default router.routes()