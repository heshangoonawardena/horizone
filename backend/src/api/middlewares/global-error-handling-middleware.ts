import { NextFunction, Request, Response } from "express";

const globalErrorHandlingMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(error);
  if (error.name === "NotFoundError") {
    return res.status(404).json({ message: error.message });
  }
  if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }
  return res.status(500).json({ message: "Internal server error" }); 
};

export default globalErrorHandlingMiddleware;
