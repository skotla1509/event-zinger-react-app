import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {profileThunk} from "../../thunks/users-thunks";
import {UserRoles} from "../../constants/constants";
import {Link} from "react-router-dom";
import Required from "../components/required";

const Tickets = () => {
	const {details} = useSelector((state) => state.search)
	const {currentUser} = useSelector((state) => state.users)
	const {sellerTickets} = useSelector((state) => state.tickets);
	const [tickets, transactions, loading, errorMessage, successMessage] = useState(0);
	const [availableTickets, setAvailableTickets] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(profileThunk())
	}, []);

	const handleSellTickets = () => {

	}

	if (!currentUser) {
		return (
			<div className="mt-4">
				<h1>403 Unauthorized</h1>
			</div>
		)
	}
	else if (currentUser.userRole === UserRoles.EVENT_MANAGER) {
		return (
			<>
				<div className="row mt-4">
					<div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mt-4">
						<label htmlFor="tickets-available"
									 className="form-label">Available Tickets</label>
						<Required/>
						<input id="tickets-available"
									 className="form-control"
									 value={availableTickets}
									 onChange={(e) => setAvailableTickets(e.target.value)}
									 placeholder="Enter the number of tickets you wish to sell"/>
					</div>
				</div>
				<div className="row mt-4 align-items-center">
					<div className="col-12">
						<button className="btn btn-primary rounded"
										onClick={handleSellTickets}>Sell
						</button>
					</div>
				</div>
			</>
		);
	}
	else {
		return(
			<div className="mt-4">
				<h1>This is for Buyers</h1>
				{
					(!sellerTickets || sellerTickets.length <= 0) &&
					<>
						<h3>Uh oh! There are no tickets available for this event :(</h3>
					</>
				}
				{
					sellerTickets && sellerTickets.length > 0 &&
					<>
						{
							<ul className="list-group">
								{
									sellerTickets.map(
										(item, index) =>
											<li className="list-group-item" key={"tickets-" + item.user._id + "-" + index}>
												<div className="row align-items-center">
													<div className="col-auto">
														<img src={"../../images/" + item.user.avatar}
																 className="rounded"
																 width="50px" alt=""/>
													</div>
													<div className="col-7">
														<div>
															<Link to={`/profile/${item.user._id}`} className="text-dark">
																<strong>{item.user.firstName + " " + item.user.lastName}</strong>
															</Link>
														</div>
														<div>
															<i>@{item.user.userName}</i>
														</div>
													</div>
													<div className="col">
														<Link to={`/profile/${item.user._id}`} className="float-end">
															View
														</Link>
													</div>
												</div>
											</li>
									)
								}
							</ul>
						}
					</>
				}
			</div>
		)
	}
}

export default Tickets;