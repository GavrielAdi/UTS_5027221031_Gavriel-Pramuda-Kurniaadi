import mongoose from "mongoose";

const user = process.env.MONGO_DB_USER || "admin";
const password = process.env.MONGO_DB_PASSWORD || "admin";
const dbName = process.env.MONGO_DB_NAME || "test";

const mongoURI = `mongodb+srv://${user}:${password}@AtlasCluster.lgf6leh.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=AtlasCluster`;

const connectDB = async () => {
	mongoose.set("strictQuery", false);

	mongoose.connect(mongoURI);

	mongoose.connection.on("connected", () => {
		console.log("Mongoose connected to MongoDB!\n");
	});

	mongoose.connection.on("disconnected", () => {
		console.log("Mongoose disconnected!");
	});

	process.on("SIGINT", async () => {
		await mongoose.connection.close();
		process.exit(0);
	});
};

export default connectDB;
