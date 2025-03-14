import { Document } from "mongoose";

export interface LtoFormInterface extends Document {
  formId: string;
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
}
