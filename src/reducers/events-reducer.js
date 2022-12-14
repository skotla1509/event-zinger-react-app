import {createSlice} from "@reduxjs/toolkit";
import {addEventThunk, findAllEventsThunk} from "../thunks/events-thunks";

const eventsReducer = createSlice({
    name: 'events',
    initialState: {
        allEvents: []
    },
    extraReducers: {
        [addEventThunk.fulfilled]: (state, action) => {
            state.allEvents.push(action.payload)
        },
        [findAllEventsThunk.fulfilled]: (state, action) => {
            state.allEvents = action.payload
        }
    }
})

export default eventsReducer.reducer