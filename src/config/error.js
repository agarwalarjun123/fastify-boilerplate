const _ = require("lodash")
const httpStatusCodes = require("http-status-codes")

module.exports = (error, req, res) => {
	if (error && error.isBoom) {
		return res.code(error.output.statusCode).send({
			error: { message: error.output.payload.message },
			is_success: false,
		})
	}
	if (error && _.isArray(error.validation)) {
		return res.code(httpStatusCodes.StatusCodes.BAD_REQUEST).send({
			error: {
				message: `${error.validationContext} ${error.validation[0].message}`,
			},
			is_success: false,
		})
	}
	req.log.error(`Error occurred: ${error.message}`)
	req.log.error(error.stack)
	res.code(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).send({
		error: {
			message: "Oops Something went wrong. Please try again!",
		},
		is_success: false,
	})
}
