import Router from '@koa/router'

import City from '../db/models/city'
import ReportService, {ResortRouteError} from '../services/ReportService'
import Validator from '../util/joi_validation'
import ResortService from '../services/ResortService'
import {reportSchema, keywordSchema} from '../schemas/resort'

const router = new Router()

router.get('/resorts', async(ctx) => {
    ctx.body = await City.findAll()
})


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

router.get('/one', async(ctx) => {
    const queryParams = ctx.query
    const msgValidator = new Validator<ReportValidator>(reportSchema);
    if (!msgValidator.validate(queryParams)) {
		return ctx.throw(404, msgValidator.getError().details[0].message)
	}
    ctx.body = await ResortService.getCityByName(queryParams.town, queryParams.state)
})

interface KeywordValidator{
	keyword: string;
}

router.get('/search', async(ctx) => {
    const queryParams = ctx.query
    const validator = new Validator<KeywordValidator>(keywordSchema);
    if (!validator.validate(queryParams)) {
		return ctx.throw(404, validator.getError().details[0].message)
	}
    ctx.body = await ResortService.searchByKeyword(queryParams.keyword)
})


export default router.routes()