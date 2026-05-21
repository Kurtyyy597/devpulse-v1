import { normalizeText } from "../normalizeText";
import type { UpdateStudentDto } from "../../../backend/src/backend-with-env-variables/schemas/user/userSchemas";
import type { Student } from "../types/Student";

export function isStudentUnchanged(current: Student, update: UpdateStudentDto): boolean {
  return (
    normalizeText(update.name ?? "") === normalizeText(current.name) &&
    normalizeText(String(update.age)) === normalizeText(String(current.age)) &&
    normalizeText(update.email ?? "") === normalizeText(current.email) &&
    normalizeText(update.course ?? "") === normalizeText(current.course) &&
    normalizeText(update.year ?? "") === normalizeText(current.year) &&
    normalizeText(update.contact ?? "") === normalizeText(current.contact)
  );
};