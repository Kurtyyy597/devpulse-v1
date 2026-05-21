import type { Task } from "../../../../shared/types/tasks/tasks";
import type { FilterTasks } from "../../../../shared/types/tasks/FilterTasks";
import { CreateTaskDto, UpdateTaskDto } from "../schemas/Tasks/taskSchema";
import { getDuplicatedCreated } from "../../../../shared/helper-functions/tasks/getDuplicateCreated";
import { isTaskModified } from "../../../../shared/helper-functions/tasks/isUpdateValid";
import { getTasksFilter } from "../../../../shared/helper-functions/tasks/getTasksFilter";
import { getSortTasks } from "../../../../shared/helper-functions/tasks/getSortTasks";
import {validateTaskTransition} from "../../../../shared/helper-functions/tasks/isStatusTransitionsValid";

export const getAllTasksService = (tasks: Task[], filters: FilterTasks) => {
  const visibleTasks = tasks.filter((t) => t.archivedAt === null);

  const filteredTasks = getTasksFilter(filters, visibleTasks);
  const sortedTasks = getSortTasks(filters.sort, filteredTasks);

  return sortedTasks;
};

export const getOneTaskService = (id: string, tasks: Task[]) => {
  const task = tasks.find((t) => t.id === id && t.archivedAt === null);

  if (!task) {
    throw new Error("Task not found");
  };

  return task;
}

export const createTaskService = (data: CreateTaskDto, tasks: Task[]) => {

  const isDuplicated = getDuplicatedCreated(tasks, data)

  if (isDuplicated) {
    throw new Error("Task already exist, try again");
  };

  const newDescription = data.description ?? ""
  const newTask: Task = {
    id: crypto.randomUUID(),
    userId: crypto.randomUUID(),
    ...data,
    completed: false,
    createdAt: Date.now(),
    completedAt: null,
    updatedAt: null,
    archivedAt: null,
    dueDate: data.dueDate ?? null,

    ...(data.description && {
      description: newDescription,
    }),
  };
  tasks.push(newTask);

  return newTask;
}

export const updateTaskService = (
  id: string,
  updated: UpdateTaskDto,
  tasks: Task[]
) => {
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    throw new Error("Task not found");
  };

  const isUpdated = isTaskModified(
    task,
    updated
  );

  if (!isUpdated) {
    throw new Error("No changes detected");
  };

  if (updated.status !== undefined) {
    validateTaskTransition(task.status, updated.status);
  };

  if (task.archivedAt !== null) {
    throw new Error("Deleted tasks cannot be updated, restore them first");
  };

  Object.assign(task, {
    ...updated,
    updatedAt: Date.now(),
  });

  return task;
};

export const archiveTaskService = (id: string, tasks: Task[]) => {
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    throw new Error("Task ID not found");
  };

  if (task.archivedAt !== null) {
    throw new Error("This task is already deleted");
  };

  task.archivedAt = Date.now();
  task.updatedAt = Date.now();

  return task
};

export const restoreArchivedTaskService = (id: string, tasks: Task[]) => {
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    throw new Error("Task not found");
  };

  if (task.archivedAt === null) {
    throw new Error("This task is not archived yet!");
  };

  task.archivedAt = null;
  task.updatedAt = Date.now();

  return task
};

export const permanentlyRemoveTaskService = (id: string, tasks: Task[]) => {
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    throw new Error("Task not found");
  };

  const deletedTask = tasks[index];
  
  if (!deletedTask) {
    throw new Error("Deleted task not found")
  };

  if (deletedTask.archivedAt === null) {
    throw new Error("Task must be archived first");
  }

  tasks.splice(index, 1);

  return deletedTask
};







