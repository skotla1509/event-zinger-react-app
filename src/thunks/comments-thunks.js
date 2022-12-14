import {createAsyncThunk} from "@reduxjs/toolkit";
import {addComment, findCommentsByEventId, findCommentsByUser} from "../services/comments-service";

export const addCommentThunk = createAsyncThunk(
    'addComment',
    async (comment) => addComment(comment)
)
export const findCommentsByEventIdThunk = createAsyncThunk(
    'findCommentsByEventId',
    async (eventId) => findCommentsByEventId(eventId)

)
export const findCommentsByUserThunk = createAsyncThunk(
    'findCommentsByUser',
    async (user) => findCommentsByUser(user)
)