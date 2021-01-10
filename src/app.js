const cors = require("cors")
let { fastify } = require("fastify")
const configPlugin = require("./util/config")
const routesMiddleware = require("./routes")
const fastifyExpressPlugin = require("fastify-express")

const { uuid } = require("uuidv4")

const options = {
	logger: {
		prettyPrint: {
			colorize: true,
			translateTime: "yyyy-mm-dd HH:MM:ss",
		},
	},
	genReqId: () => uuid(),
}

const createServer = async () => {
	// fastify init
	fastify = fastify(options)
	// register fastify plugins
	await fastify.register(fastifyExpressPlugin)
	// registers middlewares
	fastify.use(cors())
	// register config plugin
	await fastify.register(configPlugin)
	// register api routes plugin
	await fastify.register(routesMiddleware, { prefix: "/api" })
	await fastify.listen(fastify.config.PORT)
	fastify.log.info(`server running on port ${fastify.config.PORT}`)
}
createServer()
