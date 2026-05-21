import type { FilterStudents } from "../types/Students/FilterStudents";

export const initialFilterStudents: FilterStudents = {
  search: "",
  course: "all",
  year: "all",
  active: false,
};