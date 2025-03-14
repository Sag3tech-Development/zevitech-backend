import { model, Schema } from "mongoose";

import { LtoFormInterface } from "interfaces/model-interfaces.js";

import { EmailValidator } from "utils/email-validator.js";
import { PhoneNumberValidator } from "utils/number-validator.js";

const LtoFormModel: Schema<LtoFormInterface> = new Schema<LtoFormInterface>(
  {
    formId: {
      type: String,
      required: true,
      unique: true,
    },
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
        validator: PhoneNumberValidator,
        message:
          "Invalid phone number format. Please use the format (XXX) XXX-XXXX or XXX-XXX-XXXX or XXXXXXXXXX.",
      },
    },
    landlineNumber: { type: String, default: null },
    preferredContactTime: { type: String, default: null },
    
    isFormCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const LtoForm = model<LtoFormInterface>("LtoForm", LtoFormModel);
export default LtoForm;
