import type { FilterStudents } from "../../types/Students/FilterStudents";
import type { Student } from "../types/Student";
import { normalizeText } from "../normalizeText";


export function getFilterStudents(
  filters: FilterStudents,
  students: Student[],
) {
  if (!filters) return students;

  return students.filter((s) => {
    const searchInput = normalizeText(filters.search);

    const searchableFields = [
      normalizeText(s.name),
      normalizeText(s.email),
      normalizeText(s.course),
      normalizeText(s.year),
    ];

    if (
      searchInput &&
      !searchableFields.some((field) => field.includes(searchInput))
    ) {
      return false;
    }

    if ( normalizeText(filters.course) !== "all" && normalizeText(s.course) !== normalizeText(filters.course)) {
      return false;
    }

    if ( normalizeText(filters.year) !== "all" && normalizeText(s.year) !== normalizeText(filters.year)) {
      return false;
    }

    if (typeof filters.active === "boolean") {
      if (s.isActive !== filters.active) {
        return false;
      }
    }

    return true;
  });
}
