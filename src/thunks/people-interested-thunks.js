import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  findInterestsByEventId,
  findInterestsByUser,
  markInterested
} from "../services/people-interested-service";

export const markInterestedThunk = createAsyncThunk(
  'markInterested',
  async (interest) => markInterested(interest)
)
export const findInterestsByEventIdThunk = createAsyncThunk(
  'findInterestsByEventId',
  async (eventId) => findInterestsByEventId(eventId)

)
export const findInterestsByUserThunk = createAsyncThunk(
  'findInterestsByUser',
  async (user) => findInterestsByUser(user)
)