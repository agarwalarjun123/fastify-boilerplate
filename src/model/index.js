import mongoose from "mongoose"
import fs from "fs"
import _ from "lodash"
import fp from "fastify-plugin"

export const setupModels = fp(async function (fastify) {
	let models = {}
	if (mongoose.connection.readyState == 1) {
		let readdirlist = fs.readdirSync("./src/model")
		await Promise.all(
			_.map(readdirlist, async (file) => {
				if (file !== "index.js") {
					let schema = await import(`./${file}`)
					file = file.replace(".js", "")
					models[file] = mongoose.model(file, schema.default)
					fastify.log.info(`Model Loaded: ${file}`)
				}
			}),
		)
		fastify.decorate("models", models)
		return models
	} else {
		throw new Error("Failed Loading Models")
	}
})
