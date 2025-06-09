import express from "express";
import contentRoutes from "./content.routes.js";
import paeRoutes from "./pae.routes.js";
import playerRoutes from "./player.routes.js";
import trainingsRoutes from "./trainings.routes.js";

const router = express.Router();

router.use("/players", playerRoutes);
router.use("/content", contentRoutes);
router.use("/", paeRoutes);
router.use("/trainings", trainingsRoutes);

export default router;
