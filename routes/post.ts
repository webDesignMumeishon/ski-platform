import Router from '@koa/router';

import CommentService from '../services/CommentService';
import PostService from '../services/PostService';
import checkAndSetUserId from '../middleware/checkAndSetUserId';
import setUserId from '../middleware/setUserId';
import Validator from '../util/joi_validation'
import {createNewPostSchema} from '../schemas/post'


const router = new Router();

router.get('/list/posts', setUserId, async (ctx) => {
    const {state, town} = ctx.query
    ctx.body = await PostService.getPostsAndCount(town as string, state as string, ctx.userId)
});

router.get('/single/:id', async (ctx) => {
    const postId = ctx.params.id
    const [result] = await PostService.getSinglePost(postId)
    ctx.body = result
});

router.get('/:id', async (ctx) => {
    const postId = ctx.params.id
    const comments = await CommentService.getCommentsFromPost(Number(postId))
    const [likesCount] = await PostService.getLikesFromPost(postId)

    if(comments.length === 0){
        const [result] = await PostService.getSinglePost(postId)
        comments.push(result)
    }

    ctx.body = {
        post: comments[0],
        comments: comments,
        likes: likesCount.count
    }
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