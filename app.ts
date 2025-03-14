import express, { NextFunction, Request, Response, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { config } from "./config.js";

import { AppErrorHandler } from "./middlewares/app-error-handler.js";

import BasicRouter from "./routes/basic-routes.js";
import LtoFormRouter from "routes/lto-form-routes.js";
import LtoLeadsRouter from "routes/lto-leads-routes.js";

export const app = express();

// SERVER CONFIGURATIONS
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.clientSideUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// SYSTEM ROUTES
app.use("/api/v1", LtoFormRouter, LtoLeadsRouter);

// BASIC ROUTES
app.use("", BasicRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  AppErrorHandler(err, req, res, next);
});
