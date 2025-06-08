import express from "express";
import { getMyHours } from "../controllers/pae.controller.js";

const router = express.Router();

router.get("/my-hours", getMyHours);

export default router;
