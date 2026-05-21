import type { TaskStatus } from "../../../backend/src/backend-with-env-variables/schemas/Tasks/taskSchema";

export const validTransitions : Record<
TaskStatus,
TaskStatus[]> = {
  "open": ["in-progress", "closed"],
  "in-progress": ["done", "closed"],
  "done": ["closed"],
  "closed": []
};


export function validateTaskTransition (
  currentStatus: TaskStatus,
  nextStatus: TaskStatus
) {
  if (currentStatus === nextStatus) return true;

  const isValid = validTransitions[currentStatus].includes(nextStatus);

  if (!isValid) {
    throw new Error(`Invalid transition. Cannot transition from ${currentStatus} to ${nextStatus}`);
  };

  return true;
}