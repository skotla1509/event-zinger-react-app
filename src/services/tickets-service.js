import axios from "axios";
import {Constants} from "../constants/constants";

const TRANSACTIONS_API = `${Constants.API_BASE}/transactions`;
const EVENTS_API = `${Constants.API_BASE}/events`;
const USER_API = `${Constants.API_BASE}/users`

const api = axios.create({withCredentials: true});

export const findTicketsByEvent = async (eventId) => {
    const response = await api.get(`${EVENTS_API}/${eventId}/tickets`);
    return response.data;
}

export const addTransaction = async (transaction) => {
    const response = await api.post(TRANSACTIONS_API, transaction)
    return response.data
}

export const findAllTransactionsByEventId = async (eventId) => {
    const response = await api.get(`${EVENTS_API}/${eventId}/transactions`)
    return response.data
}

export const findAllTransactionsByUser = async (user) => {
    const response = await api.get(`${USER_API}/${user}/transactions`)
    return response.data
}