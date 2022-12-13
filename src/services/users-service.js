import axios from 'axios';
import {Constants} from "../constants/constants";

const USERS_API = `${Constants.API_BASE}/users`;
const api = axios.create({ withCredentials: true });

export const findUserByName = async (username) => {
  const response = await axios.get(`${USERS_API}/${username}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

export const createUser = async (user) => {
  const response = await axios.post(USERS_API, user);
  if (response.status === 200) {
    return response.data;
  } else {
    return null;
  }
}

export const updateUser = async (username, updates) => {
  const response = await axios.put(`${USERS_API}/${username}`, updates);
  return response.data;
}

export const findUserById = async (uid) => {
  const response = await api.get(`${USERS_API}/${uid}`)
  return response.data
}

export const register = async (user) => {
  const response = await api.post(`${Constants.API_BASE}/register`, user)
  return response.data;
}

export const changePassword = async (user) => {
  const response = await api.post(`${Constants.API_BASE}/changepassword`, user)
  return response.data;
}

export const login = async (user) => {
  const response = await api.post(`${Constants.API_BASE}/login`, user)
  return response.data
}

export const logout = async () => {
  const response = await api.post(`${Constants.API_BASE}/logout`)
  return response.data
}
export const profile = async () => {
  const response = await api.post(`${Constants.API_BASE}/profile`)
  return response.data
}

export const findAllUsers = async () => {
  const response = await axios.get(USERS_API);
  return response.data
}