import Router from '@koa/router';
import CommentService from '../services/CommentService'
import checkAndSetUserId from '../middleware/checkAndSetUserId';
import User from '../db/models/user';
import Validator from '../util/joi_validation'
import { createNewCommentSchema } from '../schemas/comment';

const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = 'ok'
});

interface CreateNewCommentRequest {
    postId: number;
    text: string;
}

router.post('/', checkAndSetUserId,  async (ctx) => {
    const body = ctx.request.body

    const validator = new Validator<CreateNewCommentRequest>(createNewCommentSchema);

    if (!validator.validate(body)) {
		return ctx.throw(404, validator.getError().details[0].message)
	}
    const comment = await CommentService.createNewCommentForPost(ctx.userId, body.postId, body.text)

    const user = await User.findByPk(ctx.userId)

    ctx.body = {...comment.toJSON(), first_name: user.firstName, last_name: user.lastName}
});


export default router.routes()