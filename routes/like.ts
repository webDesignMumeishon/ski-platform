import Router from '@koa/router'

import LikeService from '../services/LikeService'
import { LikeDelete } from '../enums/like'

const router = new Router()


router.post('/', async(ctx) => {

    const {userId, postId} = ctx.request.body as unknown as any

    await LikeService.likePost(userId, postId)

    ctx.status = 201
})

router.delete('/', async(ctx) => {

    const {userId, postId} = ctx.request.body as unknown as any

    const deletedLike = await LikeService.unlikePost(userId, postId)

    if(deletedLike === LikeDelete.DELETED){

        return ctx.status = 200
        
    }

})


export default router.routes()