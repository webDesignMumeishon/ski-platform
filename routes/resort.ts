import Router from '@koa/router'
import City from '../db/models/city'

const router = new Router()


router.get('/resorts', async(ctx) => {
    ctx.body = await City.findAll()
})




export default router.routes()