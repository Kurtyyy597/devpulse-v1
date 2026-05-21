import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import route from "./backend-with-env-variables/routes/tasks.routes";
import { errorHandler } from "./backend-with-env-variables/middleware/task.middleware";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000

app.use(cors());

app.use(express.json());

app.use("/tasks", route)

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend is running on ${PORT}`);
});

console.log(process.env.NODE_ENV);
