import "dotenv/config";

export const config = {
  port: process.env.PORT || 8000,

  clientSideUrl: process.env.CLIENT_SIDE_URL,
  databaseUrl: process.env.MONGOOSE_DATABASE_URL || "",

  maxRetries: process.env.MAX_RETRIES || "5",
  retryDelay: process.env.RETRY_DELAY || "5000",

  ltoSmtpHost: process.env.LTO_SMTP_HOST,
  ltoSmtpPort: process.env.LTO_SMTP_PORT || "587",
  ltoSmtpService: process.env.LTO_SMTP_SERVICE,
  ltoSmtpMail: process.env.LTO_SMTP_MAIL,
  ltoSmtpPassword: process.env.LTO_SMTP_PASSWORD,

  symSmtpHost: process.env.SYM_SMTP_HOST,
  symSmtpPort: process.env.SYM_SMTP_PORT || "587",
  symSmtpService: process.env.SYM_SMTP_SERVICE,
  symSmtpMail: process.env.SYM_SMTP_MAIL,
  symSmtpPassword: process.env.SYM_SMTP_PASSWORD,

  tbpSmtpHost: process.env.TBP_SMTP_HOST,
  tbpSmtpPort: process.env.TBP_SMTP_PORT || "587",
  tbpSmtpService: process.env.TBP_SMTP_SERVICE,
  tbpSmtpMail: process.env.TBP_SMTP_MAIL,
  tbpSmtpPassword: process.env.TBP_SMTP_PASSWORD,
};
