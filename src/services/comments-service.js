import axios from "axios";
import {Constants} from "../constants/constants";

const COMMENTS_API = `${Constants.API_BASE}/comments`;
const EVENT_COMMENTS_API = `${Constants.API_BASE}/events`;
const USER_COMMENTS_API = `${Constants.API_BASE}/users`

const api = axios.create({withCredentials: true});

export const addComment = async (comment) => {
    const response = await api.post(COMMENTS_API, comment)
    return response.data
}

export const findCommentsByEventId = async (eventId) => {
    const response = await api.get(`${EVENT_COMMENTS_API}/${eventId}/comments`)
    return response.data
}

export const findCommentsByUser = async (author) => {
    const response = await api.get(`${USER_COMMENTS_API}/${author}/comments`)
    return response.data
}