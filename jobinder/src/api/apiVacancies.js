import axios from "axios";
import { backURL } from "../lib/myLib";
//import { getDataConsult } from "../../../server/controllers/jobVacancy.controller";

export const getAllVacanciesService = async (page, Limit) => {
  try {
    const response = await axios.get(
      `${backURL}api/v1/jobVacancies?page=${page}&limit=${Limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error en getAllVacanciesService", error);
    return error.response.data;
  }
};

export const getVacanciesByUserService = async (token, page, limit) => {
  try {
    const response = await axios.get(
      `${backURL}api/v1/jobVacancies/getVacanciesByUser?token=${token}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error en getVacanciesByUserService", error);
    return error.response.data;
  }
};

export const createVacancyService = async (data) => {
  try {
    const response = await axios.post(`${backURL}api/v1/jobVacancies`, data);
    return response.data;
  } catch (error) {
    console.error("Error en createVacancyService", error);
    return error.response.data;
  }
};

export const updateVacancyService = async (idVacancie, data) => {
  try {
    const response = await axios.put(
      `${backURL}api/v1/jobVacancies/${idVacancie}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error en updateVacancyService", error);
    return error.response.data;
  }
};

export const getVacancyByIdService = async (idVacancie) => {
  try {
    const response = await axios.get(
      `${backURL}api/v1/jobVacancies/${idVacancie}`
    );
    return response.data;
  } catch (error) {
    console.error("Error en getVacancyByIdService", error);
    return error.response.data;
  }
};

export const getTitlesVacanciesService = async () => {
  try {
    const response = await axios.get(`${backURL}api/v1/jobVacancies/getTitles`);
    return response.data;
  } catch (error) {
    console.error("Error en getTitlesVacanciesService", error);
    return error.response.data;
  }
};

export const getDataConsultService = async (value, page, limit) => {
  try {
    const response = await axios.get(
      `${backURL}api/v1/jobVacancies/getDataConsult?value=${value}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error en getDataConsultService", error);
    return error.response.data;
  }
};

export const getAllUsersInVacancyService = async (idVacancie, page, limit) => {
  try {
    const response = await axios.get(
      `${backURL}api/v1/jobVacancies/getAllUsersInVacancy?idVacancie=${idVacancie}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error en getAllUsersInVacancyService", error);
    return error.response.data;
  }
};

export const hideUserInVacancyService = async (data) => {
  try {
    const response = await axios.post(
      `${backURL}api/v1/jobVacancies/hideUserInVacancy`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error en hideUserInVacancyService", error);
    return error.response.data;
  }
};

export const closeVacancyService = async (data) => {
  try {
    const response = await axios.post(
      `${backURL}api/v1/jobVacancies/closeVacancy`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error en closeVacancyService", error);
    return error.response.data;
  }
};
