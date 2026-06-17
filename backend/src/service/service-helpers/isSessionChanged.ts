import type { Session } from "../../../../shared/types/sessions";
import type { UpdateSessionForm } from "../../../../shared/types/forms/UpdateSessionForm";

import { normalizeText } from "../../../../shared/helper-functions/normalizedText/normalizeText";

const normalizeSkills = (skills: string[]) =>
  [...skills].map(normalizeText).sort().join(", ");

export function isSessionChanged(
  current: Session,
  updates: UpdateSessionForm,
): boolean {
  if (
    updates.title !== undefined &&
    normalizeText(updates.title) !== normalizeText(current.title)
  ) {
    return true;
  }

  if (
    updates.description !== undefined &&
    normalizeText(updates.description) !==
      normalizeText(current.description ?? "")
  ) {
    return true;
  }

  if (updates.dueDate !== undefined && updates.dueDate !== current.dueDate) {
    return true;
  }

  if (updates.duration !== undefined && updates.duration !== current.duration) {
    return true;
  }

  if (
    updates.mood !== undefined &&
    normalizeText(updates.mood) !== normalizeText(current.mood ?? "")
  ) {
    return true;
  }

  if (
    updates.status !== undefined &&
    normalizeText(updates.status) !== normalizeText(current.status)
  ) {
    return true;
  }

  if (updates.skills !== undefined) {
    const nextTech = normalizeSkills(updates.skills ?? []);
    const currentTech = normalizeSkills(current.skills ?? []);

    if (nextTech !== currentTech) {
      return true;
    }
  }

  return false;
}
