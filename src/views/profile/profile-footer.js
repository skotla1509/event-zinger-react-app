import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import './index.css';
import {findCommentsByUserThunk} from "../../thunks/comments-thunks";
import {findInterestsByUserThunk} from "../../thunks/people-interested-thunks";
import {findAllTransactionsByUserThunk} from "../../thunks/tickets-thunks";

const FooterProfile = ({userId}) => {
	const {comments} = useSelector((state) => state.comments);
	const {interestedEvents} = useSelector((state) => state.interests);
	const {transactions} = useSelector((state) => state.tickets);
	const dispatch = useDispatch();
	useEffect(() => {
		/*
		dispatch(findInterestsByUserThunk(userId));
		dispatch(findCommentsByUserThunk(userId));
		dispatch(findAllTransactionsByUserThunk(userId))
		 */
	}, []);


	return (
		<div className="row align-items-start mb-4">
			<div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-4">
				<h4>Recent activity</h4>
				<ul className="list-group">
					{
						transactions.map(
							(item, index) =>
							{
								if (item.event && item.user) {
									return (
										<li className="list-group-item" key={"attended-" + item.user._id + "-" + index}>
											<div className="row align-items-center">
												<div className="col-8">
													<div>
														<Link to={`/details/${item.event.eventId}`} className="text-dark">
															<strong>{item.event.name}</strong>
														</Link>
													</div>
													<div>
														<span>{item.type === "BUY" ? "You bought" : "You sold"} </span>
														<i>"{item.tickets} tickets"</i>
													</div>
												</div>
												<div className="col-4">
													<img src={item.event.img}
															 className="rounded"
															 width="100px" alt=""/>
												</div>
											</div>
										</li>
									)
								}
							}
						)
					}
				</ul>
			</div>
			<div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-4">
				<h4>Events interested</h4>
				<ul className="list-group">
					{
						interestedEvents.map(
							(item, index) =>
							{
								if (item.event && item.user) {
									return (
										<li className="list-group-item"
												key={"interested-" + item.event._id + "-" + index}>
											<div className="row align-items-center">

												<div className="col-8">
													<div>
														<Link to={`/details/${item.event.eventId}`} className="text-dark">
															<strong>{item.event.name}</strong>
														</Link>
													</div>
												</div>
												<div className="col-4">
													<img src={item.event.img}
															 className="rounded"
															 width="100px" alt=""/>
												</div>
											</div>
										</li>
									)
								}
							}
						)
					}
				</ul>
			</div>
			<div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-4">
				<h4>Comments</h4>
				<ul className="list-group">
					{
						comments.map(
							(item, index) =>
							{
								if (item.event && item.user) {
									return (
										<li className="list-group-item" key={"comments-" + item.event._id + "-" + index}>
											<div className="row align-items-center">
												<div className="col-8">
													<div>
														<Link to={`/details/${item.event.eventId}`} className="text-dark">
															<strong>{item.event.name}</strong>
														</Link>
													</div>
													<div>
														<span>You said </span>
														<i>"{item.comment}"</i>
													</div>
												</div>
												<div className="col-4">
													<img src={item.event.img}
															 className="rounded"
															 width="100px" alt=""/>
												</div>
											</div>
										</li>
									)
								}
							}
						)
					}
				</ul>
			</div>
		</div>
	)
}

export default FooterProfile;