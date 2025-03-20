import { Server } from "http";

import { DisconnectMongooseDatabase } from "../databases/mongoose-database.js";

export const GracefullyShutdown = (server: Server): void => {
  process.on("SIGINT", async () => {
    console.info("Shutting down gracefully...");
    await DisconnectMongooseDatabase();
    server.close(() => {
      console.info("HTTP server closed.");
      process.exit(0);
    });
  });
};
