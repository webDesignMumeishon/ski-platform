import Router from '@koa/router';

import CommentService from '../services/CommentService';
import PostService from '../services/PostService';
import checkAndSetUserId from '../middleware/checkAndSetUserId';
import Validator from '../util/joi_validation'
import {createNewPostSchema} from '../schemas/post'


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

interface CreateNewPostRequest{
    cityId: number;
    title: string;
}

router.post('/', checkAndSetUserId, async (ctx) => {
    const body = ctx.request.body

    const validator = new Validator<CreateNewPostRequest>(createNewPostSchema);

    if (!validator.validate(body)) {
		return ctx.throw(404, validator.getError().details[0].message)
	}

    ctx.body = await CommentService.createNewPost(ctx.userId, body.cityId, body.title)
});


export default router.routes()