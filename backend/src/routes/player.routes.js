import express from "express";
import {
  createPlayer,
  deletePlayer,
  findUser,
  getMe,
  updatePlayer,
} from "../controllers/player.controller.js";

const router = express.Router();

router.get("/me", getMe);

router.post("/", createPlayer);
router.get("/", findUser);
router.delete("/:email", deletePlayer);
router.put("/:email", updatePlayer);

export default router;
