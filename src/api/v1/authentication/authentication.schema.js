const Joi = require("joi")

const signUpSchema = {
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

module.exports = {
	signUpSchema,
}
