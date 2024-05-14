import path from "path";
import * as protoLoader from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";
import { NextFunction, Response } from "express";

const protoPath = path.join(__dirname, "../../proto/room.proto");

const options = {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true,
};

const roomProto = protoLoader.loadSync(protoPath, options);
const { roomPackage } = grpc.loadPackageDefinition(roomProto) as any;
const roomClient = new roomPackage.RoomService(process.env.ROOM_SERVICE_URL, grpc.credentials.createInsecure());

export const getRoom = async (req: any, res: Response, next: NextFunction) => {
	await roomClient.GetRoom({ id: req.params.id }, (error: grpc.ServiceError, data: any) => {
		if (error) return next(error);

		res.status(200).json({
			status: true,
			code: 200,
			message: "Room found!",
			room: data,
		});
	});
};

export const getAllRoom = async (req: any, res: Response, next: NextFunction) => {
	await roomClient.GetAllRoom({}, (error: grpc.ServiceError, data: any) => {
		if (error) return next(error);

		res.status(200).json({
			status: true,
			code: 200,
			message: "Rooms found!",
			rooms: data.rooms,
		});
	});
};

export const createRoom = async (req: any, res: Response, next: NextFunction) => {
	try {
		if (!req.body.tags) req.body.tags = [];

		await roomClient.CreateRoom(req.body, (error: grpc.ServiceError, data: any) => {
			if (error) return next(error);

			delete req.body.tags;

			res.status(201).json({
				status: true,
				code: 201,
				message: "Room created successfully!",
				room: data,
			});
		});
	} catch (error) {
		next(error);
	}
};

export const updateRoom = async (req: any, res: Response, next: NextFunction) => {
	try {
		if (!req.body.tags) req.body.tags = [];

		const dataParams = req.params;
		const dataBody = req.body;

		const room = {
			_id: dataParams.id,
			...dataBody,
		};

		await roomClient.UpdateRoom(room, (error: grpc.ServiceError, data: any) => {
			if (error) return next(error);

			res.status(200).json({
				status: true,
				code: 200,
				message: "Room updated successfully!",
				updatedData: data,
			});
		});
	} catch (error) {
		next(error);
	}
};

export const deleteRoom = async (req: any, res: Response, next: NextFunction) => {
	try {
		const dataParams = req.params;

		await roomClient.DeleteRoom({ id: dataParams.id }, (error: grpc.ServiceError, data: any) => {
			if (error) return next(error);

			res.status(200).json({
				status: true,
				code: 200,
				message: "Room deleted successfully!",
			});
		});
	} catch (error) {
		next(error);
	}
};
