import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './index.css';
import {findEventDetailsByIdThunk} from "../../thunks/search-thunks";
import {addCommentThunk, findCommentsByEventIdThunk} from "../../thunks/comments-thunks";
import {
	findInterestsByEventIdThunk,
	markInterestedThunk
} from "../../thunks/people-interested-thunks";
import {Helper, UserRoles} from "../../constants/constants";
import {profileThunk} from "../../thunks/users-thunks";
import {
	buyTicketsThunk,
	findAllTransactionsByEventIdThunk,
	findTicketsByEventThunk, sellTicketsThunk
} from "../../thunks/tickets-thunks";
import Required from "../components/required";
import {
	resetBuyMessages,
	resetSellMessages,
	setBuyError,
	setSellError
} from "../../reducers/tickets-reducer";

const Details = () => {
	const {eventId} = useParams()
	const [comment, setReview] = useState('')
	const [purchaseTickets, setPurchaseTickets] = useState("");
	const [availableTickets, setAvailableTickets] = useState("");
	const [showBuyTickets, setShowBuyTickets] = useState(false);
	const [showSellTickets, setShowSellTickets] = useState(false);
	const {comments} = useSelector((state) => state.comments);
	const {interestedUsers} = useSelector((state) => state.interests);
	const {details} = useSelector((state) => state.search)
	const {currentUser} = useSelector((state) => state.users)
	const {transactions, tickets, sellLoading, sellError, sellSuccess, buyLoading, buyError, buySuccess} = useSelector((state) => state.tickets);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(profileThunk())
		dispatch(findTicketsByEventThunk(eventId));
		dispatch(findEventDetailsByIdThunk(eventId))
		dispatch(findCommentsByEventIdThunk(eventId))
		dispatch(findInterestsByEventIdThunk(eventId))
		dispatch(findAllTransactionsByEventIdThunk(eventId))
	}, []);

	let isCurrentUserInterested = false;
	if (currentUser && interestedUsers.find((item) => item.user._id === currentUser._id)) {
		isCurrentUserInterested = true;
	}

	const handlePostReviewBtn = async () => {
		await dispatch(addCommentThunk(
			{
				comment,
				event: {
					eventId: details.id,
					name: details.name,
					img: details.img
				}
			}
		));
		dispatch(findCommentsByEventIdThunk(eventId))
	}

	const handleMarkInterested = async () => {
		await dispatch(markInterestedThunk(
			{
				event: {
					eventId: details.id,
					name: details.name,
					img: details.img
				}
			}
		));
		dispatch(findInterestsByEventIdThunk(eventId))
	}

	const handleBuyTickets = async () => {
		if (!purchaseTickets) {
			dispatch(setBuyError("Number of Tickets is missing!"))
		}
		if (isNaN(Number(purchaseTickets))) {
			dispatch(setBuyError("Number of Tickets is not valid number!"))
		}
		if (Number(purchaseTickets) > Number(tickets.remainingTickets)) {
			dispatch(setBuyError("Cannot buy more than available!"))
		}
		else {
			dispatch(setBuyError(""));
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
			dispatch(findAllTransactionsByEventIdThunk(eventId))
			dispatch(findTicketsByEventThunk(eventId))
		}
	}

	const handleSellTickets = async () => {
		if (!availableTickets) {
			dispatch(setSellError("Number of Tickets is missing!"))
		}
		if (isNaN(Number(availableTickets))) {
			dispatch(setSellError("Number of Tickets is not valid number!"))
		}
		else {
			dispatch(setSellError(""));
			await dispatch(sellTicketsThunk(
				{
					event: {
						eventId: details.id,
						name: details.name,
						img: details.img
					},
					tickets: availableTickets
				}
			));
			setAvailableTickets(0);
			dispatch(findAllTransactionsByEventIdThunk(eventId))
			dispatch(findTicketsByEventThunk(eventId))
		}
	}

	return (
		<div className="mt-4">
			<div className="row">
				<div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5">
					<img src={details.img} className="card-img-top rounded" height="350px" width="200px"
							 alt=""/>
				</div>
				<div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-7">
					<div className="row d-flex flex-column">
						<div className="col mt-2">
							<div style={{color: "rgb(144,78,186)"}}>
								<h2><strong>{details.name}</strong></h2>
							</div>
						</div>
						<div className="col mt-4">
							<div className="row">
								<div className="col-auto">
									<FontAwesomeIcon icon="fa-solid fa-location-dot" className="font-size-20px pt-1"/>
								</div>
								<div className="col">
									<div>
										<strong>Venue</strong>
									</div>
									<div>
										<span>{details.address}</span>
									</div>
									<div>
										<span>{details.city}, {details.state}</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col mt-4">
							<div className="row">
								<div className="col-auto">
									<FontAwesomeIcon icon="fa-solid fa-calendar-days"
																	 className="font-size-20px pt-1"/>
								</div>
								<div className="col">
									<div>
										<strong>When</strong>
									</div>
									<div>
										<span>{Helper.formatDate(details.date)}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					{
						currentUser &&
						<>
							<div className="row d-flex flex-column">
								<div className="col mt-4">
									<div className="row">
										{
											isCurrentUserInterested &&
											<>
												<div className="col-auto">
													<FontAwesomeIcon icon="fa-solid fa-star"
																					 className="text-warning font-size-20px"/>
												</div>
												<div className="col">
													<span>Marked interested</span>
												</div>
											</>
										}
										{
											!isCurrentUserInterested &&
											<>
												<div className="col-auto">
													<FontAwesomeIcon icon="fa-solid fa-star" onClick={handleMarkInterested}
																					 className="font-size-20px"/>
												</div>
												<div className="col">
													<span>Mark as interested</span>
												</div>
											</>
										}
									</div>
								</div>
							</div>
							<div className="row d-flex flex-row">
								<div className="col-auto mt-4">
									{
										!showBuyTickets &&
										<button type="button"
														onClick={() => {
															setShowBuyTickets(true);
															dispatch(resetBuyMessages())
														}}
														style={{backgroundColor: "rgb(144,78,186)"}}
														className="btn m-2 rounded-pill text-white">
											Buy tickets</button>
									}
									{
										showBuyTickets &&
										<button type="button"
														onClick={() => {
															setShowBuyTickets(false)
															dispatch(resetBuyMessages())
														}}
														style={{backgroundColor: "rgb(144,78,186)"}}
														className="btn m-2 rounded-pill text-white">
											Hide Buy tickets</button>
									}
								</div>
								{
									currentUser.userRole === UserRoles.EVENT_MANAGER &&
									<div className="col mt-4">
										{
											!showSellTickets &&
											<button type="button"
															onClick={() => {
																setShowSellTickets(true)
																dispatch(resetSellMessages())
															}}
															style={{backgroundColor: "rgb(144,78,186)"}}
															className="btn m-2 rounded-pill text-white">
												Sell tickets</button>
										}
										{
											showSellTickets &&
											<button type="button"
															onClick={() => {
																setShowSellTickets(false)
																dispatch(resetSellMessages())
															}}
															style={{backgroundColor: "rgb(144,78,186)"}}
															className="btn m-2 rounded-pill text-white">
												Hide Sell tickets</button>
										}
									</div>
								}
							</div>
						</>
					}
				</div>
			</div>
			{
				showBuyTickets &&
				<>
					<div className="mt-4 row border-secondary border-2 border-top"></div>
					<div className="row align-items-start">
						<div className="col-12">
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
												buyLoading &&
												<button type="button"
																disabled
																className="btn btn-secondary">
													...loading
												</button>
											}
											{
												!buyLoading &&
												<button className="btn btn-primary rounded"
																onClick={handleBuyTickets}>Buy Tickets
												</button>
											}
										</div>
									</div>
								</>
							}
						</div>
						{
							buyError &&
							<div className="row mt-4 align-items-center">
								<div className="col">
									<div className="text-danger">{buyError}</div>
									<div className="text-danger">Please fix above errors
										to proceed to next step.
									</div>
								</div>
							</div>
						}
						{
							buySuccess &&
							<div className="row mt-4 align-items-center">
								<div className="col">
									<div className="text-success">{buySuccess}</div>
								</div>
							</div>
						}
					</div>
				</>
			}
			{
				showSellTickets &&
				<>
					<div className="mt-4 row border-secondary border-2 border-top"></div>
					<div className="row align-items-start">
						<div className="col-12">
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
										sellLoading &&
										<button type="button"
														disabled
														className="btn btn-secondary">
											...loading
										</button>
									}
									{
										!sellLoading &&
										<button className="btn btn-primary rounded"
														onClick={handleSellTickets}>Sell Tickets
										</button>
									}
								</div>
							</div>
						</div>
					</div>
					{
						sellError &&
						<div className="row mt-4 align-items-center">
							<div className="col">
								<div className="text-danger">{sellError}</div>
								<div className="text-danger">Please fix above errors
									to proceed to next step.
								</div>
							</div>
						</div>
					}
					{
						sellSuccess &&
						<div className="row mt-4 align-items-center">
							<div className="col">
								<div className="text-success">{sellSuccess}</div>
							</div>
						</div>
					}
				</>
			}
			<div className="mt-4 row border-secondary border-2 border-top"></div>
			<div className="row align-items-start mb-4">
				<div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-4">
					<h4>Recent activity</h4>
					<ul className="list-group">
						{
							transactions.map(
								(item, index) =>
									<li className="list-group-item" key={"attended-" + item.user._id + "-" + index}>
										<div className="row align-items-center">
											<div className="col-auto">
												<img src={"../../images/" + item.user.avatar}
														 className="rounded"
														 width="50px" alt=""/>
											</div>
											<div className="col">
												<div>
													<Link to={`/profile/${item.user._id}`} className="text-dark">
														<strong>{item.user.firstName + " " + item.user.lastName}</strong>
													</Link>
													<i className="px-2">@{item.user.userName}</i>
												</div>
												<div>
													<span>{item.type === "BUY" ? "Bought" : "Sold"} </span>
													<i>"{item.tickets} tickets"</i>
												</div>
											</div>
										</div>
									</li>
							)
						}
					</ul>
				</div>
				<div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-4">
					<h4>People interested</h4>
					<ul className="list-group">
						{
							interestedUsers.map(
								(item, index) =>
									<li className="list-group-item" key={"interested-" + item.user._id + "-" + index}>
										<div className="row align-items-center">
											<div className="col-auto">
												<img src={"../../images/" + item.user.avatar}
														 className="rounded"
														 width="50px" alt=""/>
											</div>
											<div className="col">
												<div>
													<Link to={`/profile/${item.user._id}`} className="text-dark">
														<strong>{item.user.firstName + " " + item.user.lastName}</strong>
													</Link>
												</div>
												<div>
													<i>@{item.user.userName}</i>
												</div>
											</div>
										</div>
									</li>
							)
						}
					</ul>
				</div>
				<div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-4">
					<h4>Comments</h4>
					{
						currentUser &&
						<>
							<div className="mt-2 row">
								{
									currentUser &&
									<div className="row mt-2 mb-2">
										<div className="col-10">
                        <textarea
													onChange={(e) => setReview(e.target.value)}
													placeholder="Write new comment"
													className="form-control">
                        </textarea>
										</div>
										<div className="col-2">
											<button className="btn btn-primary rounded"
															onClick={handlePostReviewBtn}>Post
											</button>
										</div>
									</div>

								}
							</div>
						</>
					}
					<ul className="list-group">
						{
							comments.map(
								(item, index) =>
									<li className="list-group-item" key={"comments-" + item.user._id + "-" + index}>
										<div className="row align-items-center">
											<div className="col-auto">
												<img src={"../../images/" + item.user.avatar}
														 className="rounded"
														 width="50px" alt=""/>
											</div>
											<div className="col">
												<div>
													<Link to={`/profile/${item.user._id}`} className="text-dark">
														<strong>{item.user.firstName + " " + item.user.lastName}</strong>
													</Link>
													<i className="px-2">@{item.user.userName}</i>
												</div>
												<div>
													<span>Says </span>
													<i>"{item.comment}"</i>
												</div>
											</div>
										</div>
									</li>
							)
						}
					</ul>
				</div>
			</div>
		</div>
	)
}
export default Details