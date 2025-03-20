import { Request, Response, NextFunction } from "express";

import { ErrorHandler } from "../../utils/error-handler.js";

export const PermissionError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new ErrorHandler(
    `Insufficient permissions: ${err.message}`,
    403
  );

  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
