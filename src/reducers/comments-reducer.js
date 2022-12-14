import {createSlice} from "@reduxjs/toolkit";
import {
    addCommentThunk,
    findCommentsByUserThunk,
    findCommentsByEventIdThunk
} from "../thunks/comments-thunks";

const commentsReducer = createSlice({
    name: 'comments',
    initialState: {
        comments: []
    },
    extraReducers: {
        [addCommentThunk.fulfilled]: (state, action) => {
            state.comments.push(action.payload)
        },
        [findCommentsByEventIdThunk.fulfilled]: (state, action) => {
            state.comments = action.payload
        },
        [findCommentsByUserThunk.fulfilled]: (state, action) => {
            state.comments = action.payload
        }
    }
})

export default commentsReducer.reducer