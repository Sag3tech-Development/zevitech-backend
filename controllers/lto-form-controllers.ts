import { Request, Response, NextFunction } from "express";
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";

import { config } from "../config.js";

import LtoForm from "../models/lto-form.js";

import { CatchAsyncErrors } from "../utils/catch-async-errors.js";
import { ErrorHandler } from "../utils/error-handler.js";
import { LtoSendMail } from "../utils/send-mails.js";
import { LtoStep1FormPrepareUserData } from "../utils/prepare-user-data.js";
import { FormIdGenerator } from "utils/form-id-generator.js";

// STEP 1 FORM FUNCTION
export const LtoStep1FormFunction = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        firstName,
        lastName,
        state,
        city,
        address,
        zipCode,
        emailAddress,
        phoneNumber,
      } = req.body;

      if (
        !firstName ||
        !lastName ||
        !state ||
        !city ||
        !address ||
        !zipCode ||
        !emailAddress ||
        !phoneNumber
      ) {
        return next(
          new ErrorHandler("All required fields must be provided.", 400)
        );
      }

      const formId = FormIdGenerator();
      const formData = await LtoForm.create({
        ...LtoStep1FormPrepareUserData(req.body),
        formId,
      });

      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const data = {
        client: formData,
        formId: formId,
      };

      const templatePath = path.join(
        __dirname,
        "../mails",
        "lto-step-1-form-complete-mail.ejs"
      );

      await ejs.renderFile(templatePath, data);

      const AdminMail = config.ltoSmtpMail;
      if (!AdminMail) {
        return next(
          new ErrorHandler("SMTP_MAIL environment variable is not set", 500)
        );
      }

      try {
        await LtoSendMail({
          email: AdminMail,
          subject: "New Lead Generated",
          template: "lto-step-1-form-complete-mail.ejs",
          data,
        });

        res.status(201).json({
          success: true,
          message: "Form Step 1 Completed Successfully.",
          data: formData,
        });
      } catch (emailError: any) {
        return next(new ErrorHandler(emailError.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
