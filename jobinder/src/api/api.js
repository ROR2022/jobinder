import axios from "axios";
import { backURL } from "../lib/myLib";
//import e from "express";

export const loginService = async ({ email, password, role }) => {
  const loginURL = `${backURL}api/v1/users/login`;
  try {
    const response = await axios.post(`${loginURL}`, {
      email,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    console.error("Error en loginService", error);
    return error.response.data;
  }
};

export const registerService = async ({ email, password, role }) => {
  const registerURL = `${backURL}api/v1/users`;
  try {
    const response = await axios.post(`${registerURL}`, {
      email,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    console.error("Error en registerService", error);
    return error.response.data;
  }
};

export const findUserService = async (email) => {
  try {
    const response = await axios.get(`${backURL}api/v1/users/${email}`);
    //console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error en findUserService", error);
    return error.response.data;
  }
};

export const sendCodeService = async (email) => {
  try {
    const response = await axios.get(
      `${backURL}api/v1/users/sendCode/${email}`
    );
    return response.data;
  } catch (error) {
    console.error("Error en sendCodeService", error);
    return error.response.data;
  }
};

export const updatePasswordService = async (dataFormUpdate) => {
  try {
    const response = await axios.post(
      `${backURL}api/v1/users/updatePassword`,
      dataFormUpdate
    );
    return response.data;
  } catch (error) {
    console.error("Error en updatePasswordService", error);
    return error.response.data;
  }
};

export const updateProfileService = async (dataFormUpdate,token) => {
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.put(
      `${backURL}api/v1/users/${token}`,
      dataFormUpdate
    );
    return response.data;
  } catch (error) {
    console.error("Error en updateProfileService", error);
    return error.response.data;
  }
};


