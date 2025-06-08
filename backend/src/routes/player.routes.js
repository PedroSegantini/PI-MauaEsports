import express from "express";
import {
  createPlayer,
  findUser,
  getMe,
} from "../controllers/player.controller.js";

const router = express.Router();

router.get("/me", getMe);

router.post("/", createPlayer);
router.get("/", findUser);

export default router;
