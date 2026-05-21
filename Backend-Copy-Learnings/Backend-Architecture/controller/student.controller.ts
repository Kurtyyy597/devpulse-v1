import { Request, Response } from "express";
import * as studentService from "../services/student.service";
import type { Student } from "../../../../shared/types/Student";
import { parseFilter } from "../../../../shared/helper-functions/parseFilter";
import asyncHandler from "express-async-handler";

let students: Student[] = [];

export const getStudentsController =
asyncHandler(async (
  req: Request,
  res: Response
  ) => {
    const parsedFilter = parseFilter(req.query);
    const studentsData = studentService.getAllStudent(students, parsedFilter);
    
    res.status(200).json({
      success: true,
      message: "Students successfully fetched",
      data: studentsData,
    });
  }
);

export const getOneStudentController = asyncHandler(
async(req: Request, res: Response) => {
  const student = studentService.getOneStudent(req.params.id, students);

  if (!student) {
    res.status(404).json({
    success: false,
    message: "Student not found",
    });

    return;
  }

  res.status(200).json({
    success: true,
    message: "Student fetched successfully",
    data: student,
    });
  },
);

export const createStudentController =
asyncHandler(async (
  req: Request,
  res: Response
  ) => {
  const createdStudent = studentService.createStudent(req.body, students);
    
  const updatedStudents = [...students, createdStudent]

  students = updatedStudents;

  res.status(201).json({
    success: true,
    message: "Student successfully created",
    data: createdStudent,
    });
  }
);

export const updateStudentController =
asyncHandler(async (
  req: Request,
  res: Response
  ) => {
  const updatedStudent = studentService.updateStudentService(req.params.id, req.body, students);

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: updatedStudent,
    });
  }
);

export const deleteStudentController =
asyncHandler(async (
  req: Request,
  res: Response
  ) => {
  const deletedStudent = studentService.deleteStudentService(req.params.id, students);

  res.status(200).json({
    success: true,
    message: "Student successfully deleted",
    data: deletedStudent
    })
  }
);