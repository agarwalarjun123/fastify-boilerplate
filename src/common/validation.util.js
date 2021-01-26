const boom = require("@hapi/boom")
const { ValidationError } = require("joi")

const validate = ({ schema }) => (data) => {
	const result = schema.validate(data, { allowUnknown: true, convert: true })
	if (!result.error) {
		return result.value
	}
	if (result.error instanceof ValidationError) {
		const error = result.error
		throw boom.badRequest(error.toString())
	}
	throw boom.internal()
}
module.exports = validate
