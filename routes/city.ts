import Router from '@koa/router'
import LikeService from '../services/LikeService'
import checkAndSetUserId from '../middleware/checkAndSetUserId';
import CityService from '../services/CityService';

const router = new Router()

router.get('/', async(ctx) => {
    ctx.body = await CityService.getCitiesList()
})

export default router.routes()