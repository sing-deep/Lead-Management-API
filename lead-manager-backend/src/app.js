import express from "express";
import cors from "cors";
import leadRoutes from "./routes/lead.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/", leadRoutes);

export default app;