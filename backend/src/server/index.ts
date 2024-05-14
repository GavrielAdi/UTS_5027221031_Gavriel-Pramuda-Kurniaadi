import path from "path";
import dotenv from "dotenv";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

import DBConnection from "./config/database";

import { getRoom, getAllRoom, createRoom, updateRoom, deleteRoom } from "./controllers/room";

dotenv.config();
DBConnection();

const protoPath = path.join(__dirname, "../proto/room.proto");

const roomProto = protoLoader.loadSync(protoPath);
const { roomPackage } = grpc.loadPackageDefinition(roomProto) as any;

const server = new grpc.Server();
server.addService(roomPackage.RoomService.service, {
	getRoom,
	getAllRoom,
	createRoom,
	updateRoom,
	deleteRoom,
});

server.bindAsync("localhost:3001", grpc.ServerCredentials.createInsecure(), (error, port) => {
	if (error) {
		console.error(error.message);
	} else {
		console.log(`\ngRPC server is running on port ${port}`);
		server;
	}
});
