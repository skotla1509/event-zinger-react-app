import {createSlice} from "@reduxjs/toolkit";
import {
	findAllTransactionsByUserThunk,
	findAllTransactionsByEventIdThunk,
	buyTicketsThunk, findTicketsByEventThunk, sellTicketsThunk
} from "../thunks/tickets-thunks";

const ticketsReducer = createSlice(
	{
		name: 'tickets',
		initialState: {
			tickets: {},
			transactions: [],
			sellLoading: false,
			sellError: '',
			sellSuccess: '',
			buyLoading: false,
			buyError: '',
			buySuccess: ''
		},
		reducers: {
			setBuyError(state, action) {
				state.buyError = action.payload;
			},
			setSellError(state, action) {
				state.sellError = action.payload;
			},
			resetSellMessages(state, action) {
				state.sellError = "";
				state.sellSuccess = "";
			},
			resetBuyMessages(state, action) {
				state.buyError = "";
				state.buySuccess = "";
			}
		},
		extraReducers: {
			[buyTicketsThunk.pending]: (state, action) => {
				state.buyLoading = true;
			},
			[buyTicketsThunk.fulfilled]: (state, action) => {
				state.buyLoading = false;
				state.buyError = '';
				state.buySuccess = "Transaction is successful!"
			},
			[buyTicketsThunk.rejected]: (state, action) => {
				state.buyLoading = false;
				state.buyError =
					"Something went wrong. Please try again later.";
			},
			[sellTicketsThunk.pending]: (state, action) => {
				state.sellLoading = true;
			},
			[sellTicketsThunk.fulfilled]: (state, action) => {
				state.sellLoading = false;
				state.sellError = '';
				state.sellSuccess = "Transaction is successful!"
			},
			[sellTicketsThunk.rejected]: (state, action) => {
				state.sellLoading = false;
				state.sellError =
					"Something went wrong. Please try again later.";
			},
			[findAllTransactionsByEventIdThunk.fulfilled]: (state, action) => {
				state.transactions = action.payload
			},
			[findAllTransactionsByUserThunk.fulfilled]: (state, action) => {
				state.transactions = action.payload
			},
			[findTicketsByEventThunk.fulfilled]: (state, action) => {
				state.tickets = action.payload
			}
		}
	})

export const {setSellError, setBuyError, resetSellMessages, resetBuyMessages} = ticketsReducer.actions;
export default ticketsReducer.reducer