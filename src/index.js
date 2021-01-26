const appinsights = require("./config/appinsights")
const bootstrap = async () => {
	// setting up server.
	const server = await require("./app")()
	const { start } = await appinsights(server)
	start()
	const mongoose = require("mongoose")

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
		await server.listen(server.config.app.PORT, () =>
			server.log.info(
				`server is running on port ${server.config.app.PORT}`,
			),
		)
	} catch (err) {
		server.log.error(err)
		process.exit(1)
	}
}
bootstrap()
