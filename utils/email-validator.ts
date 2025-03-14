import Joi from "joi";

export const EmailValidator = (email: string): boolean => {
  const sanitizedEmail = email.replace(/[\x00-\x1F\x7F]/g, "").trim();

  const schema = Joi.string().email({ tlds: { allow: false } });
  const { error } = schema.validate(sanitizedEmail);

  return !error;
};
