import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { Response } from "express";

import router from "./routes/session.routes";

import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();

app.get("/", (_, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API is running"
  })
})

app.use(cors());

app.use(express.json());

app.use("/sessions", router);

app.use(errorHandler);

app.use(express.urlencoded({ extended: true }));

export default app;




