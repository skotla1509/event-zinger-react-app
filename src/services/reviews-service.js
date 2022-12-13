import axios from "axios";
import {Constants} from "../constants/constants";

const REVIEW_API = `${Constants.API_BASE}/reviews`;
const EVENT_REVIEWS_API = `${Constants.API_BASE}/events`;
const AUTHOR_REVIEWS_API = `${Constants.API_BASE}/users`

const api = axios.create({withCredentials: true});

export const createReview = async (review) => {
    const response = await api.post(REVIEW_API, review)
    return response.data
}

export const findReviewsByEventId = async (eventId) => {
    const response = await api.get(`${EVENT_REVIEWS_API}/${eventId}/reviews`)
    return response.data
}

export const findReviewsByAuthor = async (author) => {
    const response = await api.get(`${AUTHOR_REVIEWS_API}/${author}/reviews`)
    return response.data
}
