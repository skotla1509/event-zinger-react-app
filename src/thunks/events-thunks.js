import {createAsyncThunk} from "@reduxjs/toolkit";
import {addEvent, findAllEvents, findEventById} from "../services/events-service";


export const addEventThunk = createAsyncThunk(
  'addEvent',
  async (event) => addEvent(event)
)

export const findAllEventsThunk = createAsyncThunk(
  'findAllEvents',
  async () => await findAllEvents()
)

export const findEventByIdThunk = createAsyncThunk(
  'findEventById',
  async (eventId) => await findEventById(eventId)
)