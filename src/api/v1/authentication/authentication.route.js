import validate from "../../../common/validation.util.js"
import authenticationController from "./authentication.controller.js"
import * as authenticationSchema from "./authentication.schema.js"
import * as authenticationUtil from "../../../common/authentication.util.js"

export default async (fastify, opts, done) => {
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
	await Promise.all(
		routes.map(async (route) => {
			await fastify.route(route)
		}),
	)
	done()
}
