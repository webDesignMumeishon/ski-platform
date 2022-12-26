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

router.delete('/:postId', checkAndSetUserId, async(ctx) => {

    const deletedLike = await LikeService.unlikePost(ctx.userId, Number(ctx.params.postId))

    if(deletedLike === LikeDelete.DELETED){
        return ctx.status = 200
    }

})


export default router.routes()