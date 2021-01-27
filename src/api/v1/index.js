import _ from "lodash"
const data = {
	auth: {
		prefix: "/auth",
		routes: "./authentication/authentication.route.js",
	},
}

export default async (fastify, opts, done) => {
	await Promise.all(
		_.map(data, async ({ prefix, routes }) => {
			const route = await import(routes)
			await fastify.register(route, { prefix })
		}),
	)
	done()
}
