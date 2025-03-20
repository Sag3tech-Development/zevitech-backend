import { Request, Response, NextFunction } from "express";

import { ErrorHandler } from "../../utils/error-handler.js";

export const TokenExpiredError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new ErrorHandler(
    "Your URL has expired. Please try again later.",
    400
  );

  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
