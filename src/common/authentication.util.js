const boom = require("@hapi/boom")
const _ = require("lodash")
const authenticateUser = () => (req, res, done) => {
	const authorizationHeader = req.headers["x-authorization"]
	if (!_.includes(authorizationHeader, "Bearer")) {
		throw boom.unauthorized("please login to continue.")
	}
	const token = authorizationHeader.slice(7)
	if (!token) {
		throw boom.unauthorized("please login to continue.")
	}
	done()
}
module.exports = {
	authenticateUser,
}
