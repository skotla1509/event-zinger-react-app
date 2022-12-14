import axios from "axios";
import {Constants} from "../constants/constants";

const INTERESTS_API = `${Constants.API_BASE}/interests`;
const EVENT_INTERESTS_API = `${Constants.API_BASE}/events`;
const USER_INTERESTS_API = `${Constants.API_BASE}/users`

const api = axios.create({withCredentials: true});

export const markInterested = async (interest) => {
    const response = await api.post(INTERESTS_API, interest)
    return response.data
}

export const findInterestsByEventId = async (eventId) => {
    const response = await api.get(`${EVENT_INTERESTS_API}/${eventId}/interests`)
    return response.data
}

export const findInterestsByUser = async (user) => {
    const response = await api.get(`${USER_INTERESTS_API}/${user}/interests`)
    return response.data
}
