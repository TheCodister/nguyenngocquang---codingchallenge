import cors from "cors";
import express from "express";
import conversionRoutes from "./routes/conversionRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/conversions", conversionRoutes);

export default app;
