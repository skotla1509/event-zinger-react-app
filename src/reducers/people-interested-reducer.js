import {createSlice} from "@reduxjs/toolkit";
import {
	findInterestsByEventIdThunk,
	findInterestsByUserThunk,
	markInterestedThunk
} from "../thunks/people-interested-thunks";

const interestsReducer = createSlice(
	{
		name: 'interests',
		initialState: {
			interestedUsers: [],
			interestedEvents: []
		},
		extraReducers: {
			[markInterestedThunk.fulfilled]: (state, action) => {
				state.interestedUsers.push(action.payload)
			},
			[findInterestsByEventIdThunk.fulfilled]: (state, action) => {
				state.interestedUsers = action.payload
			},
			[findInterestsByUserThunk.fulfilled]: (state, action) => {
				state.interestedEvents = action.payload
			}
		}
	}
)

export default interestsReducer.reducer