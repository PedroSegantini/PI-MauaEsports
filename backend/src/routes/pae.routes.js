import express from "express";
import { getMyHours, getTeamHours } from "../controllers/pae.controller.js";

const router = express.Router();

router.get("/my-hours", getMyHours);
router.get("/team-hours", getTeamHours);

export default router;
