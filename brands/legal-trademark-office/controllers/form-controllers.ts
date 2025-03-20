import { Request, Response, NextFunction } from "express";
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";

import { config } from "../../../config.js";

import { PackageTypeEnum } from "brands/enums/package-type-enum.js";

import LegalTrademarkOfficeForm from "../models/form-model.js";

import { MoveFormToLead } from "../services/move-form-to-lead.js";

import { CatchAsyncErrors } from "../../../utils/catch-async-errors.js";
import { ErrorHandler } from "../../../utils/error-handler.js";
import { FormIdGenerator } from "../../../utils/form-id-generator.js";
import { FormStep01PrepareUserData } from "../utils/prepare-user-data.js";
import { SendMail } from "../utils/send-mails.js";
import { GetPackagePrice } from "../utils/get-package-price.js";

// STEP 1 FORM FUNCTION
export const LegalTrademarkOfficeFormStep01Function = CatchAsyncErrors(
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
      const formData = await LegalTrademarkOfficeForm.create({
        ...FormStep01PrepareUserData(req.body),
        formId,
      });

      await LegalTrademarkOfficeForm.findByIdAndUpdate(
        formData._id,
        {
          $set: {
            "formStepsCompletion.step01": true,
          },
        },
        { new: true }
      );

      await MoveFormToLead(formId);

      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const data = {
        client: formData,
        formId: formId,
      };

      const templatePath = path.join(
        __dirname,
        "../mails",
        "form-step-01-complete-mail.ejs"
      );

      await ejs.renderFile(templatePath, data);

      const AdminMail = config.legalTrademarkOfficeSmtpMail;
      if (!AdminMail) {
        return next(
          new ErrorHandler("SMTP_MAIL environment variable is not set", 500)
        );
      }

      try {
        await SendMail({
          email: AdminMail,
          subject: "New Lead Generated",
          template: "form-step-01-complete-mail.ejs",
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

// STEP 2 FORM FUNCTION
export const LegalTrademarkOfficeFormStep02Function = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { formId } = req.params;
    const {
      protectionType,
      protectionName,
      protectionLogo,
      protectionLogoColorScheme,
      protectionLogoLiteralElements,
      protectionSlogan,
      isTrademarkInUse,
      trademarkFirstUseDate,
      trademarkFirstUseInCommerceDate,
      trademarkInUseOwnershipDetails,
      isIndividuallyOwnedTrademark,
      isUSBasedOrganization,
      organizationName,
      organizationType,
      organizationFormationCountry,
      organizationFormationState,
      organizationPosition,
      businessClassification,
    } = req.body;

    if (!formId) {
      return next(new ErrorHandler("Form ID is required.", 400));
    }

    const existingForm = await LegalTrademarkOfficeForm.findOne({ formId });
    if (!existingForm) {
      return next(new ErrorHandler("Form not found.", 404));
    }

    existingForm.formStepsCompletion ??= {
      step01: true,
      step02: false,
      step03: false,
      step04: false,
    };

    existingForm.protectionType = protectionType;
    existingForm.protectionName = protectionName;
    existingForm.protectionLogo = protectionLogo;
    existingForm.protectionLogoColorScheme = protectionLogoColorScheme;
    existingForm.protectionLogoLiteralElements = protectionLogoLiteralElements;
    existingForm.protectionSlogan = protectionSlogan;
    existingForm.isTrademarkInUse = isTrademarkInUse;
    existingForm.trademarkFirstUseDate = trademarkFirstUseDate;
    existingForm.trademarkFirstUseInCommerceDate =
      trademarkFirstUseInCommerceDate;
    existingForm.trademarkInUseOwnershipDetails =
      trademarkInUseOwnershipDetails;
    existingForm.isIndividuallyOwnedTrademark = isIndividuallyOwnedTrademark;
    existingForm.isUSBasedOrganization = isUSBasedOrganization;
    existingForm.organizationName = organizationName;
    existingForm.organizationType = organizationType;
    existingForm.organizationFormationCountry = organizationFormationCountry;
    existingForm.organizationFormationState = organizationFormationState;
    existingForm.organizationPosition = organizationPosition;
    existingForm.businessClassification = businessClassification;

    existingForm.formStepsCompletion.step02 = true;

    await existingForm.save();
    await MoveFormToLead(formId);

    res.status(200).json({
      success: true,
      message: "Form Step 2 Completed Successfully.",
      data: existingForm,
    });
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// STEP 3 FORM FUNCTION
export const LegalTrademarkOfficeFormStep03Function = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { formId } = req.params;
    const { packageType } = req.body;

    if (!formId) {
      return next(new ErrorHandler("Form ID is required.", 400));
    }

    if (
      !Object.values(PackageTypeEnum).includes(packageType as PackageTypeEnum)
    ) {
      return next(
        new ErrorHandler(
          `Invalid package type. Allowed values are: ${Object.values(
            PackageTypeEnum
          ).join(", ")}`,
          400
        )
      );
    }

    const existingForm = await LegalTrademarkOfficeForm.findOne({ formId });
    if (!existingForm) {
      return next(new ErrorHandler("Form not found.", 404));
    }

    existingForm.formStepsCompletion ??= {
      step01: true,
      step02: true,
      step03: false,
      step04: false,
    };

    existingForm.packageType = packageType;
    existingForm.packagePrice = GetPackagePrice(packageType);

    existingForm.formStepsCompletion.step03 = true;

    await existingForm.save();
    await MoveFormToLead(formId);

    res.status(200).json({
      success: true,
      message: "Form Step 3 Completed Successfully.",
      data: existingForm,
    });
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// STEP 4 FORM FUNCTION
export const LegalTrademarkOfficeFormStep04Function = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { formId } = req.params;
    const { isGovernmentFeeIncluded, isRushProcessingIncluded } = req.body;

    if (!formId) {
      return next(new ErrorHandler("Form ID is required.", 400));
    }

    const existingForm = await LegalTrademarkOfficeForm.findOne({ formId });
    if (!existingForm) {
      return next(new ErrorHandler("Form not found.", 404));
    }

    existingForm.formStepsCompletion ??= {
      step01: true,
      step02: true,
      step03: true,
      step04: false,
    };

    if (typeof isGovernmentFeeIncluded === "boolean") {
      existingForm.isGovernmentFeeIncluded = isGovernmentFeeIncluded;
      existingForm.isGovernmentFeeIncludedPrice = isGovernmentFeeIncluded
        ? 350
        : 0;
    }

    if (typeof isRushProcessingIncluded === "boolean") {
      existingForm.isRushProcessingIncluded = isRushProcessingIncluded;
      existingForm.isRushProcessingIncludedPrice = isRushProcessingIncluded
        ? 25
        : 0;
    }

    existingForm.totalAmount =
      (existingForm.packagePrice || 0) +
      (existingForm.isGovernmentFeeIncludedPrice || 0) +
      (existingForm.isRushProcessingIncludedPrice || 0);

    existingForm.formStepsCompletion.step04 = true;

    await existingForm.save();
    await MoveFormToLead(formId);

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const data = {
      client: existingForm.toObject(),
      formId,
    };

    const templatePath = path.join(
      __dirname,
      "../mails/form-step-04-complete-mail.ejs"
    );

    await ejs.renderFile(templatePath, data);

    const AdminMail = config.legalTrademarkOfficeSmtpMail;
    if (!AdminMail) {
      return next(
        new ErrorHandler("SMTP_MAIL environment variable is not set", 500)
      );
    }

    try {
      await SendMail({
        email: AdminMail,
        subject: `New Lead - Form ID: ${formId} is Ready for Review`,
        template: "form-step-04-complete-mail.ejs",
        data,
      });

      res.status(200).json({
        success: true,
        message: "Form Step 4 Completed Successfully.",
        data: existingForm,
      });
    } catch (emailError: any) {
      return next(new ErrorHandler(emailError.message, 400));
    }

    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
