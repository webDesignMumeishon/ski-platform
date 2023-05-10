import Joi from 'joi'
import { Towns, States } from '../enums/resorts'

export const reportSchema = Joi.object()
		.keys({
			town: Joi.string().valid(...Object.values(Towns)).required(),
			state: Joi.string().valid(...Object.values(States)).required()
		})
        .unknown(false)