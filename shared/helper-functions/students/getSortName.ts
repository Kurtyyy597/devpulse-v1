import type { SortStudents } from "../types/Students/SortStudents";


export function getSortName(): Record<SortStudents, string> {
  return {
    "name-asc": "Name ↑",
    "name-desc": "Name ↓",
    "age-asc": "Youngest ↑",
    "age-desc": "Oldest ↓",
    "createdAt-asc": "Newest ↑",
    "createdAt-desc": "Oldest ↓",
    "updatedAt-asc": "Modified ↑",
    "updatedAt-desc": "Modified ↓"
  };
};










