import express from "express";
import {
  getAllContent,
  updateContent,
} from "../controllers/content.controller.js";

const router = express.Router();

router.get("/", getAllContent);

router.patch("/:containerId", updateContent);

export default router;
