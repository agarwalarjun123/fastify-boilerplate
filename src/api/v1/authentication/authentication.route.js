const validate = require("../../../common/validation.util")
const authenticationController = require("./authentication.controller")
const authenticationSchema = require("./authentication.schema")
const authenticationUtil = require("../../../common/authentication.util")

module.exports = (fastify, opts, done) => {
	const controller = authenticationController(fastify, opts, done)
	const routes = [
		{
			method: "POST",
			url: "/sign-up",
			schema: authenticationSchema.signUpSchema,
			validatorCompiler: validate,
			preHandler: [],
			handler: controller.signUpController,
		},
		{
			method: "POST",
			url: "/signin",
			schema: authenticationSchema.schema,
			validatorCompiler: validate,
			preHandler: [],
			handler: controller.signUpController,
		},
	]
	fastify.decorateRequest("user", null)
	fastify.addHook("preHandler", authenticationUtil.authenticateUser())
	routes.forEach((route) => fastify.route(route))
	done()
}
