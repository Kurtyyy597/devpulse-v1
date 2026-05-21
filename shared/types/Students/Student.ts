import type { YEAR, COURSE } from "../schemas/userSchemas";


export type Student = {
  id: string ;
  name: string;
  age: number;
  email: string;
  contact: string;
  isActive: boolean;
  year: YEAR;
  course: COURSE
  createdAt: number;
  updatedAt: number | null;
};