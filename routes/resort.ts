import Router from '@koa/router'
import Joi from 'joi'

import { Towns, States } from '../enums/resorts'
import City from '../db/models/city'
import ReportService, {ResortRouteError} from '../services/ReportService'
import Validator from '../util/joi_validation'

const router = new Router()

router.get('/resorts', async(ctx) => {
    ctx.body = await City.findAll()
})

const reportSchema = Joi.object()
		.keys({
			town: Joi.string().valid(...Object.values(Towns)).required(),
			state: Joi.string().valid(...Object.values(States)).required()
		})
        .unknown(false)

interface ReportValidator{
	state: string;
	town: string;
}

router.get('/report', async (ctx) => {
    const queryParams = ctx.query

    const msgValidator = new Validator<ReportValidator>(reportSchema);

    if (!msgValidator.validate(queryParams)) {
		return ctx.throw(404, msgValidator.getError().details[0].message)
	}

    try{
        const reportService = new ReportService(queryParams.state, queryParams.town);
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