import mongoose, { Schema, Document } from "mongoose";

export interface IRoom extends Document {
	name: string;
	jenis: string;
	status: string;
}

const RoomSchema: Schema = new Schema(
	{

		name: { type: String, required: true },
		jenis: { type: String, required: true },
		status: { type: String, required: true },
	},
	{
		versionKey: false,
	}
);

const RoomModel = mongoose.model<IRoom>("Room", RoomSchema);

export default RoomModel;
