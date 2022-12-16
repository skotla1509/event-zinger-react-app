import {createSlice} from "@reduxjs/toolkit";
import {findEventDetailsByIdThunk, findEventsBySearchTermThunk} from "../thunks/search-thunks";

const initialState = {
	events: [],
	loading: false,
	searchTerm: 'Concerts',
	details: {}
}

const searchReducer = createSlice(
	{
		name: 'search',
		initialState,
		reducers: {
			setSearchTerm(state, action) {
				state.searchTerm = action.payload;
			}
		},
		extraReducers: {
			[findEventsBySearchTermThunk.pending]: (state, action) => {
				state.loading = true;
			},
			[findEventsBySearchTermThunk.fulfilled]: (state, action) => {
				state.events = parseEvents(action.payload);
				state.loading = false;
			},
			[findEventsBySearchTermThunk.rejected]: (state, action) => {
				state.loading = false;
			},
			[findEventDetailsByIdThunk.pending]: (state, action) => {
				state.loading = true;
			},
			[findEventDetailsByIdThunk.fulfilled]: (state, action) => {
				state.details = parseDetails(action.payload);
				state.loading = false;
			},
			[findEventDetailsByIdThunk.rejected]: (state, action) => {
				state.loading = false;
			},
		}
	}
)

const parseDetails = (payload) => {
	const imageObj = payload.images.find((item) => item.ratio === "16_9");
	const datesObj = (payload.dates && payload.dates.start) || null;
	const locationObj = payload._embedded && payload._embedded.venues && payload._embedded.venues.length
											> 0 ? payload._embedded.venues[0] : null;

	return {
		name: payload.name,
		id: payload.id,
		img: imageObj ? imageObj.url : '',
		date: datesObj ? datesObj.localDate : "TBA",
		address: locationObj.address.line1,
		city: locationObj.city.name,
		state: locationObj.state.name,
		country: locationObj.country.name
	};
}

const parseEvents = (payload) => {
	const eventsObj = [];
	var events = payload._embedded.events;

	events.forEach((event) => {
		const imageObj = event.images.find((item) => item.ratio === "4_3");
		const datesObj = (event.dates && event.dates.start) || null;
		const locationObj = event._embedded && event._embedded.venues && event._embedded.venues.length
												> 0 ? event._embedded.venues[0] : null;
		eventsObj.push(
			{
				name: event.name,
				id: event.id,
				date: datesObj ? datesObj.localDate : "TBA",
				img: imageObj ? imageObj.url : '',
				location: locationObj ? `${locationObj.address.line1}, ${locationObj.city.name}` : "NA"
			}
		);
	})

	return eventsObj;
}

export const {setSearchTerm} = searchReducer.actions;
export default searchReducer.reducer