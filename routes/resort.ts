import Router from '@koa/router'
import City from '../db/models/city'
import ReportService from '../services/ReportService'

const router = new Router()

router.get('/resorts', async(ctx) => {
    ctx.body = await City.findAll()
})

router.get('/report', async (ctx) => {

    const {state, town} = ctx.query

    const reportService = new ReportService(state as string, town as string);
    await reportService.init()

    const resortReport = await reportService.getResortReport(); 


    ctx.body = resortReport
})






export default router.routes()