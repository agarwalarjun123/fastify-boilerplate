// eslint-disable-next-line no-unused-vars
module.exports = _ => {
	const signUpController = async (req, res) => {
		res.json({ test: req.query.name || req.body.name })
	}
	return {
		signUpController,
	}
}
