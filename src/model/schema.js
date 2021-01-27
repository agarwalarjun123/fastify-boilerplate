import mongoose from "mongoose"

const schema = new mongoose.Schema(
	{
		name: {
			type: String,
			match: /^[a-zA-Z ]*$/,
			required: true,
			trim: true,
			lowercase: true,
		},
		token: {
			type: String,
			required: true,
			trim: true,
			index: true,
			unique: true,
		},
		is_active: {
			type: Boolean,
			required: true,
			default: true,
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	},
)

export default schema
