module.exports = (fastify) => {
	const loginService = async () => {
		console.log("data")
		const data = await fastify.models.schema.find()
		return data
	}
	return {
		loginService,
	}
}
