import type { FilterStudents } from "../types/Students/FilterStudents";
import type { SortStudents } from "../types/Students/SortStudents";

export type ParseFilterTypes = {
  search?: string;
  course?: string;
  year?: string;
  active?: string;
  sort?: string;
};

export function parseFilter(filters: ParseFilterTypes): FilterStudents {
  const parsedActive =
    filters.active === "true"
      ? true
      : filters.active === "false"
        ? false
        : undefined;

  return {
    search: filters.search ?? "",

    course: filters.course ?? "all",

    year: filters.year ?? "all",

   ...(parsedActive !== undefined ? {
    active: parsedActive  
   } : {}
  ),

    sort: (filters.sort as SortStudents) ?? "name-asc",
  };
}
