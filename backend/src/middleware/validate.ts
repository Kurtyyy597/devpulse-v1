import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";


export const validate = <T> (
  schema: ZodSchema<T>,
  target: "body" | "query" | "params"
)=> (
  req: Request,
  res: Response,
  next: NextFunction
)=> {
  req[target] = schema.parse(req[target]);

  next();
}