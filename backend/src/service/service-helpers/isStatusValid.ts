import type { SessionStatus } from "../../../../shared/types/SessionStatus";

export const validStatusesTransition: Record<SessionStatus, SessionStatus[]> = {
  planned: ["planned", "open"],
  open: ["open", "in-progress"],
  "in-progress": ["in-progress", "halfway"],
  halfway: ["halfway", "almost-done"],
  "almost-done": ["almost-done", "completed"],
  completed: ["completed", "closed"],
  closed: ["closed"],
};

export function validateStatusTransition(
  current: SessionStatus,
  next: SessionStatus,
) {
  return validStatusesTransition[current].includes(next);
}
