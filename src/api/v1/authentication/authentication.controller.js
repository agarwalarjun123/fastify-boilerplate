// eslint-disable-next-line no-unused-vars
module.exports = _ => {
	const signUpController = async (req, res) => {
		return res.json(req.user)
	}
	return {
		signUpController,
	}
}
