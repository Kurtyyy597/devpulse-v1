import { technologies } from "../../../../shared/data/technologies";
import { normalizeText } from "../../../../shared/helper-functions/normalizedText/normalizeText";
import { AppError } from "../../../../shared/errors/appError";

export function validateSkills(
  skills: string[]
) {
  const invalidSkills = skills.filter((s) => {
    return !technologies.some((t) => normalizeText(t.name) === normalizeText(s))
  });

  if (invalidSkills.length > 0) {
    throw new AppError(`Invalid skills: ${invalidSkills.join(", ")}`, 400)
  }
};