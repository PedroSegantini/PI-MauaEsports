import express from "express";
import contentRoutes from "./content.routes.js";
import playerRoutes from "./player.routes.js";
import paeRoutes from "./pae.routes.js";

const router = express.Router();

router.use("/players", playerRoutes);
router.use("/content", contentRoutes);
router.use("/", paeRoutes); // para habilitar /api/my-hours

export default router;
