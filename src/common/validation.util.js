import boom from "@hapi/boom"
import joi from "joi"

export default ({ schema }) => (data) => {
	const result = schema.validate(data, { allowUnknown: true, convert: true })
	if (!result.error) {
		return result.value
	}
	if (result.error instanceof joi.ValidationError) {
		const error = result.error
		throw boom.badRequest(error.toString())
	}
	throw boom.internal()
}
