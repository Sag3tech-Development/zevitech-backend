import { Document } from "mongoose";

import { ProtectionTypeEnum } from "brands/enums/protection-type-enum.js";
import { PackageTypeEnum } from "brands/enums/package-type-enum.js";

export interface LegalTrademarkOfficeFormInterface extends Document {
  formId: string;

  // (PERSONAL INFORMATION) -- STEP 01
  firstName: string;
  lastName: string;
  state: string;
  city: string;
  address: string;
  zipCode: string;
  emailAddress: string;
  phoneNumber: string;
  landlineNumber?: string;
  preferredContactTime?: string;

  // (BUSINESS INFORMATION) -- STEP 02
  protectionType?: ProtectionTypeEnum;
  protectionName?: string;
  protectionLogo?: string;
  protectionLogoColorScheme?: string;
  protectionLogoLiteralElements?: string;
  protectionSlogan?: string;
  isTrademarkInUse?: boolean;
  trademarkFirstUseDate?: Date;
  trademarkFirstUseInCommerceDate?: Date;
  trademarkInUseOwnershipDetails?: string;
  isIndividuallyOwnedTrademark?: boolean;
  isUSBasedOrganization?: boolean;
  organizationName?: string;
  organizationType?: string;
  organizationFormationCountry?: string;
  organizationFormationState?: string;
  organizationPosition?: string;
  businessClassification?: string;

  // (PAYMENT INFORMATION) -- STEP 03
  packageType?: PackageTypeEnum;
  packagePrice?: number;

  // (ADDITIONAL SERVICES INFORMATION) -- STEP 04
  isGovernmentFeeIncluded?: boolean;
  isRushProcessingIncluded?: boolean;
  isGovernmentFeeIncludedPrice?: number;
  isRushProcessingIncludedPrice?: number;

  // TOTAL AMOUNT
  totalAmount?: number;

  formStepsCompletion?: {
    step01: boolean;
    step02: boolean;
    step03: boolean;
    step04: boolean;
  };
  isFormCompleted: boolean;
}

export interface LegalTrademarkOfficeLeadInterface extends Document {
  formId: string;

  // (PERSONAL INFORMATION) -- STEP 01
  firstName: string;
  lastName: string;
  state: string;
  city: string;
  address: string;
  zipCode: string;
  emailAddress: string;
  phoneNumber: string;
  landlineNumber?: string;
  preferredContactTime?: string;

  // (BUSINESS INFORMATION) -- STEP 02
  protectionType?: ProtectionTypeEnum;
  protectionName?: string;
  protectionLogo?: string;
  protectionLogoColorScheme?: string;
  protectionLogoLiteralElements?: string;
  protectionSlogan?: string;
  isTrademarkInUse?: boolean;
  trademarkFirstUseDate?: Date;
  trademarkFirstUseInCommerceDate?: Date;
  trademarkInUseOwnershipDetails?: string;
  isIndividuallyOwnedTrademark?: boolean;
  isUSBasedOrganization?: boolean;
  organizationName?: string;
  organizationType?: string;
  organizationFormationCountry?: string;
  organizationFormationState?: string;
  organizationPosition?: string;
  businessClassification?: string;

  // (PAYMENT INFORMATION) -- STEP 03
  packageType?: PackageTypeEnum;
  packagePrice?: number;

  // (ADDITIONAL SERVICES INFORMATION) -- STEP 04
  isGovernmentFeeIncluded?: boolean;
  isRushProcessingIncluded?: boolean;
  isGovernmentFeeIncludedPrice?: number;
  isRushProcessingIncludedPrice?: number;

  // TOTAL AMOUNT
  totalAmount?: number;
}
