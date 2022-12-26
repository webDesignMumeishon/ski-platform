import Router from '@koa/router'

import LikeService from '../services/LikeService'

const router = new Router()


router.post('/', async(ctx) => {

    const {userId, postId} = ctx.request.body as unknown as any

    const result = await LikeService.likePost(userId, postId)

    ctx.body = result
})


export default router.routes()