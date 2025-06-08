import express from "express";
import { createPlayer, findUser } from "../controllers/player.controller.js";

const router = express.Router();

router.post("/", createPlayer);
router.get("/", findUser);

export default router;
