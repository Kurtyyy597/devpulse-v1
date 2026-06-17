import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";


import { ZodTypeAny } from "zod";

export const validate = (
  schema: ZodTypeAny,
  target: "body" | "query" | "params"
) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req[target] = schema.parse(req[target]);

  next();
};