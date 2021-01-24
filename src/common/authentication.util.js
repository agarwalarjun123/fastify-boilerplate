const boom = require("@hapi/boom")
const _ = require("lodash")
const { v4: uuidv4 } = require("uuid")
const authenticateUser = () => (req, res, done) => {
	const authorizationHeader = req.headers["x-authorization"]
	if (!_.includes(authorizationHeader, "Bearer")) {
		throw boom.unauthorized("please login to continue.")
	}
	const token = authorizationHeader.slice(7)
	if (!token) {
		throw boom.unauthorized("please login to continue.")
	}
	req.user = {
		requestData: {
			id: uuidv4(),
		},
	}
	done()
}
module.exports = {
	authenticateUser,
}
