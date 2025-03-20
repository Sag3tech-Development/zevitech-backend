import Joi from "joi";

export const USNumberValidator = (phoneNumber: string): boolean => {
  const schema = Joi.string()
    .pattern(
      /^(?:\(\d{3}\)\s?|\d{3}-|\d{3})\d{3}-?\d{4}$/,
      "Phone number format"
    )
    .message(
      "Invalid phone number format. Please use (XXX) XXX-XXXX, XXX-XXX-XXXX, or 1234567890."
    )
    .required();

  const { error } = schema.validate(phoneNumber.trim());

  return !error;
};
