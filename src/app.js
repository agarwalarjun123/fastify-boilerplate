const cors = require("cors")
let { fastify } = require("fastify")
const serverOptions = require("./config/server")
const helmet = require("helmet")
const errorHandler = require("./config/error")
const configPlugin = require("./config/config")
const api = require("./api")
const httpStatusCodes = require("http-status-codes")
const fastifyExpressPlugin = require("fastify-express")

const createServer = async () => {
	try {
		fastify = fastify(serverOptions)
		// register config plugin
		await fastify.register(configPlugin)
		// register fastify plugins
		await fastify.register(fastifyExpressPlugin)
		// registers middlewares
		fastify.use(cors())
		fastify.use(helmet())
		// set Error Handler
		await fastify.setErrorHandler(errorHandler)
		await fastify.setNotFoundHandler(function (req, reply) {
			return reply.code(httpStatusCodes.StatusCodes.NOT_FOUND).send({
				error: {
					message: httpStatusCodes.getStatusText(
						httpStatusCodes.StatusCodes.NOT_FOUND,
					),
				},
				is_success: false,
			})
		})
		// decorate response with standard format.
		await fastify.decorateReply("json", function (payload) {
			this.send({ data: payload, is_success: true })
		})
		// register api routes plugin
		await fastify.register(api, { prefix: "/api" })

		return fastify
	} catch (err) {
		console.log(err)
		fastify.log.error(err.message)
		process.exit(1)
	}
}
module.exports = createServer
