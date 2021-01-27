import loggerOptions from "./logger.js"
import { v4 } from "uuid"

let serverOptions = {
	logger: loggerOptions,
	genReqId: v4,
	ignoreTrailingSlash: true,
}
export default serverOptions
