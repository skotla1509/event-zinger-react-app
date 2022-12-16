import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Required from "../components/required";
import {buyTicketsThunk} from "../../thunks/tickets-thunks";
import {setErrorMessage} from "../../reducers/tickets-reducer";
import {findEventDetailsByIdThunk} from "../../thunks/search-thunks";

const SellTickets = ({eventId}) => {
	const {details} = useSelector((state) => state.search)
	const {loading} = useSelector((state) => state.tickets);
	const [availableTickets, setAvailableTickets] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(findEventDetailsByIdThunk(eventId))
	}, []);

	const handleSellTickets = async () => {
		if (!availableTickets) {
			dispatch(setErrorMessage("Number of Tickets is missing!"))
		}
		if (isNaN(Number(availableTickets))) {
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
					tickets: availableTickets,
					type: "SELL"
				}
			));
			setAvailableTickets(0);
		}
	}
	return (
		<>
			<div className="row mt-4 align-items-end">
				<div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mt-4">
					<label htmlFor="tickets-available"
								 className="form-label">How many tickets do you want to sell?</label>
					<Required/>
					<input id="tickets-available"
								 className="form-control"
								 value={availableTickets}
								 onChange={(e) => setAvailableTickets(e.target.value)}
								 placeholder="Enter the number of tickets"/>
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
										onClick={handleSellTickets}>Sell Tickets
						</button>
					}
				</div>
			</div>
		</>
	);
}

export default SellTickets;