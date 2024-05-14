import express from "express";

import * as roomControllers from "../controllers/room";

const router = express.Router();

router.get("/room", roomControllers.getAllRoom);
router.get("/room/:id", roomControllers.getRoom);
router.post("/room", roomControllers.createRoom);
router.patch("/room/:id", roomControllers.updateRoom);
router.delete("/room/:id", roomControllers.deleteRoom);

export default router;
