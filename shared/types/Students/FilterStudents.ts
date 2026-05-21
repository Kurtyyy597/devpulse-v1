import type { YEAR } from "../../../backend/src/backend-with-env-variables/schemas/user/userSchemas";
import type { COURSE } from "../../../backend/src/backend-with-env-variables/schemas/user/userSchemas";
import type { SortStudents } from "./SortStudents";

export type FilterStudents = {
  search: string;
  year: YEAR | "all" | string;
  course: COURSE | "all" | string; 
  active?: boolean;
  sort: SortStudents
};

