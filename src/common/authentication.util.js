import boom from "@hapi/boom"
import _ from "lodash"
import { v4 } from "uuid"
export const authenticateUser = () => (req, res, done) => {
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
			id: v4(),
		},
	}
	done()
}
