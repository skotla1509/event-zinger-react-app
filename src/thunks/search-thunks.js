import {createAsyncThunk} from "@reduxjs/toolkit";
import {findEventDetailsById, findEventsBySearchTerm} from "../services/search-service";

export const findEventsBySearchTermThunk = createAsyncThunk(
    'findEventsBySearchTerm',
    (term) => findEventsBySearchTerm(term)
)
export const findEventDetailsByIdThunk = createAsyncThunk(
    'findEventDetailsById',
    (eventId) => findEventDetailsById(eventId)
)