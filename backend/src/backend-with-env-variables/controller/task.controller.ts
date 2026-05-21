import asyncHandler from "express-async-handler";
import { ParseFilterPropsTasks } from "../../../../shared/helper-functions/tasks/getParseFilterTask";
import { Request, Response } from "express";
import type { Task } from "../../../../shared/types/tasks/tasks";
import * as userService from "../service/task.service";
import { getParseFilterTasks } from "../../../../shared/helper-functions/tasks/getParseFilterTask";
import { CreateTaskDto, UpdateTaskDto } from "../schemas/Tasks/taskSchema";

let tasks: Task[] = [];

export const getAllTasksController = 
asyncHandler(async (
  req: Request<{}, {}, {}, ParseFilterPropsTasks>,
  res: Response
) => {
  const parseFiltredTasks = getParseFilterTasks(req.query);
  const allTasks = userService.getAllTasksService(tasks, parseFiltredTasks);
  
  res.status(200).json({
    success: true,
    message: "All Tasks Fetched successfully",
    data: allTasks
  });
});


export const getOneTaskController =
asyncHandler(async (
  req: Request<{id: string}>,
  res: Response
  ) => {
    const task = userService.getOneTaskService(req.params.id, tasks);

    res.status(200).json({
      success: true,
      message: `${task.title} successfully fetched`,
      data: task
    });
  }
);


export const createTaskController = 
asyncHandler(async (
  req: Request<{}, {}, CreateTaskDto>,
  res: Response
  ) => {
    const getCreatedTaskService = userService.createTaskService(req.body, tasks);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: getCreatedTaskService
    });
  }
);

export const updateTaskController = 
asyncHandler(async (
  req: Request<{id: string}, {}, UpdateTaskDto>,
  res: Response
  ) => {
    const updatedTask = userService.updateTaskService(req.params.id, req.body, tasks);

    res.status(200).json({
      success: true,
      message: "task updated successfully",
      data: updatedTask
    });
  }
);


export const archiveTaskController = 
asyncHandler(async (
  req: Request<{id: string}>,
  res: Response,
  ) => {
    const deletedTask = userService.archiveTaskService(req.params.id, tasks);

    res.status(200).json({
      success: true,
      message: "Task deleted Successfully",
      data: deletedTask
    });
  }
);

export const restoreTaskController = 
asyncHandler(async (
  req: Request<{id: string}>,
  res: Response
  ) => {
    const restoredTask = userService.restoreArchivedTaskService(req.params.id, tasks);

    res.status(200).json({
      success: true,
      message: "Task restored succesfully",
      data: restoredTask
    });
  }
);

export const permanentDeleteController = 
asyncHandler(async (
  req: Request<{id: string}>,
  res: Response
  ) => {
    const deletedTask = userService.permanentlyRemoveTaskService(req.params.id, tasks);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: deletedTask
    });
  }
)

