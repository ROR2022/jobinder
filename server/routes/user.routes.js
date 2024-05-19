import { Router } from "express";
import {
  findUserByEmail,
  getAllUser,
  getAllUsersInVacancy,
  loginUser,
  registerUser,
  sendCode,
  updatePassword,
  updateProfile,
} from "../controllers/user.controller.js";

export const userRoutes = Router()
  .get("/", getAllUser)
  .get("/:email", findUserByEmail)
  .get("/sendCode/:email", sendCode)
  .get("/getAllUsersInVacancy", getAllUsersInVacancy)
  .post("/", registerUser)
  .post("/login", loginUser)
  .post("/updatePassword", updatePassword)
  .put("/:token",updateProfile)
