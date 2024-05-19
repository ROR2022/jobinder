import axios from "axios";
import { backURL } from "../lib/myLib";



export const getSkillsService = async () => {
    try {
        const response = await axios.get(`${backURL}api/v1/jobSkills`);
        return response.data;
    } catch (error) {
        console.error("Error en getSkillsService", error);
        return error.response.data;
    }
    };