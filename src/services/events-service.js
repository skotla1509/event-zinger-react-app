import axios from "axios";
import {Constants} from "../constants/constants";

const EVENTS_API = `${Constants.API_BASE}/events`;
const api = axios.create({withCredentials: true});

export const addEvent = async (event) => {
    const response = await api.post(EVENTS_API, event)
    return response.data
}

export const findAllEvents = async () => {
    const response = await api.get(EVENTS_API);
    return response.data
}

export const findEventById = async (eventId) => {
    const response = await api.get(`${EVENTS_API}/${eventId}`);
    return response.data
}