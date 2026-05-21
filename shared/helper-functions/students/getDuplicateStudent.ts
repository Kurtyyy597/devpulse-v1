import type { CreateStudentDto } from "../../../backend/src/backend-with-env-variables/schemas/user/userSchemas";
import type { Student } from "../types/Student";
import { normalizeText } from "../normalizeText";

export function getDuplicateStudent(
  existingStudent: CreateStudentDto,
  students: Student[],
): boolean {
  return students.some((student) => {
    return (
      normalizeText(student.name) === normalizeText(existingStudent.name) &&
      normalizeText(student.email) === normalizeText(existingStudent.email) &&
      normalizeText(student.course) === normalizeText(existingStudent.course) &&
      normalizeText(student.year) === normalizeText(existingStudent.year)
    );
  });
}
