import cors from "cors";
import express from "express";
import apiRoutes from "./src/routes/index.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api", apiRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default app;
