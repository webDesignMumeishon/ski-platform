import Router from '@koa/router'
import City from '../db/models/city'
import ReportService from '../services/ReportService'

const router = new Router()

enum States {
    COLORADO = 'colorado'
}

enum Towns {
    BRECKENRIDGE = 'breckenridge',
    BUTTERMILK = 'buttermilk',
    ARAPAHOE_BASIN= 'arapahoe-basin',
    ASPEN_HIGHLANDS= 'aspen-highlands',
    ASPEN_MOUNTAIN= 'aspen-mountain',
}

router.get('/resorts', async(ctx) => {
    ctx.body = await City.findAll()
})

router.get('/report', async (ctx) => {

    const {state, town} = ctx.query

    if(!Object.values(Towns).includes(town as Towns) || !Object.values(States).includes(state as States)){
        throw new Error('Invalid Town or State')
    }

    const reportService = new ReportService(state as string, town as string);
    await reportService.init()

    const resortReport = await reportService.getResortReport(); 


    ctx.body = resortReport
})






export default router.routes()