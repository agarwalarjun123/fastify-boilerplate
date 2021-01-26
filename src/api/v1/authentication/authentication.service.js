module.exports = fastify => {
	const loginService = async () => {
		const data = await fastify.models.schema.find()
		return data
	}
	return {
		loginService,
	}
}
