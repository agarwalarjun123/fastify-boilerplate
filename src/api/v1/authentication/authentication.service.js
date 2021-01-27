export default (fastify) => {
	const loginService = async () => {
		console.log("da")
		const data = await fastify.models.schema.find()
		return data
	}
	return {
		loginService,
	}
}
