import * as appinsights from "applicationinsights"
import fp from "fastify-plugin"
let client
export let insights = fp(async (fastify) => {
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
