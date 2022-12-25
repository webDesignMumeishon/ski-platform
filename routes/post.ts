import Router from '@koa/router';
import Post from '../db/models/post';

import CommentService from '../services/CommentService';
import PostService from '../services/PostService';

const router = new Router();

router.get('/:id', async (ctx) => {
    const postId = ctx.params.id
    ctx.body = await CommentService.getCommentsFromPost(Number(postId))
});

router.get('/list/posts', async (ctx) => {
    ctx.body = await PostService.getPostsAndCount()
});


export default router.routes()