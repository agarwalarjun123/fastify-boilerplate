import authenticationService from "./authentication.service.js"

// eslint-disable-next-line no-unused-vars
const authenticationController = (fastify) => {
	const service = authenticationService(fastify)
	const signUpController = async (req, res) => {
		const ret_value = await service.loginService()
		await fastify.appinsights.trackEvent("name", { data: "name" })
		return res.json(ret_value)
	}
	return {
		signUpController,
	}
}
export default authenticationController
