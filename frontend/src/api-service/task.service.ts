import {api} from "./taskApiService"
import type { CreateTaskDto } from "../../../backend/src/backend-with-env-variables/schemas/Tasks/taskSchema";
import type { UpdateTaskDto } from "../../../backend/src/backend-with-env-variables/schemas/Tasks/taskSchema";
import type { FilterTasks } from "../../../shared/types/tasks/FilterTasks";
import type { Task } from "../../../shared/types/tasks/tasks";

export type ApiResponse<D> = {
  success: boolean;
  message: string;
  data: D
};

export const getAllTasksService = async (filters?: FilterTasks) => {
  const response = await api.get<ApiResponse<Task[]>>("/tasks", {
    params: filters
  });

  return response.data.data
};

export const getOneTaskService = async (id: string) => {
  const response = await api.get<ApiResponse<Task>>(`/tasks/${id}`);

  return response.data.data;
};

export const createTaskService = async (data: CreateTaskDto) => {
  const response = await api.post<ApiResponse<Task>>("/tasks", data);

  return response.data.data;
};

export const updateTaskService = async (id: string, updated: UpdateTaskDto) => {
  const response = await api.patch<ApiResponse<Task>>(`/tasks/${id}`, updated);

  return response.data.data
};

export const archiveTaskService = async (id: string) => {
  const response = await api.patch<ApiResponse<Task>>(`/tasks/archive/${id}`);

  return response.data.data;
};

export const restoreTaskService = async (id: string) => {
  const response = await api.patch<ApiResponse<Task>>(`/tasks/restore/${id}`);

  return response.data.data
};

export const permanentlyRemoveTaskService = async (id: string) => {
  const response = await api.delete<ApiResponse<Task>>(`/tasks/permanent/${id}`);

  return response.data.data
};

