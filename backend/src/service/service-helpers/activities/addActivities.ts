import type { SessionField } from "../../../../../shared/types/SessionFields";
import type { SessionActivity } from "../../../../../shared/types/SessionActivity";

export const addActivity = (
  field: SessionField,
  from: string,
  to: string,
): SessionActivity => {
  return {
    activityId: crypto.randomUUID(),
    field,
    from,
    to,
    createdAt: Date.now(),
  };
};
