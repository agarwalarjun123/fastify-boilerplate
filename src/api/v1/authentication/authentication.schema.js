import Joi from "joi"
export const signUpSchema = {
	query: Joi.object({
		name: Joi.string().required(),
	})
		.required()
		.options({ allowUnknown: false }),
	body: Joi.object({
		name: Joi.string().required(),
	})
		.required()
		.options({ allowUnknown: false }),
}

export const schema = {
	body: Joi.object({
		name: Joi.string().required(),
	})
		.required()
		.options({ allowUnknown: false }),
}
