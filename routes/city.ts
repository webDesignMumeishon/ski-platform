import Router from '@koa/router'
import Joi from 'joi'

import LikeService from '../services/LikeService'
import checkAndSetUserId from '../middleware/checkAndSetUserId';
import CityService from '../services/ResortService';
import Validator from '../util/joi_validation'
import { Towns, States } from '../enums/resorts'

const router = new Router()

router.get('/', async(ctx) => {
    ctx.body = await CityService.getCitiesList()
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

router.get('/single', async(ctx) => {
    const queryParams = ctx.query
    
    const msgValidator = new Validator<ReportValidator>(reportSchema);

    if (!msgValidator.validate(queryParams)) {
		return ctx.throw(404, msgValidator.getError().details[0].message)
	}

    ctx.body = await CityService.getCityByName(queryParams.town, queryParams.state)
})



export default router.routes()