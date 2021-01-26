const path = require("path")
const routesMiddleware = function (fastify, opts, done) {
	const versions = ["v1"]
	versions.forEach((version) => {
		const routePath = path.join(__dirname, version)
		const routes = require(routePath)
		fastify.register(routes, { prefix: `/${version}` })
	})
	done()
}
module.exports = routesMiddleware
