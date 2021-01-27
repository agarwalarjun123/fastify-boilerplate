import { insights } from "./config/appinsights.js"
import { setupModels } from "./model/index.js"
import mongoose from "mongoose"
const bootstrap = async () => {
	// setting up server.
	let server = await import("./app.js")
	server = await server.createServer()
	// register appinsights
	await server.register(insights)

	mongoose.connection.on("disconnected", () => {
		server.log.error("Disconnected")
	})
	mongoose.connection.on("error", () => {
		server.log.error("Error connecting to MongoDB")
	})

	mongoose.connection.on("reconnectFailed", () => {
		server.log.error("Cannot connect to MongoDB")
	})
	mongoose.connection.on("reconnected", () => {
		server.log.info("Reconnected to MongoDB")
	})
	//setting up mongoose connection
	try {
		await mongoose.connect(server.config.db.MONGODB_URL, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			connectTimeoutMS: 3000,
			serverSelectionTimeoutMS: 18000,
			useFindAndModify: false,
		})
		server.log.info("Connected to MongoDB")
		await server.register(setupModels)
		await server.listen(server.config.app.PORT)
	} catch (err) {
		server.log.error(err)
		process.exit(1)
	}
}
bootstrap()
