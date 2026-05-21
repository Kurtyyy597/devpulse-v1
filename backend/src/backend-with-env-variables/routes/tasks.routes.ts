import { Router } from 'express';
import {
  getAllTasksController,
  getOneTaskController,
  createTaskController,
  updateTaskController,
  archiveTaskController,
  permanentDeleteController,
  restoreTaskController
} from "../controller/task.controller"
import { validate } from '../middleware/validate';
import { createTaskSchema } from '../schemas/Tasks/taskSchema';
import { updateTaskSchemas } from '../schemas/Tasks/taskSchema';

const route = Router();


route.get("/", getAllTasksController);
route.get("/:id", getOneTaskController);
route.post("/", validate(createTaskSchema), createTaskController);
route.patch("/:id", validate(updateTaskSchemas), updateTaskController);
route.patch("/archive/:id", archiveTaskController);
route.patch("/restore/:id", restoreTaskController);
route.delete("/permanent/:id", permanentDeleteController);

export default route;