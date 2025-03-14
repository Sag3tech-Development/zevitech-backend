import "dotenv/config";

export const config = {
  port: process.env.PORT || 8000,
  clientSideUrl: process.env.CLIENT_SIDE_URL,
  databaseUrl: process.env.MONGOOSE_DATABASE_URL || "",
  maxRetries: process.env.MAX_RETRIES || "5",
  retryDelay: process.env.RETRY_DELAY || "5000",
};
