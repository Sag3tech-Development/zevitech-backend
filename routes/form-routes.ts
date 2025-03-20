import express from "express";

import {
  LegalTrademarkOfficeFormStep01Function,
  LegalTrademarkOfficeFormStep02Function,
  LegalTrademarkOfficeFormStep03Function,
  LegalTrademarkOfficeFormStep04Function,
} from "../brands/legal-trademark-office/controllers/form-controllers.js";

const FormRouter = express.Router();

// LEGAL TRADEMARK OFFICE
FormRouter.post(
  "/legal-trademark-office/form/step-01",
  LegalTrademarkOfficeFormStep01Function
);
FormRouter.post(
  "/legal-trademark-office/form/step-02/:formId",
  LegalTrademarkOfficeFormStep02Function
);
FormRouter.post(
  "/legal-trademark-office/form/step-03/:formId",
  LegalTrademarkOfficeFormStep03Function
);
FormRouter.post(
  "/legal-trademark-office/form/step-04/:formId",
  LegalTrademarkOfficeFormStep04Function
);

export default FormRouter;
