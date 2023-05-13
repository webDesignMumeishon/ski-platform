import Router from '@koa/router';
import CommentService from '../services/CommentService'
import checkAndSetUserId from '../middleware/checkAndSetUserId';
import User from '../db/models/user';

const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = 'ok'
});

router.post('/', checkAndSetUserId,  async (ctx) => {
    const body: any = ctx.request.body
    const comment = await CommentService.createNewCommentForPost(ctx.userId, body.post_id, body.text)

    const user = await User.findByPk(ctx.userId)

    ctx.body = {...comment.toJSON(), first_name: user.firstName, last_name: user.lastName}
});


export default router.routes()