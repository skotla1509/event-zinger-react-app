import {createAsyncThunk} from "@reduxjs/toolkit";
import {
	findAllTransactionsByUser,
	findAllTransactionsByEventId,
	addTransaction, findTicketsByEvent
} from "../services/tickets-service";

export const buyTicketsThunk = createAsyncThunk(
    'buyTickets',
    async (transaction) => addTransaction({...transaction, type: "BUY"})
)
export const sellTicketsThunk = createAsyncThunk(
	'sellTickets',
	async (transaction) => addTransaction({...transaction, type: "SELL"})
)
export const findAllTransactionsByEventIdThunk = createAsyncThunk(
    'findAllTransactionsByEventId',
    async (eventId) => findAllTransactionsByEventId(eventId)
)
export const findTicketsByEventThunk = createAsyncThunk(
	'findTicketsByEvent',
	async (eventId) => findTicketsByEvent(eventId)
)
export const findAllTransactionsByUserThunk = createAsyncThunk(
    'findAllTransactionsByUser',
    async (user) => findAllTransactionsByUser(user)
)