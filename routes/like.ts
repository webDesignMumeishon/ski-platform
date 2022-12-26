import Router from '@koa/router'

import LikeService from '../services/LikeService'
import { LikeDelete } from '../enums/like'
import checkAndSetUserId from '../middleware/checkAndSetUserId';

const router = new Router()


router.post('/',checkAndSetUserId, async(ctx) => {

    const {postId} = ctx.request.body as unknown as any

    await LikeService.likePost(ctx.userId, postId)

    ctx.status = 201
})

router.delete('/', checkAndSetUserId, async(ctx) => {

    const {postId} = ctx.request.body as unknown as any

    const deletedLike = await LikeService.unlikePost(ctx.userId, postId)

    if(deletedLike === LikeDelete.DELETED){

        return ctx.status = 200

    }

})


export default router.routes()