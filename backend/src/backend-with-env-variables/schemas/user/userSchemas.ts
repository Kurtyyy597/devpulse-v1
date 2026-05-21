import {z} from "zod";

export const years = 
[
  "1st-year",
  "2nd-year",
  "3rd-year",
  "4th-year"
] as const;

export const courses = [
  "bs-computer-science",
  "bs-information-technology",
  "bs-information-system",
  "bs-software-engineering",
  "bs-accountancy",
  "bs-business-administration",
  "bs-psychology",
  "bs-nursing",
  "bs-civil-engineering",
  "bs-mechanical-engineering",
  "bs-education",
  "bs-tourism-management",
] as const;

export type YEAR = 
typeof years[number]

export type COURSE =
typeof courses[number];

export const createStudentSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),

  age: z.number().min(1, "Age should be 1-99").max(99, "Age should be 1-99"),

  contact: z.string().regex(/^09\d{9}$/, "Invalid contact number"),

  email: z.string().email("Invalid email format"),

  year: z.enum(years),

  course: z.enum(courses),
});

export const updateStudentSchema = createStudentSchema.partial();

export type CreateStudentDto = 
z.infer<typeof createStudentSchema>;

export type UpdateStudentDto =
z.infer<typeof updateStudentSchema>;