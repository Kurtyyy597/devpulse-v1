import type { Student } from "../../../../shared/types/Student";
import { type CreateStudentDto, type UpdateStudentDto } from "../../../../shared/schemas/user/userSchemas";
import { getFilterStudents } from "../../../../shared/helper-functions/students/getFilterStudents";
import { getSortStudents } from "../../../../shared/helper-functions/students/getSortStudents";
import { FilterStudents } from "../../../../shared/types/Students/FilterStudents";
import { normalizeText } from "../../../../shared/helper-functions/normalizeText";
import { getDuplicateStudent } from "../../../../shared/helper-functions/students/getDuplicateStudent";
import { isStudentUnchanged } from "../../../../shared/helper-functions/students/getSameStudent";


export const getAllStudent = (students: Student[], filter: FilterStudents) => {
  const filtered = getFilterStudents(filter, students);
  const sorted = getSortStudents(filter.sort, filtered);

  return sorted;
};

export const getOneStudent = (id: string | undefined, students: Student[]) => {
  return students.find((s) => s.id === id);
};

export const createStudent = (data: CreateStudentDto, students: Student[]) => {

  const isDuplicate = getDuplicateStudent(data, students);

  if (isDuplicate) {
    throw new Error("Student already existing")
  }
  
  const newStudent: Student = {
    id: crypto.randomUUID(),
    ...data,
    createdAt: Date.now(),
    updatedAt: null,
    isActive: true,
    
  }
  return newStudent;
};

export const updateStudentService = (
  id: string | undefined,
  data: UpdateStudentDto,
  students: Student[],
) => {
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    throw new Error("Student not found");
  }

  const student = students[index]!;

  const isUnchanged = isStudentUnchanged(student, data);

  if (isUnchanged) {
    throw new Error("No changes detected");
  }

  const cleanData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined),
  );

  students[index] = {
    ...student,
    ...cleanData,
    updatedAt: Date.now(),
  };

  return students[index];
};
export const deleteStudentService = (id: string | undefined, students: Student[]) => {
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    throw new Error("Student not found");
  };

  students.splice(index, 1);

  return students;
}; 



