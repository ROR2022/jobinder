import { app } from "../app.js";

import { userRoutes } from "./user.routes.js";
import { jobSkillsRoutes } from "./jobSkills.routes.js";
import { jobVacancyRoutes } from "./jobVacancies.routes.js";
import { phaseRoutes } from "./phase.routes.js";

export const routes = () => {
  
  app.use('/api/v1/users',userRoutes)
  app.use("/api/v1/jobSkills", jobSkillsRoutes);
  app.use("/api/v1/jobVacancies", jobVacancyRoutes);
  app.use("/api/v1/phase", phaseRoutes);
  
  
  //ruta de saludo...
  app.use("/", (req, res) => {
    res.json("Welcome to Backend FotoAppKodemia KA:..");
  });
};
