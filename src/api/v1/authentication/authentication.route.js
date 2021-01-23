const validate = require("../../../common/validation.util")
const authenticationController = require("./authentication.controller")
const authenticationSchema = require("./authentication.schema")

module.exports = (fastify, opts, done) => {
	const controller = authenticationController(fastify, opts, done)
	const routes = [
		{
			method: "POST",
			url: "/sign-up",
			schema: authenticationSchema.signUpSchema,
			validatorCompiler: validate,
			handler: controller.signUpController,
		},
	]

	routes.forEach(route => fastify.route(route))
	done()
}
