import axios from "axios";
import { removeItemsOnLogout } from "./local-storage-utils";
import { urlRoutes } from "../constants";
let result;

const createHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  const token = localStorage.getItem("accessToken");

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

const create = async (endpoint, payload) => {
  await axios
    .post(`${process.env.REACT_APP_HOST_URL}/${endpoint}`, payload, {
      headers: createHeaders(),
    })
    .then((response) => {
      if (response.data && response.data.success) {
        result = { status: "SUCCESS", data: response.data };
      } else {
        result = { status: "ERROR", data: response.data };
      }
    })
    .catch((error) => {
      if (
        (error.code || error.response.status === 401) &&
        window.location.pathname !== urlRoutes.loginPage
      ) {
        removeItemsOnLogout();
        window.location.replace(urlRoutes.loginPage);
      }
      result = { status: "ERROR", data: error };
    });

  return result;
};

const read = async (endpoint) => {
  await axios
    .get(`${process.env.REACT_APP_HOST_URL}/${endpoint}`, {
      headers: createHeaders(),
    })
    .then((response) => {
      if (response.data && response.data.success) {
        result = { status: "SUCCESS", data: response.data };
      } else {
        result = { status: "ERROR", data: response.data };
      }
    })
    .catch((error) => {
      if (
        (error.code || error.response.status === 401) &&
        window.location.pathname !== urlRoutes.loginPage
      ) {
        removeItemsOnLogout();
        window.location.replace(urlRoutes.loginPage);
      }
      result = { status: "ERROR", data: error };
    });

  return result;
};

const update = async (endpoint, payload) => {
  await axios
    .put(`${process.env.REACT_APP_HOST_URL}/${endpoint}`, payload, {
      headers: createHeaders(),
    })
    .then((response) => {
      if (response.data && response.data.success) {
        result = { status: "SUCCESS", data: response.data };
      } else {
        result = { status: "ERROR", data: response.data };
      }
    })
    .catch((error) => {
      if (
        (error.code || error.response.status === 401) &&
        window.location.pathname !== urlRoutes.loginPage
      ) {
        removeItemsOnLogout();
      }
      result = { status: "ERROR", data: error };
    });

  return result;
};

const deleteData = (endpoint) => {
  axios
    .delete(`${process.env.REACT_APP_HOST_URL}/${endpoint}/${id}`, {
      headers: createHeaders(),
    })
    .then(() => {
      if (response.data && response.data.success) {
        result = { status: "SUCCESS", data: response.data };
      } else {
        result = { status: "ERROR", data: response.data };
      }
    })
    .catch((error) => {
      if (
        (error.code || error.response.status === 401) &&
        window.location.pathname !== urlRoutes.loginPage
      ) {
        removeItemsOnLogout();
        window.location.replace(urlRoutes.loginPage);
      }
      result = { status: "ERROR", data: error };
    });

  return result;
};

export { create, read, update, deleteData };
