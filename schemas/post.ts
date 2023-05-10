import Joi from 'joi'

export const createNewPostSchema = Joi.object()
		.keys({
			cityId: Joi.number().required(),
			title: Joi.string().required()
		})
        .unknown(false)