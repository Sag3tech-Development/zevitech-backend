import { createServer } from "http";

import { app } from "./app.js";
import { config } from "./config.js";

import { ConnectMongooseDatabase } from "databases/mongoose-database.js";

import { HandleException } from "./middlewares/exception-handler.js";
import { HandleRejection } from "./middlewares/rejection-handler.js";
import { GracefullyShutdown } from "./middlewares/gracefully-shutdown.js";

HandleException();

const server = createServer(app);

const StartServer = async (): Promise<void> => {
  try {
    server.listen(config.port, () => {
      console.info(`Server is running on port: ${config.port}`);
    });

    await ConnectMongooseDatabase();

    HandleRejection(server);
    GracefullyShutdown(server);
  } catch (error) {
    console.error(`Failed to start the server: ${(error as Error).message}`);
    process.exit(1);
  }
};

StartServer();
