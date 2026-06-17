import { AppError } from "../../../../shared/errors/appError";


export function validateDate(dueDate?: number) {

    console.log("dueDate =", dueDate);
    console.log("type =", typeof dueDate);
    
  if (dueDate !== undefined) {
    const parsedDate = new Date(dueDate);

    if (Number.isNaN(parsedDate.getTime())) {
      throw new AppError("Invalid date", 400);
    };

    if (dueDate < Date.now()) {
      throw new AppError("Due date cannot be in the past", 400)
    }
  }
}