import { Router } from "express";
import {
  
  getVacanciesService,
  createVacancyService,
  getVacancyByIdService,
  updateVacancyService,
  getVacanciesByRecrutierIdService,
  getTitlesVacancies,
  getDataConsult,
  getUsersInVacancie,
  updateListApplicantsInVacancie,
  closeVacancy,
} from "../controllers/jobVacancy.controller.js";

export const jobVacancyRoutes = Router()
  .get("/", getVacanciesService)
  .get("/getVacanciesByUser", getVacanciesByRecrutierIdService)
  .get("/getTitles", getTitlesVacancies)
  .get("/getDataConsult", getDataConsult)
  .get("/getAllUsersInVacancy",getUsersInVacancie)
  .get("/:idVacancie", getVacancyByIdService)
  .post("/", createVacancyService)
  .post("/hideUserInVacancy", updateListApplicantsInVacancie)
  .post("/closeVacancy", closeVacancy)
  .put("/:idVacancie", updateVacancyService);