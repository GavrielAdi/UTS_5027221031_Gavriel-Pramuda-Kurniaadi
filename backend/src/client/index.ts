import dotenv from "dotenv";
import createHttpError from "http-errors";
import express, { NextFunction, Request } from "express";
import cors from "cors";

import { appListener, port } from "./config/config";

import allRoutes from "./routes/routes";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(allRoutes);

app.use((req: Request, _, next: NextFunction) => {
	next(createHttpError.NotFound(`Can't find ${req.originalUrl} on the server!`));
});

app.listen(port, appListener);
