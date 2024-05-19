import axios from "axios";
import { backURL } from "../lib/myLib";

export const getPhaseService = async (phase) => {
  try {
    const response = await axios.get(`${backURL}api/v1/phase?phase=${phase}`);
    return response.data;
  } catch (error) {
    console.error("Error en getPhaseService", error);
    return error.response.data;
  }
};

export const updateLlamadaPhaseService = async (idVacancy, idCandidate) => {
  try {
    const response = await axios.put(
      `${backURL}api/v1/phase?phase=Llamada&idVacancie=${idVacancy}&idCandidate=${idCandidate}`
    );
    return response.data;
  } catch (error) {
    console.error("Error en updatePhaseService", error);
    return error.response.data;
  }
};

export const updatePanelService = async (data) => {
  try {
    const response = await axios.post(
      `${backURL}api/v1/phase/updatePanel`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error en updatePanelService", error);
    return error.response.data;
  }
};
