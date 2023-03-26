import Router from '@koa/router';

import CommentService from '../services/CommentService';
import PostService from '../services/PostService';
import checkAndSetUserId from '../middleware/checkAndSetUserId';

const router = new Router();

router.get('/list/posts', checkAndSetUserId, async (ctx) => {

    const {state, town} = ctx.query

    ctx.body = await PostService.getPostsAndCount(ctx.userId, town as string, state as string)
});

router.get('/single/:id', async (ctx) => {
    const postId = ctx.params.id
    const [result] = await PostService.getSinglePost(postId)
    ctx.body = result
});

router.get('/:id', async (ctx) => {
    const postId = ctx.params.id
    ctx.body = await CommentService.getCommentsFromPost(Number(postId))
});


export default router.routes()