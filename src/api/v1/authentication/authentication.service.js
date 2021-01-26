module.exports = fastify => {
	const loginService = async () => {
		console.log(fastify.appinsights.trackEvent)
		fastify.appinsights.trackEvent("sample", { data: "arjun" })
		return { message: "thanks for calling service" }
	}
	return {
		loginService,
	}
}
