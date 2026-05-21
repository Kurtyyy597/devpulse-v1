import { Router } from "express";
import {
  getStudentsController,
  getOneStudentController,
  updateStudentController,
  createStudentController,
  deleteStudentController
} from "../controller/student.controller";

import { validate } from "../middleware/validate";

import { createStudentSchema, updateStudentSchema } from "../../../../shared/schemas/user/userSchemas";


const router = Router();

router.get("/", getStudentsController);

router.get("/:id", getOneStudentController);

router.post("/", validate(createStudentSchema), createStudentController);

router.patch("/:id", validate(updateStudentSchema), updateStudentController);

router.delete("/:id", deleteStudentController);

export default router;