import { Router } from "express";
import {
  
  getSkillsService,
  createSkillsService
} from "../controllers/jobSkills.controller.js";

export const jobSkillsRoutes = Router()
  .get("/", getSkillsService)
  .post("/", createSkillsService)
  