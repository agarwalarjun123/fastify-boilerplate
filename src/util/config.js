const fp = require("fastify-plugin")
const configfp = async (fastify,opts,next) => {
	const config = {
		NODE_ENV: process.env.NODE_ENV,
		DB: process.env.DB,
		LOG_LEVEL: process.env.LOG_LEVEL,
		PORT : process.env.PORT || 6000
	}
	await fastify.decorate("config",config)
	next()
}

module.exports = fp(configfp)