const mongoose = require("mongoose")
const fs = require("fs")
const fp = require("fastify-plugin")

const setupModels = fp(async function (fastify) {
	let models = {}
	if (mongoose.connection.readyState == 1) {
		let readdirlist = fs.readdirSync("./src/model")
		let schema
		readdirlist.forEach(file => {
			if (file !== "index.js") {
				schema = require(`./${file}`)
				file = file.replace(".js", "")
				models[file] = mongoose.model(file, schema)
				fastify.log.info(`Model Loaded: ${file}`)
			}
		})
		fastify.decorate("models", models)
		return models
	} else {
		throw new Error("Failed Loading Models")
	}
})

module.exports = setupModels
