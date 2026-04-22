const BASE_URL = "https://node-project-2-iqkx.onrender.com/api/students";

import axios from "axios";

export const getStudent = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/getStudent?${query}`);
  return res.json();
};

export const createStudent = (data) => {
  return axios.post(`${BASE_URL}/create`, data);
};

export const updateStudent = (id, data) => {
  return axios.patch(`${BASE_URL}/updateStudent/${id}`, data);
};

export const deleteStudent = (id) => {
  return axios.delete(`${BASE_URL}/delete/${id}`);
};