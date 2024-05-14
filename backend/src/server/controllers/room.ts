import * as grpc from "@grpc/grpc-js";
import RoomModel from "../models/room";

export const getRoom = async (call: any, callback: any) => {
	try {
		const id = call.request.id;

		const room = await RoomModel.findById(id);

		if (!room) return callback({ code: grpc.status.NOT_FOUND, message: "ROOM_NOT_FOUND" });

		callback(null, room);
	} catch (error) {
		callback(error, null);
	}
};

export const getAllRoom = async (call: any, callback: any) => {
	try {
		const rooms = await RoomModel.find();

		if (!rooms) return callback({ code: grpc.status.INTERNAL, message: "FAILED_GET_ROOMS" });

		callback(null, { rooms });
	} catch (error) {
		callback(error, null);
	}
};

export const createRoom = async (call: any, callback: any) => {
	try {
		const room = call.request;

		const newRoom = await RoomModel.create(room);

		if (!newRoom) return callback({ code: grpc.status.INTERNAL, message: "FAILED_CREATE_ROOM" });

		callback(null, newRoom);
	} catch (error) {
		callback(error, null);
	}
};

export const updateRoom = async (call: any, callback: any) => {
	try {
		const room = call.request;

		const updatedRoom = await RoomModel.findByIdAndUpdate({ _id: room._id }, { $set: room });

		if (!updatedRoom) return callback({ code: grpc.status.INTERNAL, message: "FAILED_UPDATE_ROOM" });

		const roomData = await RoomModel.findById(room._id);

		callback(null, roomData);
	} catch (error) {
		callback(error, null);
	}
};

export const deleteRoom = async (call: any, callback: any) => {
	try {
		const id = call.request.id;

		const deletedResult = await RoomModel.findByIdAndDelete({ _id: id });

		if (!deletedResult?.$isDeleted) return callback({ code: grpc.status.INTERNAL, message: "FAILED_DELETE_ROOM" });

		callback(null, { message: "SUCCESS_DELETE_ROOM" });
	} catch (error) {
		callback(error, null);
	}
};
