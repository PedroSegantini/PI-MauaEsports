import express from "express";
import {
  createPlayer,
  deletePlayer,
  findUser,
  getMe,
} from "../controllers/player.controller.js";

const router = express.Router();

router.get("/me", getMe);

router.post("/", createPlayer);
router.get("/", findUser);
router.delete("/", deletePlayer);

export default router;
