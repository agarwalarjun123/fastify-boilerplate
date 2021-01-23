const _ = require("lodash")
const data = {
	auth: {
		prefix: "/auth",
		routes: require("./authentication/authentication.route"),
	},
}

module.exports = async (fastify, opts, done) => {
	_.each(data, ({ prefix, routes }) => {
		fastify.register(routes, { prefix })
	})
	done()
}
