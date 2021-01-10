const authenticationService = require("../services/authentication.service")
module.exports = (fastify, opts, done) => {
	const service = authenticationService(fastify, opts, done)
	const signUpController = async () => {
		fastify.log.info("test")
		await service.signUpService("test")
		return { test: "test" }
	}
	return {
		signUpController,
	}
}
