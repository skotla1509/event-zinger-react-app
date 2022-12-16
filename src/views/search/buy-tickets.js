import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Required from "../components/required";
import {buyTicketsThunk, findTicketsByEventThunk} from "../../thunks/tickets-thunks";
import {setErrorMessage} from "../../reducers/tickets-reducer";
import {findEventDetailsByIdThunk} from "../../thunks/search-thunks";

const BuyTickets = ({eventId}) => {
	const {details} = useSelector((state) => state.search)
	const {tickets, loading} = useSelector((state) => state.tickets);
	const [purchaseTickets, setPurchaseTickets] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(findEventDetailsByIdThunk(eventId))
		dispatch(findTicketsByEventThunk(eventId));
	}, []);

	const handleBuyTickets = async () => {
		if (!purchaseTickets) {
			dispatch(setErrorMessage("Number of Tickets is missing!"))
		}
		if (isNaN(Number(purchaseTickets))) {
			dispatch(setErrorMessage("Number of Tickets is not valid number!"))
		}
		else {
			dispatch(setErrorMessage(""));
			await dispatch(buyTicketsThunk(
				{
					event: {
						eventId: details.id,
						name: details.name,
						img: details.img
					},
					tickets: purchaseTickets,
					type: "BUY"
				}
			));
			setPurchaseTickets(0);
			dispatch(findTicketsByEventThunk(eventId))
		}
	}
	return (
		<>
			{
				(!tickets || Object.keys(tickets).length <= 0) &&
				<h3 className="mt-4"> Uh Oh! Tickets are not available :( </h3>
			}
			{
				(tickets && Object.keys(tickets).length > 0) &&
				<>
					<div className="row mt-4 align-items-end">
						<div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mt-4">
							<label htmlFor="tickets-available"
										 className="form-label">How many tickets do you want to buy?</label>
							<Required/>
							<div className="input-group">
								<input type="text" id="tickets-available"
											 onChange={(e) => setPurchaseTickets(e.target.value)}
											 className="form-control" placeholder="Enter number of tickets"
											 aria-describedby="available-tickets"/>
								<div className="input-group-append">
								<span className="input-group-text" id="available-tickets">
									Available: {tickets.remainingTickets} out of {tickets.totalTickets}
								</span>
								</div>
							</div>
						</div>
						<div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mt-4">
							{
								loading &&
								<button type="button"
												disabled
												className="btn btn-secondary">
									...loading
								</button>
							}
							{
								!loading &&
								<button className="btn btn-primary rounded"
												onClick={handleBuyTickets}>Buy Tickets
								</button>
							}
						</div>
					</div>
				</>
			}
		</>
	);
}

export default BuyTickets;