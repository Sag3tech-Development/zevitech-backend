import express from "express";

import { LtoStep1FormFunction } from "../controllers/legal-trademark-office/lto-form-controllers.js";

const LtoFormRouter = express.Router();

LtoFormRouter.post("/lto/form/step-1", LtoStep1FormFunction);

export default LtoFormRouter;
