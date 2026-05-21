import { ZodError } from "zod";
import { NextFunction, Request, Response } from "express";
import { error } from "console";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (err instanceof SyntaxError && "body" in error) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON Format"
    });
  };
  
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.issues.map((err) => ({
        field: err.path.join(""),
        message: err.message
      }))
    });
  };

  if (err instanceof Error) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  };

  return res.status(500).json({
    success: false,
    message: "Internal Server Error"
  })
}