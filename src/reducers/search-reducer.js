import {createSlice} from "@reduxjs/toolkit";
import {findEventByIdThunk, findEventsBySearchTermThunk} from "../thunks/search-thunks";

const initialState = {
  events: [],
  loading: false,
  details: {}
}

const searchReducer = createSlice({
                                    name: 'search',
                                    initialState,
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
                                      [findEventByIdThunk.pending]: (state, action) => {
                                        state.loading = true;
                                      },
                                      [findEventByIdThunk.fulfilled]: (state, action) => {
                                        state.details = action.payload;
                                        state.loading = false;
                                      },
                                      [findEventByIdThunk.rejected]: (state, action) => {
                                        state.loading = false;
                                      },
                                    }
                                  })

const parseEvents = (payload) => {
  const eventsObj = [];
  var events = payload._embedded.events;

  events.forEach((event) => {
    let imageObj = event.images.find((item) => item.ratio === "4_3");
    let datesObj = (event.dates && event.dates.start) || null;
    const locationObj = event._embedded && event._embedded.venues && event._embedded.venues.length > 0 ? event._embedded.venues[0] : null;
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

export default searchReducer.reducer