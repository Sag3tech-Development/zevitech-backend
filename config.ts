import "dotenv/config";

export const config = {
  port: process.env.PORT || 8000,

  clientSideUrl: process.env.CLIENT_SIDE_URL,
  databaseUrl: process.env.MONGOOSE_DATABASE_URL || "",

  maxRetries: process.env.MAX_RETRIES || "5",
  retryDelay: process.env.RETRY_DELAY || "5000",

  legalTrademarkOfficeSmtpHost: process.env.LEGAL_TRADEMARK_OFFICE_SMTP_HOST,
  legalTrademarkOfficeSmtpPort:
    process.env.LEGAL_TRADEMARK_OFFICE_SMTP_PORT || "465",
  legalTrademarkOfficeSmtpService:
    process.env.LEGAL_TRADEMARK_OFFICE_SMTP_SERVICE,
  legalTrademarkOfficeSmtpMail: process.env.LEGAL_TRADEMARK_OFFICE_SMTP_MAIL,
  legalTrademarkOfficeSmtpPassword:
    process.env.LEGAL_TRADEMARK_OFFICE_SMTP_PASSWORD,
};
