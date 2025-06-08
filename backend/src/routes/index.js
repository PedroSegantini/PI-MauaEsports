import express from "express";
import contentRoutes from "./content.routes.js";
import playerRoutes from "./player.routes.js";

const router = express.Router();

router.use("/players", playerRoutes);
router.use("/content", contentRoutes);

export default router;
