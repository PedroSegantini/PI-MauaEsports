import express from "express";
import {
  getTrainingSchedules,
  updateTrainingSchedule,
} from "../controllers/trainings.controller.js";

const router = express.Router();

router.get("/", getTrainingSchedules);
router.put("/:modalityId", updateTrainingSchedule);

export default router;
