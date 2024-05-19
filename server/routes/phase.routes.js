import { Router } from "express";
import {
  
  getPhase,
  createPhase,
  updatePhase,
  updatePanel,
} from "../controllers/phase.controller.js";

export const phaseRoutes = Router()
  .get("/", getPhase)
  .post("/", createPhase)
  .post("/updatePanel", updatePanel)
  .put("/", updatePhase)