const logger = {
	prettyPrint: process.env.NODE_ENV !== "production",
	level: process.env.LOG_LEVEL,
}

module.exports = logger
