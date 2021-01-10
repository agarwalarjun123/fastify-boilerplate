const { authenticationController } = require("../../controller")
const S = require("fluent-schema")

module.exports = (fastify, opts, done) => {
	const controller = authenticationController(fastify, opts, done)
	const routes = [
		{
			method: "GET",
			url: "/sign-up",
			schema: {
				querystring: S.object().prop("name", S.string().required()),
				response: {
					"2xx": {
						type: "object",
						properties: {
							test: { type: "string" },
						},
					},
				},
			},
			handler: controller.signUpController,
		},
	]

	routes.forEach(route => fastify.route(route))
	done()
}
