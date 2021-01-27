import path from "path"
export default async (fastify, opts, done) => {
	const versions = ["v1"]
	await Promise.all(
		versions.map(async (version) => {
			const url = new URL(import.meta.url)
			const __dirname = path.dirname(url.pathname)
			const routePath = path.join(__dirname, `${version}/index.js`)
			const routes = await import(routePath)
			await fastify.register(routes.default, { prefix: `/${version}` })
		}),
	)

	done()
}
