import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: err.flatten()
    })
  };
  if (err instanceof Error) {
    return res.json(500).json({
      success: false,
      message: err.message
    })
  };

  return res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
}