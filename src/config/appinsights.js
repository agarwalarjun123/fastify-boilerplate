const appinsights = require("applicationinsights")
const fp = require("fastify-plugin")
let client
module.exports = fp(async fastify => {
	const trackEvent = (eventName, eventProperties) => {
		if (client) {
			client.trackEvent({ name: eventName, properties: eventProperties })
		}
	}
	const start = async () => {
		fastify.decorate("appinsights", {
			trackEvent,
		})
		if (!fastify.config.app.APPLICATION_INSIGHTS) {
			fastify.log.info("appinsights not setup.")
			return
		}
		appinsights.setup(fastify.config.app.APPLICATION_INSIGHTS).start()
		fastify.log.info("appinsights setup complete.")
		client = appinsights.defaultClient
	}
	await start()
})
