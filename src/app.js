import cors from "cors"
import { fastify as fastifyServer } from "fastify"
import serverOptions from "./config/server.js"
import helmet from "helmet"
import errorHandler from "./config/error.js"
import configPlugin from "./config/config.js"
import api from "./api/index.js"
import httpStatusCodes from "http-status-codes"
import fastifyExpressPlugin from "fastify-express"
let fastify
export const createServer = async () => {
	try {
		fastify = fastifyServer(serverOptions)
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
