import fp from "fastify-plugin"
export default fp(async (fastify) => {
	const config = {
		app: {
			NODE_ENV: process.env.NODE_ENV,
			LOG_LEVEL: process.env.LOG_LEVEL,
			PORT: process.env.PORT || 4000,
			APPLICATION_INSIGHTS: process.env.APPLICATION_INSIGHTS,
		},
		db: {
			MONGODB_URL: process.env.MONGODB_URL,
		},
	}
	await fastify.decorate("config", config)
})
