import {createAsyncThunk} from "@reduxjs/toolkit";
import {findEventById, findEventsBySearchTerm} from "../services/search-service";

export const findEventsBySearchTermThunk = createAsyncThunk(
    'findEventsBySearchTerm',
    (term) => findEventsBySearchTerm(term)
)
export const findEventByIdThunk = createAsyncThunk(
    'findEventById',
    (eventId) => findEventById(eventId)
)