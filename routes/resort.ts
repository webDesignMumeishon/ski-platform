import Router from '@koa/router'
import City from '../db/models/city'
import ReportService from '../services/ReportService'

const router = new Router()


router.get('/resorts', async(ctx) => {
    ctx.body = await City.findAll()
})

router.get('/report', async (ctx) => {

    const {state, town} = ctx.query

    const numberOfTrails = await ReportService.getTrails(state as string, town as string)

    ctx.body = numberOfTrails
})






export default router.routes()