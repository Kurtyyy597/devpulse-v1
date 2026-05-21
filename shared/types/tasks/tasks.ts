import type { TaskStatus, TasksPriority } from "../../../backend/src/backend-with-env-variables/schemas/Tasks/taskSchema";

export type Task = {
  id: string;
  userId: string;

  title: string;
  description?: string;
  priority: TasksPriority;
  status: TaskStatus;
  completed: boolean;

  createdAt: number;
  updatedAt: number | null;
  archivedAt?: number | null;
  completedAt?: number | null;
  dueDate?: number | null;
};