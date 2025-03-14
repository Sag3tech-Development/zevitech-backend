import mongoose from "mongoose";

import { config } from "../config.js";

import { RetryHandler } from "../middlewares/retry-handler.js";

// MONGOOSE DATABASE CONNECTION
const MongooseDatabaseOperation = async (): Promise<void> => {
  const connection = await mongoose.connect(config.databaseUrl);

  console.info(
    `Mongoose database is running on url: ${connection.connection.host}`
  );
  global.mongooseConnection = connection.connection;
};

// CONNECT TO MONGOOSE DATABASE WITH RETRY MECHANISM
const ConnectMongooseDatabase = async (): Promise<void> => {
  try {
    await RetryHandler(MongooseDatabaseOperation, {
      maxRetries: parseInt(config.maxRetries, 10),
      retryDelay: parseInt(config.retryDelay, 10),
    });
  } catch (error) {
    console.error(
      `Failed to connect to mongoose database: ${(error as Error).message}`
    );
  }
};

// DISCONNECT MONGOOSE DATABASE
const DisconnectMongooseDatabase = async (): Promise<void> => {
  if (global.mongooseConnection) {
    try {
      await global.mongooseConnection.close();
      console.info("Mongoose database connection closed successfully.");
    } catch (error) {
      console.error(
        `Error closing mongoose database connection: ${
          (error as Error).message
        }`
      );
    }
  } else {
    console.warn("No mongoose database connection found to close.");
  }
};

export { ConnectMongooseDatabase, DisconnectMongooseDatabase };
