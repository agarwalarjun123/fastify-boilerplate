const loggerOptions = require("./logger")
const { v4: uuidv4 } = require("uuid")

module.exports = {
	logger: loggerOptions,
	genReqId: uuidv4,
	ignoreTrailingSlash: true,
}
