const { default: fastify } = require("fastify")

module.exports = (fastify,opts,done) => {
	const signUpService = async (parameters) => {
		fastify.log.info("in signup service")
		return "test"
	}
	return {
		signUpService
	}
}