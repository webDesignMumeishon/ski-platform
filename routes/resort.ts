import Router from '@koa/router'
import City from '../db/models/city'
import ReportService, {ResortRouteError} from '../services/ReportService'


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
        ctx.throw(404, )
    }

    try{
        const reportService = new ReportService(state as string, town as string);
        const resortReport = await reportService.getResortReport(); 
        ctx.body = resortReport
    }
    catch(error){
        if(error instanceof ResortRouteError.REPORT_NOT_FOUND){
            ctx.throw(error.statusCode, error.message)
        }
        throw error
    }
})






export default router.routes()