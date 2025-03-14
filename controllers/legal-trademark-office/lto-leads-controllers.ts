import { Request, Response, NextFunction } from "express";

import LtoLeads from "../../models/legal-trademark-office/lto-leads-model.js";

import { CatchAsyncErrors } from "../../utils/catch-async-errors.js";
import { ErrorHandler } from "../../utils/error-handler.js";

// GET ALL THE LEADS FUNCTION
export const GetLtoLeadsFunction = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leads = await LtoLeads.find({});
      if (!leads || leads.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No leads found.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Fetched all LTO leads successfully.",
        data: leads,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
