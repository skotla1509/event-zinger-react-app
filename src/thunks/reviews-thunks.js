import {createAsyncThunk} from "@reduxjs/toolkit";
import {createReview, findReviewsByAuthor, findReviewsByEventId} from "../services/reviews-service";

export const createReviewThunk = createAsyncThunk(
    'createReview',
    async (review) => createReview(review)
)
export const findReviewsByEventIdThunk = createAsyncThunk(
    'findReviewsByEventId',
    async (imdbID) => findReviewsByEventId(imdbID)

)
export const findReviewsByAuthorThunk = createAsyncThunk(
    'findReviewsByAuthorThunk',
    async (author) => findReviewsByAuthor(author)
)