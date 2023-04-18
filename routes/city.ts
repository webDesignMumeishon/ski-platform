import Router from '@koa/router'
import LikeService from '../services/LikeService'
import checkAndSetUserId from '../middleware/checkAndSetUserId';

const router = new Router()

router.get('/', async(ctx) => {
    ctx.status = 200
})

export default router.routes()