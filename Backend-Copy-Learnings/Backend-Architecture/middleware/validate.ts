import { Request, Response, NextFunction} from "express";

export const validate = (schema: any) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  schema.parse(req.body);

  next();
}