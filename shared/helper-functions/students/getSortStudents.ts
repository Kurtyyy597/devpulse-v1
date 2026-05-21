import type { SortStudents } from "../../types/Students/SortStudents";
import type { Student } from "../types/Student";

type ValidDirection =
| "asc"
| "desc"

export function getSortStudents(sort: SortStudents, students: Student[]) {
  if (!sort) return students;

  const [field, direction] = sort.split("-") as [keyof Student, ValidDirection ];

  return [...students].sort((a, b) => {
    const aval = a[field];
    const bval = b[field];

    if (typeof aval === "string" && typeof bval === "string") {
      return direction === "asc" ?
      aval.localeCompare(bval) :
      bval.localeCompare(aval)
    };

    if (typeof aval === "number" && typeof bval === "number") {
      return direction === "asc" ?
      aval - bval :
      bval - aval 
    };

    return 0;
  })
}