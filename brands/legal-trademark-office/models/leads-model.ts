import { model, Schema } from "mongoose";

import { LegalTrademarkOfficeLeadInterface } from "../../interfaces/legal-trademark-office-model-interfaces.js";
import { ProtectionTypeEnum } from "brands/enums/protection-type-enum.js";

import { EmailValidator } from "../../../utils/email-validator.js";
import { USNumberValidator } from "../../../utils/number-validators.js";
import { PackageTypeEnum } from "brands/enums/package-type-enum.js";

const LegalTrademarkOfficeLeadModel: Schema<LegalTrademarkOfficeLeadInterface> =
  new Schema<LegalTrademarkOfficeLeadInterface>(
    {
      formId: {
        type: String,
        required: true,
        unique: true,
      },

      // (PERSONAL INFORMATION) -- STEP 01
      firstName: { type: String, required: [true, "First name is required."] },
      lastName: { type: String, required: [true, "Last name is required."] },
      state: { type: String, required: [true, "State is required."] },
      city: { type: String, required: [true, "City is required."] },
      address: { type: String, required: [true, "Address is required."] },
      zipCode: { type: String, required: [true, "Zipcode is required."] },
      emailAddress: {
        type: String,
        required: [true, "Email address is required."],
        validate: {
          validator: EmailValidator,
          message: "Invalid email address format.",
        },
      },
      phoneNumber: {
        type: String,
        required: [true, "Phone number is required."],
        validate: {
          validator: USNumberValidator,
          message:
            "Invalid phone number format. Please use the format (XXX) XXX-XXXX or XXX-XXX-XXXX or XXXXXXXXXX.",
        },
      },
      landlineNumber: { type: String, default: null },
      preferredContactTime: { type: String, default: null },

      // (BUSINESS INFORMATION) -- STEP 02
      protectionType: {
        type: String,
        enum: Object.values(ProtectionTypeEnum),
        default: ProtectionTypeEnum.NAME,
      },
      protectionName: { type: String, default: null },
      protectionLogo: { type: String, default: null },
      protectionLogoColorScheme: { type: String, default: null },
      protectionLogoLiteralElements: { type: String, default: null },
      protectionSlogan: { type: String, default: null },
      isTrademarkInUse: { type: Boolean, default: false },
      trademarkFirstUseDate: { type: Date, default: null },
      trademarkFirstUseInCommerceDate: { type: Date, default: null },
      trademarkInUseOwnershipDetails: { type: String, default: null },
      isIndividuallyOwnedTrademark: { type: Boolean, default: true },
      isUSBasedOrganization: { type: Boolean, default: true },
      organizationName: { type: String, default: null },
      organizationType: { type: String, default: null },
      organizationFormationCountry: { type: String, default: null },
      organizationFormationState: { type: String, default: null },
      organizationPosition: { type: String, default: null },
      businessClassification: { type: String, default: null },

      // (PAYMENT INFORMATION) -- STEP 03
      packageType: {
        type: String,
        enum: Object.values(PackageTypeEnum),
        default: null,
      },
      packagePrice: { type: Number, default: 0 },

      // (ADDITIONAL SERVICES INFORMATION) -- STEP 04
      isGovernmentFeeIncluded: { type: Boolean, default: false },
      isRushProcessingIncluded: { type: Boolean, default: false },
      isGovernmentFeeIncludedPrice: { type: Number, default: 0 },
      isRushProcessingIncludedPrice: { type: Number, default: 0 },

      // TOTAL AMOUNT
      totalAmount: { type: Number, default: 0 },
    },
    { timestamps: true }
  );

const LegalTrademarkOfficeLead = model<LegalTrademarkOfficeLeadInterface>(
  "legal_trademark_office_leads",
  LegalTrademarkOfficeLeadModel
);
export default LegalTrademarkOfficeLead;
