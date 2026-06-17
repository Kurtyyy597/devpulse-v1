import type { Session } from "../../../../shared/types/sessions";
import type { CreateSessionForm } from "../../types/forms/CreateSessionForm";
import { normalizeText } from "../../../../shared/helper-functions/normalizedText/normalizeText";
import { AppError } from "../../../../shared/errors/appError";

export function throwIfSameSessionCreated(
  current: Session[],
  next: CreateSessionForm,
) {
  return current.some((curr) => {
    const result =
      normalizeText(curr.title ?? "") === normalizeText(next.title ?? "") &&
      normalizeText(curr.description ?? "") ===
        normalizeText(next.description ?? "") &&
      normalizeText(curr.mood ?? "") === normalizeText(next.mood ?? "") &&
      (curr.dueDate ?? 0) === (next.dueDate ?? 0) &&
      (curr.duration ?? 0) === (next.duration ?? 0);

    if (result) {
      throw new AppError("This session is already existing", 400);
    }
  });
}
