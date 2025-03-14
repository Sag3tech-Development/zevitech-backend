import express from "express";

import { GetLtoLeadsFunction } from "../controllers/legal-trademark-office/lto-leads-controllers.js";

const LtoLeadsRouter = express.Router();

LtoLeadsRouter.get("/lto/leads", GetLtoLeadsFunction);

export default LtoLeadsRouter;
